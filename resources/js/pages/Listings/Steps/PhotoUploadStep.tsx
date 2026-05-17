import React, { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import ListingLayout from "@/components/layout/ListingLayout"
import {
  IconCamera,
  IconX,
  IconGripVertical,
  IconCheck,
} from "@tabler/icons-react"

interface Photo {
  id: string
  file: File
  preview: string
  order: number
}

interface PhotoUploadStepProps {
  onNext?: (data: { photos: Photo[]; title: string }) => void
  onBack?: () => void
  initialData?: {
    photos?: Photo[]
    title?: string
  }
}



export default function PhotoUploadStep({
  onNext,
  onBack,
  initialData,
}: PhotoUploadStepProps) {
  const [photos, setPhotos] = useState<Photo[]>(initialData?.photos || [])
  const [title, setTitle] = useState<string>(initialData?.title || "")
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return

      const newPhotos: Photo[] = []
      const maxPhotos = 10

      Array.from(files).forEach((file) => {
        if (photos.length + newPhotos.length < maxPhotos && file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (e) => {
            newPhotos.push({
              id: `photo-${Date.now()}-${Math.random()}`,
              file,
              preview: e.target?.result as string,
              order: photos.length + newPhotos.length,
            })

            if (newPhotos.length === Array.from(files).filter((f) => f.type.startsWith("image/")).length) {
              setPhotos((prev) => [...prev, ...newPhotos])
            }
          }
          reader.readAsDataURL(file)
        }
      })
    },
    [photos.length]
  )

  // Handle drag over drop zone
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // Handle drop on upload area
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    handleFileSelect(e.dataTransfer.files)
  }

  // Remove photo
  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  // Handle photo reordering with drag
  const handlePhotosDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handlePhotosDragOver = (index: number) => {
    if (draggedIndex === null) return
    setDraggedOverIndex(index)
  }

  const handlePhotosDrop = () => {
    if (draggedIndex === null || draggedOverIndex === null) return

    const newPhotos = [...photos]
    const draggedPhoto = newPhotos[draggedIndex]
    newPhotos.splice(draggedIndex, 1)
    newPhotos.splice(draggedOverIndex, 0, draggedPhoto)

    setPhotos(
      newPhotos.map((p, i) => ({
        ...p,
        order: i,
      }))
    )

    setDraggedIndex(null)
    setDraggedOverIndex(null)
  }

  const handlePhotoDragEnd = () => {
    setDraggedIndex(null)
    setDraggedOverIndex(null)
  }

  const handleContinue = () => {
    if (photos.length === 0) {
      alert("Please upload at least one photo")
      return
    }
    if (!title.trim()) {
      alert("Please enter a title")
      return
    }

    onNext?.({ photos, title })
  }

  return (
    <ListingLayout currentStep={1} totalSteps={3} onBack={onBack}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Post a Listing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add photos of your junk items (up to 10 photos)
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Photo Upload Area */}
            <FieldGroup>
              <FieldLabel className="text-base font-semibold">
                PHOTO
              </FieldLabel>

              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 transition-all hover:bg-muted hover:border-primary"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />

                <IconCamera
                  size={48}
                  className="text-muted-foreground group-hover:text-primary transition-colors mb-2"
                />
                <p className="text-center text-sm font-medium">
                  Tap to add a photo
                </p>
                <p className="text-center text-xs text-muted-foreground mt-1">
                  We'll use a placeholder if skipped
                </p>
              </div>

              {/* Photo Count Info */}
              {photos.length > 0 && (
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{photos.length} photo(s) added</span>
                  <span>{10 - photos.length} more allowed</span>
                </div>
              )}
            </FieldGroup>

            {/* Photos Preview and Reordering */}
            {photos.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {photos.length > 1
                    ? "Drag to reorder photos"
                    : "Your photo"}
                </p>
                <div className="grid gap-3">
                  {photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      draggable
                      onDragStart={() => handlePhotosDragStart(index)}
                      onDragOver={() => handlePhotosDragOver(index)}
                      onDrop={handlePhotosDrop}
                      onDragEnd={handlePhotoDragEnd}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg border p-3 transition-all",
                        draggedIndex === index
                          ? "opacity-50 border-primary bg-primary/5"
                          : draggedOverIndex === index
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                      )}
                    >
                      {/* Drag Handle */}
                      {photos.length > 1 && (
                        <div className="cursor-grab active:cursor-grabbing text-muted-foreground group-hover:text-foreground transition-colors">
                          <IconGripVertical size={18} />
                        </div>
                      )}

                      {/* Photo Preview */}
                      <img
                        src={photo.preview}
                        alt={`Photo ${index + 1}`}
                        className="h-16 w-16 rounded object-cover"
                      />

                      {/* Photo Info */}
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-medium">
                          Photo {index + 1}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(photo.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removePhoto(photo.id)}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <IconX size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-4" />

            {/* Title Field */}
            <FieldGroup>
              <FieldLabel className="text-base font-semibold">
                TITLE <span className="text-xs font-normal text-muted-foreground">(OPTIONAL)</span>
              </FieldLabel>
              <Input
                type="text"
                placeholder="e.g. Plastic bottles bundle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </FieldGroup>

            <Separator className="my-4" />

            {/* Continue Button */}
            <div className="flex gap-3">
              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full"
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