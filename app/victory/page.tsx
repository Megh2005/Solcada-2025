"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WalletGuard } from "@/components/wallet-guard"
import { useGameState } from "@/components/game-provider"
import { Terminal } from "@/components/terminal"
import { victoryStory } from "@/lib/story"
import { WalletDisplay } from "@/components/wallet-display"
import { BandwidthMonitor } from "@/components/bandwidth-monitor"

export default function VictoryPage() {
  const router = useRouter()
  const { username, points, resetGame, walletAddress, getLevelTime } = useGameState()
  const [displayedText, setDisplayedText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [showReward, setShowReward] = useState(false)

  const solReward = ((points / 10) * 0.01).toFixed(3)
  const formattedVictoryText = victoryStory
    .replace("[USERNAME]", username)
    .replace("[POINTS]", points.toString())
    .replace("[SOL]", solReward)
    .replace(
      "[WALLET]",
      walletAddress
        ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
        : "unknown",
    )

  // Calculate total time across all levels
  const level1Time = getLevelTime(1) || 0
  const level2Time = getLevelTime(2) || 0
  const level3Time = getLevelTime(3) || 0
  const totalTime = level1Time + level2Time + level3Time

  function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (textIndex < formattedVictoryText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(formattedVictoryText.substring(0, textIndex + 1))
        setTextIndex(textIndex + 1)
      }, 30)
    } else {
      timeout = setTimeout(() => {
        setShowReward(true)
      }, 1000)
    }

    return () => clearTimeout(timeout)
  }, [textIndex, formattedVictoryText])

  const handleRestart = () => {
    resetGame()
    router.push("/")
  }

  return (
    <WalletGuard>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 font-mono">
        <div className="max-w-3xl w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-1">
              <div className="glitch-text text-xl text-[#00ff00]">
                <span>User: {username}</span>
              </div>
              <WalletDisplay />
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-[#00ff00]">
                <span>
                  Points: {points} ({solReward} SOL)
                </span>
              </div>
              <BandwidthMonitor />
            </div>
          </div>

          <div className="p-6 border border-[#00ff00] rounded-md bg-black/50 backdrop-blur-sm">
            <h1 className="glitch-text text-4xl font-bold text-[#00ff00] mb-8 text-center">VICTORY</h1>

            <Terminal text={displayedText} />

            {showReward && (
              <div className="mt-8 space-y-4">
                <div className="p-4 border border-[#00ff00] rounded-md bg-[#00ff00]/10">
                  <h2 className="text-2xl text-[#00ff00] mb-2">Challenge Summary</h2>
                  <p className="text-[#00ff00] mb-1">Points Earned: {points}</p>
                  <p className="text-[#00ff00] mb-1">SOL Reward: {solReward} SOL</p>
                  <p className="text-[#00ff00] mb-1">Total Time: {formatTime(totalTime)}</p>
                  <p className="text-[#00ff00] mb-1">Level 1: {formatTime(level1Time)}</p>
                  <p className="text-[#00ff00] mb-1">Level 2: {formatTime(level2Time)}</p>
                  <p className="text-[#00ff00] mb-1">Level 3: {formatTime(level3Time)}</p>
                  <p className="text-[#00ff00] mb-4">Rank: Cryptographic Adept</p>
                  <p className="text-[#00ff00]/80 text-sm">Note: This is a simulation. No actual SOL is awarded.</p>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleRestart}
                    className="glitch-content bg-[#00ff00]/20 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/30"
                  >
                    Start New Game
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </WalletGuard>
  )
}
