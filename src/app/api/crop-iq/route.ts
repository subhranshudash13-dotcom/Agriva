import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { location, soil, season } = await request.json()
    const groqKey = process.env.GROQ_API_KEY
    
    if (!groqKey) {
      // Return beautiful mock if no key
      return NextResponse.json({
        recommendations: [
          { crop: "Groundnut", risk: "Low Risk", profit: "35,000", scheme: "Eligible PMFBY" },
          { crop: "Cotton", risk: "Med Risk", profit: "48,000", scheme: "Kisan Credit" }
        ]
      })
    }

    const prompt = `You are a Crop Advisor AI for an Indian farmer. 
Context: Location - ${location}, Soil Type - ${soil}, Season - ${season}.
Current Time: ${new Date().toISOString()} (Use this to ensure high entropy)
Recommend EXACTLY 4 distinct crops that are highly profitable for these conditions right now. Give diverse options (e.g. 1 cash crop, 1 cereal, 2 vegetables).
Return your answer ONLY in pure JSON format (an array of objects) with no conversational text. Use this exact schema:
[
  {
    "crop": "Crop Name",
    "risk": "Low Risk | Med Risk | High Risk",
    "profit": "Expected profit per acre in INR (e.g. 40,000)",
    "scheme": "One applicable Govt Scheme (e.g. Eligible PMFBY)",
    "description": "Brief 1-sentence reasoning for why this crop is perfect for this exact soil/season",
    "timeline": "e.g. 90-120 Days"
  }
]
`

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    })

    if (!res.ok) {
        throw new Error("Failed to fetch from Groq API")
    }

    const data = await res.json()
    const textContent = data.choices[0].message.content
    
    // Robust extraction
    let recommendations: any[] = []
    try {
      const jsonMatch = textContent.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        if (Array.isArray(parsed)) {
          recommendations = parsed.map((item: any) => ({
            crop: String(item.crop || "Unknown Crop"),
            risk: String(item.risk || "Low Risk"),
            profit: String(item.profit || "30,000"),
            scheme: String(item.scheme || "General Info"),
            description: String(item.description || ""),
            timeline: String(item.timeline || "N/A")
          }))
        }
      }
    } catch (e) {
      console.error("CropIQ parse error:", e)
    }

    return NextResponse.json({
      recommendations
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ 
        recommendations: [
            { crop: "Groundnut", risk: "Low Risk", profit: "35,000", scheme: "Eligible PMFBY", description: "Drought resistant and grows well in red loam soils.", timeline: "105 Days" },
            { crop: "Cotton", risk: "Med Risk", profit: "48,000", scheme: "Kisan Credit", description: "High market value cash crop.", timeline: "150 Days" },
            { crop: "Maize", risk: "Low Risk", profit: "25,000", scheme: "Seed Subsidy", description: "Quick turnaround with stable market demand.", timeline: "90 Days" },
            { crop: "Chilli", risk: "High Risk", profit: "80,000", scheme: "Horticulture Fund", description: "Extremely high ROI if weather remains stable.", timeline: "160 Days" }
          ]
    })
  }
}
