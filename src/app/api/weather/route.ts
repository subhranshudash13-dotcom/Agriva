import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const latParam = searchParams.get('lat')
  const lonParam = searchParams.get('lon')
  const region = searchParams.get('region') || 'anantapur'
  
  // Region to Coordinates Mapping
  const regions: Record<string, { lat: string, lon: string, name: string }> = {
    anantapur: { lat: '14.6819', lon: '77.6006', name: 'Anantapur (South)' },
    punjab: { lat: '30.9010', lon: '75.8573', name: 'Ludhiana (Punjab)' },
    vidarbha: { lat: '21.1458', lon: '79.0882', name: 'Nagpur (Central)' },
    guntur: { lat: '16.3067', lon: '80.4365', name: 'Guntur (Andhra)' },
    saurashtra: { lat: '22.3039', lon: '70.8022', name: 'Rajkot (Gujarat)' },
    bihar: { lat: '25.5941', lon: '85.1376', name: 'Patna (Bihar)' }
  }

  const defaultCoords = regions[region] || regions.anantapur
  const lat = latParam || defaultCoords.lat
  const lon = lonParam || defaultCoords.lon
  
  const apiKey = process.env.OPENWEATHER_API_KEY
  const groqKey = process.env.GROQ_API_KEY
  
  let locationName = defaultCoords.name
  let mockForecast = [
    { day: 0, date: "Today", displayDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), rain: 0, temp: 32, humidity: 45, riskLevel: "Low" },
    { day: 1, date: "Tomorrow", displayDate: new Date(Date.now() + 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), rain: 0, temp: 33, humidity: 42, riskLevel: "Low" },
    { day: 2, date: "Wednesday", displayDate: new Date(Date.now() + 172800000).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), rain: 30, temp: 31, humidity: 65, riskLevel: "Medium" },
    { day: 3, date: "Thursday", displayDate: new Date(Date.now() + 259200000).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), rain: 85, temp: 28, humidity: 88, riskLevel: "High", warning: "Heavy Rain Expected" },
    { day: 4, date: "Friday", displayDate: new Date(Date.now() + 345600000).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), rain: 20, temp: 30, humidity: 70, riskLevel: "Medium" },
    { day: 5, date: "Saturday", displayDate: new Date(Date.now() + 432000000).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), rain: 0, temp: 32, humidity: 50, riskLevel: "Low" },
    { day: 6, date: "Sunday", displayDate: new Date(Date.now() + 518400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), rain: 0, temp: 33, humidity: 48, riskLevel: "Low" }
  ]

  // 1. Fetch Real Weather Data
  if (apiKey) {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`, { next: { revalidate: 3600 } })
      if (res.ok) {
        const data = await res.json()
        locationName = data.city?.name || "Local Farm"
        
        const dailyForecasts = []
        const daysMap = new Map()
        
        for (const item of data.list) {
          const dObj = new Date(item.dt * 1000)
          const date = dObj.toLocaleDateString('en-US', { weekday: 'long' })
          const displayDate = dObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
          
          if (!daysMap.has(date)) {
            daysMap.set(date, {
              day: dailyForecasts.length,
              date: dailyForecasts.length === 0 ? "Today" : dailyForecasts.length === 1 ? "Tomorrow" : date,
              displayDate,
              rain: 0,
              tempMax: item.main.temp_max,
              humidity: item.main.humidity
            })
            dailyForecasts.push(daysMap.get(date))
          } else {
            const existing = daysMap.get(date)
            if (item.rain && item.rain["3h"]) existing.rain += item.rain["3h"]
            existing.tempMax = Math.max(existing.tempMax, item.main.temp_max)
          }
        }
        
        mockForecast = dailyForecasts.slice(0, 7).map(d => {
          let riskLevel = "Low"
          let warning = ""
          const rainScore = d.rain > 5 ? 100 : (d.rain * 20)
          
          if (rainScore > 60) {
            riskLevel = "High"
            warning = "Heavy Rain Expected"
          } else if (rainScore > 30) {
            riskLevel = "Medium"
          }
          
          return {
            ...d,
            rain: Math.min(100, rainScore),
            temp: Math.round(d.tempMax),
            riskLevel,
            warning
          }
        })
      }
    } catch(e) {
      console.error("OpenWeather error:", e)
    }
  }

  // 2. Fetch Dynamic Recommendations from Groq based on Weather
  let recommendedActions = [
    "Harvest mature groundnut immediately before Thursday's heavy rain.",
    "Delay any planned pesticide spraying until Friday."
  ]

  if (groqKey) {
    try {
      const prompt = `You are an expert AI Crop Advisor. Analyze this 7-day weather forecast (Rain/Temp):
${JSON.stringify(mockForecast.slice(0,5))}
Generate exactly 3 EXTREMELY BRIEF, actionable tips (under 10 words each) for a farmer. 
CRITICAL: ONLY mention weather conditions or risks that explicitly appear in the JSON data above. DO NOT mention "Thursday" or any other specific day unless it is explicitly marked in the JSON. If the forecast is clear, focus on irrigation or soil prep. 
Return ONLY a raw JSON array of strings e.g. ["Tip 1", "Tip 2", "Tip 3"].`

      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${groqKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "llama3-8b-8192", messages: [{ role: "user", content: prompt }], temperature: 0.1 })
      })

      if (groqRes.ok) {
        const groqData = await groqRes.json()
        const text = groqData.choices[0].message.content.trim()
        const jsonMatch = text.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0])
          if (Array.isArray(parsed)) {
            recommendedActions = parsed.map((a: any) => 
              typeof a === 'object' ? (a.tip || a.action || a.advice || JSON.stringify(a)) : String(a)
            )
          }
        }
      }
    } catch (e) {
      console.error("Groq generation error:", e)
    }
  }

  return NextResponse.json({
    location: locationName,
    crop: "Groundnut",
    stage: "Maturation",
    forecast: mockForecast,
    actions: recommendedActions
  })
}
