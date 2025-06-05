// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Info, Snowflake, Zap } from "lucide-react"
// import { ReportImagePicker } from "../common/imagePicker"
// import { ReportImageViewer } from "../common/imageViewer"
// import type { HouseImage } from "../heating/card"

// interface AirConditioningAssessmentProps {
//   isAdmin?: boolean
//   houseImages?: HouseImage[]
//   selectedImages?: HouseImage[]
//   onUpdateImages?: (images: HouseImage[]) => void
// }

// const AirConditioningAssessment = ({
//   isAdmin = false,
//   houseImages = [],
//   selectedImages = [],
//   onUpdateImages,
// }: AirConditioningAssessmentProps) => {
//   const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
//   const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null)

//   const handleSelectImage = (id: string) => {
//     const selectedImage = houseImages.find((img) => img.id === id)
//     if (selectedImage && onUpdateImages) {
//       if (editingImageIndex !== null) {
//         // Replace existing image
//         const updatedImages = [...selectedImages]
//         updatedImages[editingImageIndex] = selectedImage
//         onUpdateImages(updatedImages)
//       } else {
//         // Add new image
//         onUpdateImages([...selectedImages, selectedImage])
//       }
//     }
//     setIsImagePickerOpen(false)
//     setEditingImageIndex(null)
//   }

//   const handleAddImage = (index: number) => {
//     setEditingImageIndex(index)
//     setIsImagePickerOpen(true)
//   }

//   const handleEditImage = (index: number) => {
//     setEditingImageIndex(index)
//     setIsImagePickerOpen(true)
//   }

//   // Ensure we always show exactly 2 slots
//   const imageSlots = Array.from({ length: 2 }, (_, index) => selectedImages[index] || null)

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white max-h-fit p-8"
//     >
//       <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
//         <CardHeader className="bg-white py-4 px-5 border-b border-gray-100">
//           <CardTitle className="text-lg font-medium text-[#d47c02] flex items-center">
//             <Snowflake className="size-5 mr-2" />
//             <span className="flex-1 text-lg font-semibold">Air Conditioning Assessment</span>
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left Content Area */}
//             <div className="flex flex-col gap-6">
//               {/* Main Description Card */}
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <p className="text-gray-700 text-base leading-relaxed mb-6">
//                   During your Home Energy Assessment, our technician closely examined your cooling equipment to
//                   determine the efficiency level of the system.
//                 </p>

//                 <div className="flex items-start gap-3">
//                   <Info className="h-5 w-5 flex-shrink-0 text-[#d47c02] mt-0.5" />
//                   <div>
//                     <p className="text-base text-gray-700 leading-relaxed">
//                       <span className="font-semibold text-[#d47c02]">SEER (Seasonal Energy Efficiency Ratio)</span> - A
//                       ratio of the cooling output during a typical cooling season with the total electric energy input
//                       during the same period.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Info Card */}
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Zap className="size-5 text-[#d47c02]" />
//                   <h3 className="text-lg font-semibold text-[#d47c02]">Assessment Details</h3>
//                 </div>
//                 <p className="text-gray-700 text-base leading-relaxed">
//                   Our comprehensive evaluation includes system age, condition, efficiency ratings, and potential upgrade
//                   recommendations to optimize your cooling performance and energy savings.
//                 </p>
//               </div>
//             </div>

//             {/* Right Image Areas */}
//             <div className="flex flex-col gap-4">
//               <h3 className="text-lg font-semibold text-[#d47c02] mb-2">Assessment Images</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {imageSlots.map((image, index) => (
//                   <div key={index} className="h-64">
//                     {image && image.id ? (
//                       <ReportImageViewer
//                         allowSelection={isAdmin}
//                         buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
//                         selectedImage={image}
//                         onOpenPicker={() => handleEditImage(index)}
//                         onDescriptionChange={(description) => {
//                           if (onUpdateImages && image) {
//                             const updatedImages = [...selectedImages]
//                             updatedImages[index] = { ...image, description: description as string }
//                             onUpdateImages(updatedImages)
//                           }
//                         }}
//                       />
//                     ) : (
//                       <ReportImageViewer
//                         allowSelection={isAdmin}
//                         buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
//                         selectedImage={undefined}
//                         onOpenPicker={() => handleAddImage(index)}
//                         onDescriptionChange={() => {}}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Image Picker Dialog */}
//       {isAdmin && (
//         <ReportImagePicker
//           buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
//           images={houseImages}
//           selectedImage={editingImageIndex !== null ? selectedImages[editingImageIndex]?.id : undefined}
//           isOpen={isImagePickerOpen}
//           onOpenChange={setIsImagePickerOpen}
//           onSelectImage={handleSelectImage}
//         />
//       )}
//     </motion.div>
//   )
// }

// export default AirConditioningAssessment





"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Snowflake, Zap } from 'lucide-react'
// import { ReportImagePicker } from "../common/imagePicker"
// import { ReportImageViewer } from "../common/imageViewer"
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
  // Commented out image-related state
  // const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
  // const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null)

  // Commented out image-related handlers
  /*
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
  */

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white max-h-fit p-8"
    >
      <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-white py-4 px-5 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-[#d47c02] flex items-center">
            <Snowflake className="size-5 mr-2" />
            <span className="flex-1 text-lg font-semibold">Air Conditioning Assessment</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Content Area */}
            <div className="flex flex-col gap-6">
              {/* Main Description Card */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  During your Home Energy Assessment, our technician closely examined your cooling equipment to
                  determine the efficiency level of the system.
                </p>

                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 flex-shrink-0 text-[#d47c02] mt-0.5" />
                  <div>
                    <p className="text-base text-gray-700 leading-relaxed">
                      <span className="font-semibold text-[#d47c02]">SEER (Seasonal Energy Efficiency Ratio)</span> - A
                      ratio of the cooling output during a typical cooling season with the total electric energy input
                      during the same period.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Area - Assessment Details moved here */}
            <div className="flex flex-col gap-6">
              {/* Assessment Details Card - Moved from left to right */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="size-5 text-[#d47c02]" />
                  <h3 className="text-lg font-semibold text-[#d47c02]">Assessment Details</h3>
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  Our comprehensive evaluation includes system age, condition, efficiency ratings, and potential upgrade
                  recommendations to optimize your cooling performance and energy savings.
                </p>
              </div>
            </div>

            {/* Commented out Right Image Areas 
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-[#d47c02] mb-2">Assessment Images</h3>
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
            */}
          </div>
        </CardContent>
      </Card>

      {/* Commented out Image Picker Dialog 
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
      */}
    </motion.div>
  )
}

export default AirConditioningAssessment