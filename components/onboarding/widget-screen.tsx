"use client"

import { useState } from "react"
import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"
import { SkipModal } from "./skip-modal"

interface WidgetScreenProps {
  next: () => void
  back: () => void
  progress?: number
}

export function WidgetScreen({ next, back, progress }: WidgetScreenProps) {
  const [showSkipModal, setShowSkipModal] = useState(false)

  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} onSkip={() => setShowSkipModal(true)} />

      <div className="flex-1 px-6 pt-2">
        <h1 className="font-serif text-[1.55rem] font-bold text-foreground leading-tight animate-fade-in-up">
          Add a widget to your home screen!
        </h1>
        <p className="text-muted-foreground text-xs mt-2 animate-fade-in-up animation-delay-100">
          Keep your affirmations visible throughout the day.
        </p>

        {/* Phone mockup with widget */}
        <div className="flex justify-center mt-8 animate-scale-in animation-delay-300">
          <div className="relative w-[220px] h-[320px]">
            {/* Phone silhouette */}
            <div className="absolute inset-0 rounded-[2rem] border-2 border-border bg-card/50" />

            {/* Widget card floating over the phone */}
            <div
              className="absolute top-10 left-1/2 -translate-x-1/2 w-[180px] bg-secondary border border-primary/30 rounded-2xl p-4 shadow-lg shadow-primary/5"
              style={{ transform: "translateX(-50%) translateZ(20px)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">Q</span>
                </div>
                <p className="text-foreground text-xs font-medium leading-snug">
                  Your light matters
                </p>
              </div>
            </div>

            {/* App grid inside phone */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-lg bg-muted/15" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="animate-fade-in animation-delay-500">
        <ContinueButton onClick={next} label="Add Widget" />
      </div>

      {showSkipModal && (
        <SkipModal
          onGoBack={() => setShowSkipModal(false)}
          onSkip={() => { setShowSkipModal(false); next() }}
        />
      )}
    </div>
  )
}
