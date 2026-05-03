import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const region = searchParams.get('region') || 'Anantapur Mandi'
  const crop = searchParams.get('crop') || 'Groundnut'

  // Normally we would hit Groq to evaluate the live mandi data and tell us exactly how much to sell.
  // For demo, we construct a dynamic intelligence layer.
  
  // Create slightly dynamic mockup
  const basePrice = 4300 + Math.floor(Math.random() * 200)

  const forecast = [
    { day: "Today", price: basePrice, risk: "high" },
    { day: "Day 1", price: basePrice + 150, risk: "high" },
    { day: "Day 2", price: basePrice + 300, risk: "medium" },
    { day: "Day 3", price: basePrice + 520, risk: "low" },
    { day: "Day 4", price: basePrice + 550, risk: "low" },
    { day: "Day 5", price: basePrice + 500, risk: "medium" },
    { day: "Day 6", price: basePrice + 350, risk: "high" },
    { day: "Day 7", price: basePrice + 200, risk: "high" },
  ]

  // Construct special highlight AI Insight with specific quantity calculation
  // "Sell 80% (approx 20 quintals) of your yield on Day 4 for ₹4850/quintal in Anantapur Mandi"
  const maxPriceDay = forecast.reduce((prev, current) => (prev.price > current.price) ? prev : current)
  const totalYieldQuintals = Math.floor(Math.random() * 20) + 15 // simulate 15-35 quintals yield

  const insight = {
    message: `Market trends indicate a shortage spike in ${region} before the weekend.`,
    recommendation: `Sell 80% (approx ${Math.floor(totalYieldQuintals * 0.8)} quintals) of your ${crop} on ${maxPriceDay.day} for ₹${maxPriceDay.price}/quintal.`,
    maxPrice: maxPriceDay.price,
    profitPercentage: `+${((maxPriceDay.price - basePrice) / basePrice * 100).toFixed(1)}%`
  }

  return NextResponse.json({
    region,
    crop,
    insight,
    forecast
  })
}
