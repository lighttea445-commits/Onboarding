"use client"

import { useState, useCallback } from "react"
import { SplashScreen } from "@/components/onboarding/splash-screen"
import { TapScreen } from "@/components/onboarding/tap-screen"
import { HookScreen } from "@/components/onboarding/hook-screen"
import { NameInputScreen } from "@/components/onboarding/name-input-screen"
import { PersonalizedHookScreen } from "@/components/onboarding/personalized-hook-screen"
import { PhoneUsageScreen } from "@/components/onboarding/phone-usage-screen"
import { GoalsScreen } from "@/components/onboarding/goals-screen"
import { ValidationScreen } from "@/components/onboarding/validation-screen"
import { AgeScreen } from "@/components/onboarding/age-screen"
import { GenderScreen } from "@/components/onboarding/gender-screen"
import { BenefitsScreen } from "@/components/onboarding/benefits-screen"
import { NotificationsScreen } from "@/components/onboarding/notifications-screen"
import { StreakScreen } from "@/components/onboarding/streak-screen"
import { CategoriesScreen } from "@/components/onboarding/categories-screen"
import { WidgetScreen } from "@/components/onboarding/widget-screen"
import { CommitmentScreen } from "@/components/onboarding/commitment-screen"
import { OfferScreen } from "@/components/onboarding/offer-screen"

export interface OnboardingData {
  name: string
  gender: string
  age: string
  goals: string[]
  phoneUsage: string
  categories: string[]
  notificationCount: number
  notificationStart: string
  notificationEnd: string
}

const TOTAL_STEPS = 18
const PROGRESS_START_STEP = 7

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  const [data, setData] = useState<OnboardingData>({
    name: "",
    gender: "",
    age: "",
    goals: [],
    phoneUsage: "",
    categories: [
      "Mindfulness", "Success", "Love", "Gratitude", "Courage", "Happiness",
      "Leadership", "Resilience", "Spirituality", "Fitness", "Creativity",
      "Focus", "Relationships", "Growth", "Peace", "Wisdom",
    ],
    notificationCount: 3,
    notificationStart: "9:00 AM",
    notificationEnd: "10:00 PM",
  })

  const next = useCallback(() => {
    setDirection("forward")
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }, [])

  const back = useCallback(() => {
    setDirection("back")
    setStep((s) => Math.max(s - 1, 0))
  }, [])

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }, [])

  const progress =
    step >= PROGRESS_START_STEP
      ? ((step - PROGRESS_START_STEP) / (TOTAL_STEPS - 1 - PROGRESS_START_STEP)) * 100
      : undefined

  const screenProps = { data, updateData, next, back, progress, direction }

  return (
    <main className="min-h-dvh bg-[#111] flex items-center justify-center">
      <div className="w-full max-w-[390px] h-dvh relative overflow-hidden bg-background">
        {step === 0 && <SplashScreen onNext={next} />}
        {step === 1 && <TapScreen text="Hey" onNext={next} />}
        {step === 2 && <HookScreen onNext={next} />}
        {step === 3 && <NameInputScreen {...screenProps} />}
        {step === 4 && (
          <TapScreen text={`Okay ${data.name || "friend"}, consider this...`} onNext={next} />
        )}
        {step === 5 && <PersonalizedHookScreen onNext={next} />}
        {step === 6 && <PhoneUsageScreen {...screenProps} />}
        {step === 7 && <GoalsScreen {...screenProps} />}
        {step === 8 && <ValidationScreen {...screenProps} />}
        {step === 9 && <AgeScreen {...screenProps} />}
        {step === 10 && <GenderScreen {...screenProps} />}
        {step === 11 && <BenefitsScreen {...screenProps} />}
        {step === 12 && <NotificationsScreen {...screenProps} />}
        {step === 13 && <StreakScreen {...screenProps} />}
        {step === 14 && <CategoriesScreen {...screenProps} />}
        {step === 15 && <WidgetScreen {...screenProps} />}
        {step === 16 && <CommitmentScreen onNext={next} onBack={back} progress={progress} />}
        {step === 17 && <OfferScreen {...screenProps} />}
      </div>
    </main>
  )
}
