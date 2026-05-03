import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { nitrogen, phosphorus, potassium, cropType } = await request.json()
    const groqKey = process.env.GROQ_API_KEY
    
    if (!groqKey) {
      return NextResponse.json({
        healthScore: 75,
        status: "Good",
        recommendations: [
          "Apply 50kg Urea per acre before monsoon.",
          "Use organic farmyard manure to boost potassium availability."
        ]
      })
    }

    const prompt = `You are a Soil Health Expert for Indian Farmers.
Context:
Crop: ${cropType}
Current Soil N-P-K (Nitrogen-Phosphorus-Potassium) Values: N=${nitrogen}, P=${phosphorus}, K=${potassium}. 
(Assume standard scale 1-100 or generic values if unspecified).

Provide exactly 3 vital pieces of advice for fertilizer usage and soil preparation. Also provide an overall "Health Score" out of 100.
Return ONLY raw JSON with no other text, matching this exact schema:
{
  "healthScore": 82,
  "status": "Excellent | Good | Fair | Poor",
  "recommendations": [
    "Specific fertilizer amount string",
    "Organic alternative string",
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
      // Fallback: search for specific keys
      result = {
        healthScore: textContent.match(/healthScore["\s:]+(\d+)/)?.[1] ? parseInt(textContent.match(/healthScore["\s:]+(\d+)/)[1]) : 70,
        status: textContent.match(/status["\s:]+["'](\w+)["']/)?.[1] || "Fair",
        recommendations: [
          "Apply balanced fertilizers based on actual crop needs.",
          "Consider organic supplements for long-term soil health.",
          "Monitor soil moisture levels regularly."
        ]
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
    console.error(error)
    return NextResponse.json({
        healthScore: 60,
        status: "Fair",
        recommendations: [
          "Apply DAP at 50kg per acre.",
          "Increase organic compost application."
        ]
    })
  }
}
