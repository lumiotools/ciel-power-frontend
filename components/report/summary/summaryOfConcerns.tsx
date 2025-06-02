"use client"

import type React from "react"
import { useEffect, useRef, useState, useContext } from "react"
import { motion } from "framer-motion"
import { Activity, AlertTriangle, Fan, PlusCircle, Shield, Thermometer, Trash2, Loader2 } from "lucide-react"
import type { SummaryOfConcernsData } from "@/app/admin/[bookingNumber]/report/page"
import ReportEditableInput from "../common/editableInput"
import ReportEditableTextArea from "../common/editableTextarea"
import { usePathname, useParams } from "next/navigation"
import { ChevronUp } from "lucide-react"
import { ReportImagePicker } from "../common/imagePicker"
import { ReportImageViewer } from "../common/imageViewer"
import { AUTH_CONTEXT } from "@/providers/auth"
import { toast } from "sonner"

// Use the same HouseImage interface as the AirConditioningAssessment
interface HouseImage {
  mimeType: string
  thumbnailLink: string
  size: string
  id: string
  name: string
  description: string
  createdTime: string
  modifiedTime: string
  link: string
}

interface ReportSummarySectionSummaryOfConcernsProps {
  isAdmin?: boolean
  summaryOfConcerns?: SummaryOfConcernsData[]
  onUpdateValue?: (summaryOfConcerns: SummaryOfConcernsData[]) => void
  selectedImages?: HouseImage[]
  onUpdateImages?: (images: HouseImage[]) => void
}

const ReportSummarySectionSummaryOfConcerns = ({
  isAdmin = false,
  summaryOfConcerns,
  onUpdateValue,
  selectedImages = [],
  onUpdateImages,
}: ReportSummarySectionSummaryOfConcernsProps) => {
  const { userDetails } = useContext(AUTH_CONTEXT)
  const { bookingNumber: adminBookingNumber } = useParams()
  const pathname = usePathname()

  // Determine booking number based on user type
  const bookingNumber = isAdmin ? adminBookingNumber : userDetails?.bookingNumber

  // State for fetched house images
  const [houseImages, setHouseImages] = useState<HouseImage[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)

  // Fetch house images from API
  const fetchHouseImages = async () => {
    if (!bookingNumber) return

    setIsLoadingImages(true)
    setImageError(null)

    try {
      const apiPath = isAdmin
        ? `/api/admin/bookings/${bookingNumber}/pictures`
        : `/api/user/bookings/${bookingNumber}/pictures`

      const response = await fetch(apiPath)

      if (!response.ok) {
        const errorData = await response.json()
        setImageError(errorData.message || "Failed to fetch house images")
        return
      }

      const data = await response.json()

      if (data.success) {
        setHouseImages(data.data.pictures || [])
      } else {
        setImageError(data.message || "Failed to fetch house images")
      }
    } catch (error) {
      console.error("Error fetching house images:", error)
      setImageError("An error occurred while fetching house images. Please try again later.")
    } finally {
      setIsLoadingImages(false)
    }
  }

  // Fetch images when component mounts or booking number changes
  useEffect(() => {
    if (bookingNumber) {
      fetchHouseImages()
    }
  }, [bookingNumber, isAdmin])

  const getIconForConcern = (name?: string) => {
    if (!name) return AlertTriangle

    const nameLower = name.toLowerCase()
    if (nameLower.includes("vent") || nameLower.includes("fan") || nameLower.includes("dryer")) {
      return Fan
    } else if (nameLower.includes("combustion") || nameLower.includes("gas")) {
      return Activity
    } else if (nameLower.includes("water") || nameLower.includes("heating")) {
      return Thermometer
    } else {
      return AlertTriangle
    }
  }

  const cardStyle = "bg-white max-h-fit p-8 rounded-xl shadow-sm mb-6 overflow-hidden"

  const addConcern = () => {
    if (onUpdateValue && summaryOfConcerns) {
      const emptyConcern: SummaryOfConcernsData = {
        name: "",
        concern: "",
        flag: false,
        images: [],
        description: { title: "", content: "", footer: "" },
      }
      onUpdateValue([...summaryOfConcerns, emptyConcern])
    }
  }

  const deleteConcern = (index: number) => {
    if (onUpdateValue && summaryOfConcerns) {
      const updatedConcerns = summaryOfConcerns.filter((_, i) => i !== index)
      onUpdateValue(updatedConcerns)
    }
  }

  const [isUser, setIsUser] = useState(false)
  useEffect(() => {
    if (pathname.includes("/dashboard/report")) {
      setIsUser(true)
    }
  }, [pathname])

  const [isExpanded, setIsExpanded] = useState(true)
  const [isExpanded1, setIsExpanded1] = useState(true)

  const toggleExpanded1 = () => {
    setIsExpanded1(!isExpanded1)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // Image handling - exactly like AirConditioningAssessment
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
    if (isLoadingImages) {
      toast.error("Please wait for images to load")
      return
    }
    if (imageError) {
      toast.error("Unable to load images. Please try refreshing.")
      return
    }
    if (houseImages.length === 0) {
      toast.error("No images available to select")
      return
    }
    setEditingImageIndex(index)
    setIsImagePickerOpen(true)
  }

  const handleEditImage = (index: number) => {
    if (isLoadingImages) {
      toast.error("Please wait for images to load")
      return
    }
    if (imageError) {
      toast.error("Unable to load images. Please try refreshing.")
      return
    }
    setEditingImageIndex(index)
    setIsImagePickerOpen(true)
  }

  // Retry fetching images
  const retryFetchImages = () => {
    setImageError(null)
    fetchHouseImages()
  }

  // Ensure we always show exactly 2 slots
  const imageSlots = Array.from({ length: 2 }, (_, index) => selectedImages[index] || null)

  const [notes, setNotes] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Load notes from sessionStorage on component mount
  useEffect(() => {
    const savedNotes = sessionStorage.getItem("concernsNotes")
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, [])

  // Save notes to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("concernsNotes", notes)
  }, [notes])

  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [notes])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="summary-of-concerns"
      className="container"
    >
      <div className="min-h-screen bg-[#eaeaea] flex-col items-center justify-center mb-52">
        <div className="max-h-fit w-full mx-auto bg-white p-8">
          <div className="flex items-center mb-6">
            <div className="mr-4" style={{ color: "#ff6700" }}>
              <Thermometer size={32} />
            </div>
            <h2 className="text-3xl font-bold" style={{ color: "#ff6700" }}>
              Understanding Concerns
            </h2>
          </div>
          <div className="border-2 border-gray-200 rounded-xl p-6">
            <p className="text-gray-700 text-lg">
              You can find the summary of possible concerns as reported by your auditor in this section.
            </p>
          </div>
        </div>

        <div className="max-h-fit w-full mx-auto bg-white p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="mr-4" style={{ color: "#ff6700" }}>
                <Fan size={32} />
              </div>
              <h2 className="text-3xl font-bold" style={{ color: "#ff6700" }}>
                Lorem Ipsum Heading
              </h2>
            </div>

            <button
              onClick={toggleExpanded}
              className="text-[#ff6700] transition-transform duration-300 border-2 border-[#ff6700] rounded-full p-0.5"
              aria-label={isExpanded ? "Hide section" : "Show section"}
            >
              <ChevronUp
                className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "" : "transform rotate-180"}`}
              />
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="w-full flex items-start justify-center gap-6 border-2 border-gray-200 rounded-lg p-6">
              <div className="flex flex-col items-start justify-start space-y-6 w-1/2">
                <div className="mr-4 flex items-center justify-center gap-2" style={{ color: "#ff6700" }}>
                  <Fan size={24} />
                  <h3 className="text-2xl font-semibold" style={{ color: "#ff6700" }}>
                    Lorem Ipsum Sub heading
                  </h3>
                </div>
                <div className="w-full">
                  <textarea
                    disabled={isUser}
                    ref={textareaRef}
                    value={notes}
                    onChange={handleNotesChange}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none min-h-[265px] max-h-[265px] resize-none overflow-y-auto"
                    aria-label="Consultation notes"
                  />
                </div>
              </div>

              {/* Right Image Areas with loading and error states */}
              <div className="w-1/2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#ff6700] mb-2">Assessment Images</h3>
                  {isLoadingImages && (
                    <div className="flex items-center gap-2 text-sm text-[#ff6700]">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading images...
                    </div>
                  )}
                </div>

                {/* Error Display */}
                {imageError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-red-800 font-medium mb-1">Unable to load images</p>
                        <p className="text-red-600">{imageError}</p>
                        <button
                          onClick={retryFetchImages}
                          className="mt-3 px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                )}

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
                          allowSelection={isAdmin && !isLoadingImages && !imageError}
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
        </div>
      </div>

      <div className={cardStyle}>
        <div className="py-3 px-5 flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center gap-2" style={{ color: "#FF6700" }}>
            <AlertTriangle className="h-8 w-8 mr-2" style={{ color: "#FF6700" }} />
            Summary of Concerns
          </h2>
          <button
            onClick={toggleExpanded1}
            className="relative left-[0.35rem] text-[#ff6700] transition-transform duration-300 border-2 border-[#ff6700] rounded-full p-0.5"
            aria-label={isExpanded1 ? "Hide section" : "Show section"}
          >
            <ChevronUp
              className={`w-6 h-6 transition-transform duration-300 ${isExpanded1 ? "" : "transform rotate-180"}`}
            />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded1 ? "max-h-[8000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6">
            <div className="grid gap-4">
              {(summaryOfConcerns?.length ?? 0 > 0) ? (
                <div>
                  {/* Add New Concern button when there are already concerns */}
                  {isAdmin && (
                    <div className="flex justify-start pb-4">
                      <button
                        onClick={addConcern}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1"
                        style={{
                          backgroundColor: "#FF6700",
                          color: "#ffffff",
                        }}
                        type="button"
                      >
                        <PlusCircle className="h-4 w-4" />
                        Add New Concern
                      </button>
                    </div>
                  )}

                  {summaryOfConcerns
                    ?.filter(({ flag }) => isAdmin || flag)
                    .map((concern, index) => {
                      const ConcernIcon = getIconForConcern(concern.name)
                      return (
                        <motion.div
                          key={`concern-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          className="p-4 rounded-xl mb-4 border-2 border-gray-200"
                        >
                          <div className="flex items-center mb-2">
                            <ConcernIcon className="h-8 w-8 mr-2 text-[#ff6700]" />
                            <div className="font-semibold text-xl" style={{ color: "#FF6700" }}>
                              {isAdmin ? (
                                <ReportEditableInput
                                  value={concern.name}
                                  onChange={(value) => {
                                    onUpdateValue &&
                                      onUpdateValue([
                                        ...summaryOfConcerns.slice(0, index),
                                        { ...concern, name: value as string },
                                        ...summaryOfConcerns.slice(index + 1),
                                      ])
                                  }}
                                />
                              ) : (
                                concern.name
                              )}
                            </div>
                            {isAdmin && (
                              <button
                                onClick={() => deleteConcern(index)}
                                className="ml-auto text-red-500 hover:text-red-700 px-2 py-1 text-xs rounded hover:bg-red-50 flex items-center gap-1 transition-colors"
                                type="button"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            )}
                          </div>
                          <div className="text-gray-700 text-sm">
                            {isAdmin ? (
                              <ReportEditableTextArea
                                value={concern.concern}
                                onChange={(value) => {
                                  onUpdateValue &&
                                    onUpdateValue([
                                      ...summaryOfConcerns.slice(0, index),
                                      { ...concern, concern: value as string },
                                      ...summaryOfConcerns.slice(index + 1),
                                    ])
                                }}
                              />
                            ) : (
                              concern.concern
                            )}
                          </div>

                          {isAdmin && (
                            <div className="mt-3 flex items-center">
                              <label className="flex items-center text-xs text-gray-500 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={!!concern.flag}
                                  onChange={(e) =>
                                    onUpdateValue &&
                                    onUpdateValue([
                                      ...summaryOfConcerns.slice(0, index),
                                      {
                                        ...concern,
                                        flag: e.target.checked,
                                      },
                                      ...summaryOfConcerns.slice(index + 1),
                                    ])
                                  }
                                  className="mr-2"
                                />
                                Display to User
                              </label>
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 rounded-xl border-2 border-gray-200"
                  style={{ backgroundColor: "#FF6700" }}
                >
                  <div className="flex items-start gap-3">
                    <Shield className="text-orange-500" size={20} />
                    <div className="flex-1">
                      <h3 className="font-medium text-orange-500">No Concerns Detected</h3>
                      <p className="text-gray-700 text-sm mt-1">
                        No significant health, safety, or combustion issues were found during the assessment.
                      </p>

                      {isAdmin && (
                        <button
                          onClick={addConcern}
                          className="mt-4 px-4 py-2 rounded text-sm font-medium transition-colors"
                          style={{
                            backgroundColor: "#FF67001A",
                            color: "#FF6700",
                          }}
                          type="button"
                        >
                          + Add New Concern
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Picker Dialog - only show if images are loaded and no error */}
      {isAdmin && !isLoadingImages && !imageError && (
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

export default ReportSummarySectionSummaryOfConcerns
