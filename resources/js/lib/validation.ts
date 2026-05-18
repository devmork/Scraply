export interface ValidationResult {
  isValid: boolean
  error?: string
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: "Email is required" }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Invalid email format" }
  }

  return { isValid: true }
}

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: false, error: "Phone number is required" }
  }

  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    return { isValid: false, error: "Invalid phone number format" }
  }

  return { isValid: true }
}

export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: "Name is required" }
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters" }
  }

  if (name.trim().length > 255) {
    return { isValid: false, error: "Name must not exceed 255 characters" }
  }

  return { isValid: true }
}

export const validateAvatarFile = (file: File): ValidationResult => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Only JPEG, PNG, WebP, and GIF images are allowed",
    }
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "Image must be smaller than 5MB",
    }
  }

  return { isValid: true }
}
