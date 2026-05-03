"use client"

import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"
import { RainRiskCard } from "@/components/rain-risk-card"
import { CloudRain, Radio, Satellite } from "lucide-react"

export default function RainRiskPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-40 pt-14 border-r bg-background" />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-14 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center shrink-0">
                <CloudRain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">RainRisk Meteorological AI</h1>
                <p className="text-muted-foreground text-lg">Hyper-local 7-day weather risk trajectories tailored directly to your farm's coordinates.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <RainRiskCard />
              </div>
              
              <div className="space-y-6">
                <div className="relative overflow-hidden bg-white dark:bg-card border rounded-3xl p-8 shadow-xl shadow-blue-500/5 group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                  <div className="relative z-10">
                    <h3 className="font-black text-xl mb-4 flex items-center gap-3">
                      <Satellite className="w-6 h-6 text-blue-500" /> 
                      <span className="tracking-tight">Satellite Core <span className="text-muted-foreground font-light italic text-sm">V2.4</span></span>
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                      Agriva's neural network ingests real-time isobars and humidity gradients directly from orbital sensors to predict localized microclimatology.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 transition-all hover:scale-[1.02]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                          <h5 className="font-black text-[10px] uppercase tracking-widest text-red-600 dark:text-red-400">Extreme - Red Zone</h5>
                        </div>
                        <p className="text-xs font-semibold text-foreground/80 leading-relaxed pr-4">
                          Prob &gt; 60%. Cease all pesticide spraying. Accelerated root-rot risk detected.
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-2xl bg-yellow-50/50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/30 transition-all hover:scale-[1.02]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-400" />
                          <h5 className="font-black text-[10px] uppercase tracking-widest text-yellow-600 dark:text-yellow-400">Moderate - Yellow Zone</h5>
                        </div>
                        <p className="text-xs font-semibold text-foreground/80 leading-relaxed pr-4">
                          Prob &gt; 30%. Potential soil moisture saturation. Monitor leaf wilting indices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-500/20 group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-black text-xl flex items-center gap-3">
                        <Radio className="w-6 h-6 text-blue-200 animate-pulse" />
                        AI Feedback Loop
                      </h3>
                      <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full uppercase tracking-widest">Active</span>
                    </div>
                    <p className="text-indigo-50 text-sm leading-relaxed font-medium">
                      The Llama-3 brain correlated your "Maturation" stage with the specific 7-day humidity curves to generate the tips shown on the left.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                             AI
                          </div>
                        ))}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-tighter text-blue-200">Processing live telemetry...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
