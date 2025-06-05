"use client";

import { useEffect, useState } from "react";
import type { InsulationData } from "@/app/admin/[bookingNumber]/report/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportInsulationSectionGauge from "./gauge";
import ReportEditableInput from "../common/editableInput";
import { ReportImageViewer } from "../common/imageViewer";
import { ReportImagePicker } from "../common/imagePicker";
import ReportEditableSelect from "../common/editableSelect";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

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

interface ReportInsulationSectionCardProps {
  isAdmin?: boolean;
  insulation: InsulationData;
  houseImages?: HouseImage[];
  onUpdateValue: (updatedInsulation: InsulationData) => void;
  onDelete?: () => void;
}

const ReportInsulationSectionCard = ({
  isAdmin,
  insulation,
  houseImages = [],
  onUpdateValue,
  onDelete,
}: ReportInsulationSectionCardProps) => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const [isUser, setIsUser] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("/dashboard/report")) {
      setIsUser(true);
    }
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white max-h-fit p-4"
    >
      {" "}
      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="py-0 px-2">
          <CardTitle className="text-2xl md:text-3xl font-bold text-[#308883] flex justify-between">
            <div className="flex-1 mb-2">
              {isAdmin ? (
                <ReportEditableInput
                  className="max-w-[50%]"
                  value={insulation?.title}
                  onChange={(title) => {
                    onUpdateValue({
                      ...insulation,
                      title: title as string,
                    });
                  }}
                />
              ) : (
                insulation?.title
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
          <div className="py-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl flex justify-center items-center">
              <ReportImageViewer
                allowSelection={isAdmin}
                buttonClassName="bg-[#308883] hover:bg-[#308883]/90"
                selectedImage={insulation?.images?.[0]}
                onOpenPicker={() => setIsImagePickerOpen(true)}
                onDescriptionChange={(description) => {
                  if (insulation?.images?.[0])
                    onUpdateValue({
                      ...insulation,
                      images: [
                        {
                          ...insulation.images?.[0],
                          description: description as string,
                        },
                      ],
                    });
                }}
              />
            </div>
            <div className="py-2 px-2 rounded-xl border-2 border-gray-200">
              <h3 className="text-xl font-bold text-[#308883]">
                Current Performance
              </h3>

              <ReportInsulationSectionGauge
                value={insulation.current_rValue ?? 0}
                maxValue={insulation.recommended_rValue}
              />
              <div className="text-xl text-center font-semibold text-gray-500">
                <span className="text-[#308883]">{insulation.title} </span>
                <span>R-value is </span>
                <span className="text-[#308883]">
                  R{insulation.current_rValue}
                </span>
              </div>
              <div className="max-w-xl mx-auto flex justify-between gap-2 px-2 mt-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">Current R-Value</p>
                  <p className="text-xl font-bold text-[#F44336]">
                    R{insulation.current_rValue}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">BPI Recommends</p>
                  <p className="text-xl font-bold text-[#4CAF50]">
                    R{insulation.recommended_rValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-xl grid grid-cols-2 gap-x-8 gap-y-2 p-2">
              <div>
                <p className="text-gray-800">Material</p>
                <div className="text-[#308883] !font-bold">
                  {isAdmin ? (
                    <ReportEditableInput
                      value={insulation.material}
                      onChange={(value) => {
                        onUpdateValue({
                          ...insulation,
                          material: value as string,
                        });
                      }}
                    />
                  ) : (
                    insulation.material
                  )}
                </div>
              </div>
              <div>
                <p className="text-gray-800">Condition</p>
                <div className="text-[#308883] !font-bold">
                  {isAdmin ? (
                    <ReportEditableSelect
                      value={insulation.condition}
                      options={[
                        { label: "Poor", value: "Poor" },
                        { label: "Fair", value: "Fair" },
                        { label: "Good", value: "Good" },
                        { label: "Excellent", value: "Excellent" },
                      ]}
                      onChange={(value) => {
                        onUpdateValue({
                          ...insulation,
                          condition: value as string,
                        });
                      }}
                    />
                  ) : (
                    insulation.condition
                  )}
                </div>
              </div>
              <div>
                <p className="text-gray-800">Current R-Value</p>
                <div className="text-[#308883] !font-bold">
                  {isAdmin ? (
                    <ReportEditableInput
                      prefix="R"
                      type="number"
                      value={insulation.current_rValue ?? 0}
                      onChange={(value) => {
                        onUpdateValue({
                          ...insulation,
                          current_rValue: Number(value),
                        });
                      }}
                    />
                  ) : (
                    <>R{insulation.current_rValue}</>
                  )}
                </div>
              </div>
              <div>
                <p className="text-gray-800">Recommended</p>
                <div className="text-[#308883] !font-bold">
                  {isAdmin ? (
                    <ReportEditableInput
                      prefix="R"
                      type="number"
                      value={insulation.recommended_rValue ?? 0}
                      onChange={(value) => {
                        onUpdateValue({
                          ...insulation,
                          recommended_rValue: Number(value),
                        });
                      }}
                    />
                  ) : (
                    <>R{insulation.recommended_rValue}</>
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-xl p-2 border-2 border-gray-200 space-y-2">
              <h3 className="text-lg font-semibold text-[#308883]">
                BPI Recommendation
              </h3>
              <p className="text-gray-700">
                BPI recommends {insulation.title} be insulated to R
                {insulation.recommended_rValue} for optimal energy efficiency.
                Your current insulation is at R{insulation.current_rValue},
                which is{" "}
                {insulation?.recommended_rValue
                  ? Math.round(
                      ((insulation?.current_rValue ?? 0) /
                        insulation?.recommended_rValue) *
                        100
                    )
                  : 0}
                % of the recommended value.
              </p>
            </div>
          </div>

          {/* Image Picker Dialog */}
          {isAdmin && (
            <ReportImagePicker
              buttonClassName="bg-[#308883] hover:bg-[#308883]/90"
              images={houseImages}
              selectedImage={insulation?.images?.[0]?.id}
              isOpen={isImagePickerOpen}
              onOpenChange={setIsImagePickerOpen}
              onSelectImage={(id) => {
                onUpdateValue({
                  ...insulation,
                  images: insulation?.images?.[0]
                    ? [
                        {
                          ...insulation.images?.[0],
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

export default ReportInsulationSectionCard;
