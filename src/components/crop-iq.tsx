"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Sprout, Search, IndianRupee, ShieldCheck, Loader2, ExternalLink, MapPin, AlertCircle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Recommendation = {
  crop: string
  risk: string
  profit: string
  scheme: string
  schemeLink: string
  description?: string
  timeline?: string
}

export function CropIQ() {
  const [location, setLocation] = React.useState("")
  const [soil, setSoil] = React.useState("red-loam")
  const [season, setSeason] = React.useState("kharif")
  
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [results, setResults] = React.useState<Recommendation[] | null>(null)

  const handleSearch = async () => {
    // Validation: Strict Location Enforcement
    if (!location || location.trim().length < 3) {
      setError("Please specify a location (District/Town) for accurate analysis.")
      return
    }
    
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/crop-iq', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, soil, season })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.message || data.error || "Failed to analyze conditions")
        setResults(null)
      } else {
        setResults(data.recommendations || null)
      }
    } catch (e) {
      console.error(e)
      setError("Communication error with Groq Engine. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-2xl shadow-green-500/5 flex flex-col h-full bg-slate-950/40 backdrop-blur-3xl relative overflow-hidden text-slate-100 border border-white/5 rounded-[2.5rem]">
      {/* Decorative background flare */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <CardHeader className="bg-white/[0.03] border-b border-white/5 pb-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-3 text-3xl font-black tracking-tighter">
              <Sprout className="w-8 h-8 text-green-500" />
              CropIQ <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Precision</span>
            </CardTitle>
            <CardDescription className="text-slate-400 font-medium">
              Enterprise-grade situational decision intelligence for maximum yield.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 lg:p-8 flex-1 space-y-8 relative z-10 w-full overflow-y-auto">
        <div className="grid gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-inner">
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <Label htmlFor="location" className="font-black text-slate-500 uppercase tracking-widest text-[10px] flex items-center gap-2">
                <MapPin className="w-3 h-3 text-rose-500" /> Farm Location Required
              </Label>
              {error && <span className="text-[10px] font-bold text-rose-400 animate-pulse">{error}</span>}
            </div>
            <Input 
              id="location" 
              placeholder="e.g. Ludhiana, Punjab or Guntur, AP" 
              value={location} 
              onChange={e => {
                setLocation(e.target.value)
                if (error) setError(null)
              }} 
              className={`h-14 bg-slate-950/50 border-none shadow-inner font-bold text-base px-5 rounded-2xl focus-visible:ring-green-500 transition-all ${error ? 'ring-1 ring-rose-500/50' : ''}`} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="soil" className="font-black text-slate-500 uppercase tracking-widest text-[10px] px-1">Soil Typology</Label>
              <Select value={soil} onValueChange={(val) => val && setSoil(val)}>
                <SelectTrigger id="soil" className="h-12 bg-slate-950/50 border-none shadow-inner rounded-xl font-bold flex gap-2">
                  <SelectValue placeholder="Soil Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="red-loam">Red Loam</SelectItem>
                  <SelectItem value="clay">Clay Soil</SelectItem>
                  <SelectItem value="sandy">Sandy Loam</SelectItem>
                  <SelectItem value="black">Black Regur Soil</SelectItem>
                  <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="season" className="font-black text-slate-500 uppercase tracking-widest text-[10px] px-1">Sowing Season</Label>
              <Select value={season} onValueChange={(val) => val && setSeason(val)}>
                <SelectTrigger id="season" className="h-12 bg-slate-950/50 border-none shadow-inner rounded-xl font-bold">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                  <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                  <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            disabled={loading} 
            onClick={handleSearch} 
            className="w-full mt-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white shadow-xl shadow-green-500/10 font-black text-lg h-14 rounded-2xl transition-all active:scale-95 group overflow-hidden"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Synchronizing Decision Tree...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Find Optimal Crops</span>
              </div>
            )}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {results && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 pt-2"
            >
              <div className="flex items-center gap-3">
                 <div className="h-px bg-white/5 flex-1" />
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Neural Recommendations</h4>
                 <div className="h-px bg-white/5 flex-1" />
              </div>
              
              <div className="grid grid-cols-1 gap-5">
                {results.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-white/[0.03] border border-white/5 rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 transition-all hover:bg-white/[0.05] hover:border-green-500/30 group relative overflow-hidden`}
                  >
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-inner ${item.risk.toLowerCase().includes('low') ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                      <Sprout className="w-10 h-10 group-hover:rotate-12 transition-transform" />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h5 className="text-2xl font-black text-white tracking-tight">{item.crop}</h5>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${item.risk.toLowerCase().includes('low') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                              {item.risk}
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 ml-2">
                               <MapPin className="w-3 h-3" /> Situational Analysis Active
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <div className="flex items-center gap-1.5 font-black text-2xl text-green-400 tracking-tighter">
                            <IndianRupee className="w-5 h-5 text-green-500/50" />
                            {item.profit}
                          </div>
                          <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Est. Profit / Acre</span>
                        </div>
                      </div>

                      {item.description && (
                        <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                           <p className="text-sm text-slate-300 leading-relaxed font-medium">
                             <span className="text-green-500 font-black mr-2 tracking-widest uppercase text-[10px]">Context:</span>
                             {item.description}
                           </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-4 text-sm w-full sm:w-auto">
                          <div className="flex items-center gap-2 text-slate-400 font-bold bg-white/5 px-3 py-2 rounded-xl">
                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                            <span>{item.scheme}</span>
                          </div>
                          <div className="text-slate-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                            ⏳ {item.timeline}
                          </div>
                        </div>
                        
                        <a 
                          href={item.schemeLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-slate-950 font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-95 group/btn"
                        >
                          Apply Online <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {!results && !loading && !error && (
            <div className="h-[400px] flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50">
               <Info className="w-12 h-12 stroke-[1.5]" />
               <p className="text-sm font-black uppercase tracking-[0.2em] max-w-[200px] text-center">Awaiting Regional Parameters</p>
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
