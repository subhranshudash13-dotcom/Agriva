import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const groqKey = process.env.GROQ_API_KEY
    if (!groqKey) {
      return NextResponse.json({
        advice: "Groq AI Key is not configured. Please setup GROQ_API_KEY.",
        riskLevel: "Medium"
      })
    }

    const { context } = await request.json()

    // Provide a simple prompt to Groq (using LLaMA 3 8B or Mixtral)
    const prompt = `You are an expert agricultural advisor for Indian farmers. 
Given the following context: 
${JSON.stringify(context, null, 2)}

Provide concise advice in 2-3 bullet points for the farmer to optimize their yield and minimize risk. Be very brief.`

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }]
      })
    })

    if (!res.ok) {
        const err = await res.text()
        console.error("Groq API error:", err)
        return NextResponse.json({ error: "Failed to fetch from Groq API" }, { status: 500 })
    }

    const data = await res.json()
    const advice = data.choices[0].message.content

    return NextResponse.json({
      advice,
      riskLevel: "Calculated dynamically"
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
