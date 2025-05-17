"use client"

import { useState, useEffect } from "react"

export function BandwidthMonitor() {
  const [bandwidth, setBandwidth] = useState("--")
  const [packetsSent, setPacketsSent] = useState(0)
  const [packetsReceived, setPacketsReceived] = useState(0)

  useEffect(() => {
    // Simulate bandwidth monitoring
    const interval = setInterval(() => {
      setBandwidth(Math.floor(Math.random() * 100 + 50) + " Mbps")
      setPacketsSent((prev) => prev + Math.floor(Math.random() * 5 + 1))
      setPacketsReceived((prev) => prev + Math.floor(Math.random() * 5 + 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-xs text-[#00ff00] flex items-center gap-2">
      <div className="w-2 h-2 bg-[#00ff00] animate-pulse rounded-full"></div>
      <span>BW: {bandwidth}</span>
      <span>TX: {packetsSent}</span>
      <span>RX: {packetsReceived}</span>
    </div>
  )
}
