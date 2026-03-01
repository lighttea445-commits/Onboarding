"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { OnboardingHeader } from "./onboarding-header"
import { Fingerprint } from "lucide-react"

interface CommitmentScreenProps {
  onNext: () => void
  onBack: () => void
  progress?: number
}

export function CommitmentScreen({ onNext, onBack, progress }: CommitmentScreenProps) {
  const [holdProgress, setHoldProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [ripple, setRipple] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef(0)

  const HOLD_DURATION = 2000
  const TICK = 30

  const startHold = useCallback(() => {
    if (completed) return
    progressRef.current = 0
    setHoldProgress(0)
    intervalRef.current = setInterval(() => {
      progressRef.current += (TICK / HOLD_DURATION) * 100
      if (progressRef.current >= 100) {
        progressRef.current = 100
        setHoldProgress(100)
        if (intervalRef.current) clearInterval(intervalRef.current)
        setCompleted(true)
        setRipple(true)
      } else {
        setHoldProgress(progressRef.current)
      }
    }, TICK)
  }, [completed])

  const stopHold = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!completed) {
      setHoldProgress(0)
      progressRef.current = 0
    }
  }, [completed])

  useEffect(() => {
    if (completed) {
      const t = setTimeout(onNext, 1200)
      return () => clearTimeout(t)
    }
  }, [completed, onNext])

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const circumference = 2 * Math.PI * 56
  const dashOffset = circumference - (holdProgress / 100) * circumference

  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={onBack} />

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="font-serif text-3xl font-bold text-foreground leading-tight text-center animate-fade-in-up mb-12">
          Commit to improving your life!
        </h1>

        <div
          className="relative select-none"
          onMouseDown={startHold}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={startHold}
          onTouchEnd={stopHold}
          role="button"
          tabIndex={0}
          aria-label="Hold to commit"
        >
          {/* Ripple effect */}
          {ripple && (
            <>
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <div className="absolute -inset-4 rounded-full bg-primary/10 animate-ping animation-delay-200" />
            </>
          )}

          {/* Progress ring */}
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64" cy="64" r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-secondary"
            />
            <circle
              cx="64" cy="64" r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="text-primary transition-all duration-75"
            />
          </svg>

          {/* Center icon */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            completed ? "scale-110" : holdProgress > 0 ? "scale-95" : "scale-100"
          }`}>
            <Fingerprint className={`w-12 h-12 transition-colors duration-300 ${
              completed ? "text-primary" : holdProgress > 0 ? "text-primary/80" : "text-muted-foreground"
            }`} />
          </div>
        </div>

        <p className={`text-muted-foreground text-sm mt-8 transition-all duration-300 ${
          completed ? "opacity-0" : "opacity-100"
        }`}>
          Hold to commit
        </p>

        {completed && (
          <p className="text-primary font-semibold text-sm mt-8 animate-fade-in-up">
            {"You're committed!"}
          </p>
        )}
      </div>
    </div>
  )
}
