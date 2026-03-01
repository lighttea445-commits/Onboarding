"use client"

import { useState } from "react"
import type { OnboardingData } from "@/app/page"
import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"

interface GoalsScreenProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  next: () => void
  back: () => void
  progress?: number
}

const goals = [
  { label: "Start my day ready", icon: "\u2600\uFE0F" },
  { label: "Build a daily motivation habit", icon: "\uD83D\uDCDA" },
  { label: "Deepen my relationship with myself", icon: "\u2764\uFE0F" },
  { label: "Find peace in chaos", icon: "\uD83D\uDD4A\uFE0F" },
  { label: "Memorize quotes that matter", icon: "\u2728" },
  { label: "Share my motivation with others", icon: "\uD83E\uDD1D" },
]

export function GoalsScreen({ data, updateData, next, back, progress }: GoalsScreenProps) {
  const [selected, setSelected] = useState<string[]>(data.goals)

  const toggleGoal = (goal: string) => {
    setSelected((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    )
  }

  const handleContinue = () => {
    updateData({ goals: selected })
    next()
  }

  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} />

      <div className="flex-1 px-6 pt-2 overflow-y-auto">
        <h1 className="font-serif text-[1.65rem] font-bold text-foreground leading-tight animate-fade-in-up">
          What do you want to{" "}
          <span className="text-primary">achieve</span> with Quotable?
        </h1>

        <div className="mt-7 space-y-3">
          {goals.map((goal, i) => (
            <button
              key={goal.label}
              onClick={() => toggleGoal(goal.label)}
              className={`w-full px-5 py-4 rounded-2xl text-left flex items-center gap-4 transition-all duration-200 animate-fade-in-up border ${
                selected.includes(goal.label)
                  ? "bg-primary/15 border-primary/40"
                  : "bg-secondary border-transparent"
              }`}
              style={{ animationDelay: `${(i + 1) * 60}ms`, opacity: 0 }}
            >
              <span className="text-lg flex-shrink-0">{goal.icon}</span>
              <span className="text-sm text-foreground">{goal.label}</span>
              <div className="ml-auto flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    selected.includes(goal.label)
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {selected.includes(goal.label) && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="animate-fade-in animation-delay-400">
        <ContinueButton onClick={handleContinue} disabled={selected.length === 0} />
      </div>
    </div>
  )
}
