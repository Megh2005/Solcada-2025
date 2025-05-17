"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WalletGuard } from "@/components/wallet-guard"
import { useGameState } from "@/components/game-provider"
import { story } from "@/lib/story"
import { Terminal } from "@/components/terminal"

export default function StoryPage() {
  const router = useRouter()
  const { setUsername, username } = useGameState()
  const [inputUsername, setInputUsername] = useState("")
  const [showUsernameForm, setShowUsernameForm] = useState(false)
  const [storyIndex, setStoryIndex] = useState(0)
  const [displayedStory, setDisplayedStory] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)

  useEffect(() => {
    if (username) {
      router.push("/level/1")
    }
  }, [username, router])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (storyIndex < story.length) {
      timeout = setTimeout(() => {
        setDisplayedStory(story.substring(0, storyIndex + 1))
        setStoryIndex(storyIndex + 1)
      }, 20) // Adjust speed as needed
    } else {
      setTypingComplete(true)
    }

    return () => clearTimeout(timeout)
  }, [storyIndex])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim())
      router.push("/level/1")
    }
  }

  return (
    <WalletGuard>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 font-mono">
        <div className="max-w-[90vw] w-full p-6 border border-[#00ff00] rounded-md bg-black/50 backdrop-blur-sm">
          <h1 className="glitch-text text-3xl font-bold text-[#00ff00] mb-6">SOLCADA 2025</h1>

          <Terminal text={displayedStory} />

          {typingComplete && !showUsernameForm && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                className="glitch-content border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/10"
                onClick={() => setShowUsernameForm(true)}
              >
                Continue
              </Button>
            </div>
          )}

          {showUsernameForm && (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="glitch-content">
                <h2 className="text-xl text-[#00ff00] mb-2">Enter your handle, hacker:</h2>
                <Input
                  type="text"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  className="bg-black border-[#00ff00] text-[#00ff00] focus:ring-[#00ff00]"
                  placeholder="username"
                  required
                />
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="glitch-content bg-[#00ff00]/20 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/30"
                >
                  Begin Challenge
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </WalletGuard>
  )
}
