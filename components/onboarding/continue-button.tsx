"use client"

interface ContinueButtonProps {
  onClick: () => void
  label?: string
  disabled?: boolean
}

export function ContinueButton({ onClick, label = "Continue", disabled = false }: ContinueButtonProps) {
  return (
    <div className="px-6 pb-8 pt-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-4 rounded-full text-base font-semibold transition-all duration-300 active:scale-[0.98] bg-[#8a8078]/30 text-foreground hover:bg-[#8a8078]/40 ${
          disabled ? "opacity-30 cursor-not-allowed" : ""
        }`}
      >
        {label}
      </button>
    </div>
  )
}
