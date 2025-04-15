"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import ImageCustomer from "./ImageCustomer";
import { ImageUpload } from "./ImageUpload";

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  type: "text" | "select" | "number";
  options?: string[];
  min?: number;
  max?: number;
}

interface WallData {
  material: string;
  condition: string;
  rValue: number;
  recommendedValue: number;
  maxValue: number;
  efficiency: number;
  image: string; // Changed from string[] to string
}

// New interface for the data coming from reportData
interface InsulationItemData {
  condition: string;
  material: string;
  name: string;
  rValue: number;
}

interface ExteriorWallAssessmentProps {
  data?: InsulationItemData | null;
  isAdmin?: boolean;
  onUpdate?: (updatedItem: InsulationItemData) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  type,
  options = [],
  min,
  max,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <span>{value}</span>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {type === "number" ? (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={editValue}
            min={min}
            max={max}
            onChange={(e) => setEditValue(e.target.value)}
            className="border rounded px-2 py-1 w-32"
          />
          <button
            onClick={handleSave}
            className="p-1 hover:bg-green-100 rounded text-green-600"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-red-100 rounded text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : type === "select" ? (
        <div className="flex items-center gap-2">
          <Select
            value={editValue}
            onValueChange={(value) => {
              setEditValue(value);
              onSave(value);
              setIsEditing(false);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue>{editValue}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-red-100 rounded text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="border rounded px-2 py-1 w-32"
          />
          <button
            onClick={handleSave}
            className="p-1 hover:bg-green-100 rounded text-green-600"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-red-100 rounded text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

// const ImageUpload = ({
//   image,
//   onImageChange,
//   driveImages,
// }: {
//   image: string;
//   onImageChange: (newImage: string) => void;
//   driveImages?: string[];
// }) => {
//   const fileInputRef = React.useRef<HTMLInputElement>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       onImageChange(imageUrl);
//       setIsModalOpen(false);
//     }
//   };

//   const [imageSelected, setImageSelected] = useState<string>([]);
//   const handleImageSelect = (image: string) => {
//     console.log("Selected image:", image);
//     setImageSelected(image);
//   };

//   const handleSave = () => {
//     if (imageSelected) {
//       onImageChange(imageSelected?.id);
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <Image
//         src={imageSelected?.thumbnailLink ?? image ?? "/placeholder.svg"}
//         alt="Insulation inspection"
//         className="w-full h-64 object-cover rounded-lg mt-4"
//         width={400}
//         height={256}
//       />
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="absolute top-6 right-2 bg-white p-2 rounded-full shadow-lg"
//       >
//         <Edit2 className="w-4 h-4" />
//       </button>
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-blend-saturation bg-opacity-50 flex items-center justify-center z-50">
//           <div className=" max-h-[80vh] max-w-[70vw] overflow-y-auto bg-white">
//             <div>
//               {driveImages && (
//                 <div className="grid grid-cols-3 gap-4 mb-4 p-3 rounded-lg">
//                   {driveImages.map((img, index) => (
//                     <div
//                       key={index}
//                       className="relative w-full h-32 bg-gray-200 rounded-lg overflow-hidden"
//                     >
//                       <Image
//                         src={img?.thumbnailLink}
//                         alt={`Drive Image ${index + 1}`}
//                         width={60}
//                         height={60}
//                         className={`w-full h-full object-cover ${
//                           imageSelected?.id === img?.id
//                             ? "ring-2 ring-blue-500 border-2 border-red-400"
//                             : ""
//                         }`}
//                         onClick={() => handleImageSelect(img)}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="bg-white p-4 rounded">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 accept="image/*"
//                 className="hidden"
//               />
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Choose New Image
//               </button>
//             </div>
//             <div className="flex justify-end gap-2 mb-4">
//               <button
//                 onClick={handleSave}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 rounded border hover:bg-gray-100 cursor-pointer"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//           <IoMdClose
//             size={24}
//             className=" absolute top-3 right-3"
//             onClick={() => setIsModalOpen(false)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

interface FieldItem {
  label: string;
  value: string;
  field: keyof WallData;
  type: "text" | "select" | "number";
  options?: string[];
}

export function ExteriorWallAssessment({
  data,
  isAdmin = false,
  onUpdate,
  driveImages,
}: ExteriorWallAssessmentProps) {
  const defaultWallData: WallData = {
    material: "None",
    condition: "N/A",
    rValue: 0,
    recommendedValue: 13,
    maxValue: 20,
    efficiency: 0,
    images: "/placeholder.svg",
  };

  const processWallData = (): WallData => {
    if (!data) return defaultWallData;

    return {
      material: data.material || "None",
      condition: data.condition || "N/A",
      rValue: data.rValue || 0,
      recommendedValue: 13,
      maxValue: 20,
      efficiency: data.rValue ? Math.round((data.rValue / 13) * 100) : 0,
      images: "/placeholder.svg",
    };
  };

  const [wallData, setWallData] = useState<WallData>(processWallData());

  useEffect(() => {
    setWallData(processWallData());
  }, [data]);

  const updateWallData = (
    field: keyof WallData,
    value: string | number | string[],
  ) => {
    setWallData((prev) => {
      const newData = { ...prev, [field]: value };

      let updatedField: Partial<InsulationItemData> = {};

      if (field === "rValue") {
        const numericValue =
          typeof value === "number"
            ? value
            : Number.parseInt(value.toString().replace("R", ""));

        if (!isNaN(numericValue)) {
          newData.rValue = numericValue;
          newData.efficiency = Math.round(
            (numericValue / newData.recommendedValue) * 100,
          );
          updatedField = { rValue: numericValue };
        }
      } else if (
        field === "material" ||
        field === "condition" ||
        field === "image"
      ) {
        updatedField = { [field]: value as string };
      }

      if (onUpdate && Object.keys(updatedField).length > 0) {
        const updatedItem: InsulationItemData = {
          ...(data ?? { name: "Your Home's Exterior Wall Insulation" }),
          ...updatedField,
        };
        onUpdate(updatedItem);
      }

      return newData;
    });
  };

  const updateImage = (newImage: string) => {
    updateWallData("image", newImage);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="text-2xl text-teal-600 dark:text-teal-300">
            Your Home&apos;s Exterior Wall Insulation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {(
                  [
                    {
                      label: "Material",
                      value: wallData.material,
                      field: "material" as keyof WallData,
                      type: "text" as const,
                    },
                    {
                      label: "Condition",
                      value: wallData.condition,
                      field: "condition" as keyof WallData,
                      type: "select" as const,
                      options: ["N/A", "Poor", "Fair", "Good", "Excellent"],
                    },
                    {
                      label: "Current R-Value",
                      value: `R${wallData.rValue}`,
                      field: "rValue" as keyof WallData,
                      type: "text" as const,
                    },
                    {
                      label: "Recommended",
                      value: `R${wallData.recommendedValue}`,
                      field: "recommendedValue" as keyof WallData,
                      type: "text" as const,
                    },
                  ] satisfies FieldItem[]
                ).map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.label}
                      </div>
                      <div className="font-medium mt-1 text-gray-900 dark:text-gray-100">
                        {isAdmin ? (
                          <EditableField
                            value={item.value}
                            onSave={(value) => {
                              if (
                                item.field === "rValue" ||
                                item.field === "recommendedValue"
                              ) {
                                updateWallData(
                                  item.field,
                                  Number.parseInt(value.replace("R", "")),
                                );
                              } else {
                                updateWallData(item.field, value);
                              }
                            }}
                            type={item.type}
                            options={item.options}
                          />
                        ) : (
                          item.value
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Current Efficiency
                    </span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {isAdmin ? (
                        <EditableField
                          value={`${Math.round((wallData.rValue / wallData.recommendedValue) * 100)}`}
                          onSave={(value) => {
                            const efficiency = Number.parseInt(value);
                            if (!isNaN(efficiency)) {
                              const newRValue =
                                (efficiency * wallData.recommendedValue) / 100;
                              updateWallData("rValue", newRValue);
                              updateWallData("efficiency", efficiency);
                            }
                          }}
                          type="number"
                          min={0}
                          max={100}
                        />
                      ) : (
                        `${Math.round((wallData.rValue / wallData.recommendedValue) * 100)}%`
                      )}
                    </span>
                  </div>
                  <Progress
                    value={(wallData.rValue / wallData.maxValue) * 100}
                    className="h-2 bg-teal-100 dark:bg-teal-700"
                  />
                </CardContent>
              </Card>

              <Card className="bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-teal-600 dark:text-teal-300">
                    BPI Recommendation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    BPI recommends Exterior Walls be insulated to R
                    {wallData.recommendedValue} for optimal energy efficiency.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                {isAdmin ? (
                  <ImageUpload
                    driveImages={driveImages}
                    image={wallData.images || "/placeholder.svg"}
                    onImageChange={(newImage) => updateImage(newImage)}
                  />
                ) : (
                  <ImageCustomer
                    image={wallData.images || "/placeholder.svg"}
                    driveImages={driveImages}
                  />
                )}
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Analysis
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {wallData.rValue < 10 ? (
                      <>
                        Thermal imaging reveals significant heat loss through
                        the exterior walls, indicating insufficient insulation.
                        The current R-value of R{wallData.rValue} is well below
                        the recommended R{wallData.recommendedValue} standard.
                      </>
                    ) : wallData.rValue < wallData.recommendedValue ? (
                      <>
                        The walls have some insulation with an R-value of R
                        {wallData.rValue}, but it falls short of the recommended
                        R{wallData.recommendedValue} standard. Upgrading would
                        improve energy efficiency.
                      </>
                    ) : (
                      <>
                        Your exterior walls are well insulated with an R-value
                        of R{wallData.rValue}, meeting or exceeding the
                        recommended R{wallData.recommendedValue} standard. This
                        contributes to a well-insulated and energy-efficient
                        home.
                      </>
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
