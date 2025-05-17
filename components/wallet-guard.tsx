"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { WalletConnection } from "@/components/wallet-connection"
import { useGameState } from "@/components/game-provider"

interface WalletGuardProps {
  children: React.ReactNode
}

export function WalletGuard({ children }: WalletGuardProps) {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { setWalletAddress } = useGameState()

  useEffect(() => {
    // Check if wallet is connected
    const checkConnection = async () => {
      if (typeof window !== "undefined") {
        const isConnected = !!window.phantom?.solana?.isConnected
        setIsConnected(isConnected)

        // Get wallet address if connected
        if (isConnected && window.phantom?.solana) {
          try {
            const publicKey = await window.phantom.solana.publicKey
            if (publicKey) {
              const address = publicKey.toString()
              setWalletAddress(address)
            }
          } catch (error) {
            console.error("Error getting wallet address:", error)
          }
        }

        setIsLoading(false)
      }
    }

    checkConnection()

    // Set up event listener for wallet connection changes
    const handleConnectionChange = () => {
      if (typeof window !== "undefined") {
        setIsConnected(!!window.phantom?.solana?.isConnected)
      }
    }

    window.addEventListener("phatomConnectionChange", handleConnectionChange)

    return () => {
      window.removeEventListener("phatomConnectionChange", handleConnectionChange)
    }
  }, [setWalletAddress])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-[#00ff00] text-xl">Loading...</div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
        <div className="max-w-md w-full p-6 border border-[#00ff00] rounded-md bg-black/50 backdrop-blur-sm">
          <h1 className="glitch-text text-3xl font-bold text-[#00ff00] mb-6 text-center">SOLCADA 2025</h1>
          <p className="text-[#00ff00] mb-6 text-center">Wallet disconnected. Reconnect to continue.</p>
          <WalletConnection onConnect={() => setIsConnected(true)} />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
