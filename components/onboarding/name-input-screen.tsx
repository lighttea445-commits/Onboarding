"use client"

import { useState } from "react"
import type { OnboardingData } from "@/app/page"
import { ContinueButton } from "./continue-button"

interface NameInputScreenProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  next: () => void
}

export function NameInputScreen({ data, updateData, next }: NameInputScreenProps) {
  const [name, setName] = useState(data.name)

  const handleContinue = () => {
    updateData({ name })
    next()
  }

  return (
    <div className="h-dvh flex flex-col">
      <div className="flex-1 px-7 pt-20">
        <div className="animate-fade-in-up">
          <p className="text-muted-foreground text-xs tracking-wide mb-2">But first.</p>
          <h1 className="font-serif text-3xl font-bold text-foreground leading-tight">
            What should we call you?
          </h1>
        </div>

        <div className="mt-8 animate-fade-in-up animation-delay-200">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-6 py-4 rounded-full bg-input text-foreground placeholder:text-muted-foreground text-base outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            autoFocus
          />
        </div>
      </div>

      <div className="animate-fade-in-up animation-delay-300">
        <ContinueButton onClick={handleContinue} disabled={!name.trim()} />
      </div>
    </div>
  )
}
