"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Plus } from "lucide-react"
import { ReportImagePicker } from "../common/imagePicker"
import { ReportImageViewer } from "../common/imageViewer"
import type { HouseImage } from "../heating/card"

interface ClientsEquipmentProps {
  isAdmin?: boolean
  houseImages?: HouseImage[]
  selectedImages?: HouseImage[]
  onUpdateImages?: (images: HouseImage[]) => void
}

const ClientsEquipment = ({
  isAdmin = false,
  houseImages = [],
  selectedImages = [],
  onUpdateImages,
}: ClientsEquipmentProps) => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null)

  const handleSelectImage = (id: string) => {
    const selectedImage = houseImages.find((img) => img.id === id)
    if (selectedImage && onUpdateImages) {
      if (editingImageIndex !== null) {
        // Replace existing image
        const updatedImages = [...selectedImages]
        updatedImages[editingImageIndex] = selectedImage
        onUpdateImages(updatedImages)
      } else {
        // Add new image
        onUpdateImages([...selectedImages, selectedImage])
      }
    }
    setIsImagePickerOpen(false)
    setEditingImageIndex(null)
  }

  const handleAddImage = (index: number) => {
    setEditingImageIndex(index)
    setIsImagePickerOpen(true)
  }

  const handleEditImage = (index: number) => {
    setEditingImageIndex(index)
    setIsImagePickerOpen(true)
  }

  const handleDescriptionChange = (index: number, description: string) => {
    if (onUpdateImages) {
      const updatedImages = [...selectedImages]
      // Ensure we have enough slots
      while (updatedImages.length <= index) {
        updatedImages.push({} as HouseImage)
      }
      updatedImages[index] = {
        ...updatedImages[index],
        description,
      }
      onUpdateImages(updatedImages)
    }
  }

  // Ensure we always show exactly 2 slots
  const imageSlots = Array.from({ length: 2 }, (_, index) => selectedImages[index] || null)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="py-4 px-5 border-b border-gray-100">
          <CardTitle className="text-xl font-bold text-[#d47c02] flex items-center">
            <Flame className="size-6 mr-2 text-[#d47c02]" />
            <div className="flex-1">Client's Equipment</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {imageSlots.map((image, index) => (
              <div key={index} className="rounded-md">
                {image && image.id ? (
                  <ReportImageViewer
                    allowSelection={isAdmin}
                    buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
                    selectedImage={image}
                    onOpenPicker={() => handleEditImage(index)}
                    onDescriptionChange={(description) => handleDescriptionChange(index, description as string)}
                  />
                ) : (
                  <div className="rounded-md border-2 border-dashed border-gray-300 hover:border-[#d47c02] transition-colors h-80">
                    {isAdmin ? (
                      <button
                        onClick={() => handleAddImage(index)}
                        className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-[#d47c02] transition-colors"
                      >
                        <Plus className="size-12 mb-2" />
                        <span className="text-sm font-medium">Add Equipment Image {index + 1}</span>
                      </button>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                        <Flame className="size-12 mb-2" />
                        <span className="text-sm">No image selected</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Image Picker Dialog */}
      {isAdmin && (
        <ReportImagePicker
          buttonClassName="bg-[#d47c02] hover:bg-[#B18C2E]/90"
          images={houseImages}
          selectedImage={editingImageIndex !== null ? selectedImages[editingImageIndex]?.id : undefined}
          isOpen={isImagePickerOpen}
          onOpenChange={setIsImagePickerOpen}
          onSelectImage={handleSelectImage}
        />
      )}
    </motion.div>
  )
}

export default ClientsEquipment
