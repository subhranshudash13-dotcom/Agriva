"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Tractor, Menu, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { useRegion } from "@/components/region-provider"
import { useState } from "react"

export function TopNav() {
  const { language, setLanguage } = useLanguage()
  const { region, setRegion } = useRegion()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Tractor className="h-6 w-6 text-green-600 dark:text-green-500" />
            <span className="font-bold text-lg sm:text-xl md:text-2xl tracking-wide">Agriva</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Region selector — visible on all screens */}
          <Select value={region} onValueChange={(val) => val && setRegion(val)}>
            <SelectTrigger className="w-[130px] sm:w-[180px] h-9 bg-muted/50 border-0 shadow-none font-bold text-[10px] sm:text-xs uppercase tracking-wider">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anantapur">Anantapur (South)</SelectItem>
              <SelectItem value="punjab">Punjab (North)</SelectItem>
              <SelectItem value="vidarbha">Vidarbha (Central)</SelectItem>
              <SelectItem value="guntur">Guntur (Coastal)</SelectItem>
              <SelectItem value="saurashtra">Saurashtra (West)</SelectItem>
              <SelectItem value="bihar">N. Bihar (East)</SelectItem>
            </SelectContent>
          </Select>

          {/* Language selector — hidden on very small screens */}
          <div className="hidden sm:block">
            <Select value={language} onValueChange={(val) => val && setLanguage(val)}>
              <SelectTrigger className="w-[100px] h-8 bg-transparent border-0 shadow-none font-medium">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
                <SelectItem value="mr">मराठी</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ModeToggle />

          {/* Dashboard link on desktop */}
          <Link href="/dashboard" className="hidden sm:flex w-8 h-8 rounded-full bg-muted items-center justify-center text-sm font-bold ml-1">
            DB
          </Link>

          {/* Hamburger menu on mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-border hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-4 gap-1">
            {[
              { href: "/dashboard", label: "Dashboard", emoji: "📊" },
              { href: "/fair-price", label: "FairPrice AI", emoji: "💰" },
              { href: "/crop-iq", label: "CropIQ", emoji: "🌱" },
              { href: "/rain-risk", label: "RainRisk AI", emoji: "🌧️" },
              { href: "/soil-health", label: "Soil Health", emoji: "🧪" },
              { href: "/schemes", label: "Govt. Schemes", emoji: "🏛️" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-foreground hover:bg-muted transition-colors active:scale-[0.98]"
              >
                <span className="text-lg">{item.emoji}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
