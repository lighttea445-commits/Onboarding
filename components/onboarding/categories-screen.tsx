"use client"

import { useState } from "react"
import type { OnboardingData } from "@/app/page"
import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"

interface CategoriesScreenProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  next: () => void
  back: () => void
  progress?: number
}

const allCategories = [
  "Mindfulness", "Success", "Love", "Gratitude", "Courage", "Happiness",
  "Leadership", "Resilience", "Spirituality", "Fitness", "Creativity",
  "Focus", "Relationships", "Growth", "Peace", "Wisdom",
]

export function CategoriesScreen({ data, updateData, next, back, progress }: CategoriesScreenProps) {
  const [selected, setSelected] = useState<string[]>(data.categories)

  const toggleCategory = (cat: string) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleContinue = () => {
    updateData({ categories: selected })
    next()
  }

  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} />

      <div className="flex-1 px-6 pt-2 overflow-y-auto">
        <h1 className="font-serif text-3xl font-bold text-foreground leading-tight animate-fade-in-up">
          What brings you joy?
        </h1>

        <div className="mt-7 flex flex-wrap gap-2.5 animate-fade-in-up animation-delay-200">
          {allCategories.map((cat) => {
            const isSelected = selected.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-primary/15 border-primary/40 text-foreground"
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {isSelected ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="text-primary text-xs flex-shrink-0">+</span>
                )}
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      <div className="animate-fade-in animation-delay-400">
        <ContinueButton onClick={handleContinue} disabled={selected.length === 0} />
      </div>
    </div>
  )
}
