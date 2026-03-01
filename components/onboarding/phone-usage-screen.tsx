"use client"

import { useState } from "react"
import type { OnboardingData } from "@/app/page"
import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"

interface PhoneUsageScreenProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  next: () => void
  back: () => void
  progress?: number
}

const options = [
  "1-2 hours",
  "2-3 hours",
  "3-4 hours",
  "4-5 hours",
  "5-6 hours",
  "6+ hours",
]

export function PhoneUsageScreen({ data, updateData, next, back, progress }: PhoneUsageScreenProps) {
  const [selected, setSelected] = useState(data.phoneUsage)

  const handleContinue = () => {
    updateData({ phoneUsage: selected })
    next()
  }

  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} />

      <div className="flex-1 px-6 pt-2 overflow-y-auto">
        <h1 className="font-serif text-[1.65rem] font-bold text-foreground leading-tight animate-fade-in-up">
          How much time do you spend on your phone every day?
        </h1>

        <div className="mt-7 space-y-3">
          {options.map((option, i) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`w-full px-6 py-4 rounded-2xl text-left text-base transition-all duration-200 animate-fade-in-up border ${
                selected === option
                  ? "bg-primary/15 border-primary/40 text-foreground"
                  : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={{ animationDelay: `${(i + 1) * 60}ms`, opacity: 0 }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-fade-in animation-delay-400">
        <ContinueButton onClick={handleContinue} disabled={!selected} />
      </div>
    </div>
  )
}
