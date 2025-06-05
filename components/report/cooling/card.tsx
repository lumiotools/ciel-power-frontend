"use client";

import { useState, useMemo } from "react";
import type { CoolingData } from "@/app/admin/[bookingNumber]/report/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportEditableInput from "../common/editableInput";
import { ReportImageViewer } from "../common/imageViewer";
import { ReportImagePicker } from "../common/imagePicker";
import ReportEditableSelect from "../common/editableSelect";
import { Info, Sun, Trash2, Zap } from "lucide-react";
import ReportCoolingSectionGauge from "./gauge";
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

interface ReportCoolingSectionCardProps {
  isAdmin?: boolean;
  cooling: CoolingData;
  houseImages?: HouseImage[];
  onUpdateValue: (updatedCooling: CoolingData) => void;
  onDelete?: () => void;
}

const ReportCoolingSectionCard = ({
  isAdmin,
  cooling,
  houseImages = [],
  onUpdateValue,
  onDelete,
}: ReportCoolingSectionCardProps) => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  // Generate the default description content
  const defaultDescription = useMemo(
    () => ({
      title: "System Condition",
      content: `Your ${cooling.title} has a ${cooling.parameter} of ${cooling.current_value}. Upgrading to a high-efficiency model with ${cooling.recommended_value} ${cooling.parameter} could result in significant energy savings.`,
      footer: "Estimated based on Age & Type",
    }),
    [
      cooling.title,
      cooling.parameter,
      cooling.current_value,
      cooling.recommended_value,
    ]
  );

  // Use the existing description or fall back to default
  const currentDescription = cooling.description || defaultDescription;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white max-h-fit p-4"
    >
      <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-white py-2 px-3 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-[#d47c02] flex justify-between items-center">
            <Sun className="size-5 mr-2" />
            <div className="flex-1 !text-lg !font-semibold">
              {isAdmin ? (
                <ReportEditableInput
                  className="max-w-[50%] !text-lg"
                  value={cooling?.title}
                  onChange={(title) => {
                    onUpdateValue({
                      ...cooling,
                      title: title as string,
                    });
                  }}
                />
              ) : (
                cooling?.title
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
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-8">
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <h3 className="text-lg font-semibold text-[#d47c02]">
                  Current Performance
                </h3>

                <ReportCoolingSectionGauge
                  value={cooling.current_value ?? 0}
                  maxValue={20}
                  labelSuffix=""
                  cooling={cooling}
                />

                <div className="max-w-xl mx-auto flex justify-between gap-4 px-4 mt-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">
                      Current {cooling.parameter}
                    </p>
                    <p className="text-xl font-bold text-[#F44336]">
                      {cooling.current_value}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">BPI Recommends</p>
                    <p className="text-xl font-bold text-[#4CAF50]">
                      {cooling.recommended_value}
                    </p>
                  </div>
                </div>
              </div>

              {/* System Information Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="grid grid-cols-2 gap-x-12 gap-y-2 p-4">
                  <div>
                    <p className="text-gray-800">Type</p>
                    <div className="text-[#d47c02] !font-bold">
                      {isAdmin ? (
                        <ReportEditableInput
                          value={cooling.type}
                          onChange={(value) => {
                            onUpdateValue({
                              ...cooling,
                              type: value as string,
                            });
                          }}
                        />
                      ) : (
                        cooling.type
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-800">Condition</p>
                    <div className="text-[#d47c02] !font-bold">
                      {isAdmin ? (
                        <ReportEditableSelect
                          value={cooling.condition}
                          options={[
                            { label: "Poor", value: "Poor" },
                            { label: "Fair", value: "Fair" },
                            { label: "Good", value: "Good" },
                            { label: "Excellent", value: "Excellent" },
                          ]}
                          onChange={(value) => {
                            onUpdateValue({
                              ...cooling,
                              condition: value as string,
                            });
                          }}
                        />
                      ) : (
                        cooling.condition
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-800">Year</p>
                    <div className="text-[#d47c02] !font-bold">
                      {isAdmin ? (
                        <ReportEditableInput
                          type="number"
                          value={cooling.year ?? 0}
                          onChange={(value) => {
                            onUpdateValue({
                              ...cooling,
                              year: Number(value),
                            });
                          }}
                        />
                      ) : (
                        cooling.year
                      )}
                    </div>
                  </div>

                  <div>
                    {isAdmin ? (
                      <ReportEditableInput
                        className="text-gray-800 !h-6 !py-0"
                        value={cooling.parameter ?? "SEER"}
                        onChange={(value) => {
                          onUpdateValue({
                            ...cooling,
                            parameter: value as string,
                          });
                        }}
                      />
                    ) : (
                      <p className="text-gray-800 !h-6 !py-0">
                        {cooling.parameter}
                      </p>
                    )}
                    <div className="text-[#d47c02] !font-bold">
                      {isAdmin ? (
                        <ReportEditableInput
                          value={cooling.current_value ?? 0}
                          onChange={(value) => {
                            onUpdateValue({
                              ...cooling,
                              current_value: Number(value),
                            });
                          }}
                        />
                      ) : (
                        cooling.current_value
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-white p-4 rounded-md border border-gray-200 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="size-6 text-[#d47c02]" />
                  <div className="flex-1 !text-lg !font-semibold text-[#d47c02]">
                    {isAdmin ? (
                      <ReportEditableInput
                        placeholder="Enter a title"
                        value={currentDescription.title}
                        onChange={(value) => {
                          onUpdateValue({
                            ...cooling,
                            description: {
                              ...currentDescription,
                              title: value as string,
                            },
                          });
                        }}
                      />
                    ) : (
                      currentDescription.title
                    )}
                  </div>
                </div>

                <div className="!text-gray-700 !text-base !min-h-24 !py-0">
                  {isAdmin ? (
                    <ReportEditableTextArea
                      placeholder="Enter a description"
                      value={currentDescription.content}
                      onChange={(value) => {
                        onUpdateValue({
                          ...cooling,
                          description: {
                            ...currentDescription,
                            content: value as string,
                          },
                        });
                      }}
                    />
                  ) : (
                    currentDescription.content
                  )}
                </div>

                {(isAdmin || currentDescription.footer) && (
                  <div className="flex items-center gap-2">
                    <Zap className="size-6 text-[#d47c02]" />
                    <div className="flex-1 !text-base text-[#d47c02]">
                      {isAdmin ? (
                        <ReportEditableInput
                          placeholder="Enter a footer text (optional)"
                          value={currentDescription.footer ?? ""}
                          onChange={(value) => {
                            onUpdateValue({
                              ...cooling,
                              description: {
                                ...currentDescription,
                                footer: value as string,
                              },
                            });
                          }}
                        />
                      ) : (
                        currentDescription.footer
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-md flex justify-center items-start">
                <ReportImageViewer
                  allowSelection={isAdmin}
                  buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
                  selectedImage={cooling?.images?.[0]}
                  onOpenPicker={() => setIsImagePickerOpen(true)}
                  onDescriptionChange={(description) => {
                    if (cooling?.images?.[0])
                      onUpdateValue({
                        ...cooling,
                        images: [
                          {
                            ...cooling.images?.[0],
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
              buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
              images={houseImages}
              selectedImage={cooling?.images?.[0]?.id}
              isOpen={isImagePickerOpen}
              onOpenChange={setIsImagePickerOpen}
              onSelectImage={(id) => {
                onUpdateValue({
                  ...cooling,
                  images: cooling?.images?.[0]
                    ? [
                        {
                          ...cooling.images?.[0],
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

export default ReportCoolingSectionCard;
