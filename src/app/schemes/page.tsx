"use client"

import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"
import { GovernmentSchemes } from "@/components/government-schemes"
import { motion } from "framer-motion"
import Image from "next/image"

export default function SchemesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 font-sans border-b-none">
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

        <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 pt-14 border-r border-white/5 bg-slate-950/50 backdrop-blur-xl" />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-10 overflow-y-auto relative z-10 mt-14">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-10 max-w-6xl mx-auto"
          >
            <div className="space-y-2 text-left">
               <h1 className="text-4xl lg:text-5xl font-black tracking-tighter">Agri-Policy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Hub</span></h1>
               <p className="text-slate-400 text-lg font-medium max-w-2xl">Access all federal subsidies, insurance projects, and income support schemes in one secure terminal.</p>
            </div>
            
            <GovernmentSchemes />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
