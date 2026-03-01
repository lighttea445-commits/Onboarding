"use client"

import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"

interface OfferScreenProps {
  back: () => void
  progress?: number
}

export function OfferScreen({ back, progress }: OfferScreenProps) {
  const handleClaim = () => {
    alert("Welcome! Your 3-day free trial has started.")
  }

  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} />

      <div className="flex-1 px-6 pt-2">
        <h1 className="font-serif text-3xl font-bold text-foreground leading-tight animate-fade-in-up">
          A special offer just for you!
        </h1>
        <p className="text-muted-foreground text-xs mt-3 leading-relaxed max-w-[300px] animate-fade-in-up animation-delay-100">
          {"Because you're here, enjoy 3 days of premium on the house."}
        </p>

        {/* Paywall placeholder card */}
        <div className="mt-8 animate-fade-in-up animation-delay-300">
          <div className="rounded-2xl border-2 border-dashed border-border p-8 min-h-[200px] flex items-center justify-center">
            {/* PAYWALL COMPONENT */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-serif font-bold">Q</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">Quotable Premium</h3>
              <p className="text-muted-foreground text-xs">3 days free, then $4.99/month</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3 animate-fade-in-up animation-delay-400">
          {["Unlimited daily affirmations", "Beautiful widget themes", "Complete quote library"].map((f) => (
            <div key={f} className="flex items-center gap-3 px-1">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="#c4a265" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm text-foreground">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-fade-in animation-delay-500">
        <ContinueButton onClick={handleClaim} label="Claim My Free Trial" />
      </div>
    </div>
  )
}
