"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useGameState } from "@/components/game-provider"
import { Volume2, VolumeX } from "lucide-react"

export function MusicPlayer() {
  const { musicPlaying, toggleMusic } = useGameState()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/music/ambient.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = 0.3

      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [musicPlaying])

  return (
    <Button
      onClick={toggleMusic}
      variant="outline"
      size="sm"
      className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/10 h-8 w-8 p-0"
      title={musicPlaying ? "Mute" : "Play Music"}
    >
      {musicPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </Button>
  )
}
