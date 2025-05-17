"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Terminal } from "@/components/terminal"
import { useGameState } from "@/components/game-provider"
import { ExternalLink } from "lucide-react"

interface PuzzleDisplayProps {
  puzzle: {
    id: string
    story: string
    hint: string
    answer: string
    explanation: string
    hasImage?: boolean
    imageUrl?: string
    hasLink?: boolean
    link?: string
    answerType: "text" | "network" | "ascii" | "hidden"
  }
  onSolve: () => void
  level: number
}

export function PuzzleDisplay({ puzzle, onSolve, level }: PuzzleDisplayProps) {
  const {
    decrementLives,
    addPoints,
    calculatePoints,
    startQuestionTimer,
    endQuestionTimer,
    markHintUsed,
    wasHintUsed,
    incrementAttempts,
    getAttempts,
  } = useGameState()

  const [answer, setAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [questionStartTimeState, setQuestionStartTimeState] = useState(Date.now())
  const [questionTime, setQuestionTime] = useState(0)
  const [storyIndex, setStoryIndex] = useState(0)
  const [displayedStory, setDisplayedStory] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [hiddenClue, setHiddenClue] = useState("")

  // Start typing animation for story
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (storyIndex < puzzle.story.length) {
      timeout = setTimeout(() => {
        setDisplayedStory(puzzle.story.substring(0, storyIndex + 1))
        setStoryIndex(storyIndex + 1)
      }, 20)
    } else {
      setTypingComplete(true)
      // Start timer for the puzzle
      const startTime = startQuestionTimer()
      setQuestionStartTimeState(startTime)
    }

    return () => clearTimeout(timeout)
  }, [storyIndex, puzzle.story, startQuestionTimer])

  // Generate hidden clues based on puzzle type
  useEffect(() => {
    if (puzzle.answerType === "ascii") {
      // Convert answer to ASCII codes
      const asciiCodes = puzzle.answer
        .split("")
        .map((char) => char.charCodeAt(0).toString())
        .join(" ")
      setHiddenClue(`ASCII: ${asciiCodes}`)
    } else if (puzzle.answerType === "hidden") {
      // Create a comment with the answer that would be visible in page source
      const hiddenComment = `<!-- The answer is: ${puzzle.answer} -->`
      document.body.appendChild(document.createComment(` Puzzle ${puzzle.id} clue: ${puzzle.answer} `))
      setHiddenClue(hiddenComment)
    } else if (puzzle.answerType === "network") {
      // This would normally be handled by actual network requests
      // For simulation, we'll just set a clue
      setHiddenClue(`Check network requests for: /api/puzzles/${puzzle.id}`)

      // Simulate a network request with the answer
      if (typeof window !== "undefined") {
        const fakeXHR = {
          url: `/api/puzzles/${puzzle.id}`,
          method: "GET",
          response: { clue: puzzle.answer },
        }
        console.log("Network request:", fakeXHR)
      }
    }
  }, [puzzle.answerType, puzzle.answer, puzzle.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const userAnswer = answer.trim().toLowerCase()
    const correctAnswer = puzzle.answer.toLowerCase()

    // Increment attempts counter
    incrementAttempts(puzzle.id)
    const currentAttempts = getAttempts(puzzle.id)

    if (userAnswer === correctAnswer) {
      // Record time taken for this puzzle
      const timeTaken = endQuestionTimer()
      setQuestionTime(timeTaken)

      // Calculate points based on level, time, hint usage, and attempts
      const hintUsed = wasHintUsed(puzzle.id)
      const pointsEarned = calculatePoints(level, timeTaken, hintUsed, currentAttempts)
      addPoints(pointsEarned)

      setMessage(`Correct! +${pointsEarned} points.`)
      setMessageType("success")
      setAnswer("")
      setShowExplanation(true)

      // After showing explanation, proceed to next puzzle
      setTimeout(() => {
        onSolve()
      }, 3000)
    } else {
      decrementLives()

      if (currentAttempts >= 2 && !showHint) {
        setShowHint(true)
        markHintUsed(puzzle.id)
      }

      setMessage("Incorrect. Try again.")
      setMessageType("error")

      setTimeout(() => {
        setMessage("")
        setMessageType("")
      }, 1500)
    }
  }

  return (
    <div className="glitch-content mb-6">
      <Terminal text={displayedStory} />

      {typingComplete && (
        <>
          {puzzle.hasImage && puzzle.imageUrl && (
            <div className="my-4 border border-[#00ff00]/30 p-2">
              <Image
                src={puzzle.imageUrl || "/placeholder.svg"}
                alt="Puzzle clue"
                width={500}
                height={300}
                className="w-full h-auto"
              />
            </div>
          )}

          {puzzle.hasLink && puzzle.link && (
            <div className="my-4">
              <a
                href={puzzle.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ff00] underline flex items-center hover:text-[#00ff00]/80"
              >
                Examine related documentation <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          )}

          {showHint && (
            <div className="bg-[#00ff00]/10 p-3 rounded border border-[#00ff00]/30 mb-4">
              <p className="text-[#00ff00]/80 text-sm">Hint: {puzzle.hint}</p>
            </div>
          )}

          {message && (
            <div
              className={`p-2 rounded mb-4 ${messageType === "success" ? "bg-[#00ff00]/20 text-[#00ff00]" : "bg-[#00ff00]/10 text-[#00ff00]"}`}
            >
              {message}
            </div>
          )}

          {showExplanation && (
            <div className="bg-[#00ff00]/10 p-3 rounded border border-[#00ff00]/30 mb-4 mt-4">
              <h3 className="text-[#00ff00] font-bold mb-2">Explanation:</h3>
              <p className="text-[#00ff00]/90 text-sm">{puzzle.explanation}</p>
              <p className="text-[#00ff00]/70 text-xs mt-2">Time taken: {(questionTime / 1000).toFixed(2)} seconds</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-black border-[#00ff00] text-[#00ff00] focus:ring-[#00ff00]"
              placeholder="Enter your answer"
            />
            <div className="flex justify-between">
              <Button
                type="submit"
                className="bg-[#00ff00]/20 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/30"
              >
                Submit
              </Button>

              {!showHint && (
                <Button
                  type="button"
                  onClick={() => {
                    setShowHint(true)
                    markHintUsed(puzzle.id)
                  }}
                  className="bg-black border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/10"
                >
                  Request Hint
                </Button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  )
}
