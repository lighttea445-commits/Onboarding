"use client"

import { useState } from "react"
import type { OnboardingData } from "@/app/page"
import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"

interface GenderScreenProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  next: () => void
  back: () => void
  progress?: number
}

const genders = ["Male", "Female", "Other", "Prefer not to say"]

export function GenderScreen({ data, updateData, next, back, progress }: GenderScreenProps) {
  const [selected, setSelected] = useState(data.gender)

  const handleContinue = () => {
    updateData({ gender: selected })
    next()
  }

  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} />

      <div className="flex-1 px-6 pt-2">
        <h1 className="font-serif text-3xl font-bold text-foreground leading-tight animate-fade-in-up">
          How do you identify?
        </h1>

        <div className="mt-8 space-y-3">
          {genders.map((gender, i) => (
            <button
              key={gender}
              onClick={() => setSelected(gender)}
              className={`w-full px-6 py-4 rounded-2xl text-left text-base transition-all duration-200 animate-fade-in-up border ${
                selected === gender
                  ? "bg-primary/15 border-primary/40 text-foreground"
                  : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={{ animationDelay: `${(i + 1) * 60}ms`, opacity: 0 }}
            >
              {gender}
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
