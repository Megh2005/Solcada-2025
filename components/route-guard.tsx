"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useGameState } from "@/components/game-provider"

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { username, currentLevel, lives } = useGameState()

  useEffect(() => {
    // Define allowed routes based on game state
    const checkRouteAccess = () => {
      // If no username, only allow home and story pages
      if (!username && pathname !== "/" && pathname !== "/story") {
        router.push("/")
        return
      }

      // If game over (no lives), only allow game-over page
      if (lives <= 0 && pathname !== "/game-over") {
        router.push("/game-over")
        return
      }

      // Level access control
      if (pathname.startsWith("/level/")) {
        const levelParam = pathname.split("/")[2]
        const levelNum = Number.parseInt(levelParam, 10)

        // Only allow access to current or previous levels
        if (levelNum > currentLevel) {
          router.push(`/level/${currentLevel}`)
          return
        }
      }

      // Level completion access control
      if (pathname.startsWith("/level-complete/")) {
        const levelParam = pathname.split("/")[2]
        const levelNum = Number.parseInt(levelParam, 10)

        // Only allow access if that level is completed
        if (levelNum >= currentLevel) {
          router.push(`/level/${currentLevel}`)
          return
        }
      }

      // Victory page access control
      if (pathname === "/victory" && currentLevel < 3) {
        router.push(`/level/${currentLevel}`)
        return
      }
    }

    checkRouteAccess()
  }, [pathname, username, currentLevel, lives, router])

  return <>{children}</>
}
