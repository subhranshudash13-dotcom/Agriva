"use client"

import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"
import { CropIQ } from "@/components/crop-iq"
import { Sprout, Target, ArrowUpRight } from "lucide-react"

export default function CropIQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-40 pt-14 border-r bg-background" />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 mt-14 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center shrink-0">
                <Sprout className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">CropIQ Decision Engine</h1>
                <p className="text-muted-foreground text-lg">Maximize your farm's profitability using AI-driven spatial data and advanced crop mapping.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CropIQ />
              </div>
              
              {/* Descriptive Add-on / Guide */}
              <div className="space-y-6">
                <div className="bg-card border rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" /> How It Works
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    CropIQ utilizes the blazing-fast Groq LPU processing engine to analyze hundreds of localized crop data sets against your soil profile in milliseconds.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="bg-muted p-1 rounded mt-0.5"><ArrowUpRight className="w-3 h-3" /></div>
                      <span>Selects crops with minimum water dependency relative to your region.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="bg-muted p-1 rounded mt-0.5"><ArrowUpRight className="w-3 h-3" /></div>
                      <span>Calculates expected profit per acre using historical Mandi trends.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="bg-muted p-1 rounded mt-0.5"><ArrowUpRight className="w-3 h-3" /></div>
                      <span>Matches crops automatically to applicable government subsidies (e.g. PMFBY).</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50/50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-2xl p-6">
                  <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">Pro Tip</h3>
                  <p className="text-green-800/80 dark:text-green-300/80 text-sm leading-relaxed">
                    If your region is expecting heavy rainfall in the upcoming week, consider waiting 7-10 days before planting seeds to avoid waterlogging your new crop.
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
