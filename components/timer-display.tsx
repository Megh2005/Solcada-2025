"use client"

import { useState, useEffect } from "react"

interface TimerDisplayProps {
  startTime: number
  isRunning?: boolean
}

export function TimerDisplay({ startTime, isRunning = true }: TimerDisplayProps) {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTime
      setElapsedTime(elapsed)
    }, 100)

    return () => clearInterval(interval)
  }, [startTime, isRunning])

  // Format time as mm:ss.ms
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="text-xs text-[#00ff00] font-mono">
      <span className="opacity-70">TIME: </span>
      <span className={isRunning ? "animate-pulse" : ""}>{formatTime(elapsedTime)}</span>
    </div>
  )
}
