"use client"

import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Sprout, IndianRupee, CloudRain, ShieldCheck, MapPin, TrendingUp, ThermometerSun, Leaf, Loader2 } from "lucide-react"

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
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-background">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-40 pt-14 border-r bg-background" />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-14 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Main Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Center</span></h1>
                <p className="text-muted-foreground text-lg mt-1">Hello, Farmer. Your hyper-local agricultural intelligence snapshot.</p>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-card px-4 py-2 rounded-full border shadow-sm text-sm font-semibold transition-all">
                {locating ? <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" /> : <MapPin className="w-4 h-4 text-rose-500" />}
                {liveLocation} <span className="text-[10px] uppercase bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-1.5 py-0.5 rounded ml-1">Live</span>
              </div>
            </div>

            {/* Quick Summary Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-5 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <IndianRupee className="w-6 h-6 mb-3 opacity-80" />
                <h4 className="font-bold text-lg mb-1">Mandi Average</h4>
                <p className="text-2xl font-black">₹4,300<span className="text-sm font-medium opacity-80">/q</span></p>
                <div className="mt-3 text-xs bg-black/10 inline-block px-2 py-1 rounded-md font-semibold flex items-center gap-1 w-max">
                  <TrendingUp className="w-3 h-3" /> +15% expected
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <ThermometerSun className="w-6 h-6 mb-3 opacity-80" />
                <h4 className="font-bold text-lg mb-1">Risk Level</h4>
                <p className="text-2xl font-black">Medium</p>
                <div className="mt-3 text-xs bg-black/10 inline-block px-2 py-1 rounded-md font-semibold w-max flex items-center gap-1">
                  <CloudRain className="w-3 h-3" /> Heavy rain on Thurs
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <Leaf className="w-6 h-6 mb-3 opacity-80" />
                <h4 className="font-bold text-lg mb-1">Soil N-P-K</h4>
                <p className="text-2xl font-black">Deficient (N)</p>
                <div className="mt-3 text-xs bg-black/10 inline-block px-2 py-1 rounded-md font-semibold w-max">
                  Requires +50kg Urea/Acre
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-lg shadow-slate-900/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <ShieldCheck className="w-6 h-6 mb-3 opacity-80" />
                <h4 className="font-bold text-lg mb-1">Active Schemes</h4>
                <p className="text-2xl font-black">2 Eligible</p>
                <div className="mt-3 text-xs bg-white/10 text-emerald-300 inline-block px-2 py-1 rounded-md font-semibold w-max">
                  PMFBY + Seed Subsidy
                </div>
              </div>
            </div>
            
            {/* Modular Access Grid */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Deep Dive AI Tools</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/fair-price" className="group relative flex flex-col items-center justify-center rounded-3xl border bg-white dark:bg-card p-6 shadow-sm transition-all hover:bg-orange-50/50 hover:border-orange-300 hover:shadow-orange-500/10 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center mb-4 text-orange-600 transition-transform group-hover:scale-110">
                    <IndianRupee className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">Predict Market Price</h4>
                  <p className="text-sm text-muted-foreground text-center mt-2 px-4">Utilize Live Mandi AI to find the perfect day to sell your crops for maximum profit.</p>
                </Link>

                <Link href="/crop-iq" className="group relative flex flex-col items-center justify-center rounded-3xl border bg-white dark:bg-card p-6 shadow-sm transition-all hover:bg-emerald-50/50 hover:border-emerald-300 hover:shadow-emerald-500/10 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center mb-4 text-emerald-600 transition-transform group-hover:scale-110">
                    <Sprout className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">CropIQ Engine</h4>
                  <p className="text-sm text-muted-foreground text-center mt-2 px-4">Generate custom crop combinations tailored instantly to your unique soil type and region.</p>
                </Link>

                <Link href="/rain-risk" className="group relative flex flex-col items-center justify-center rounded-3xl border bg-white dark:bg-card p-6 shadow-sm transition-all hover:bg-blue-50/50 hover:border-blue-300 hover:shadow-blue-500/10 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center mb-4 text-blue-600 transition-transform group-hover:scale-110">
                    <CloudRain className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">Check Weather Risk</h4>
                  <p className="text-sm text-muted-foreground text-center mt-2 px-4">Track moving storm fronts securely guided by Groq-injected automated weather instructions.</p>
                </Link>

                <Link href="/soil-health" className="group relative flex flex-col items-center justify-center rounded-3xl border bg-white dark:bg-card p-6 shadow-sm transition-all hover:bg-purple-50/50 hover:border-purple-300 hover:shadow-purple-500/10 hover:-translate-y-1 lg:col-span-3">
                  <div className="flex flex-col md:flex-row items-center gap-6 text-left">
                    <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center shrink-0 text-purple-600 transition-transform group-hover:scale-110">
                      <Leaf className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-xl font-bold text-foreground">Soil Health & AI Planner</h4>
                        <span className="bg-purple-600 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full">New Update</span>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-2xl">Use your farm's Nitrogen, Phosphorus, and Potassium baseline readings to generate the exact required bags of Urea/DAP automatically calculated to the decimal by our AI.</p>
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
