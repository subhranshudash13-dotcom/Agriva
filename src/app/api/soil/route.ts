import { NextResponse } from "next/server"

export async function POST(request: Request) {
  let body: any = {}
  try {
    body = await request.json()
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const { nitrogen, phosphorus, potassium, cropType } = body
  const groqKey = process.env.GROQ_API_KEY
  
  // Calculate dynamic fallback values immediately so they are available
  const n = parseInt(String(nitrogen)) || 50
  const p = parseInt(String(phosphorus)) || 30
  const k = parseInt(String(potassium)) || 40
  
  // Quick weighted average for a somewhat realistic fallback score (N=40%, P=30%, K=30%)
  const fallbackScore = Math.min(100, Math.max(10, Math.round((n * 0.4) + (p * 0.3) + (k * 0.3))))
  let fallbackStatus = "Fair"
  if (fallbackScore > 80) fallbackStatus = "Excellent"
  else if (fallbackScore > 60) fallbackStatus = "Good"
  else if (fallbackScore < 35) fallbackStatus = "Poor"

  const fallbackData = {
    healthScore: fallbackScore,
    status: fallbackStatus,
    recommendations: [
      `Situational: Apply ${Math.max(20, 100 - n)}kg of IFFCO Urea per acre for ${cropType || 'your crop'}.`,
      `Supplement with ${Math.max(10, 100 - p)}kg DAP to balance Phosphorus levels.`,
      "Add 5 tons of organic farmyard manure to improve soil texture."
    ]
  }

  if (!groqKey) {
    return NextResponse.json(fallbackData)
  }

  try {
    const prompt = `You are a Soil Health Expert for Indian Farmers.
Context:
Crop: ${cropType || 'General'}
Current Soil N-P-K (Nitrogen-Phosphorus-Potassium) Values: N=${n}, P=${p}, K=${k}. 
(Note: N:P:K values are in generic units 1-100 where 100 is high/sufficient).

Provide exactly 3 vital, situational pieces of advice for fertilizer usage and soil preparation for this specific crop. Include exact brand names (e.g., IFFCO Urea, DAP) and weight measurements. Also provide an overall "Health Score" out of 100.
Return ONLY raw JSON with no other text, matching this exact schema:
{
  "healthScore": 82,
  "status": "Excellent | Good | Fair | Poor",
  "recommendations": [
    "Specific fertilizer amount string",
    "Organic/Situational alternative string",
    "Watering or preparation note"
  ]
}`

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      })
    })

    if (!res.ok) throw new Error("Failed to fetch from Groq API")

    const data = await res.json()
    const textContent = data.choices[0].message.content
    
    // Robust JSON extraction
    let result;
    try {
      const jsonMatch = textContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (parseError) {
      console.error("JSON Parsing failed, attempting fallback parsing:", textContent)
      result = {
        healthScore: textContent.match(/healthScore["\s:]+(\d+)/)?.[1] ? parseInt(textContent.match(/healthScore["\s:]+(\d+)/)[1]) : fallbackScore,
        status: textContent.match(/status["\s:]+["'](\w+)["']/)?.[1] || fallbackStatus,
        recommendations: fallbackData.recommendations
      }
    }

    // Ensure recommendations are strictly an array of strings
    if (result && Array.isArray(result.recommendations)) {
      result.recommendations = result.recommendations.map((r: any) => 
        typeof r === 'object' ? (r.advice || r.tip || r.text || r.recommendation || JSON.stringify(r)) : String(r)
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Soil Health API Catch-All Error:", error)
    return NextResponse.json(fallbackData)
  }
}
