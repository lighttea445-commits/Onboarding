"use client"

interface SkipModalProps {
  onGoBack: () => void
  onSkip: () => void
}

export function SkipModal({ onGoBack, onSkip }: SkipModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-3xl p-8 mx-8 max-w-[320px] w-full text-center animate-scale-in">
        <h3 className="font-serif text-xl font-bold text-foreground mb-2">
          Are you sure you want to do this?
        </h3>
        <p className="text-muted-foreground text-sm mb-8">
          This is a main feature of the app.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onGoBack}
            className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all active:scale-[0.98]"
          >
            Go Back
          </button>
          <button
            onClick={onSkip}
            className="w-full py-3.5 rounded-full bg-secondary text-muted-foreground font-medium text-sm transition-all active:scale-[0.98] hover:text-foreground"
          >
            Skip Anyway
          </button>
        </div>
      </div>
    </div>
  )
}
