"use client"

import { useGameState } from "@/components/game-provider"

export function WalletDisplay() {
  const { walletAddress } = useGameState()

  // Format wallet address to show first 6 and last 4 characters
  const formatWalletAddress = (address: string) => {
    if (!address) return "Not connected"
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="text-xs text-[#00ff00] font-mono">
      <span className="opacity-70">WALLET: </span>
      <span className="glitch-content">{formatWalletAddress(walletAddress)}</span>
    </div>
  )
}
