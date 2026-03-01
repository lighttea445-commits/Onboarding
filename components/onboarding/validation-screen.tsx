"use client"

import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"
import type { OnboardingData } from "@/app/page"
import { Sparkles, Target, Heart } from "lucide-react"

interface ValidationScreenProps {
  data: OnboardingData
  next: () => void
  back: () => void
  progress?: number
}

const cards = [
  {
    icon: Sparkles,
    title: "Start my day feeling motivated",
    desc: "Wake up with purpose and positive energy every morning.",
    featured: false,
  },
  {
    icon: Target,
    title: "Build a daily motivation habit",
    desc: "Turn small daily wins into lasting change.",
    featured: false,
  },
  {
    icon: Heart,
    title: "Believe in yourself",
    desc: "Strengthen your self-worth and confidence from within.",
    featured: true,
  },
]

export function ValidationScreen({ next, back, progress }: ValidationScreenProps) {
  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} />

      <div className="flex-1 px-6 pt-2 overflow-y-auto">
        <h1 className="font-serif text-3xl font-bold text-foreground leading-tight animate-fade-in-up">
          {"You're in the right place."}
        </h1>

        <div className="mt-8 space-y-4">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className={`rounded-2xl p-5 animate-fade-in-up ${
                  card.featured
                    ? "bg-primary/10 border-2 border-primary/50"
                    : "bg-secondary border border-transparent"
                }`}
                style={{ animationDelay: `${(i + 1) * 150}ms`, opacity: 0 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    card.featured ? "bg-primary/20" : "bg-primary/10"
                  }`}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold text-sm">{card.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{card.desc}</p>
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
