"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Tractor } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { useRegion } from "@/components/region-provider"

export function TopNav() {
  const { language, setLanguage } = useLanguage()
  const { region, setRegion } = useRegion()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Tractor className="h-6 w-6 text-green-600 dark:text-green-500" />
            <span className="font-bold text-lg sm:text-xl md:text-2xl tracking-wide hidden sm:inline-block">Agriva</span>
            <span className="font-bold text-lg sm:hidden tracking-wide">Agriva</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
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
          
          <div className="hidden md:block">
            <Select value={region} onValueChange={(val) => val && setRegion(val)}>
              <SelectTrigger className="w-[180px] h-9 bg-muted/50 border-0 shadow-none font-bold text-xs uppercase tracking-wider">
                <SelectValue placeholder="Agri-Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anantapur">Anantapur (South)</SelectItem>
                <SelectItem value="punjab">Punjab (North)</SelectItem>
                <SelectItem value="vidarbha">Vidarbha (Central)</SelectItem>
                <SelectItem value="guntur">Guntur (Coastal)</SelectItem>
                <SelectItem value="saurashtra">Saurashtra (West)</SelectItem>
                <SelectItem value="bihar">North Bihar (East)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ModeToggle />
          <Link href="/dashboard" className="hidden sm:flex w-8 h-8 rounded-full bg-muted items-center justify-center text-sm font-bold ml-2">
            DB
          </Link>
        </div>
      </div>
    </header>
  )
}
