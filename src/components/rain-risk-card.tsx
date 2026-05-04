"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudRain, AlertTriangle, ArrowRight, Loader2, Info } from "lucide-react"
import { useRegion } from "@/components/region-provider"

type ForecastDay = {
  day: number,
  date: string,
  displayDate: string,
  rain: number,
  temp: number,
  humidity: number,
  riskLevel: "Low" | "Medium" | "High",
  warning?: string
}

type WeatherData = {
  location: string,
  crop: string,
  stage: string,
  forecast: ForecastDay[],
  actions: string[]
}

export function RainRiskCard() {
  const { region } = useRegion()
  const [crop, setCrop] = React.useState("Rice") // Default to Rice since user mentioned it
  const [data, setData] = React.useState<WeatherData | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(`/api/weather?region=${region}&crop=${crop}`)
        if (!res.ok) {
          console.error("Weather API returned", res.status)
          return
        }
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          console.error("Weather API returned non-JSON response")
          return
        }
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error("Failed to fetch weather data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
    const interval = setInterval(fetchWeather, 60000) // 60 seconds
    return () => clearInterval(interval)
  }, [region, crop])

  if (loading || !data) {
    return (
      <Card className="border shadow-lg shadow-blue-500/5 flex items-center justify-center h-[420px] bg-gradient-to-b from-card to-blue-50/10 dark:to-blue-950/20">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
          <p className="text-muted-foreground font-medium animate-pulse text-sm tracking-widest uppercase">Connecting to Satellites...</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border shadow-xl shadow-blue-500/5 overflow-hidden flex flex-col h-full relative group">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[80px] pointer-events-none transition-all group-hover:bg-blue-500/20" />
      
      <CardHeader className="bg-muted/30 border-b pb-4 backdrop-blur-sm z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <CloudRain className="w-6 h-6 text-blue-500" />
              RainRisk <span className="font-light text-muted-foreground">AI</span>
            </CardTitle>
            <div className="flex items-center gap-2">
               <span className="text-sm font-medium text-muted-foreground">Analysis for</span>
               <select 
                 value={crop} 
                 onChange={(e) => setCrop(e.target.value)}
                 className="text-sm font-bold bg-transparent border-b border-blue-500/50 focus:outline-none focus:border-blue-500 cursor-pointer text-foreground appearance-none px-1"
               >
                 <option value="Rice" className="bg-background">Rice</option>
                 <option value="Groundnut" className="bg-background">Groundnut</option>
                 <option value="Cotton" className="bg-background">Cotton</option>
                 <option value="Maize" className="bg-background">Maize</option>
                 <option value="Wheat" className="bg-background">Wheat</option>
               </select>
               <span className="text-sm font-medium text-muted-foreground">in <strong className="text-foreground">{data.location}</strong></span>
            </div>
          </div>
          <Badge variant="outline" className="bg-background shadow-sm border-blue-200 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
            Live OpenWeather
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 flex flex-col z-10 relative">
        {/* Timeline Grid */}
        <div className="p-6 border-b bg-background/50 backdrop-blur-xl">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-2">
            7-Day Risk Trajectory <Info className="w-3 h-3" />
          </h4>
          
          <div className="flex justify-between gap-2 h-32 items-end">
            {data.forecast.map((day) => (
              <div key={day.day} className="flex flex-col items-center flex-1 group/bar relative h-full justify-end cursor-pointer">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-70 group-hover/bar:opacity-100 transition-opacity">
                  {day.date.substring(0, 3)}
                </div>
                <div className="text-[9px] font-bold text-blue-500/80 mb-2 whitespace-nowrap">
                  {day.displayDate}
                </div>
                
                {/* Glowing Bar */}
                <div 
                  className={`w-full max-w-[32px] rounded-md relative flex items-start justify-center pt-2 transition-all duration-500 group-hover/bar:shadow-lg group-hover/bar:-translate-y-1 overflow-hidden
                    ${day.riskLevel === 'High' ? 'shadow-[0_0_15px_rgba(239,68,68,0.5)] bg-red-500 border border-red-400' : 
                      day.riskLevel === 'Medium' ? 'bg-yellow-400 border border-yellow-300' : 
                      'bg-green-400 border border-green-300'}`}
                  style={{ height: `${Math.max(20, day.rain)}%` }} // minimum height for UI consistency
                >
                  {/* Subtle inner gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  
                  {day.riskLevel === 'High' && (
                    <AlertTriangle className="w-3 h-3 text-white absolute top-1.5 z-10" strokeWidth={3} />
                  )}
                  
                  {/* Glassmorphic Tooltip */}
                  <div className="hidden group-hover/bar:block absolute bottom-[calc(100%+16px)] z-50 bg-background/95 backdrop-blur-xl border border-border/50 text-foreground shadow-2xl p-3 rounded-xl w-36 left-1/2 -translate-x-1/2 pointer-events-none transform origin-bottom scale-95 group-hover/bar:scale-100 transition-transform">
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-background/95" />
                    <p className="font-bold text-xs uppercase tracking-wider mb-2 border-b border-border/50 pb-2">{day.date}</p>
                    <div className="space-y-1.5 text-xs font-medium">
                      <div className="flex justify-between items-center text-blue-600 dark:text-blue-400">
                        <span>Precipitation</span>
                        <span className="font-bold">{day.rain}%</span>
                      </div>
                      <div className="flex justify-between items-center text-orange-600 dark:text-orange-400">
                        <span>Temperature</span>
                        <span className="font-bold">{day.temp}°C</span>
                      </div>
                      {day.warning && (
                        <div className="mt-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 p-1.5 rounded text-[10px] uppercase font-bold text-center">
                          {day.warning}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 flex-1">
          <h4 className="text-[11px] font-bold tracking-[0.2em] mb-4 flex items-center gap-2 text-blue-800 dark:text-blue-300 uppercase">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[10px] animate-pulse shadow-sm shadow-blue-500/20">✨</span>
            Groq Llama-3 Action Plan
          </h4>
          <ul className="space-y-3">
            {data.actions.map((action, idx) => (
              <li key={idx} className="flex gap-3 text-sm group/item">
                <div className="mt-0.5 bg-blue-100 dark:bg-blue-900 rounded p-0.5 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover/item:text-white" />
                </div>
                <span className="text-foreground font-semibold leading-snug opacity-90">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
