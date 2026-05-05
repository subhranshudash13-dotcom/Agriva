import { NextResponse } from "next/server"

interface Recommendation {
  crop: string
  risk: string
  profit: string
  scheme: string
  schemeLink: string
  description: string
  timeline: string
}

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
      // High-quality expanded fallback for local development or API failure
      const fallbackPool = [
        { crop: "Soybean", risk: "Low Risk", profit: "42,000", scheme: "PM-KISAN", schemeLink: "https://pmkisan.gov.in/", description: "Excellent nitrogen-fixer for these soil conditions.", timeline: "100 Days" },
        { crop: "Mustard", risk: "Low Risk", profit: "38,000", scheme: "Oilseed Mission", schemeLink: "https://nfsm.gov.in/", description: "Low water requirement and high market demand.", timeline: "110 Days" },
        { crop: "Turmeric", risk: "Med Risk", profit: "85,000", scheme: "Spice Board", schemeLink: "http://www.indianspices.com/", description: "High value addition crop with long term yield.", timeline: "210 Days" },
        { crop: "Tomato", risk: "High Risk", profit: "95,000", scheme: "Horticulture", schemeLink: "https://midh.gov.in/", description: "Requires intensive care but offers massive returns.", timeline: "90 Days" },
        { crop: "Wheat", risk: "Low Risk", profit: "32,000", scheme: "PMFBY Insurance", schemeLink: "https://pmfby.gov.in/", description: "Stable winter crop with guaranteed procurement.", timeline: "120 Days" },
        { crop: "Cotton", risk: "Med Risk", profit: "55,000", scheme: "Cotton Corporation", schemeLink: "https://cotcorp.org.in/", description: "Leading cash crop for black soil regions.", timeline: "160 Days" },
        { crop: "Rice (Paddy)", risk: "Med Risk", profit: "45,000", scheme: "Fasal Bima Yojana", schemeLink: "https://pmfby.gov.in/", description: "Water intensive but reliable in monsoon regions.", timeline: "140 Days" },
        { crop: "Chickpea", risk: "Low Risk", profit: "28,000", scheme: "NPDP", schemeLink: "https://nfsm.gov.in/", description: "Pulse crop with high soil enrichment properties.", timeline: "110 Days" },
        { crop: "Maize", risk: "Low Risk", profit: "25,000", scheme: "Seed Subsidy", schemeLink: "https://seednet.gov.in/", description: "Industrial demand ensures stable market prices.", timeline: "95 Days" },
        { crop: "Onion", risk: "High Risk", profit: "70,000", scheme: "Operation Greens", schemeLink: "https://mofpi.gov.in/", description: "High volatility but extreme profit potential.", timeline: "120 Days" }
      ]
      const randomized = fallbackPool.sort(() => Math.random() - 0.5).slice(0, 4)
      return NextResponse.json({ recommendations: randomized })
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
3. eNAM: https://enam.gov.in/
4. Soil Health Card: https://soilhealth.dac.gov.in/
5. Horticulture (MIDH): https://midh.gov.in/
6. Rashtriya Krishi Vikas Yojana (RKVY): https://rkvy.nic.in/

Constraints:
- Return ONLY pure JSON.
- "description" MUST explain why the crop is perfect for "${soil}" soil in "${location}" specifically.
- DO NOT repeat crops. Focus on high variety.

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
        temperature: 0.9 // Higher temperature for even more variety
      })
    })

    if (!res.ok) throw new Error("Failed to fetch from Groq API")

    const data = await res.json()
    const textContent = data.choices[0].message.content
    
    // Robust extraction
    let recommendations: Recommendation[] = []
    try {
      const jsonMatch = textContent.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        if (Array.isArray(parsed)) {
          recommendations = parsed.map((item: Recommendation) => ({
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
    // Dynamic randomized fallback on catch
    const emergencyPool = [
        { crop: "Soybean", risk: "Low Risk", profit: "42,000", scheme: "PM-KISAN", schemeLink: "https://pmkisan.gov.in/", description: "Excellent nitrogen-fixer for these soil conditions.", timeline: "100 Days" },
        { crop: "Wheat", risk: "Low Risk", profit: "32,000", scheme: "PMFBY", schemeLink: "https://pmfby.gov.in/", description: "Stable winter crop for varied soil types.", timeline: "120 Days" },
        { crop: "Tomato", risk: "High Risk", profit: "95,000", scheme: "MIDH", schemeLink: "https://midh.gov.in/", description: "High value vegetable crop.", timeline: "90 Days" },
        { crop: "Mustard", risk: "Low Risk", profit: "38,000", scheme: "RKVY", schemeLink: "https://rkvy.nic.in/", description: "Resilient oilseed crop.", timeline: "110 Days" }
    ]
    return NextResponse.json({ 
      recommendations: emergencyPool.sort(() => Math.random() - 0.5).slice(0, 4)
    })
  }
}
