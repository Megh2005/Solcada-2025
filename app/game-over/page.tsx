"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WalletGuard } from "@/components/wallet-guard"
import { useGameState } from "@/components/game-provider"
import { Terminal } from "@/components/terminal"
import { WalletDisplay } from "@/components/wallet-display"
import { BandwidthMonitor } from "@/components/bandwidth-monitor"

export default function GameOverPage() {
  const router = useRouter()
  const { username, resetGame, points } = useGameState()
  const [displayedText, setDisplayedText] = useState("")
  const [textIndex, setTextIndex] = useState(0)

  const gameOverText = `SECURITY BREACH DETECTED
====================

User ${username} has been compromised.

Security protocols activated.
Access terminated.
IP logged.
Wallet blacklisted.

Your attempt to infiltrate the Solcada network has been recorded.

All further access attempts will be monitored.

Better luck next time, hacker.

====================`

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (textIndex < gameOverText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(gameOverText.substring(0, textIndex + 1))
        setTextIndex(textIndex + 1)
      }, 30)
    }

    return () => clearTimeout(timeout)
  }, [textIndex, gameOverText])

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
              <div className="glitch-text text-xl text-red-500">
                <span>User: {username}</span>
              </div>
              <WalletDisplay />
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-red-500">
                <span>
                  Points: {points} ({((points / 10) * 0.01).toFixed(3)} SOL)
                </span>
              </div>
              <BandwidthMonitor />
            </div>
          </div>

          <div className="p-6 border border-red-500 rounded-md bg-black/50 backdrop-blur-sm">
            <h1 className="glitch-text text-4xl font-bold text-red-500 mb-8 text-center">GAME OVER</h1>

            <Terminal text={displayedText} textColor="text-red-500" />

            {textIndex >= gameOverText.length && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleRestart}
                  className="glitch-content bg-red-900/20 border border-red-500 text-red-500 hover:bg-red-900/30"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </WalletGuard>
  )
}
