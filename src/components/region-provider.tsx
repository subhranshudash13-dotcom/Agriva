"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type RegionContextType = {
  region: string
  setRegion: (region: string) => void
}

const RegionContext = createContext<RegionContextType>({
  region: "anantapur",
  setRegion: () => {},
})

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState("anantapur")

  useEffect(() => {
    const saved = localStorage.getItem("agriva_region")
    if (saved) setRegion(saved)
  }, [])

  const handleSetRegion = (reg: string) => {
    setRegion(reg)
    localStorage.setItem("agriva_region", reg)
  }

  return (
    <RegionContext.Provider value={{ region, setRegion: handleSetRegion }}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion() {
  return useContext(RegionContext)
}
