"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Info, Plus, Snowflake } from "lucide-react"
import { ReportImagePicker } from "../common/imagePicker"
import { ReportImageViewer } from "../common/imageViewer"
import type { HouseImage } from "../heating/card"

interface AirConditioningAssessmentProps {
  isAdmin?: boolean
  houseImages?: HouseImage[]
  selectedImages?: HouseImage[]
  onUpdateImages?: (images: HouseImage[]) => void
}

const AirConditioningAssessment = ({
  isAdmin = false,
  houseImages = [],
  selectedImages = [],
  onUpdateImages,
}: AirConditioningAssessmentProps) => {
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

  // Ensure we always show exactly 2 slots
  const imageSlots = Array.from({ length: 2 }, (_, index) => selectedImages[index] || null)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="border border-gray-200 rounded-lg p-6">
      <div className="mb-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Snowflake className="h-8 w-8 text-[#d47c02]" />
          <h2 className="text-xl font-bold text-[#d47c02]">Air Conditioning Assessment</h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Content Area */}
          <div className="lg:col-span-2">
            <Card className="rounded-lg border-t border-gray-200 shadow-sm h-full">
              <CardContent className="p-6">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed px-2.5">
                  During your Home Energy Assessment, our technician closely examined your cooling equipment to
                  determine the efficiency level of the system.
                </p>

                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 flex-shrink-0 text-[#d47c02] mt-0.5" />
                  <div>
                    <p className="text-base text-gray-700 leading-relaxed px-2.5">
                      <span className="font-semibold text-[#d47c02]">SEER (Seasonal Energy Efficiency Ratio)</span> - A
                      ratio of the cooling output during a typical cooling season with the total electric energy input
                      during the same period.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Image Areas */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {imageSlots.map((image, index) => (
                <div key={index} className="h-64">
                  {image && image.id ? (
                    <ReportImageViewer
                      allowSelection={isAdmin}
                      buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
                      selectedImage={image}
                      onOpenPicker={() => handleEditImage(index)}
                      onDescriptionChange={(newDescription) => {
                        // TODO: Implement description change logic
                        console.log("Description changed:", newDescription);
                      }}
                    />
                  ) : (
                    <Card className="h-full border-2 border-dashed border-gray-300 hover:border-[#d47c02] transition-colors">
                      {isAdmin ? (
                        <button
                          onClick={() => handleAddImage(index)}
                          className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-[#d47c02] transition-colors"
                        >
                          <Plus className="h-12 w-12 mb-2" />
                          <span className="text-sm font-medium">Add Assessment Image {index + 1}</span>
                        </button>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                          <div className="w-24 h-16 bg-gray-200 rounded mb-2 flex items-center justify-center">
                            <div className="w-16 h-12 bg-gray-300 rounded"></div>
                          </div>
                          <span className="text-sm">Assessment Image {index + 1}</span>
                        </div>
                      )}
                    </Card>
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

export default AirConditioningAssessment
