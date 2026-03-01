"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

interface TapScreenProps {
  text: string
  onNext: () => void
}

export function TapScreen({ text, onNext }: TapScreenProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="h-dvh flex flex-col justify-between px-8 py-16 cursor-pointer select-none"
      onClick={onNext}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onNext() }}
      aria-label="Tap to continue"
    >
      <div className="flex-1 flex items-center">
        <h1
          className={`font-serif text-4xl font-bold text-foreground leading-snug transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {text}
        </h1>
      </div>

      <div className={`flex items-center justify-end gap-2 text-muted-foreground transition-all duration-700 delay-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}>
        <span className="text-sm">Tap to continue</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  )
}
