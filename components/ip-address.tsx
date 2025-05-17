"use client"

import { useState, useEffect } from "react"
import { Network } from "lucide-react"

export function IPAddress() {
  const [ipAddress, setIpAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json")
        const data = await response.json()
        setIpAddress(data.ip)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching IP address:", error)
        setIpAddress("Unknown")
        setIsLoading(false)
      }
    }

    fetchIpAddress()
  }, [])

  return (
    <div className="text-xs text-[#00ff00] font-mono flex items-center">
      <Network className="h-3 w-3 mr-1" />
      {isLoading ? <span>Tracing IP...</span> : <span>IP: {ipAddress}</span>}
    </div>
  )
}
