import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import ListingLayout from "@/components/layout/ListingLayout"
import { IconCheck, IconArrowLeft } from "@tabler/icons-react"

interface ListingDetailsStepProps {
  onNext?: (data: { quantity: number; price: number; isFree: boolean; pickupDate: string; pickupTime: string }) => void
  onDataChange?: (data: { quantity: number; price: number; isFree: boolean; pickupDate: string; pickupTime: string }) => void
  onBack?: () => void
  initialData?: {
    quantity?: number
    price?: number
    isFree?: boolean
    pickupDate?: string
    pickupTime?: string
  }
}

export default function ListingDetailsStep({
  onNext,
  onDataChange,
  onBack,
  initialData,
}: ListingDetailsStepProps) {
  const [quantity, setQuantity] = useState<number>(initialData?.quantity || 0)
  const [price, setPrice] = useState<number>(initialData?.price || 0)
  const [isFree, setIsFree] = useState<boolean>(initialData?.isFree || false)
  const [pickupDate, setPickupDate] = useState<string>(initialData?.pickupDate || "")
  const [pickupTime, setPickupTime] = useState<string>(initialData?.pickupTime || "")

  useEffect(() => {
    onDataChange?.({
      quantity,
      price,
      isFree,
      pickupDate,
      pickupTime,
    })
  }, [quantity, price, isFree, pickupDate, pickupTime, onDataChange])



  const handleContinue = () => {
    if (quantity <= 0) {
      alert("Quantity must be at least 1")
      return
    }
    if (!isFree && price <= 0) {
      alert("Please enter a valid price or select 'Offer for free/donation'")
      return
    }
    if (!pickupDate) {
      alert("Please select a pickup date")
      return
    }
    if (!pickupTime) {
      alert("Please select a pickup time")
      return
    }
    onNext?.({ quantity, price, isFree, pickupDate, pickupTime })
  }


  return (
    <ListingLayout currentStep={2} totalSteps={3} onBack={onBack}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Post a Listing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us about the quantity and price
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Quantity Field */}
            <FieldGroup>
              <FieldLabel className="text-base font-semibold">
                QUANTITY
              </FieldLabel>
              <div className="flex gap-3">
                <Input
                  type="number"
                  placeholder="0"
                  value={quantity || ""}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                  step="0.1"
                  className="flex-1"
                />

              </div>
            </FieldGroup>

            <Separator />

            {/* Price Field */}
            <FieldGroup>
              <div className="flex items-center justify-between">
                <FieldLabel className="text-base font-semibold">
                  PREFERRED PRICE
                </FieldLabel>
                <span className="text-xs text-muted-foreground">total</span>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground font-medium">
                  ₱
                </span>
                <Input
                  type="number"
                  placeholder="0"
                  value={price || ""}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  disabled={isFree}
                  step="0.01"
                  className="pl-8"
                />
              </div>
            </FieldGroup>

            {/* Offer for Free Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
              <label className="text-sm font-medium cursor-pointer">
                Offer for free / donation
              </label>
              <Switch
                checked={isFree}
                onCheckedChange={(checked) => {
                  setIsFree(checked)
                  if (checked) {
                    setPrice(0)
                  }
                }}
              />
            </div>

            <Separator className="my-4" />

            {/* Pickup Availability */}
            <FieldGroup>
              <FieldLabel className="text-base font-semibold">
                PICKUP AVAILABILITY
              </FieldLabel>
              <div className="space-y-3">
                {/* Date Input */}
                <div>
                  <Input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>

                {/* Time Input */}
                <div>
                  <Input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
              </div>
            </FieldGroup>

            <Separator className="my-4" />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={onBack}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <IconArrowLeft size={18} />
                Back
              </Button>
              <Button
                onClick={handleContinue}
                size="lg"
                className="flex-1"
              >
                <IconCheck size={18} />
                Continue
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ListingLayout>
  )
}