"use client"

import { useState, useEffect } from "react"
import { Terminal } from "@/components/terminal"

export function NetworkInfo() {
  const [networkInfo, setNetworkInfo] = useState({
    connection: "Initializing...",
    latency: "Calculating...",
    bandwidth: "Measuring...",
    nodes: "Scanning...",
  })
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    // Initial network information
    updateNetworkInfo()

    // Update network info every 3 seconds to simulate dynamic changes
    const interval = setInterval(() => {
      updateNetworkInfo()
      setCounter((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const updateNetworkInfo = () => {
    setNetworkInfo({
      connection: Math.random() > 0.5 ? "Secure | Encrypted" : "Secure | Tunneled",
      latency: Math.floor(Math.random() * 50 + 10) + "ms",
      bandwidth: Math.floor(Math.random() * 100 + 50) + " Mbps",
      nodes: Math.floor(Math.random() * 1000 + 500) + " active",
    })
  }

  return (
    <div className="mt-6 text-xs">
      <Terminal
        text={`> CONNECTION: ${networkInfo.connection}
> LATENCY: ${networkInfo.latency}
> BANDWIDTH: ${networkInfo.bandwidth}
> SOLANA NODES: ${networkInfo.nodes}
> STATUS: READY FOR AUTHENTICATION
> PACKETS: ${counter * 17 + Math.floor(Math.random() * 10)}`}
      />
    </div>
  )
}
