"use client"

import Link from "next/link"
import Image from "next/image"
import { Tractor, Sprout, CloudRain, ArrowRight, ShieldCheck, Globe, Leaf, IndianRupee, Check, Star, Moon, Sun } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-[100dvh] flex-col font-sans bg-background text-foreground transition-colors duration-300">
      
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg shadow-sm">
              <Tractor className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight">Agriva</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-muted-foreground">
            <a href="#features" className="hover:text-green-600 transition-colors uppercase tracking-wider text-xs">{t("nav.features")}</a>
            <a href="#how-it-works" className="hover:text-green-700 transition-colors uppercase tracking-wider text-xs">{t("nav.howItWorks")}</a>
            <a href="#schemes" className="hover:text-green-700 transition-colors uppercase tracking-wider text-xs">{t("nav.schemes")}</a>
          </nav>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Language toggle */}
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="text-sm font-semibold border border-border rounded-lg px-2 py-1.5 bg-background focus:outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
              <option value="mr">मराठी</option>
            </select>
            <Link href="/dashboard" className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-all shadow-lg shadow-green-600/20 text-sm">
              {t("hero.cta")} →
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ────── HERO ────── */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          
          {/* Full-bleed high-res background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-farmland-highres.png"
              alt="High resolution Indian farmland at dawn"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dynamic Overlay: adapts to light/dark mode */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent dark:from-background/90 dark:via-background/40" />
            {/* Bottom transition to content */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-10 py-24">
            <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Agri-Intelligence Engine Active
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                {t("hero.title1")}<br />
                <span className="text-green-600 dark:text-green-500">{t("hero.title2")}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-base shadow-xl shadow-green-600/25 transition-all hover:shadow-2xl hover:shadow-green-600/30 hover:-translate-y-0.5">
                  {t("hero.cta")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background/50 border border-border hover:bg-muted text-foreground font-bold rounded-xl text-base shadow-sm transition-all backdrop-blur-sm">
                  Explore Features
                </a>
              </div>

              {/* Trust markers (Claims removed) */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-muted-foreground font-semibold text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" /> Free to access
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" /> Local Language Support
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-muted-foreground ml-1">Universal Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ────── FEATURES ────── */}
        <section id="features" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-10">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <p className="text-green-600 dark:text-green-500 font-bold uppercase tracking-widest text-sm mb-3">{t("features.title")}</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Precision Tools for Modern Farming</h2>
              <p className="text-lg text-muted-foreground font-medium">Built with Groq LPU processing and OpenWeather insights to empower the Indian agricultural community.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: IndianRupee, color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400", title: "FairPrice AI", desc: "Live market trend analysis providing specific selling quantities and optimal windows based on local Mandi data." },
                { icon: CloudRain, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400", title: "RainRisk Guard", desc: "Hyper-local weather risk trajectories generated by passing 7-day satellite forecasts through Llama-3 AI." },
                { icon: Sprout, color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400", title: "CropIQ Engine", desc: "Get 4 distinct crop recommendations instantly tailored to your soil, region, and upcoming seasonal shifts." },
                { icon: Leaf, color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400", title: "Soil Health AI", desc: "Input N-P-K nutrient metrics to generate exact required bags of Urea and DAP calculated instantly by AI." },
                { icon: ShieldCheck, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400", title: "Govt Schemes", desc: "Instant matching to PM-KISAN, PMFBY, and Kisan Credit subsidies based on your farmer profile." },
                { icon: Globe, color: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300", title: "Universal Access", desc: "Clean, mobile-first design optimized for all connectivity speeds with full regional language support." },
              ].map((f, i) => (
                <div key={i} className="bg-card border rounded-2xl p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────── HOW IT WORKS ────── */}
        <section id="how-it-works" className="py-24 bg-muted/40 border-y">
          <div className="container mx-auto px-4 md:px-10">
            <div className="text-center mb-16">
              <p className="text-green-600 dark:text-green-500 font-bold uppercase tracking-widest text-sm mb-3">{t("nav.howItWorks")}</p>
              <h2 className="text-4xl font-black tracking-tight">Intelligence at your Fingertips</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { step: "01", title: "Geo-Location", desc: "Open the dashboard and we'll automatically detect your region via satellite GPS." },
                { step: "02", title: "Input Basic Info", desc: "Select a tool and provide minimal inputs—like soil type or current crop." },
                { step: "03", title: "Execute Plan", desc: "Receive immediate AI action plans for fertilizer, selling, or planting." }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-4 group">
                  <div className="text-6xl font-black text-green-600/10 group-hover:text-green-600/20 transition-colors">{s.step}</div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────── SCHEMES CTA ────── */}
        <section id="schemes" className="py-24 relative overflow-hidden bg-green-700 dark:bg-green-900">
          <div className="absolute top-0 right-0 w-[40%] h-full bg-white opacity-5 skew-x-[-20deg] translate-x-20" />
          <div className="container mx-auto px-4 md:px-10 text-center relative z-10">
            <h2 className="text-4xl font-black text-white mb-6">Simplify your Subsidy Management</h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Agriva scans current central and state projects to match you with valid funding opportunities automatically.
            </p>
            <Link href="/schemes" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-black rounded-xl hover:bg-green-50 transition-all shadow-xl text-base">
              Explore Active Schemes <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-1.5 rounded-md"><Tractor className="h-4 w-4 text-white" /></div>
            <span className="font-black">Agriva</span>
          </div>
          <div className="flex gap-8 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground font-medium">© {new Date().getFullYear()} Agriva · AI Copilot for Farmers</p>
        </div>
      </footer>
    </div>
  )
}
