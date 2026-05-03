"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Sprout, Search, IndianRupee, ShieldCheck, Loader2 } from "lucide-react"

type Recommendation = {
  crop: string
  risk: string
  profit: string
  scheme: string
  description?: string
  timeline?: string
}

export function CropIQ() {
  const [location, setLocation] = React.useState("")
  const [soil, setSoil] = React.useState("red-loam")
  const [season, setSeason] = React.useState("kharif")
  
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState<Recommendation[] | null>(null)

  const handleSearch = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/crop-iq', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: location || "India", soil, season })
      })
      const data = await res.json()
      setResults(data.recommendations || null)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border shadow-lg shadow-green-500/5 flex flex-col h-full bg-gradient-to-b from-card to-green-50/5 dark:to-green-950/20 relative overflow-hidden">
      {/* Decorative background flare */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <CardHeader className="bg-muted/30 border-b pb-4 backdrop-blur-md">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Sprout className="w-6 h-6 text-green-600" />
              CropIQ <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Engine</span>
            </CardTitle>
            <CardDescription className="text-sm font-medium">
              Groq LPU-powered crop decision engine for maximum yield.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 flex-1 space-y-6 relative z-10 w-full">
        <div className="grid gap-4 bg-background/50 backdrop-blur-xl p-5 rounded-xl border shadow-inner">
          <div className="space-y-2">
            <Label htmlFor="location" className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Farm Location</Label>
            <Input id="location" placeholder="e.g. Krishnagiri, Tamil Nadu" value={location} onChange={e => setLocation(e.target.value)} className="bg-background" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="soil" className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Soil Type</Label>
              <Select value={soil} onValueChange={(val) => val && setSoil(val)}>
                <SelectTrigger id="soil" className="bg-background">
                  <SelectValue placeholder="Soil Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="red-loam">Red Loam</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="black">Black Soil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="season" className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Season</Label>
              <Select value={season} onValueChange={(val) => val && setSeason(val)}>
                <SelectTrigger id="season" className="bg-background">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                  <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                  <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button disabled={loading} onClick={handleSearch} className="w-full mt-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md font-bold text-base h-12 transition-transform hover:scale-[1.02]">
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing conditions...</> : <><Search className="w-5 h-5 mr-2" /> Find Best Crops</>}
          </Button>
        </div>

        {results && !loading && (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center justify-between text-muted-foreground">
              AI Recommendations
            </h4>
            
            {results.map((item, idx) => (
              <div key={idx} className={`bg-card/80 backdrop-blur-md border rounded-xl p-5 flex gap-4 transition-all hover:scale-[1.01] hover:shadow-lg cursor-pointer group ${item.risk.toLowerCase().includes('low') ? 'hover:border-green-400' : 'hover:border-yellow-400'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${item.risk.toLowerCase().includes('low') ? 'bg-green-100 dark:bg-green-900/50 text-green-600' : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600'}`}>
                  <Sprout className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center justify-between">
                    <h5 className="text-lg font-bold text-foreground">{item.crop}</h5>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${item.risk.toLowerCase().includes('low') ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>
                      {item.risk}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-sm text-foreground/80 mt-1 leading-snug">{item.description}</p>
                  )}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm">
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <IndianRupee className="w-4 h-4 text-muted-foreground" />
                      {item.profit}<span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">/acre</span>
                    </div>
                    {item.scheme && (
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4" /> {item.scheme}
                      </div>
                    )}
                    {item.timeline && (
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                        ⏳ {item.timeline}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
