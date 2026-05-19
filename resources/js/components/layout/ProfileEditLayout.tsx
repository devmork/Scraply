import { useEffect, useRef, useState } from "react"
import { usePage } from "@inertiajs/react"
import { Camera, Check, X, AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  validateEmail,
  validatePhone,
  validateName,
  validateAvatarFile,
} from "@/lib/validation"
import { User as UserType } from "@/types/user.type"

type AuthProps = {
  auth?: {
    user?: UserType
  }
}

interface FormState {
  name: string
  email: string
  phone: string
  avatar: File | null
}

interface ValidationState {
  name: string
  email: string
  phone: string
}

interface Message {
  type: "success" | "error"
  text: string
}

const ProfileEditForm = () => {
  const { auth } = usePage<AuthProps>().props
  const user = auth?.user

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<FormState>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: null,
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar_url || null
  )
  const [validationErrors, setValidationErrors] = useState<ValidationState>({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<Message | null>(null)

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatar: null,
    })
    setAvatarPreview(user?.avatar_url || null)
    setValidationErrors({ name: "", email: "", phone: "" })
    setMessage(null)
  }

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Real-time validation
    validateField(name, value)
  }

  // Validate individual field
  const validateField = (fieldName: string, value: string) => {
    let error = ""

    if (fieldName === "email") {
      const result = validateEmail(value)
      error = result.error || ""
    } else if (fieldName === "phone") {
      const result = validatePhone(value)
      error = result.error || ""
    } else if (fieldName === "name") {
      const result = validateName(value)
      error = result.error || ""
    }

    setValidationErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }))
  }

  // Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validation = validateAvatarFile(file)
    if (!validation.isValid) {
      setMessage({
        type: "error",
        text: validation.error || "Invalid file",
      })
      return
    }

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }))

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Validate entire form
  const validateForm = (): boolean => {
    const nameResult = validateName(formData.name)
    const emailResult = validateEmail(formData.email)
    const phoneResult = validatePhone(formData.phone)

    const errors: ValidationState = {
      name: nameResult.error || "",
      email: emailResult.error || "",
      phone: phoneResult.error || "",
    }

    setValidationErrors(errors)

    return nameResult.isValid && emailResult.isValid && phoneResult.isValid
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Please fix all errors before submitting",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formPayload = new FormData()
      formPayload.append("name", formData.name)
      formPayload.append("email", formData.email)
      formPayload.append("phone", formData.phone)
      if (formData.avatar) {
        formPayload.append("avatar", formData.avatar)
      }

      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formPayload,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile")
      }

      setMessage({
        type: "success",
        text: "Profile updated successfully!",
      })
      setIsEditing(false)

      // Optionally refresh the page or update auth state here
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred"
      setMessage({
        type: "error",
        text: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (!isEditing) {
    return (
      <Button
        onClick={() => setIsEditing(true)}
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
      >
        Edit Profile
      </Button>
    )
  }

  return (
    <div className="space-y-4">
      {/* Alert Messages */}
      {message && (
        <div
          className={cn(
            "rounded-lg p-3 text-sm font-medium flex items-center gap-2",
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          )}
        >
          {message.type === "success" ? (
            <Check className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Avatar Section */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Profile Picture</Label>
          <div className="flex items-center gap-4">
            {/* Avatar Preview */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-slate-400">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                disabled={isSubmitting}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Camera className="size-4" />
                Change Picture
              </Button>
              <p className="mt-2 text-xs text-slate-500">
                JPG, PNG, WebP, or GIF up to 5MB
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isSubmitting}
            aria-invalid={!!validationErrors.name}
            className={cn(
              validationErrors.name && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="Enter your full name"
          />
          {validationErrors.name && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3" />
              {validationErrors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isSubmitting}
            aria-invalid={!!validationErrors.email}
            className={cn(
              validationErrors.email && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="Enter your email"
          />
          {validationErrors.email && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3" />
              {validationErrors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isSubmitting}
            aria-invalid={!!validationErrors.phone}
            className={cn(
              validationErrors.phone && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="Enter your phone number"
          />
          {validationErrors.phone && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3" />
              {validationErrors.phone}
            </p>
          )}
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsEditing(false)
              resetForm()
            }}
            disabled={isSubmitting}
            className="flex-1"
          >
            <X className="mr-2 size-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || Object.values(validationErrors).some((e) => e)}
            className="flex-1 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-400"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 size-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileEditForm
