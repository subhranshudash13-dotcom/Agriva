import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { location, soil, season } = await request.json()
    const groqKey = process.env.GROQ_API_KEY
    
    // Strict Location Validation
    if (!location || location.trim().toLowerCase() === 'india' || location.length < 3) {
      return NextResponse.json({ 
        error: "Location Required",
        message: "Please enter a specific district or region (e.g. 'Guntur, AP') for situational analysis."
      }, { status: 400 })
    }

    if (!groqKey) {
      return NextResponse.json({
        recommendations: [
          { 
            crop: "Groundnut", 
            risk: "Low Risk", 
            profit: "35,000", 
            scheme: "PM-Fasal Bima Yojana", 
            schemeLink: "https://pmfby.gov.in/",
            description: "Drought resistant and perfectly suited for the red loam soil in your region during Kharif.",
            timeline: "105 Days"
          },
          { 
            crop: "Chilli", 
            risk: "High Risk", 
            profit: "95,000", 
            scheme: "Mission for Integrated Development of Horticulture", 
            schemeLink: "https://midh.gov.in/",
            description: "High value crop with massive returns if irrigation is managed correctly in this soil type.",
            timeline: "150 Days"
          }
        ]
      })
    }

    const prompt = `You are a Precision Agriculture Advisor for Indian farmers. 
Context: 
Location: ${location}
Soil: ${soil}
Season: ${season}

Task: Recommend EXACTLY 4 distinct crops that are highly profitable for these EXACT conditions right now. 
For each crop, you MUST identify the most relevant Government Scheme it qualifies for and provide the direct official application portal URL.

Knowledge Base (Prioritize these links):
1. PM-KISAN: https://pmkisan.gov.in/
2. PM Fasal Bima Yojana (PMFBY): https://pmfby.gov.in/
3. eNAM (National Agriculture Market): https://enam.gov.in/
4. Soil Health Card Portal: https://soilhealth.dac.gov.in/
5. Horticulture (MIDH): https://midh.gov.in/
6. Rashtriya Krishi Vikas Yojana (RKVY): https://rkvy.nic.in/

Constraints:
- Return ONLY pure JSON.
- "description" MUST explain why the crop is perfect for "${soil}" soil in "${location}" specifically.
- Ensure high entropy in suggestions to avoid repetition.

Schema:
[
  {
    "crop": "Crop Name",
    "risk": "Low Risk | Med Risk | High Risk",
    "profit": "Expected profit per acre in INR (e.g. 40,000)",
    "scheme": "Specific Scheme Name",
    "schemeLink": "Direct URL to apply",
    "description": "Situational reasoning",
    "timeline": "Duration in days"
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
        temperature: 0.85
      })
    })

    if (!res.ok) throw new Error("Failed to fetch from Groq API")

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
            scheme: String(item.scheme || "General Insurance"),
            schemeLink: String(item.schemeLink || "https://agricoop.nic.in/"),
            description: String(item.description || ""),
            timeline: String(item.timeline || "N/A")
          }))
        }
      }
    } catch (e) {
      console.error("CropIQ parse error:", e)
    }

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("CropIQ API Error:", error)
    return NextResponse.json({ 
      recommendations: [
        { crop: "Soybean", risk: "Low Risk", profit: "42,000", scheme: "PM-KISAN", schemeLink: "https://pmkisan.gov.in/", description: "Excellent nitrogen-fixer for these soil conditions.", timeline: "100 Days" },
        { crop: "Mustard", risk: "Low Risk", profit: "38,000", scheme: "Oilseed Mission", schemeLink: "https://nfsm.gov.in/", description: "Low water requirement and high market demand.", timeline: "110 Days" }
      ]
    })
  }
}
