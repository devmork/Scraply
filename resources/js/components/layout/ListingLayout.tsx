import React from "react"
import { cn } from "@/lib/utils"

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
        {/* Header with back button and step counter */}
        <div className="mb-8 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}
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