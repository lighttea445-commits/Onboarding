"use client"

import { useState } from "react"
import type { OnboardingData } from "@/app/page"
import { OnboardingHeader } from "./onboarding-header"
import { ContinueButton } from "./continue-button"
import { SkipModal } from "./skip-modal"
import { Minus, Plus } from "lucide-react"

interface NotificationsScreenProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  next: () => void
  back: () => void
  progress?: number
}

export function NotificationsScreen({ data, updateData, next, back, progress }: NotificationsScreenProps) {
  const [count, setCount] = useState(data.notificationCount)
  const [startTime] = useState(data.notificationStart)
  const [endTime] = useState(data.notificationEnd)
  const [showSkipModal, setShowSkipModal] = useState(false)

  const handleEnable = () => {
    updateData({ notificationCount: count, notificationStart: startTime, notificationEnd: endTime })
    next()
  }

  return (
    <div className="h-dvh flex flex-col">
      <OnboardingHeader progress={progress} onBack={back} onSkip={() => setShowSkipModal(true)} />

      <div className="flex-1 px-6 pt-2 overflow-y-auto">
        <h1 className="font-serif text-[1.55rem] font-bold text-foreground leading-tight animate-fade-in-up">
          Get motivation throughout the day!
        </h1>
        <p className="text-muted-foreground text-xs mt-2 animate-fade-in-up animation-delay-100">
          {"Let me know when you'd like to be motivated."}
        </p>

        {/* Notification preview */}
        <div className="mt-6 animate-fade-in-up animation-delay-200">
          <div className="bg-secondary rounded-2xl p-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-xs font-bold">Q</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Quotable</span>
                  <span className="text-xs text-muted-foreground">now</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  Even the smallest flame can light up the darkest room
                </p>
              </div>
            </div>
          </div>
          <div className="bg-secondary/50 rounded-2xl p-3 mb-6 opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-primary/10 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Quotable</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3 animate-fade-in-up animation-delay-300">
          <div className="flex items-center justify-between bg-secondary rounded-2xl px-5 py-4">
            <span className="text-sm text-foreground font-medium">How many</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Decrease notifications"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-bold text-primary w-8 text-center">{count}x</span>
              <button
                onClick={() => setCount((c) => Math.min(10, c + 1))}
                className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Increase notifications"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-secondary rounded-2xl px-5 py-4">
            <span className="text-sm text-foreground font-medium">Start at</span>
            <span className="text-sm text-foreground font-medium">{startTime}</span>
          </div>

          <div className="flex items-center justify-between bg-secondary rounded-2xl px-5 py-4">
            <span className="text-sm text-foreground font-medium">Stop at</span>
            <span className="text-sm text-foreground font-medium">{endTime}</span>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5 animate-fade-in animation-delay-400">
          {"You'll receive"} {count} {"notifications per day between"} {startTime} {"and"} {endTime}
        </p>
      </div>

      <div className="animate-fade-in animation-delay-400">
        <ContinueButton onClick={handleEnable} label="Enable Notifications" />
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
