"use client"

import { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"

export function AntiCheat() {
  const [isVisible, setIsVisible] = useState(true)
  const [showWarning, setShowWarning] = useState(false)
  const [warningCount, setWarningCount] = useState(0)

  useEffect(() => {
    // Check for visibility changes (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setShowWarning(true)
        setWarningCount((prev) => prev + 1)
      }
    }

    // Check for dev tools (F12, right-click inspect)
    const handleDevTools = () => {
      setShowWarning(true)
      setWarningCount((prev) => prev + 1)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      handleDevTools()
    })
    window.addEventListener("keydown", (e) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault()
        handleDevTools()
      }
    })

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.removeEventListener("contextmenu", (e) => e.preventDefault())
      window.removeEventListener("keydown", (e) => e.preventDefault())
    }
  }, [])

  return (
    <>
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent className="bg-black border border-red-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500 text-xl">CHEATING DETECTED</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              <p className="mb-4">Attempt to use external tools or tab switching detected.</p>
              <p className="mb-4">Warning {warningCount}/3</p>
              <p className="text-xs text-red-300">
                Your actions are being logged. Continued attempts may result in disqualification.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
