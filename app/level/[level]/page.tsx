"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WalletGuard } from "@/components/wallet-guard"
import { useGameState } from "@/components/game-provider"
import { getLevelQuestions } from "@/lib/questions"
import { Terminal } from "@/components/terminal"
import { LifeCounter } from "@/components/life-counter"
import { WalletDisplay } from "@/components/wallet-display"
import { BandwidthMonitor } from "@/components/bandwidth-monitor"
import { TimerDisplay } from "@/components/timer-display"

export default function LevelPage({ params }: { params: { level: string } }) {
  const router = useRouter()
  const {
    username,
    lives,
    decrementLives,
    currentLevel,
    setCurrentLevel,
    addPoints,
    points,
    startQuestionTimer,
    endQuestionTimer,
    startLevelTimer,
    endLevelTimer,
  } = useGameState()
  const level = Number.parseInt(params.level)

  const [showTerminal, setShowTerminal] = useState(true)
  const [terminalText, setTerminalText] = useState("")
  const [terminalIndex, setTerminalIndex] = useState(0)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [currentExplanation, setCurrentExplanation] = useState("")
  const [questionStartTimeState, setQuestionStartTimeState] = useState(Date.now())
  const [questionTime, setQuestionTime] = useState(0)

  useEffect(() => {
    if (level !== currentLevel) {
      setCurrentLevel(level)
    }

    const levelQuestions = getLevelQuestions(level)
    setQuestions(levelQuestions)

    const text = `Initializing Solcada level ${level}...\nAccessing secure blockchain nodes...\nDecrypting challenge parameters...\nChallenge ready. Proceed with caution, ${username}.`
    setTerminalText(text)

    // Start level timer
    startLevelTimer()
  }, [level, username, currentLevel, setCurrentLevel, startLevelTimer])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (terminalIndex < terminalText.length) {
      timeout = setTimeout(() => {
        setTerminalIndex(terminalIndex + 1)
      }, 30)
    } else if (showTerminal) {
      timeout = setTimeout(() => {
        setShowTerminal(false)
        // Start timer for first question
        const startTime = startQuestionTimer()
        setQuestionStartTimeState(startTime)
      }, 1500)
    }

    return () => clearTimeout(timeout)
  }, [terminalIndex, terminalText, showTerminal, startQuestionTimer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const currentQuestion = questions[currentQuestionIndex]
    const userAnswer = answer.trim().toLowerCase()
    const correctAnswer = currentQuestion.answer.toLowerCase()

    if (userAnswer === correctAnswer) {
      // Record time taken for this question
      const timeTaken = endQuestionTimer()
      setQuestionTime(timeTaken)

      // Add points based on level difficulty
      const pointsToAdd = level * 2
      addPoints(pointsToAdd)

      setMessage(`Correct! +${pointsToAdd} points.`)
      setMessageType("success")
      setAnswer("")
      setAttempts(0)
      setShowHint(false)
      setShowExplanation(true)
      setCurrentExplanation(currentQuestion.explanation)

      // After showing explanation, proceed to next question
      setTimeout(() => {
        setShowExplanation(false)
        setMessage("")
        setMessageType("")

        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          // Start timer for next question
          const startTime = startQuestionTimer()
          setQuestionStartTimeState(startTime)
        } else {
          // Level complete
          endLevelTimer(level)
          if (level < 3) {
            router.push(`/level-complete/${level}`)
          } else {
            // Game complete
            router.push("/victory")
          }
        }
      }, 5000)
    } else {
      decrementLives()
      setAttempts(attempts + 1)

      if (attempts + 1 >= 2) {
        setShowHint(true)
      }

      setMessage("Incorrect. Try again.")
      setMessageType("error")

      setTimeout(() => {
        setMessage("")
        setMessageType("")
      }, 1500)

      if (lives <= 1) {
        // Game over
        router.push("/game-over")
      }
    }
  }

  if (showTerminal) {
    return (
      <WalletGuard>
        <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 font-mono">
          <Terminal text={terminalText.substring(0, terminalIndex)} />
        </main>
      </WalletGuard>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <WalletGuard>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 font-mono">
        <div className="max-w-xl w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-1">
              <div className="glitch-text text-xl text-[#00ff00]">
                <span>User: {username}</span>
              </div>
              <WalletDisplay />
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-4">
                <div className="text-[#00ff00]">
                  <span>
                    Points: {points} ({((points / 10) * 0.01).toFixed(3)} SOL)
                  </span>
                </div>
                <LifeCounter lives={lives} />
              </div>
              <BandwidthMonitor />
            </div>
          </div>

          <div className="p-6 border border-[#00ff00] rounded-md bg-black/50 backdrop-blur-sm">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="glitch-text text-2xl font-bold text-[#00ff00]">Level {level}</h1>
              <div className="flex items-center gap-4">
                <div className="text-[#00ff00]">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </div>
                <TimerDisplay startTime={questionStartTimeState} />
              </div>
            </div>

            <div className="glitch-content mb-6">
              <p className="text-[#00ff00] mb-4">{currentQuestion?.question}</p>

              {showHint && (
                <div className="bg-[#00ff00]/10 p-3 rounded border border-[#00ff00]/30 mb-4">
                  <p className="text-[#00ff00]/80 text-sm">Hint: {currentQuestion?.hint}</p>
                </div>
              )}

              {message && (
                <div
                  className={`p-2 rounded mb-4 ${messageType === "success" ? "bg-[#00ff00]/20 text-[#00ff00]" : "bg-red-900/20 text-red-500"}`}
                >
                  {message}
                </div>
              )}

              {showExplanation && (
                <div className="bg-[#00ff00]/10 p-3 rounded border border-[#00ff00]/30 mb-4 mt-4">
                  <h3 className="text-[#00ff00] font-bold mb-2">Explanation:</h3>
                  <p className="text-[#00ff00]/90 text-sm">{currentExplanation}</p>
                  <p className="text-[#00ff00]/70 text-xs mt-2">
                    Time taken: {(questionTime / 1000).toFixed(2)} seconds
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="bg-black border-[#00ff00] text-[#00ff00] focus:ring-[#00ff00]"
                  placeholder="Enter your answer"
                />
                <Button
                  type="submit"
                  className="w-full bg-[#00ff00]/20 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/30"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </WalletGuard>
  )
}
