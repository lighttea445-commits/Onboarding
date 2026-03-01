"use client"

import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"
import { Flame, Sparkles, Target } from "lucide-react"

interface BenefitsScreenProps {
  next: () => void
  back: () => void
  progress?: number
}

const benefits = [
  {
    icon: Flame,
    title: "Stay calm in all of the chaos",
    description: "Mindful moments throughout the day help you stay grounded and manage anxiety.",
  },
  {
    icon: Sparkles,
    title: "Increase positivity",
    description: "Daily reminders shift your mindset toward gratitude and optimism.",
  },
  {
    icon: Target,
    title: "Achieve your goals",
    description: "Positive self-talk reinforces your capabilities and motivates action.",
  },
]

export function BenefitsScreen({ next, back, progress }: BenefitsScreenProps) {
  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} />

      <div className="flex-1 px-6 pt-2 overflow-y-auto">
        <h1 className="font-serif text-[1.55rem] font-bold text-foreground leading-tight animate-fade-in-up">
          The benefits of daily motivation and affirmations.
        </h1>

        <div className="mt-8 space-y-4">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="bg-secondary border border-primary/20 rounded-2xl p-5 animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 150}ms`, opacity: 0 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/15">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold text-sm">{benefit.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="animate-fade-in animation-delay-600">
        <ContinueButton onClick={next} />
      </div>
    </div>
  )
}
