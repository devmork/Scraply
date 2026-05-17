import React from "react"

interface ListingLayoutProps {
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  onBack?: () => void
}

export default function ListingLayout({
  children,
  currentStep,
  totalSteps,
  onBack,
}: ListingLayoutProps) {
  return (
    <div className="min-h-screen bg-muted p-6 md:p-10">
      <div className="mx-auto w-full max-w-2xl">
        {/*step counter */}
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">
            STEP {currentStep} OF {totalSteps}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-8 h-1 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  )
}