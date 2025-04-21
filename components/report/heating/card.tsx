"use client";

import { useEffect, useState } from "react";
import type { HeatingData } from "@/app/admin/[bookingNumber]/report/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import ReportHeatingSectionGauge from "./gauge";
import ReportEditableInput from "../common/editableInput";
import { ReportImageViewer } from "../common/imageViewer";
import { ReportImagePicker } from "../common/imagePicker";
import ReportEditableSelect from "../common/editableSelect";
import { Flame, Info, Trash2 } from "lucide-react";
import ReportHeatingSectionGauge from "./gauge";
import ReportEditableTextArea from "../common/editableTextarea";
import { motion } from "framer-motion";

// Define the HouseImage interface based on the provided sample
export interface HouseImage {
  mimeType: string;
  thumbnailLink: string;
  size: string;
  id: string;
  name: string;
  description: string;
  createdTime: string;
  modifiedTime: string;
  link: string;
}

interface ReportHeatingSectionCardProps {
  isAdmin?: boolean;
  heating: HeatingData;
  houseImages?: HouseImage[];
  onUpdateValue: (updatedHeating: HeatingData) => void;
  onDelete?: () => void;
}

const ReportHeatingSectionCard = ({
  isAdmin,
  heating,
  houseImages = [],
  onUpdateValue,
  onDelete,
}: ReportHeatingSectionCardProps) => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  useEffect(() => {
    onUpdateValue({
      ...heating,
      description: {
        title: "System Condition",
        content: `Your ${heating.title} has a ${heating.parameter} of ${heating.current_value}. Upgrading to a high-efficiency model with ${heating.recommended_value} ${heating.parameter} could result in significant energy savings.`,
        footer: "Estimated based on Age & Type",
      },
    });
  }, [
    heating?.title,
    heating?.parameter,
    heating?.current_value,
    heating?.recommended_value,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-[#FFFCF3] py-4 px-5 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-[#B18C2E] flex justify-between items-center">
            <Flame className="size-5 mr-2" />
            <div className="flex-1">
              {isAdmin ? (
                <ReportEditableInput
                  className="max-w-[50%] !text-lg"
                  value={heating?.title}
                  onChange={(title) => {
                    onUpdateValue({
                      ...heating,
                      title: title as string,
                    });
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
              <div className="bg-[#FFFCF3] p-4 rounded-md">
                <h3 className="text-lg font-semibold text-[#B18C2E]">
                  Current Performance
                </h3>

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

                <div className="max-w-xl mx-auto flex justify-between gap-4 px-4 mt-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">
                      Current {heating.parameter}
                    </p>
                    <p className="text-xl font-bold text-[#F44336]">
                      {heating.current_value}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">BPI Recommends</p>
                    <p className="text-xl font-bold text-[#4CAF50]">
                      {heating.recommended_value}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-2 p-4">
                <div>
                  <p className="text-gray-800">Type</p>
                  <div className="text-[#B18C2E] !font-bold">
                    {isAdmin ? (
                      <ReportEditableInput
                        value={heating.type}
                        onChange={(value) => {
                          onUpdateValue({
                            ...heating,
                            type: value as string,
                          });
                        }}
                      />
                    ) : (
                      heating.type
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-gray-800">Condition</p>
                  <div className="text-[#B18C2E] !font-bold">
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
                          });
                        }}
                      />
                    ) : (
                      heating.condition
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-gray-800">Year</p>
                  <div className="text-[#B18C2E] !font-bold">
                    {isAdmin ? (
                      <ReportEditableInput
                        type="number"
                        value={heating.year ?? 0}
                        onChange={(value) => {
                          onUpdateValue({
                            ...heating,
                            year: Number(value),
                          });
                        }}
                      />
                    ) : (
                      heating.year
                    )}
                  </div>
                </div>

                <div>
                  {isAdmin ? (
                    <ReportEditableInput
                      className="text-gray-800 !h-6 !py-0"
                      value={heating.parameter ?? "AFUE"}
                      onChange={(value) => {
                        onUpdateValue({
                          ...heating,
                          parameter: value as string,
                        });
                      }}
                    />
                  ) : (
                    <p className="text-gray-800 !h-6 !py-0">
                      {heating.parameter}
                    </p>
                  )}
                  <div className="text-[#B18C2E] !font-bold">
                    {isAdmin ? (
                      <ReportEditableInput
                        value={heating.current_value ?? "0%"}
                        onChange={(value) => {
                          onUpdateValue({
                            ...heating,
                            current_value: value as string,
                          });
                        }}
                      />
                    ) : (
                      heating.current_value
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="bg-[#FFFCF3] p-4 rounded-md space-y-4">
                <div className="flex items-center gap-2">
                  <Info className="size-6 text-[#B18C2E]" />
                  <div className="flex-1 !text-lg !font-semibold text-[#B18C2E]">
                    {isAdmin ? (
                      <ReportEditableInput
                        placeholder="Enter a title"
                        value={heating.description?.title ?? ""}
                        onChange={(value) => {
                          onUpdateValue({
                            ...heating,
                            description: {
                              title: value as string,
                              content: heating.description?.content ?? "",
                              footer: heating.description?.footer ?? "",
                            },
                          });
                        }}
                      />
                    ) : (
                      heating.description?.title
                    )}
                  </div>
                </div>

                <div className="!text-gray-700 !text-base !min-h-24 !py-0">
                  {isAdmin ? (
                    <ReportEditableTextArea
                      placeholder="Enter a description"
                      value={heating.description?.content ?? ""}
                      onChange={(value) => {
                        onUpdateValue({
                          ...heating,
                          description: {
                            title: heating.description?.title ?? "",
                            content: value as string,
                            footer: heating.description?.footer ?? "",
                          },
                        });
                      }}
                    />
                  ) : (
                    heating.description?.content
                  )}
                </div>

                {(isAdmin || heating.description?.footer) && (
                  <div className="flex items-center gap-2">
                    <Info className="size-6 text-[#B18C2E]" />
                    <div className="flex-1 !text-base text-[#B18C2E]">
                      {isAdmin ? (
                        <ReportEditableInput
                          placeholder="Enter a footer text (optional)"
                          value={heating.description?.footer ?? ""}
                          onChange={(value) => {
                            onUpdateValue({
                              ...heating,
                              description: {
                                title: heating.description?.title ?? "",
                                content: heating.description?.content ?? "",
                                footer: value as string,
                              },
                            });
                          }}
                        />
                      ) : (
                        heating.description?.footer
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-md flex justify-center items-start">
                <ReportImageViewer
                  allowSelection={isAdmin}
                  buttonClassName="bg-[#B18C2E] hover:bg-[#B18C2E]/90"
                  selectedImage={heating?.images?.[0]}
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
                      });
                  }}
                />
              </div>
            </div>
          </div>

          {/* Image Picker Dialog */}
          {isAdmin && (
            <ReportImagePicker
              buttonClassName="bg-[#B18C2E] hover:bg-[#B18C2E]/90"
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
                });
              }}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReportHeatingSectionCard;
