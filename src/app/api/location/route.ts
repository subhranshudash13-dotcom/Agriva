import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  
  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon parameters" }, { status: 400 })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY
  
  if (!apiKey) {
    // If running strictly without API key, fallback
    return NextResponse.json({
      location: "Anantapur, Andhra Pradesh",
      lat,
      lon
    })
  }

  try {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`)
    
    if (res.ok) {
        const data = await res.json()
        if (data.length > 0) {
            const loc = data[0]
            const name = loc.local_names?.en || loc.name
            const rawLocation = `${name}${loc.state ? ', ' + loc.state : ''}`
            return NextResponse.json({ location: rawLocation, lat, lon })
        }
    }
    
    // Fallback if data is missing
    return NextResponse.json({ location: "Unknown Agricultural Zone", lat, lon })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ location: "Location Unavailable", lat, lon }, { status: 500 })
  }
}
