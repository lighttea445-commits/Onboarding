"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

interface HookScreenProps {
  onNext: () => void
}

const lines = [
  { text: "Ever feel you unlock your phone ", highlight: false },
  { text: "100 times a day...", highlight: true },
  { text: " but ", highlight: false },
  { text: "never have the energy", highlight: true },
  { text: " you need to be productive.", highlight: false },
]

export function HookScreen({ onNext }: HookScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [subtextVisible, setSubtextVisible] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 300 + i * 400))
    })
    timers.push(setTimeout(() => setSubtextVisible(true), 300 + lines.length * 400 + 300))
    timers.push(setTimeout(() => setFooterVisible(true), 300 + lines.length * 400 + 700))
    return () => timers.forEach(clearTimeout)
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
      <div className="flex-1 flex flex-col justify-center">
        <p className="font-serif text-[1.7rem] font-bold leading-snug">
          {lines.map((segment, i) => (
            <span
              key={i}
              className={`inline transition-all duration-500 ${
                i < visibleCount ? "opacity-100" : "opacity-0"
              } ${segment.highlight ? "text-primary" : "text-foreground"}`}
            >
              {segment.text}
            </span>
          ))}
        </p>

        <div className={`mt-8 space-y-4 transition-all duration-600 ${subtextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {"You're not alone. Your phone is full of distractions and it's easy to lose sight of what you really want."}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {"What if every time you went on your phone you felt motivated and ready for your day."}
          </p>
        </div>
      </div>

      <div className={`flex items-center justify-end gap-2 text-muted-foreground transition-all duration-500 ${
        footerVisible ? "opacity-100" : "opacity-0"
      }`}>
        <span className="text-sm">Tap to continue</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  )
}
