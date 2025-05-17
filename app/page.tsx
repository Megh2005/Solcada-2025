"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { WalletConnection } from "@/components/wallet-connection"
import { NetworkInfo } from "@/components/network-info"

export default function Home() {
  const router = useRouter()
  const [walletConnected, setWalletConnected] = useState(false)

  useEffect(() => {
    // Check if wallet is already connected
    const checkWalletConnection = async () => {
      if (typeof window !== "undefined" && window.phantom?.solana?.isConnected) {
        setWalletConnected(true)
      }
    }

    checkWalletConnection()
  }, [])

  useEffect(() => {
    if (walletConnected) {
      router.push("/story")
    }
  }, [walletConnected, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 font-mono">
      <div className="glitch-container">
        <h1 className="glitch-text text-5xl font-bold text-[#00ff00] mb-8">SOLCADA 2025</h1>
      </div>
      <div className="max-w-md w-full p-6 border border-[#00ff00] rounded-md bg-black/50 backdrop-blur-sm">
        <p className="text-[#00ff00] mb-6">
          Enter the cryptographic challenge if you dare. Connect your Phantom wallet to begin.
        </p>
        <WalletConnection onConnect={() => setWalletConnected(true)} />
        <NetworkInfo />
      </div>
    </main>
  )
}
