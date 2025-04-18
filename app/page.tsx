"use client"

import { useState, useEffect } from "react"
import { Rajdhani } from "next/font/google"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"

const rajdhani = Rajdhani({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
})

export default function Home() {
  const [crackLevel, setCrackLevel] = useState(0)
  const [activeZone, setActiveZone] = useState<"safe" | "warning" | "danger">("safe")

  // Update active zone whenever crack level changes
  useEffect(() => {
    // Determine active zone based on crack level
    if (crackLevel < 33) {
      setActiveZone("safe")
    } else if (crackLevel < 65) {
      setActiveZone("warning")
    } else {
      setActiveZone("danger")
    }
  }, [crackLevel])

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="w-full p-6">
        <h1
          className={`${rajdhani.className} text-4xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500`}
        >
          TrackRakshak
        </h1>
        <p className={`${rajdhani.className} text-lg text-cyan-300 mt-1 tracking-wide`}>
          Real-time Rail Crack Monitoring
        </p>
      </header>

      {/* Gauge Meter - Enlarged */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4 py-8">
        <div className="w-full max-w-xxxl mx-auto mb-8 relative">
          <div className="relative w-full aspect-[2/1]">
            <Image
              src="/images/gauge-meter.png"
              alt="Track condition gauge meter"
              fill
              priority
              className="object-contain"
            />

            {/* Needle - Changed to white */}
            <div
              className="absolute bottom-0 left-1/2 w-1 h-[45%] bg-white rounded-t-full origin-bottom transform -translate-x-1/2 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-50%) rotate(${-90 + crackLevel * 1.8}deg)`,
              }}
            >
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-md text-center mb-12">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full mb-2 transition-all duration-500 ${
                activeZone === "safe" ? "bg-green-500 shadow-lg shadow-green-500/50 scale-110" : "bg-green-800"
              }`}
            ></div>
            <span className={`font-medium ${activeZone === "safe" ? "text-green-400" : "text-slate-400"}`}>Safe</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full mb-2 transition-all duration-500 ${
                activeZone === "warning" ? "bg-yellow-500 shadow-lg shadow-yellow-500/50 scale-110" : "bg-yellow-800"
              }`}
            ></div>
            <span className={`font-medium ${activeZone === "warning" ? "text-yellow-400" : "text-slate-400"}`}>
              Warning
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full mb-2 transition-all duration-500 ${
                activeZone === "danger" ? "bg-red-500 shadow-lg shadow-red-500/50 scale-110" : "bg-red-800"
              }`}
            ></div>
            <span className={`font-medium ${activeZone === "danger" ? "text-red-400" : "text-slate-400"}`}>Danger</span>
          </div>
        </div>

        {/* Slider Control */}
        <div className="w-full max-w-md bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
          <h3 className={`${rajdhani.className} text-xl mb-4 text-cyan-300`}>Crack Level Simulator</h3>
          <div className="mb-2 flex justify-between">
            <span>0%</span>
            <span className="font-bold text-cyan-300">{crackLevel}%</span>
            <span>100%</span>
          </div>
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            value={[crackLevel]}
            onValueChange={(value) => {
              setCrackLevel(value[0])
            }}
            className="py-4"
          />
          <div className="mt-4 text-sm text-slate-400">
            Adjust the slider manually to simulate different crack levels.
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-slate-500 text-sm">
        <p>© 2025 TrackRakshak | Advanced Rail Monitoring System</p>
      </footer>
    </main>
  )
}