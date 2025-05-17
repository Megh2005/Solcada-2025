"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WalletGuard } from "@/components/wallet-guard"
import { useGameState } from "@/components/game-provider"
import { Terminal } from "@/components/terminal"
import { rulesText } from "@/lib/story"

export default function RulesPage() {
  const router = useRouter()
  const { username } = useGameState()
  const [displayedText, setDisplayedText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    // Redirect if no username
    if (!username) {
      router.push("/story")
      return
    }

    let timeout: NodeJS.Timeout

    if (textIndex < rulesText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(rulesText.substring(0, textIndex + 1))
        setTextIndex(textIndex + 1)
      }, 20)
    } else {
      timeout = setTimeout(() => {
        setShowContinue(true)
      }, 1000)
    }

    return () => clearTimeout(timeout)
  }, [textIndex, username, router])

  const handleContinue = () => {
    router.push("/level/1")
  }

  return (
    <WalletGuard>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 font-mono">
        <div className="max-w-3xl w-full p-6 border border-[#00ff00] rounded-md bg-black/50 backdrop-blur-sm">
          <h1 className="glitch-text text-3xl font-bold text-[#00ff00] mb-6 text-center">SOLCADA 2025</h1>

          <Terminal text={displayedText} />

          {showContinue && (
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleContinue}
                className="glitch-content bg-[#00ff00]/20 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/30"
              >
                Begin Challenge
              </Button>
            </div>
          )}
        </div>
      </main>
    </WalletGuard>
  )
}
