import React, { useState, useEffect } from "react"
import PhotoUploadStep from "@/pages/Listings/Steps/PhotoUploadStep.tsx"
import ListingDetailsStep from "@/pages/Listings/Steps/ListingDetailsStep.tsx"
import PostListingStep from "@/pages/Listings/Steps/PostListingStep.tsx"
import AuthenticatedLayout from "../AuthenticatedLayout"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import ListingLayout from "@/components/layout/ListingLayout"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  const handlePreviewStepNext = async (data: {
    photos: Photo[]
    title: string
    quantity: number
    price: number
    isFree: boolean
    pickupAvailability: string
    pickupLocation: string
    latitude?: number
    longitude?: number
  }) => {
    try {
      const response = await fetch('/api/create-junk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          title: data.title,
          quantity: data.quantity,
          price: data.price,
          isFree: data.isFree,
          pickupAvailability: data.pickupAvailability,
          pickupLocation: data.pickupLocation,
          latitude: data.latitude,
          longitude: data.longitude,
        }),
      })

      if (!response.ok) {
        // const contentType = response.headers.get('content-type')
        // let errorMessage = 'Error posting listing'

        // if (contentType?.includes('application/json')) {
        //   try {
        //     const error = await response.json()
        //     errorMessage = error.message || errorMessage
        //   } catch {
        //     errorMessage = `Server error (${response.status})`
        //   }
        // } else {
        //   errorMessage = `Server error (${response.status})`
        // }

        // alert(errorMessage)
        // return

        const error = await response.json()
        alert(error.message || 'Error posting listing')
        return
      }

      const result = await response.json()
      alert('Listing posted successfully!')
      // Redirect to listings page or dashboard
      window.location.href = '/listings'
    } catch (error) {
      console.error('Error posting listing:', error)
      alert('Error posting listing')
    }
  }


  const handleBack = () => {
    setListingData((prev) => ({
      ...prev,
      step: Math.max(1, prev.step - 1),
    }))
  }

  return (
    <SidebarInset className="min-h-screen bg-[#e9e9e5] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-300/80 bg-[#f5f5f1]/95 backdrop-blur">
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-slate-700 hover:text-slate-950" />
            <Button variant="ghost" size="icon-sm" onClick={handleBack} className="text-slate-600">
              <ChevronLeft className="size-5" />
            </Button>
            <h1 className="text-xl font-bold tracking-tight">Post Junk</h1>
          </div>
        </div>
      </header>

      <main className="w-full">
        <ListingLayout currentStep={listingData.step} totalSteps={3} onBack={handleBack}>
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
        </ListingLayout>
      </main>
    </SidebarInset>




    // <>
    //   {listingData.step === 1 && (
    //     <PhotoUploadStep
    //       onNext={handlePhotoStepNext}
    //       onBack={handleBack}
    //       initialData={listingData}
    //     />
    //   )}
    //   {listingData.step === 2 && (
    //     <ListingDetailsStep
    //       onNext={handleDetailsStepNext}
    //       onBack={handleBack}
    //       initialData={listingData}
    //       onDataChange={handleDetailsDataChange}
    //     />
    //   )}
    //   {listingData.step === 3 && (
    //     <PostListingStep
    //       onPost={handlePreviewStepNext}
    //       onBack={handleBack}
    //       listingData={listingData}
    //     />
    //   )}
    // </>
  )
}

CreateListing.layout = (page: React.ReactNode) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
)