"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from "recharts"
import { Bell, TrendingUp, Sparkles, Loader2 } from "lucide-react"

type ForecastDay = {
  day: string
  price: number
  risk: string
}

type Insight = {
  message: string
  recommendation: string
  maxPrice: number
  profitPercentage: string
}

type FairPriceData = {
  region: string
  crop: string
  insight: Insight
  forecast: ForecastDay[]
}

export function FairPriceAIHero() {
  const [data, setData] = React.useState<FairPriceData | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch('/api/fair-price?region=Anantapur+Mandi&crop=Groundnut')
        if (!res.ok) return
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) return
        const json = await res.json()
        setData(json)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPricing()
    const interval = setInterval(fetchPricing, 60000) // 60 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading || !data) {
    return (
      <Card className="border-2 border-orange-500/20 shadow-lg h-[500px] flex items-center justify-center">
         <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </Card>
    )
  }

  const { insight, forecast, region, crop } = data

  return (
    <Card className="border-2 border-orange-500/20 shadow-xl shadow-orange-500/5 bg-gradient-to-br from-card to-orange-50/5 dark:to-orange-950/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none" />
      
      <CardHeader className="pb-4 border-b border-border/50 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl lg:text-3xl font-black flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">FairPrice AI</span>
              <Badge className="text-[10px] uppercase tracking-wider bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-none px-2 py-0.5 ml-2 shadow-sm">
                Live Analysis
              </Badge>
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground font-medium">
              Market analysis for <strong className="text-foreground">{crop}</strong> in <strong className="text-foreground">{region}</strong>
            </CardDescription>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-bold transition-all hover:scale-105 shadow-md shadow-orange-500/20">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Set Price Alert</span>
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 relative z-10">
        <div className="mb-8 relative rounded-2xl border-2 border-orange-500/50 bg-orange-50/80 dark:bg-orange-950/40 p-1 backdrop-blur-md overflow-hidden group">
          {/* Animated glow effect behind the insight box */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-orange-300/30 dark:via-orange-600/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
          
          <div className="bg-background/80 dark:bg-background/40 backdrop-blur-xl p-5 md:p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 justify-between border border-orange-200/50 dark:border-orange-800/50 shadow-inner">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold text-sm tracking-wide uppercase">
                <Sparkles className="w-4 h-4" /> AI Special Insight
              </div>
              <p className="text-base md:text-lg text-foreground font-semibold leading-snug">
                {insight.recommendation}
              </p>
              <p className="text-sm text-muted-foreground">
                {insight.message}
              </p>
            </div>
            
            <div className="flex flex-row md:flex-col items-center justify-center md:items-end gap-3 md:gap-1 text-right shrink-0 bg-white dark:bg-green-950/30 p-4 rounded-xl border border-green-100 dark:border-green-900/50 shadow-sm">
              <div className="flex items-center gap-2 text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 tracking-tighter">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />
                {insight.profitPercentage}
              </div>
              <p className="text-xs md:text-sm font-bold text-green-800/80 dark:text-green-300/80 uppercase tracking-wider">
                Expected Profit Jump
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground">
              7-Day Market Trajectory (INR/Quintal)
            </h4>
          </div>
          
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.15} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))", fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  domain={['dataMin - 50', 'dataMax + 50']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))", fontWeight: 600 }}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(249,115,22,0.2)', backgroundColor: 'hsl(var(--background))', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 700, color: '#f97316' }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`₹${value}`, 'Expected Price']}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))', fontWeight: 600, paddingBottom: '4px' }}
                />
                
                {/* Highlight optimal window using ReferenceArea (Day 3 to Day 5) */}
                <ReferenceArea x1="Day 3" x2="Day 5" fill="#22c55e" fillOpacity={0.08} />
                
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#f97316"
                  strokeWidth={4}
                  dot={{ r: 5, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: "#f97316" }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none ${className}`}>
      {children}
    </span>
  )
}
