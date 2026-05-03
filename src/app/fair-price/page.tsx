"use client"

import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"
import { FairPriceAIHero } from "@/components/fair-price-ai-hero"
import { IndianRupee, Info, TrendingUp } from "lucide-react"

export default function FairPricePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-40 pt-14 border-r bg-background" />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-14 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center shrink-0">
                <IndianRupee className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">FairPrice Market AI</h1>
                <p className="text-muted-foreground text-lg">Never sell at a loss again. Predict the optimal market window for your yield.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <FairPriceAIHero />
              </div>
              
              <div className="space-y-6">
                <div className="bg-card border rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" /> Intelligence Layer
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    The FairPrice AI synthesizes thousands of local Mandi price points, festival timelines, and buyer demand curves to predict exactly when market scarcity will peak.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-2 rounded-lg font-bold text-xs uppercase tracking-wider shrink-0">Live</div>
                      <p className="text-sm">Price trajectories automatically refresh every 5 minutes during active marketplace hours.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-2 rounded-lg font-bold text-xs uppercase tracking-wider shrink-0">Quant</div>
                      <p className="text-sm">Calculates the precise percentage of yield you should liquidate to balance risk and profit.</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-6">
                  <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2"><Info className="w-4 h-4" /> Why sell partially?</h3>
                  <p className="text-blue-800/80 dark:text-blue-300/80 text-sm leading-relaxed">
                    AI often recommends selling 80% instead of 100%. This strategy ensures that if the market unexpectedly skyrockets further, you still retain 20% to capitalize on the surge, known mathematically as hedging against volatility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
