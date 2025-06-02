"use client"

import { ImagePlus, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { AUTH_CONTEXT } from "@/providers/auth"
import { useParams } from "next/navigation"
import ReportEditableInput from "./editableInput"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

// Generic image interface that can accommodate different image types
interface GenericImageData {
  id: string
  name?: string
  description?: string
  thumbnailLink?: string
  link?: string
  [key: string]: any // Allow additional properties
}

interface ReportImageViewerProps {
  selectedImage?: GenericImageData | null
  allowSelection?: boolean
  buttonClassName?: string
  onOpenPicker?: () => void
  onDescriptionChange?: (description: string) => void
}

export function ReportImageViewer({
  allowSelection = false,
  buttonClassName = "",
  selectedImage,
  onOpenPicker,
  onDescriptionChange,
}: ReportImageViewerProps) {
  const { userDetails } = useContext(AUTH_CONTEXT)
  const { bookingNumber: adminBookingNumber } = useParams()

  const bookingNumber = useMemo(() => {
    if (userDetails?.admin) {
      return adminBookingNumber
    } else {
      return userDetails?.bookingNumber
    }
  }, [adminBookingNumber, userDetails?.admin, userDetails?.bookingNumber])

  if (!selectedImage) {
    return (
      <div className="w-full aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-full">
        <ImagePlus className="h-12 w-12 text-gray-400 mb-2" />

        {allowSelection ? (
          <>
            <p className="text-gray-500 mb-1">No images selected</p>
            <p className="text-xs text-gray-400 mb-4">Select an image</p>
            {onOpenPicker && (
              <Button onClick={onOpenPicker} className={buttonClassName || "bg-blue-600 hover:bg-blue-700"}>
                Select Images
              </Button>
            )}
          </>
        ) : (
          <>
            <p className="text-gray-500 mb-1">No images available</p>
          </>
        )}
      </div>
    )
  }

  // Determine the best image source to use
  const getImageSrc = () => {
    // Priority: thumbnailLink > link > API endpoint
    if (selectedImage.thumbnailLink) {
      return selectedImage.thumbnailLink
    }
    if (selectedImage.link) {
      return selectedImage.link
    }
    // Fallback to API endpoint
    return `/api/${userDetails?.admin ? "admin" : "user"}/bookings/${bookingNumber}/pictures/${selectedImage.id}`
  }

  return (
    <div className="w-full aspect-video relative">
      <img
        className="w-full h-full object-cover rounded-md"
        src={getImageSrc() || "/placeholder.svg"}
        alt={selectedImage.name || selectedImage.description || "Selected image"}
        onError={(e) => {
          // Fallback to placeholder if image fails to load
          const target = e.target as HTMLImageElement
          target.src = "/placeholder.svg?height=400&width=600&text=Image+Not+Found"
        }}
      />
      <div className="p-5 absolute right-0 bottom-0 left-0 top-0 flex flex-col justify-between text-white bg-gradient-to-t from-black/30 to-transparent rounded-md">
        <div className="flex justify-end">
          {allowSelection && onOpenPicker && (
            <button
              className={cn(
                "size-10 p-1 rounded-full flex justify-center items-center",
                buttonClassName || "bg-blue-600 hover:bg-blue-700",
              )}
              onClick={onOpenPicker}
            >
              <Pencil className="!size-5" />
            </button>
          )}
        </div>
        {allowSelection && onDescriptionChange ? (
          <ReportEditableInput
            className="w-full"
            value={selectedImage.description ?? "Image Description"}
            onChange={(description) => {
              onDescriptionChange(description as string)
            }}
          />
        ) : null}
      </div>
    </div>
  )
}
