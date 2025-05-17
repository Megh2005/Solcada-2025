"use client"

interface TerminalProps {
  text: string
  textColor?: string
}

export function Terminal({ text, textColor = "text-[#00ff00]" }: TerminalProps) {
  return (
    <div className="font-mono border border-[#00ff00]/50 bg-black p-4 rounded-md">
      <pre className={`${textColor} whitespace-pre-wrap`}>{text}</pre>
      <div className="h-4 w-2 bg-[#00ff00] inline-block animate-pulse ml-1"></div>
    </div>
  )
}
