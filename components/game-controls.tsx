"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MusicPlayer } from "@/components/music-player"
import { Info, HelpCircle, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

export function GameControls() {
  const [showRules, setShowRules] = useState(false)
  const [showCredits, setShowCredits] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      <MusicPlayer />

      <Button
        onClick={() => setShowRules(true)}
        variant="outline"
        size="sm"
        className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/10 h-8 w-8 p-0"
        title="Rules"
      >
        <HelpCircle className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => setShowCredits(true)}
        variant="outline"
        size="sm"
        className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/10 h-8 w-8 p-0"
        title="Credits"
      >
        <Info className="h-4 w-4" />
      </Button>

      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="bg-black border border-[#00ff00] text-[#00ff00] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#00ff00] text-xl">SOLCADA RULES</DialogTitle>
            <DialogClose className="absolute right-4 top-4 text-[#00ff00] hover:text-[#00ff00]/80">
              <X className="h-4 w-4" />
            </DialogClose>
          </DialogHeader>
          <DialogDescription className="text-[#00ff00]/90">
            <div className="space-y-4 font-mono">
              <p>Welcome to Solcada 2025, a cryptographic puzzle game on the Solana blockchain.</p>

              <div>
                <h3 className="font-bold mb-1">Game Structure:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>3 levels of increasing difficulty</li>
                  <li>5 puzzles per level</li>
                  <li>5 lives total</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-1">Scoring:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Points are awarded based on speed, accuracy, and whether hints were used</li>
                  <li>Faster solutions earn more points</li>
                  <li>Using hints reduces points by 30%</li>
                  <li>Multiple attempts reduce points</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-1">Puzzle Types:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cryptographic challenges</li>
                  <li>Hidden information (check page source, network requests, etc.)</li>
                  <li>Steganography (hidden data in images)</li>
                  <li>ASCII and binary encoding</li>
                </ul>
              </div>

              <p className="text-[#00ff00]/70 text-xs">
                Remember: In Solcada, nothing is as it seems. Look beyond the obvious.
              </p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={showCredits} onOpenChange={setShowCredits}>
        <DialogContent className="bg-black border border-[#00ff00] text-[#00ff00] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#00ff00] text-xl">CREDITS</DialogTitle>
            <DialogClose className="absolute right-4 top-4 text-[#00ff00] hover:text-[#00ff00]/80">
              <X className="h-4 w-4" />
            </DialogClose>
          </DialogHeader>
          <DialogDescription className="text-[#00ff00]/90">
            <div className="space-y-4 font-mono">
              <div>
                <h3 className="font-bold mb-1">Solcada 2025</h3>
                <p className="text-xs">A cryptographic puzzle game on the Solana blockchain</p>
              </div>

              <div>
                <h3 className="font-bold mb-1">Inspired By:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Cicada 3301</li>
                  <li>The Solana Ecosystem</li>
                  <li>Classic cryptographic challenges</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-1">Technologies:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Next.js</li>
                  <li>React</li>
                  <li>Tailwind CSS</li>
                  <li>Solana Web3.js</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-1">Music:</h3>
                <p className="text-sm">Ambient electronic soundtrack created for Solcada 2025</p>
              </div>

              <p className="text-[#00ff00]/70 text-xs mt-4">© 2025 Solcada Collective. All rights reserved.</p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
