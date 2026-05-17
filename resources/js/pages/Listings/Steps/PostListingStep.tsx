import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import ListingLayout from "@/components/layout/ListingLayout"
import {
  IconCheck,
  IconArrowLeft,
  IconMapPin,
  IconCalendar,
  IconTag,
} from "@tabler/icons-react"

interface Photo {
  id: string
  file: File
  preview: string
  order: number
}

interface ListingPreviewStepProps {
  onPost?: (data: {
    photos: Photo[]
    title: string
    quantity: number
    price: number
    isFree: boolean
    pickupAvailability: string
    pickupLocation: string
    latitude?: number
    longitude?: number
  }) => void
  onBack?: () => void
  listingData?: {
    photos?: Photo[]
    title?: string
    quantity?: number
    price?: number
    isFree?: boolean
    pickupDate?: string
    pickupTime?: string
  }
}

export default function ListingPreviewStep({
  onPost,
  onBack,
  listingData = {},
}: ListingPreviewStepProps) {
  const [pickupLocation, setPickupLocation] = useState<string>("Davao City, Davao del Sur")
  const [latitude, setLatitude] = useState<number>(6.9271)
  const [longitude, setLongitude] = useState<number>(122.5449)

  // Calculate pickup availability text from date and time
  const calculatePickupAvailability = () => {
    if (!listingData.pickupDate || !listingData.pickupTime) {
      return "Not set"
    }

    const pickupDateObj = new Date(listingData.pickupDate)

    // Format date as "May 30, 2026"
    const dateLabel = pickupDateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Format time to 12-hour format
    const [hours, minutes] = listingData.pickupTime.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12

    return `${dateLabel}, ${displayHour}:${minutes} ${ampm}`
  }

  const pickupAvailability = calculatePickupAvailability()


  const handlePost = () => {
    if (!pickupLocation) {
      alert("Please enter pickup location")
      return
    }
    onPost?.({
      photos: listingData.photos || [],
      title: listingData.title || "",
      quantity: listingData.quantity || 0,
      price: listingData.price || 0,
      isFree: listingData.isFree || false,
      pickupAvailability: calculatePickupAvailability(),
      pickupLocation,
      latitude: latitude || 6.9271,
      longitude: longitude || 122.5449,
    })
  }

  const firstPhoto = listingData.photos?.[0]

  return (
    <ListingLayout currentStep={3} totalSteps={3} onBack={onBack}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Post a Listing</h1>
        </div>

        <Card className="overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Pickup Availability */}
            <FieldGroup>
              <FieldLabel className="text-base font-semibold">
                PICKUP AVAILABILITY
              </FieldLabel>
              <div className="relative">
                <IconCalendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Not set"
                  value={pickupAvailability}
                  disabled
                  className="pl-10 bg-muted cursor-not-allowed"
                />
              </div>
            </FieldGroup>

            <Separator />

            {/* Pickup Location */}
            <FieldGroup>
              <FieldLabel className="text-base font-semibold">
                PICKUP LOCATION
              </FieldLabel>
              <div className="space-y-3">
                {/* Map */}
                <div className="w-full h-48 rounded-lg border border-border bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center relative overflow-hidden">
                  <div className="text-4xl">📍</div>
                </div>

                {/* Location Input */}
                <div className="relative">
                  <IconMapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    type="text"
                    placeholder="Enter pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </FieldGroup>

            <Separator />

            {/* Preview */}
            <FieldGroup>
              <FieldLabel className="text-base font-semibold">
                PREVIEW
              </FieldLabel>
              <div className="flex gap-3 p-4 rounded-lg border border-border bg-muted/30">
                {/* Photo */}
                {firstPhoto && (
                  <img
                    src={firstPhoto.preview}
                    alt="Listing preview"
                    className="h-24 w-24 rounded object-cover flex-shrink-0"
                  />
                )}

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Category Badge */}
                  {listingData.title && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-700">
                        PLASTIC
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {listingData.title || "No title"}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="text-xs text-muted-foreground">
                    <span>{listingData.quantity}</span>
                    {!listingData.isFree && (
                      <>
                        {" "}·{" "}
                        <span className="font-medium text-foreground">
                          ₱{listingData.price}
                        </span>
                      </>
                    )}
                    {listingData.isFree && (
                      <>
                        {" "}·{" "}
                        <span className="font-medium text-foreground">
                          Free
                        </span>
                      </>
                    )}
                  </div>
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
                onClick={handlePost}
                size="lg"
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                Post Now
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ListingLayout>
  )
}