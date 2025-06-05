"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Flame } from "lucide-react"
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white w-full p-8 rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="py-3 px-5 bg-white">
          <h1 className="flex items-center gap-3 font-bold text-xl text-[#d47c02]">
            <Flame className="h-6 w-6 text-[#d47c02]" />
            Client's Equipment
          </h1>
        </div>
        <div className="p-6 border-2 border-gray-200 rounded-xl mx-5 mb-5">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-[#d47c02] mb-2">Equipment Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imageSlots.map((image, index) => (
                <div key={index} className="h-64">
                  {image && image.id ? (
                    <ReportImageViewer
                      allowSelection={isAdmin}
                      buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
                      selectedImage={image}
                      onOpenPicker={() => handleEditImage(index)}
                      onDescriptionChange={(description) => {
                        if (onUpdateImages && image) {
                          const updatedImages = [...selectedImages]
                          updatedImages[index] = { ...image, description: description as string }
                          onUpdateImages(updatedImages)
                        }
                      }}
                    />
                  ) : (
                    <ReportImageViewer
                      allowSelection={isAdmin}
                      buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
                      selectedImage={undefined}
                      onOpenPicker={() => handleAddImage(index)}
                      onDescriptionChange={() => {}}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Picker Dialog */}
      {isAdmin && (
        <ReportImagePicker
          buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
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
