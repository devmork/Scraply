import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AuthLayout from "@/components/layout/AuthLayout"
import { useState } from "react"

type Role = "seller" | "collector" | "shop" | null

export default function SelectRole({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [selectedRole, setSelectedRole] = useState<Role>(null)

  const handleContinue = () => {
    if (selectedRole) {
      // This will handle role submission (backend integration later)
      console.log("Selected role:", selectedRole)
    }
  }

  return (
    <AuthLayout>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-2 text-center mb-8">
              <h1 className="text-2xl font-bold">Choose Your Role</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Select how you want to use Scraply
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              {/* Seller Role */}
              <button
                onClick={() => setSelectedRole("seller")}
                className={cn(
                  "p-6 rounded-lg border-2 transition-all text-left",
                  selectedRole === "seller"
                    ? "border-green-600 bg-green-50 dark:bg-green-950"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">♻️</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">I have junk to sell</h3>
                    <p className="text-sm text-muted-foreground">
                      Post recyclables for pickup
                    </p>
                  </div>
                  {selectedRole === "seller" && (
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>

              {/* Collector Role */}
              <button
                onClick={() => setSelectedRole("collector")}
                className={cn(
                  "p-6 rounded-lg border-2 transition-all text-left",
                  selectedRole === "collector"
                    ? "border-green-600 bg-green-50 dark:bg-green-950"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🚚</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">I collect junk</h3>
                    <p className="text-sm text-muted-foreground">
                      Find pickups near you
                    </p>
                  </div>
                  {selectedRole === "collector" && (
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>

              {/* Shop Role */}
              <button
                onClick={() => setSelectedRole("shop")}
                className={cn(
                  "p-6 rounded-lg border-2 transition-all text-left",
                  selectedRole === "shop"
                    ? "border-green-600 bg-green-50 dark:bg-green-950"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🏪</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">I run a junk shop</h3>
                    <p className="text-sm text-muted-foreground">
                      Buy bulk recyclables
                    </p>
                  </div>
                  {selectedRole === "shop" && (
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!selectedRole}
              className="w-full mt-8 bg-green-600 hover:bg-green-700"
              size="lg"
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}