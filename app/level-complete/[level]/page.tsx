"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WalletGuard } from "@/components/wallet-guard"
import { useGameState } from "@/components/game-provider"
import { Terminal } from "@/components/terminal"
import { levelCompletionStories } from "@/lib/story"
import { WalletDisplay } from "@/components/wallet-display"
import { BandwidthMonitor } from "@/components/bandwidth-monitor"

export default function LevelCompletePage({ params }: { params: { level: string } }) {
  const router = useRouter()
  const { username, points, getLevelTime } = useGameState()
  const level = Number.parseInt(params.level)
  const [displayedText, setDisplayedText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [showContinue, setShowContinue] = useState(false)

  const levelTime = getLevelTime(level)
  const formattedTime = formatTime(levelTime)

  const storyText = levelCompletionStories[level as keyof typeof levelCompletionStories] || ""

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (textIndex < storyText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(storyText.substring(0, textIndex + 1))
        setTextIndex(textIndex + 1)
      }, 30)
    } else {
      timeout = setTimeout(() => {
        setShowContinue(true)
      }, 1000)
    }

    return () => clearTimeout(timeout)
  }, [textIndex, storyText])

  const handleContinue = () => {
    router.push(`/level/${level + 1}`)
  }

  function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
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
                  Points: {points} ({((points / 10) * 0.01).toFixed(3)} SOL)
                </span>
              </div>
              <BandwidthMonitor />
            </div>
          </div>

          <div className="p-6 border border-[#00ff00] rounded-md bg-black/50 backdrop-blur-sm">
            <h1 className="glitch-text text-3xl font-bold text-[#00ff00] mb-6 text-center">LEVEL {level} COMPLETE</h1>

            <Terminal text={displayedText} />

            {showContinue && (
              <div className="mt-8 space-y-4">
                <div className="p-4 border border-[#00ff00] rounded-md bg-[#00ff00]/10">
                  <h2 className="text-xl text-[#00ff00] mb-2">Level {level} Statistics</h2>
                  <p className="text-[#00ff00] mb-1">Time taken: {formattedTime}</p>
                  <p className="text-[#00ff00] mb-1">Points earned: {level * 10}</p>
                  <p className="text-[#00ff00] mb-1">Current total: {points} points</p>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleContinue}
                    className="glitch-content bg-[#00ff00]/20 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/30"
                  >
                    Proceed to Level {level + 1}
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
