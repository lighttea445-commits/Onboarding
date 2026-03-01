"use client"

import { useState } from "react"
import type { OnboardingData } from "@/app/page"
import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"

interface AgeScreenProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  next: () => void
  back: () => void
  progress?: number
}

const ages = ["18-24", "25-34", "35-44", "45-54", "55+"]

export function AgeScreen({ data, updateData, next, back, progress }: AgeScreenProps) {
  const [selected, setSelected] = useState(data.age)

  const handleContinue = () => {
    updateData({ age: selected })
    next()
  }

  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} />

      <div className="flex-1 px-6 pt-2">
        <h1 className="font-serif text-3xl font-bold text-foreground leading-tight animate-fade-in-up">
          How old are you?
        </h1>

        <div className="mt-8 space-y-3">
          {ages.map((age, i) => (
            <button
              key={age}
              onClick={() => setSelected(age)}
              className={`w-full px-6 py-4 rounded-2xl text-left text-base transition-all duration-200 animate-fade-in-up border ${
                selected === age
                  ? "bg-primary/15 border-primary/40 text-foreground"
                  : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={{ animationDelay: `${(i + 1) * 60}ms`, opacity: 0 }}
            >
              {age}
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
