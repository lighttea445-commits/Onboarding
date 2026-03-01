"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

interface PersonalizedHookScreenProps {
  onNext: () => void
}

export function PersonalizedHookScreen({ onNext }: PersonalizedHookScreenProps) {
  const [bodyVisible, setBodyVisible] = useState(false)
  const [subVisible, setSubVisible] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setBodyVisible(true), 200)
    const t2 = setTimeout(() => setSubVisible(true), 1200)
    const t3 = setTimeout(() => setFooterVisible(true), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
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
        <p className={`font-serif text-[1.7rem] font-bold leading-snug transition-all duration-700 ${
          bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <span className="text-foreground">{"Imagine if "}</span>
          <span className="text-primary">5 minutes</span>
          <span className="text-foreground">{" made you ready to take on your day."}</span>
        </p>

        <p className={`text-muted-foreground text-sm mt-6 leading-relaxed transition-all duration-600 ${
          subVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}>
          {"Now let's build that habit together."}
        </p>
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
