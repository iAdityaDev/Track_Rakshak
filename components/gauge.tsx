"use client"

import { useState } from "react"
import Image from "next/image"

export function Gauge() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${imageLoaded ? "opacity-0" : "opacity-100"}`}
      >
        <div className="w-16 h-16 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
      </div>

      <Image
        src="/gauge-meter.png"
        alt="Track condition gauge meter showing safe, little cracks, and danger zones"
        fill
        priority
        className={`object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}
