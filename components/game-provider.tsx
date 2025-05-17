"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface GameState {
  username: string
  lives: number
  currentLevel: number
  points: number
  walletAddress: string
  questionStartTime: number
  levelStartTime: number
  levelTimes: Record<number, number>
  setUsername: (name: string) => void
  decrementLives: () => void
  resetGame: () => void
  setCurrentLevel: (level: number) => void
  addPoints: (points: number) => void
  setWalletAddress: (address: string) => void
  startQuestionTimer: () => void
  endQuestionTimer: () => number
  startLevelTimer: () => void
  endLevelTimer: (level: number) => void
  getLevelTime: (level: number) => number
}

const GameContext = createContext<GameState | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsernameState] = useState<string>("")
  const [lives, setLives] = useState<number>(5)
  const [currentLevel, setCurrentLevelState] = useState<number>(1)
  const [points, setPoints] = useState<number>(0)
  const [walletAddress, setWalletAddressState] = useState<string>("")
  const [questionStartTime, setQuestionStartTime] = useState<number>(0)
  const [levelStartTime, setLevelStartTime] = useState<number>(0)
  const [levelTimes, setLevelTimes] = useState<Record<number, number>>({})

  // Load game state from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUsername = localStorage.getItem("solcada-username")
      const savedLives = localStorage.getItem("solcada-lives")
      const savedLevel = localStorage.getItem("solcada-level")
      const savedPoints = localStorage.getItem("solcada-points")
      const savedWalletAddress = localStorage.getItem("solcada-wallet")
      const savedLevelTimes = localStorage.getItem("solcada-level-times")

      if (savedUsername) setUsernameState(savedUsername)
      if (savedLives) setLives(Number.parseInt(savedLives))
      if (savedLevel) setCurrentLevelState(Number.parseInt(savedLevel))
      if (savedPoints) setPoints(Number.parseInt(savedPoints))
      if (savedWalletAddress) setWalletAddressState(savedWalletAddress)
      if (savedLevelTimes) setLevelTimes(JSON.parse(savedLevelTimes))
    }
  }, [])

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("solcada-username", username)
      localStorage.setItem("solcada-lives", lives.toString())
      localStorage.setItem("solcada-level", currentLevel.toString())
      localStorage.setItem("solcada-points", points.toString())
      localStorage.setItem("solcada-wallet", walletAddress)
      localStorage.setItem("solcada-level-times", JSON.stringify(levelTimes))
    }
  }, [username, lives, currentLevel, points, walletAddress, levelTimes])

  const setUsername = (name: string) => {
    setUsernameState(name)
  }

  const decrementLives = () => {
    setLives((prev) => Math.max(0, prev - 1))
  }

  const resetGame = () => {
    setUsernameState("")
    setLives(5)
    setCurrentLevelState(1)
    setPoints(0)
    setLevelTimes({})
  }

  const setCurrentLevel = (level: number) => {
    setCurrentLevelState(level)
  }

  const addPoints = (newPoints: number) => {
    setPoints((prev) => prev + newPoints)
  }

  const setWalletAddress = (address: string) => {
    setWalletAddressState(address)
  }

  const startQuestionTimer = () => {
    const now = Date.now()
    setQuestionStartTime(now)
    return now
  }

  const endQuestionTimer = () => {
    const now = Date.now()
    const timeTaken = now - questionStartTime
    return timeTaken
  }

  const startLevelTimer = () => {
    const now = Date.now()
    setLevelStartTime(now)
  }

  const endLevelTimer = (level: number) => {
    const now = Date.now()
    const timeTaken = now - levelStartTime
    setLevelTimes((prev) => ({
      ...prev,
      [level]: timeTaken,
    }))
  }

  const getLevelTime = (level: number) => {
    return levelTimes[level] || 0
  }

  return (
    <GameContext.Provider
      value={{
        username,
        lives,
        currentLevel,
        points,
        walletAddress,
        questionStartTime,
        levelStartTime,
        levelTimes,
        setUsername,
        decrementLives,
        resetGame,
        setCurrentLevel,
        addPoints,
        setWalletAddress,
        startQuestionTimer,
        endQuestionTimer,
        startLevelTimer,
        endLevelTimer,
        getLevelTime,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGameState() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameProvider")
  }
  return context
}
