"use client"

import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"
import { Flame } from "lucide-react"

interface StreakScreenProps {
  next: () => void
  back: () => void
  progress?: number
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function StreakScreen({ next, back, progress }: StreakScreenProps) {
  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} />

      <div className="flex-1 px-6 pt-2">
        <h1 className="font-serif text-3xl font-bold text-foreground leading-tight animate-fade-in-up">
          Start your streak today!
        </h1>

        <div className="mt-10 animate-fade-in-up animation-delay-200">
          <div className="bg-secondary rounded-2xl p-6">
            <div className="flex justify-between">
              {days.map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-2">
                  <span className={`text-[10px] font-medium uppercase tracking-wide ${
                    i === 0 ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {day}
                  </span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border-2 ${
                    i === 0
                      ? "bg-primary border-primary"
                      : "bg-transparent border-primary/30"
                  }`}>
                    {i === 0 && (
                      <Flame className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 animate-fade-in-up animation-delay-300">
          <Flame className="w-5 h-5 text-primary" />
          <span className="text-foreground font-semibold text-sm">Day 1</span>
        </div>
      </div>

      <div className="animate-fade-in animation-delay-400">
        <ContinueButton onClick={next} />
      </div>
    </div>
  )
}
