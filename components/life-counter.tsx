"use client"

interface LifeCounterProps {
  lives: number
}

export function LifeCounter({ lives }: LifeCounterProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-5 h-5 ${i < lives ? "bg-[#00ff00]" : "bg-gray-800"} pixel-heart`}
          style={{
            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        />
      ))}
    </div>
  )
}
