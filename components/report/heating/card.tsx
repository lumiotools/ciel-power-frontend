"use client"

import { useState, useMemo } from "react"
import type { HeatingData } from "@/app/admin/[bookingNumber]/report/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReportEditableInput from "../common/editableInput"
import { ReportImageViewer } from "../common/imageViewer"
import { ReportImagePicker } from "../common/imagePicker"
import ReportEditableSelect from "../common/editableSelect"
import { Flame, Info, Trash2 } from "lucide-react"
import ReportHeatingSectionGauge from "./gauge"
import ReportEditableTextArea from "../common/editableTextarea"
import { motion } from "framer-motion"

// Define the HouseImage interface based on the provided sample
export interface HouseImage {
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

interface ReportHeatingSectionCardProps {
  isAdmin?: boolean
  heating: HeatingData
  houseImages?: HouseImage[]
  onUpdateValue: (updatedHeating: HeatingData) => void
  onDelete?: () => void
}

const ReportHeatingSectionCard = ({
  isAdmin,
  heating,
  houseImages = [],
  onUpdateValue,
  onDelete,
}: ReportHeatingSectionCardProps) => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)

  // Generate the default description content
  const defaultDescription = useMemo(
    () => ({
      title: "System Condition",
      content: `Your ${heating.title} has a ${heating.parameter} of ${heating.current_value}. Upgrading to a high-efficiency model with ${heating.recommended_value} ${heating.parameter} could result in significant energy savings.`,
      footer: "Estimated based on Age & Type",
    }),
    [heating.title, heating.parameter, heating.current_value, heating.recommended_value],
  )

  // Use the existing description or fall back to default
  const currentDescription = heating.description || defaultDescription

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="py-4 px-5 border-b border-gray-100">
          <CardTitle className="text-xl font-bold text-[#d47c02] flex justify-between items-center">
            <Flame className="size-6 mr-2 text-[#d47c02]" />
            <div className="flex-1">
              {isAdmin ? (
                <ReportEditableInput
                  className="max-w-[50%] !text-xl !font-bold"
                  value={heating?.title}
                  onChange={(title) => {
                    onUpdateValue({
                      ...heating,
                      title: title as string,
                    })
                  }}
                />
              ) : (
                heating?.title
              )}
            </div>

            {isAdmin && (
              <button className="text-destructive" onClick={onDelete}>
                <Trash2 className="size-5" />
              </button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-8">
              <div className="bg-white p-4 rounded-md">
                <h3 className="text-lg font-semibold text-[#d47c02]">Current Performance</h3>

                <ReportHeatingSectionGauge
                  value={
                    heating.current_value?.includes("%")
                      ? Number(heating.current_value?.replace("%", ""))
                      : Number(heating.current_value?.replace("+", ""))
                  }
                  labelSuffix={heating.current_value?.includes("%") ? "%" : ""}
                  minValue={0}
                  maxValue={heating.current_value?.includes("%") ? 100 : 0.96}
                />

                <div className="flex justify-between items-center mt-4 px-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Current {heating.parameter}</p>
                    <p className="text-xl font-bold text-[#F44336]">{heating.current_value}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">BPI Recommends</p>
                    <p className="text-xl font-bold text-[#4CAF50]">{heating.recommended_value}</p>
                  </div>
                </div>
              </div>

              {/* System Information Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 text-base mb-2">Type</p>
                    <div className="text-gray-800 text-lg font-medium">
                      {isAdmin ? (
                        <ReportEditableInput
                          value={heating.type}
                          onChange={(value) => {
                            onUpdateValue({
                              ...heating,
                              type: value as string,
                            })
                          }}
                        />
                      ) : (
                        heating.type
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-base mb-2">Condition</p>
                    <div className="text-gray-800 text-lg font-medium">
                      {isAdmin ? (
                        <ReportEditableSelect
                          value={heating.condition}
                          options={[
                            { label: "Poor", value: "Poor" },
                            { label: "Fair", value: "Fair" },
                            { label: "Good", value: "Good" },
                            { label: "Excellent", value: "Excellent" },
                          ]}
                          onChange={(value) => {
                            onUpdateValue({
                              ...heating,
                              condition: value as string,
                            })
                          }}
                        />
                      ) : (
                        heating.condition
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="h-6 w-6 text-[#d47c02]" />
                  <h3 className="text-lg font-bold text-[#d47c02]">
                    {isAdmin ? (
                      <ReportEditableInput
                        placeholder="Improvement Opportunity"
                        value={currentDescription.title}
                        onChange={(value) => {
                          onUpdateValue({
                            ...heating,
                            description: {
                              ...currentDescription,
                              title: value as string,
                            },
                          })
                        }}
                      />
                    ) : (
                      currentDescription.title
                    )}
                  </h3>
                </div>

                <div className="text-gray-700 text-base">
                  {isAdmin ? (
                    <ReportEditableTextArea
                      placeholder="Enter improvement opportunity description"
                      value={currentDescription.content}
                      onChange={(value) => {
                        onUpdateValue({
                          ...heating,
                          description: {
                            ...currentDescription,
                            content: value as string,
                          },
                        })
                      }}
                    />
                  ) : (
                    currentDescription.content
                  )}
                </div>
              </div>

              <div className="rounded-md flex justify-center items-start">
                <ReportImageViewer
                  allowSelection={isAdmin}
                  buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
                  selectedImage={heating?.images?.[0] ? { ...heating.images[0], id: heating.images[0].id || '' } : undefined}
                  onOpenPicker={() => setIsImagePickerOpen(true)}
                  onDescriptionChange={(description) => {
                    if (heating?.images?.[0])
                      onUpdateValue({
                        ...heating,
                        images: [
                          {
                            ...heating.images?.[0],
                            description: description as string,
                          },
                        ],
                      })
                  }}
                />
              </div>
            </div>
          </div>

          {/* Image Picker Dialog */}
          {isAdmin && (
            <ReportImagePicker
              buttonClassName="bg-[#d47c02] hover:bg-[#B18C2E]/90"
              images={houseImages}
              selectedImage={heating?.images?.[0]?.id}
              isOpen={isImagePickerOpen}
              onOpenChange={setIsImagePickerOpen}
              onSelectImage={(id) => {
                onUpdateValue({
                  ...heating,
                  images: heating?.images?.[0]
                    ? [
                        {
                          ...heating.images?.[0],
                          id: id as string,
                        },
                      ]
                    : [
                        {
                          id: id as string,
                        },
                      ],
                })
              }}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ReportHeatingSectionCard
