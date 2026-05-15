import React, { useState } from "react"
import PhotoUploadStep from "@/pages/Listings/Steps/PhotoUploadStep.tsx"
import ListingDetailsStep from "@/pages/Listings/Steps/ListingDetailsStep.tsx"

interface Photo {
  id: string
  file: File
  preview: string
  order: number
}

interface ListingData {
  step: number
  photos: Photo[]
  quantity?: number
  unit?: string
  price?: number
  isFree?: boolean
}

export default function CreateListing() {
  const [listingData, setListingData] = useState<ListingData>({
    step: 1,
    photos: [],
  })

  const handlePhotoStepNext = (data: { photos: Photo[] }) => {
    setListingData((prev) => ({
      ...prev,
      step: 2,
      photos: data.photos,
    }))
    // In future: navigate to Step 2
  }

  const handleDetailsStepNext = (data: {
    quantity: number
    unit: string
    price: number
    isFree: boolean
  }) => {
    setListingData((prev) => ({
      ...prev,
      step: 3,
      ...data,
    }))
    // Here you can submit the complete listing data
    console.log("Complete listing data:", { ...listingData, ...data })
  }

  const handleBack = () => {
    setListingData((prev) => ({
      ...prev,
      step: Math.max(1, prev.step - 1),
    }))
  }

  return (
    <>
      {listingData.step === 1 && (
        <PhotoUploadStep
          onNext={handlePhotoStepNext}
        />
      )}
      {listingData.step === 2 && (
        <ListingDetailsStep
          onNext={handleDetailsStepNext}
          onBack={handleBack}
          initialData={listingData}
        />
      )}
    </>
  )
}