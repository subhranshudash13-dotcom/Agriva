"use client"

import * as React from "react"
import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Sprout, Loader2, ArrowRight, GaugeCircle, Beaker, Zap, ShieldCheck } from "lucide-react"

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent': return 'text-emerald-500 from-emerald-500/20'
      case 'good': return 'text-green-500 from-green-500/20'
      case 'fair': return 'text-amber-500 from-amber-500/20'
      case 'poor': return 'text-red-500 from-red-500/20'
      default: return 'text-blue-500 from-blue-500/20'
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-emerald-500/30">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-40 pt-14 border-r bg-background" />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-10 mt-14 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-200 dark:border-emerald-800">
                  <Zap className="w-3 h-3 fill-current" /> Precision Agriculture
                </div>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tightest">
                  Soil Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">& Fertilizer AI</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl font-medium">Get immediate, situational fertilizer schedules based on real-time soil nutrient analysis.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Input Form */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="border-2 border-emerald-500/10 shadow-2xl shadow-emerald-500/5 bg-background/50 backdrop-blur-xl relative overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center gap-2"><Beaker className="text-emerald-500 w-5 h-5" /> Nutrient Entry</CardTitle>
                    <CardDescription className="font-medium">Define your soil's current profile for analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Target Crop Selection</Label>
                      <Input 
                        value={cropType} 
                        onChange={e => setCropType(e.target.value)} 
                        placeholder="e.g. Rice, Wheat, Cotton" 
                        className="h-12 bg-muted/30 border-none shadow-inner font-bold text-base px-4 rounded-xl focus-visible:ring-emerald-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-5">
                      {[
                        { label: "Nitrogen (N)", value: nitrogen, setter: setNitrogen, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                        { label: "Phosphorus (P)", value: phosphorus, setter: setPhosphorus, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                        { label: "Potassium (K)", value: potassium, setter: setPotassium, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" }
                      ].map((n) => (
                        <div key={n.label} className={`p-4 rounded-2xl ${n.bg} border border-transparent hover:border-current/20 transition-all group`}>
                          <div className="flex justify-between items-center mb-2">
                            <Label className={`text-xs font-black uppercase tracking-wider ${n.color} group-hover:scale-105 transition-transform`}>{n.label}</Label>
                            <span className={`text-xs font-bold ${n.color} opacity-60`}>Units: 1-100</span>
                          </div>
                          <Input 
                            type="number" 
                            min="0"
                            max="100"
                            value={n.value} 
                            onChange={e => n.setter(e.target.value)} 
                            className="bg-background border-none shadow-sm font-black text-xl h-12 rounded-xl focus-visible:ring-emerald-500"
                          />
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={handleAnalyze} 
                      disabled={loading} 
                      className="w-full h-14 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 group overflow-hidden"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Processing Nutrient Map...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Sprout className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                          <span>Execute AI Scan</span>
                          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
                
                <div className="p-4 rounded-xl border border-dashed text-center space-y-2">
                   <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Data Processing
                   </p>
                   <p className="text-[10px] text-muted-foreground/60 leading-relaxed font-medium">Your data is processed locally first and then analyzed by Groq Llama-3 for high-precision agricultural forecasting.</p>
                </div>
              </div>

              {/* Output Visualization */}
              <div className="lg:col-span-7 h-full">
                {data ? (
                  <Card className="border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 bg-gradient-to-br from-card to-emerald-50/10 dark:to-emerald-950/20 relative overflow-hidden h-full group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -z-10 group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
                    
                    <CardHeader className="border-b bg-muted/20 backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-2xl font-black">{cropType} Soil Profile</CardTitle>
                          <CardDescription className="font-bold flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                             Verified Analysis Score
                          </CardDescription>
                        </div>
                        <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-black px-3 py-1 rounded text-xs">
                          LIVE / v2.4
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 space-y-10">
                      <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="relative w-40 h-40 group/score">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              fill="transparent"
                              stroke="currentColor"
                              strokeWidth="12"
                              className="text-muted/10"
                            />
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              fill="transparent"
                              stroke="currentColor"
                              strokeWidth="12"
                              strokeDasharray={440}
                              strokeDashoffset={440 - (440 * data.healthScore) / 100}
                              strokeLinecap="round"
                              className={`${getStatusColor(data.status).split(' ')[0]} transition-all duration-1000 ease-out drop-shadow-xl`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black tracking-tighter drop-shadow-sm">{data.healthScore}</span>
                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Score</span>
                          </div>
                        </div>

                        <div className="flex-1 space-y-2 text-center md:text-left">
                          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-70">Current Soil Category</h3>
                          <div className={`text-5xl font-black tracking-tightest uppercase ${getStatusColor(data.status).split(' ')[0]}`}>
                            {data.status}
                          </div>
                          <p className="text-muted-foreground font-medium text-base">Your soil shows {data.healthScore >= 70 ? 'favorable' : 'moderate'} conditions for {cropType}.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="flex items-center gap-3">
                           <div className="h-px bg-muted flex-1" />
                           <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">AI Fertilizer Schedule</h4>
                           <div className="h-px bg-muted flex-1" />
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {data.recommendations.map((rec, i) => (
                            <div 
                              key={i} 
                              style={{ animationDelay: `${i * 150}ms` }}
                              className="flex gap-4 bg-white dark:bg-background shadow-sm p-4 rounded-2xl border border-border group/rec hover:border-emerald-500/50 hover:shadow-lg transition-all animate-in fade-in slide-in-from-right-4"
                            >
                              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center shrink-0 group-hover/rec:bg-emerald-500 group-hover/rec:text-white transition-colors">
                                <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover/rec:text-white" />
                              </div>
                              <span className="text-base font-bold text-foreground leading-snug self-center">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-full border-4 border-dashed rounded-[2rem] flex flex-col items-center justify-center text-muted-foreground p-12 text-center bg-muted/5 group">
                    <div className="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <GaugeCircle className="w-10 h-10 opacity-20" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Awaiting Soil Analysis</h3>
                    <p className="text-sm font-medium max-w-[280px] opacity-70">Fill in the nutrient metrics and hit scan to generate your high-entropy AI fertilizing plan.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
