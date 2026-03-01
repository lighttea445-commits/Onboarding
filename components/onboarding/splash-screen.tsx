"use client"

import Image from "next/image"

interface SplashScreenProps {
  onNext: () => void
}

export function SplashScreen({ onNext }: SplashScreenProps) {
  return (
    <div className="h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-[340px] rounded-3xl overflow-hidden relative animate-scale-in">
        <div className="relative aspect-[3/4]">
          <Image
            src="/images/clouds.jpg"
            alt="Warm dramatic clouds"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-[#1a1a1a]/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between p-8">
            <div className="pt-6">
              <h1 className="font-serif text-4xl font-bold text-foreground leading-tight text-balance animate-fade-in-up">
                Quotable
              </h1>
              <p className="text-muted-foreground text-base mt-3 animate-fade-in-up animation-delay-200">
                Daily Affirmations & Motivation
              </p>
            </div>

            <div className="pb-2 animate-fade-in-up animation-delay-400">
              <button
                onClick={onNext}
                className="w-full py-4 rounded-full bg-foreground/80 text-background font-semibold text-base backdrop-blur-sm hover:bg-foreground/90 transition-all active:scale-[0.98]"
              >
                Begin My Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
