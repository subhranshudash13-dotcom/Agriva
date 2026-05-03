import Link from "next/link"
import { Tractor, Sprout, CloudRain, Landmark, Info } from "lucide-react"

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={`fixed top-14 left-0 z-40 w-64 h-[calc(100vh-3.5rem)] border-r bg-background ${className || 'hidden md:block'}`}>
      <div className="flex h-full flex-col overflow-y-auto py-6 px-4">
        <nav className="flex flex-1 flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-muted-foreground hover:text-foreground">
            <Tractor className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/fair-price" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Landmark className="h-5 w-5 text-orange-500" />
            FairPrice AI
          </Link>
          <Link href="/crop-iq" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Sprout className="h-5 w-5 text-green-500" />
            CropIQ
          </Link>
          <Link href="/rain-risk" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <CloudRain className="h-5 w-5 text-blue-500" />
            RainRisk AI
          </Link>
          <Link href="/soil-health" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Sprout className="h-5 w-5 text-emerald-600" />
            Soil Health
          </Link>
        </nav>
        
        <div className="mt-auto pt-6">
          <Link href="/schemes" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Info className="h-5 w-5 text-amber-500" />
            Govt. Schemes
          </Link>
        </div>
      </div>
    </aside>
  )
}
