"use client"

import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Building, FileText, ArrowRight, ExternalLink, Zap, Landmark, Leaf, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const SCHEMES = [
  {
    id: "pm-kisan",
    title: "PM-KISAN Samman Nidhi",
    short: "PM",
    description: "Annual income support of ₹6,000 for all landholding farmer families in India.",
    eligibility: ["Must hold cultivable land", "Bank account must be Aadhaar seeded", "Non-institutional land holders only"],
    docs: "Aadhaar, Land Papers, Bank Passbook",
    benefit: "₹6,000 / year",
    link: "https://pmkisan.gov.in/",
    color: "text-orange-500 bg-orange-500/10",
    icon: Landmark
  },
  {
    id: "pmfby",
    title: "PM Fasal Bima Yojana",
    short: "BY",
    description: "Comprehensive crop insurance against natural calamities, pests, and diseases.",
    eligibility: ["All farmers including sharecroppers", "Applicable for notified crops in notified areas"],
    docs: "Land Records, Sowing Certificate, ID Proof",
    benefit: "Crop Insurance",
    link: "https://pmfby.gov.in/",
    color: "text-blue-500 bg-blue-500/10",
    icon: ShieldCheck
  },
  {
    id: "kcc",
    title: "Kisan Credit Card (KCC)",
    short: "KC",
    description: "Timely credit support to farmers for their cultivation and other needs.",
    eligibility: ["Individual/Joint borrowers", "Owners as well as tenant farmers", "Self Help Groups"],
    docs: "Identity proof, Address proof, Land documents",
    benefit: "Low Interest Credit",
    link: "https://www.myscheme.gov.in/schemes/kcc",
    color: "text-emerald-500 bg-emerald-500/10",
    icon: TrendingUp
  },
  {
    id: "enam",
    title: "National Agriculture Market (e-NAM)",
    short: "NM",
    description: "Pan-India electronic trading portal networking the existing APMC mandis.",
    eligibility: ["Farmers", "Traders", "FPOs (Farmer Producer Organizations)"],
    docs: "Mobile number, Bank details, Identity proof",
    benefit: "Direct Market Access",
    link: "https://enam.gov.in/",
    color: "text-purple-500 bg-purple-500/10",
    icon: Zap
  },
  {
    id: "shc",
    title: "Soil Health Card Scheme",
    short: "SC",
    description: "Soil analysis to provide recommendations on dosage of nutrients and fertilizers.",
    eligibility: ["All farmers across the country are eligible"],
    docs: "Aadhaar Card, Land Details",
    benefit: "Yield Optimization",
    link: "https://soilhealth.dac.gov.in/",
    color: "text-amber-500 bg-amber-500/10",
    icon: Leaf
  },
  {
    id: "pmkmy",
    title: "PM Kisan Maan-Dhan Yojana",
    short: "MY",
    description: "A voluntary and contributory pension scheme for small and marginal farmers.",
    eligibility: ["Farmers between 18 to 40 years of age", "Cultivable land up to 2 hectares"],
    docs: "Aadhaar, Saving Bank Account, VLE Registration",
    benefit: "₹3,000 / month pension",
    link: "https://maandhan.in/",
    color: "text-rose-500 bg-rose-500/10",
    icon: Building
  }
]

export function GovernmentSchemes() {
  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
            <ShieldCheck className="w-3 h-3 fill-current" /> Verified Portals
          </div>
          <h2 className="text-3xl font-black tracking-tighter">Government <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Portals & Subsidies</span></h2>
          <p className="text-slate-400 font-medium max-w-xl">Connected directly to the Ministry of Agriculture & Farmers Welfare online application gateways.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live API Link: v2.0
        </div>
      </div>

      <Accordion className="w-full space-y-4">
        {SCHEMES.map((scheme, i) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <AccordionItem value={scheme.id} className="border-none bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] px-6 overflow-hidden hover:bg-slate-900/60 transition-all group shadow-lg">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex flex-1 items-center justify-between pr-4">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl ${scheme.color} flex items-center justify-center border border-white/5 shadow-inner transition-transform group-hover:scale-110`}>
                      <scheme.icon className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-black text-xl text-slate-100 tracking-tight">{scheme.title}</h3>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Official Federal Scheme</p>
                    </div>
                  </div>
                  <Badge className="hidden md:flex bg-white/5 text-slate-300 hover:bg-white/10 shadow-none border border-white/10 font-black tracking-widest text-[10px] uppercase py-1.5 px-4 rounded-full">
                    {scheme.benefit}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8 pt-2 border-t border-white/5">
                <div className="grid md:grid-cols-12 gap-8 items-start pt-6">
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-3">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                         <Zap className="w-3 h-3 text-yellow-500" /> Mission Statement
                       </h4>
                       <p className="text-lg font-medium text-slate-200 leading-relaxed">{scheme.description}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Eligibility Matrix</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {scheme.eligibility.map((item, idx) => (
                           <div key={idx} className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                              <ArrowRight className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-bold text-slate-300">{item}</span>
                           </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-6">
                    <div className="bg-slate-950 p-6 rounded-[2rem] border border-white/5 shadow-inner relative overflow-hidden group/card">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover/card:scale-150 transition-transform" />
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                           <FileText className="w-4 h-4" />
                        </div>
                        <h5 className="font-black text-xs uppercase tracking-widest">Required Documentation</h5>
                      </div>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">{scheme.docs}</p>
                    </div>

                    <a 
                      href={scheme.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 active:scale-95 transition-all group/btn"
                    >
                      Apply Online Now <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all" />
                    </a>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  )
}
