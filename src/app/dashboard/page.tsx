"use client"

import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Sprout, IndianRupee, CloudRain, ShieldCheck, MapPin, TrendingUp, ThermometerSun, Leaf, Loader2, ArrowUpRight, Zap, Target, History } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function DashboardOverview() {
  const [liveLocation, setLiveLocation] = useState("Detecting location...")
  const [locating, setLocating] = useState(true)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const res = await fetch(`/api/location?lat=${latitude}&lon=${longitude}`)
            const data = await res.json()
            setLiveLocation(data.location)
          } catch (e) {
            setLiveLocation("Location Unavailable")
          } finally {
            setLocating(false)
          }
        },
        () => {
          setLiveLocation("Anantapur, Andhra Pradesh (Default)")
          setLocating(false)
        }
      )
    } else {
      setLiveLocation("Anantapur, Andhra Pradesh (Default)")
      setLocating(false)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-green-500/30 font-sans">
      <TopNav />
      <div className="flex flex-1 relative">
        {/* Background Overlay for realism */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <Image 
            src="/hero-farmland-highres.png" 
            alt="Farmland background" 
            fill 
            className="object-cover blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        </div>

        <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-40 pt-14 border-r border-white/5 bg-slate-950/50 backdrop-blur-xl" />
        
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-10 mt-14 overflow-y-auto z-10 relative">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Header section with live feed */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col xl:flex-row xl:items-center justify-between gap-6"
            >
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                  <Zap className="w-3 h-3 fill-current" /> Agriva Enterprise Cloud
                </div>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tighter">
                  Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Dashboard</span>
                </h1>
                <p className="text-slate-400 text-lg font-medium">Real-time agricultural decision intelligence for your farm.</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-xl shadow-2xl">
                    {locating ? <Loader2 className="w-4 h-4 text-green-400 animate-spin" /> : <MapPin className="w-4 h-4 text-rose-500" />}
                    <span className="text-sm font-black tracking-tight">{liveLocation}</span>
                    <span className="animate-pulse w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 mr-2">Telemetry Synchronized</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Mandi Average", value: "₹4,300/q", sub: "+15% expected", icon: IndianRupee, color: "from-orange-500 to-amber-600", shadow: "shadow-orange-500/20" },
                { label: "Risk Trajectory", value: "Medium", sub: "Rain expected Thursday", icon: CloudRain, color: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/20" },
                { label: "Soil Nutrient", value: "Deficient (N)", sub: "+50kg Urea Required", icon: Leaf, color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/20" },
                { label: "Compliance", value: "2 Active", sub: "PMFBY + Seed Subsidy", icon: ShieldCheck, color: "from-slate-700 to-slate-900", shadow: "shadow-slate-900/40" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-br ${stat.color} rounded-[2rem] p-6 text-white ${stat.shadow} shadow-2xl relative overflow-hidden group border border-white/10`}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <stat.icon className="w-8 h-8 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <h4 className="font-black text-xs uppercase tracking-[0.2em] opacity-80 mb-1">{stat.label}</h4>
                  <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-black bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full w-max uppercase tracking-widest leading-none">
                    {stat.sub}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Main Action Hub */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3">
                  <Target className="w-4 h-4" /> Neural Intelligence Modules
                </h3>
                <div className="h-px bg-white/5 flex-1 ml-6" />
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/fair-price" className="group relative flex flex-col p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-2xl transition-all hover:bg-orange-500/[0.03] hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform shadow-inner border border-orange-500/20">
                    <IndianRupee className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black tracking-tight mb-2 flex items-center gap-2">
                    Mandi Pulse <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Predict market price trajectories with 94% accuracy using our multi-model mandi data injection.</p>
                  <div className="mt-6 flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">High Volatility</span>
                  </div>
                </Link>

                <Link href="/crop-iq" className="group relative flex flex-col p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-2xl transition-all hover:bg-emerald-500/[0.03] hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform shadow-inner border border-emerald-500/20">
                    <Sprout className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black tracking-tight mb-2 flex items-center gap-2">
                    CropIQ Engine <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Situational crop decision engine factoring in soil pH, historical yield, and seasonal moisture levels.</p>
                  <div className="mt-6 flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Decision Logic Active</span>
                  </div>
                </Link>

                <Link href="/rain-risk" className="group relative flex flex-col p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-2xl transition-all hover:bg-blue-500/[0.03] hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform shadow-inner border border-blue-500/20">
                    <CloudRain className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black tracking-tight mb-2 flex items-center gap-2">
                    RainRisk Scan <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Hyper-local storm tracking with AI-generated harvest alerts tailored to your specific crop type.</p>
                  <div className="mt-6 flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Live Sat Telemetry</span>
                  </div>
                </Link>

                <Link href="/soil-health" className="lg:col-span-3 group relative flex flex-col md:flex-row items-center p-8 rounded-[3rem] border border-white/10 bg-gradient-to-br from-slate-900/40 to-purple-900/10 backdrop-blur-3xl transition-all hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10">
                   <div className="w-20 h-20 rounded-3xl bg-purple-500/10 flex items-center justify-center shrink-0 text-purple-500 group-hover:rotate-6 transition-transform shadow-inner border border-purple-500/20 mb-6 md:mb-0 md:mr-8">
                    <Zap className="w-10 h-10 fill-current" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-black tracking-tighter text-white">Precision Fertilizer Planner</h4>
                      <span className="animate-bounce bg-purple-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">New Algorithm</span>
                    </div>
                    <p className="text-slate-400 text-base leading-relaxed font-medium">The industry's first N-P-K situational fertilizer calculator. Get precise kilogram measurements of Urea and DAP requirements verified by our Llama-3 Soil Expert.</p>
                    <div className="flex items-center gap-6 pt-2">
                       <div className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                         <History className="w-3 h-3" /> Last Scan: 2 mins ago
                       </div>
                       <div className="flex items-center gap-2 text-[11px] font-black text-emerald-500 uppercase tracking-widest">
                         <ShieldCheck className="w-3 h-3" /> NIST Compliant
                       </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
