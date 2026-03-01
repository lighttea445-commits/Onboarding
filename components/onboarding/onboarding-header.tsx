"use client"

import { ChevronLeft } from "lucide-react"

interface OnboardingHeaderProps {
  progress?: number
  onBack?: () => void
  onSkip?: () => void
}

export function OnboardingHeader({ progress, onBack, onSkip }: OnboardingHeaderProps) {
  return (
    <div className="px-6 pt-4 pb-2">
      {progress !== undefined && (
        <div className="w-full h-[3px] bg-secondary rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
      <div className="flex items-center justify-between min-h-[36px]">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
        ) : (
          <div />
        )}
        {onSkip ? (
          <button
            onClick={onSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
