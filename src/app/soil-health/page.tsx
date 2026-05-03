"use client"

import * as React from "react"
import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Sprout, Loader2, ArrowRight, GaugeCircle } from "lucide-react"

type SoilHealthData = {
  healthScore: number
  status: string
  recommendations: string[]
}

export default function SoilHealthPage() {
  const [nitrogen, setNitrogen] = React.useState("50")
  const [phosphorus, setPhosphorus] = React.useState("30")
  const [potassium, setPotassium] = React.useState("40")
  const [cropType, setCropType] = React.useState("Rice")
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<SoilHealthData | null>(null)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/soil', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nitrogen, phosphorus, potassium, cropType })
      })
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-40 pt-14 border-r bg-background" />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-14 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight mb-2">Soil Health & Fertilizer AI</h1>
              <p className="text-muted-foreground text-lg">Input your soil nutrient levels to instantly generate a Groq-powered custom fertilizer schedule.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card className="border-emerald-500/20 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2"><GaugeCircle className="text-emerald-500" /> Nutrient Metrics</CardTitle>
                  <CardDescription>Enter values in generic units (1-100) or mg/kg</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Target Crop</Label>
                    <Input value={cropType} onChange={e => setCropType(e.target.value)} placeholder="e.g. Groundnut, Wheat, Rice" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-blue-600 font-bold">Nitrogen (N)</Label>
                      <Input type="number" value={nitrogen} onChange={e => setNitrogen(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-orange-600 font-bold">Phosphorus (P)</Label>
                      <Input type="number" value={phosphorus} onChange={e => setPhosphorus(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-purple-600 font-bold">Potassium (K)</Label>
                      <Input type="number" value={potassium} onChange={e => setPotassium(e.target.value)} />
                    </div>
                  </div>
                  <Button onClick={handleAnalyze} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 mt-4">
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Sprout className="mr-2" />}
                    Analyze Health
                  </Button>
                </CardContent>
              </Card>

              {/* Output Visualization */}
              {data ? (
                <Card className="border-emerald-500 shadow-xl shadow-emerald-500/10 bg-gradient-to-br from-card to-emerald-50/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px]" />
                  <CardContent className="p-6 flex flex-col justify-center h-full space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full border-8 border-emerald-100 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-b-8 border-emerald-500" style={{ transform: `rotate(${data.healthScore * 3.6}deg)` }} />
                        <span className="text-3xl font-black text-emerald-600">{data.healthScore}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Soil Status</h3>
                        <p className={`text-3xl font-black ${data.status === 'Excellent' || data.status === 'Good' ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {data.status}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Groq Fertilizer Schedule</h4>
                      {data.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-3 bg-white dark:bg-emerald-950/30 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/50 items-start">
                          <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm font-semibold">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground p-6 text-center">
                  Fill in the metrics and hit analyze to generate your custom AI fertilizer schedule.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
