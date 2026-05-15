import React, { useState, useEffect } from "react"
import PhotoUploadStep from "@/pages/Listings/Steps/PhotoUploadStep.tsx"
import ListingDetailsStep from "@/pages/Listings/Steps/ListingDetailsStep.tsx"
import PostListingStep from "@/pages/Listings/Steps/PostListingStep.tsx"

interface Photo {
  id: string
  file: File
  preview: string
  order: number
}

interface ListingData {
  step: number
  photos: Photo[]
  title?: string
  quantity?: number
  unit?: string
  price?: number
  isFree?: boolean
  pickupDate?: string
  pickupTime?: string
}

export default function CreateListing() {
  const [listingData, setListingData] = useState<ListingData>({
    step: 1,
    photos: [],
  })

  const handlePhotoStepNext = (data: { photos: Photo[]; title: string }) => {
    setListingData((prev) => ({
      ...prev,
      step: 2,
      photos: data.photos,
      title: data.title,
    }))
  }

  const handleDetailsStepNext = (data: {
    quantity: number
    unit: string
    price: number
    isFree: boolean
    pickupDate: string
    pickupTime: string
  }) => {
    setListingData((prev) => ({
      ...prev,
      step: 3,
      ...data,
    }))
    // Here you can submit the complete listing data
    // console.log("Complete listing data:", { ...listingData, ...data })
  }

  const handleDetailsDataChange = (data: {
    quantity: number
    price: number
    isFree: boolean
    pickupDate: string
    pickupTime: string
  }) => {
    setListingData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  const handlePreviewStepNext = (data: {
    photos: Photo[]
    title: string
    quantity: number
    unit: string
    price: number
    isFree: boolean
    pickupAvailability: string
    pickupLocation: string
    latitude?: number
    longitude?: number
  }) => {
    setListingData((prev) => ({
      ...prev,
      ...data,
    }))
    // Submit to backend here
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
          onBack={handleBack}
          initialData={listingData}
        />
      )}
      {listingData.step === 2 && (
        <ListingDetailsStep
          onNext={handleDetailsStepNext}
          onBack={handleBack}
          initialData={listingData}
          onDataChange={handleDetailsDataChange}
        />
      )}
      {listingData.step === 3 && (
        <PostListingStep
          onPost={handlePreviewStepNext}
          onBack={handleBack}
          listingData={listingData}
        />
      )}
    </>
  )
}