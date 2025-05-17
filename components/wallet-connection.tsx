"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useGameState } from "@/components/game-provider"

interface WalletConnectionProps {
  onConnect: () => void
}

export function WalletConnection({ onConnect }: WalletConnectionProps) {
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false)
  const { setWalletAddress } = useGameState()

  useEffect(() => {
    // Check if Phantom is installed
    if (typeof window !== "undefined") {
      setIsPhantomInstalled(!!window.phantom?.solana)
    }
  }, [])

  const connectWallet = async () => {
    try {
      if (window.phantom?.solana) {
        const response = await window.phantom.solana.connect()
        const publicKey = response.publicKey.toString()
        console.log("Connected with Public Key:", publicKey)
        setWalletAddress(publicKey)
        onConnect()
      }
    } catch (error) {
      console.error("Error connecting to Phantom wallet:", error)
    }
  }

  if (!isPhantomInstalled) {
    return (
      <div className="text-center">
        <p className="text-[#00ff00] mb-4">Phantom wallet is not installed</p>
        <Button
          onClick={() => window.open("https://phantom.app/", "_blank")}
          className="glitch-content bg-[#00ff00]/20 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/30"
        >
          Install Phantom
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={connectWallet}
      className="w-full glitch-content bg-[#00ff00]/20 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/30"
    >
      Connect Wallet
    </Button>
  )
}
