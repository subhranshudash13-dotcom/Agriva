"use client"

import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"
import { GovernmentSchemes } from "@/components/government-schemes"

export default function SchemesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 pt-14 border-r bg-background" />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="grid gap-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight">Govt. Schemes & Projects</h1>
            <p className="text-muted-foreground mb-4">Discover federated and state subsidies you are eligible for to reduce cultivation cost.</p>
            <GovernmentSchemes />
          </div>
        </main>
      </div>
    </div>
  )
}
