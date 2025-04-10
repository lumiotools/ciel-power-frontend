"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Zap, Edit2, Check, X, Sun, Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";
import { ImageCustomer } from "@/components/report/ImageCustomer";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { driveImages } from "@/utils/image-utils";

interface GaugeChartProps {
  value: number;
  maxValue: number;
  label: string;
  animate?: boolean;
}

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  type: "text" | "select" | "number";
  options?: string[];
  min?: number;
  max?: number;
}

interface HeatingCoolingItem {
  condition: string;
  name: string;
  parameter: string;
  type: string;
  value: number | string;
  year?: number;
  image?: string;
}

interface CoolingData {
  data: HeatingCoolingItem[];
  title: string;
}

interface CoolingContentProps {
  data?: CoolingData;
  isAdmin?: boolean;
  onUpdateItem?: (updatedItem: HeatingCoolingItem) => void;
  driveImages?: driveImages[];
  onSave?: () => void;
}

// interface ImageUploadProps {
//   src: string;
//   onImageChange: (newImage: string) => void;
// }

interface SystemDetailsProps {
  isAdmin: boolean;
  type: string;
  condition: string;
  year?: number;
  seer: number;
  onUpdateType: (value: string) => void;
  onUpdateCondition: (value: string) => void;
  onUpdateYear?: (value: number) => void;
  onUpdateSeer?: (value: number) => void;
}

interface CoolingSystemCardProps {
  item: HeatingCoolingItem;
  index: number;
  isAdmin: boolean;
  onUpdateItem?: (updatedItem: HeatingCoolingItem) => void;
  driveImages?: string[];
  image?: string;
}

interface SystemData {
  type: string;
  condition: string;
  currentSEER: number;
  recommendedSEER: number;
  image: string;
  year?: number;
}

interface InPlaceEditProps {
  initialValue: string;
  isAdmin: boolean;
  onUpdate: (value: string) => void;
  label?: string | null;
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  maxValue,
  label,
  animate = true,
}) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      <svg viewBox="-10 0 220 110" className="w-full">
        <path
          d="M 0 110 A 100 100 0 0 1 200 110"
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="16"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient
            id={`gauge-gradient-${label}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="25%" stopColor="#ea580c" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="75%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 0 110 A 100 100 0 0 1 200 110"
          fill="none"
          stroke={`url(#gauge-gradient-${label})`}
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ strokeDasharray: "0, 314" }}
          animate={
            animate
              ? { strokeDasharray: `${percentage * 3.14}, 314` }
              : { strokeDasharray: "0, 314" }
          }
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <text
          x="100"
          y="95"
          textAnchor="middle"
          className="text-4xl font-bold"
          fill="#b45309"
        >
          {value}
        </text>
      </svg>
    </div>
  );
};

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

const InPlaceEdit: React.FC<InPlaceEditProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  label = null,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isAdmin) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onUpdate(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      if (value !== initialValue) {
        onUpdate(value);
      }
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="text-xl font-bold text-amber-700 bg-transparent border-b border-amber-700 outline-none"
      />
    );
  }

  return (
    <div
      className="text-xl font-bold text-amber-700 flex items-center cursor-pointer"
      onClick={handleClick}
    >
      {value}
      {label ? ` ${label}` : ""}
      {isAdmin && <Pencil className="ml-2 h-5 w-5 text-gray-400" />}
    </div>
  );
};

// const ImageUpload: React.FC<ImageUploadProps> = ({ src, onImageChange }) => {
//   const fileInputRef = React.useRef<HTMLInputElement>(null)
//   const [isEditing, setIsEditing] = useState(false)

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const imageUrl = URL.createObjectURL(file)
//       onImageChange(imageUrl)
//       setIsEditing(false)
//     }
//   }

//   return (
//     <motion.div className="relative h-48 overflow-hidden rounded-lg" whileHover={{ scale: 1.02 }}>
//       <img src={src || "/api/placeholder/400/320"} alt="Air Conditioning Unit" className="object-cover w-full h-full" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
//         <p className="text-white text-sm">Example of a central air conditioning unit</p>
//       </div>
//       {isEditing && (
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded">
//             <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Choose New Image
//             </button>
//             <button onClick={() => setIsEditing(false)} className="ml-2 px-4 py-2 rounded border hover:bg-gray-100">
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//       {!isEditing && (
//         <button
//           onClick={() => setIsEditing(true)}
//           className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
//         >
//           <Edit2 className="w-4 h-4" />
//         </button>
//       )}
//     </motion.div>
//   )
// }

const SystemDetails: React.FC<SystemDetailsProps> = ({
  isAdmin,
  type,
  condition,
  year,
  seer,
  onUpdateType,
  onUpdateCondition,
  onUpdateYear,
  onUpdateSeer,
}) => (
  <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 rounded-lg p-4">
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
      {isAdmin ? (
        <EditableField value={type || ""} onSave={onUpdateType} type="text" />
      ) : (
        <p className="font-medium">{type || "Central"}</p>
      )}
    </div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Condition</p>
      {isAdmin ? (
        <EditableField
          value={condition}
          onSave={onUpdateCondition}
          type="select"
          options={["Poor", "Fair", "Good", "Excellent"]}
        />
      ) : (
        <p className="font-medium">{condition}</p>
      )}
    </div>
    {year && (
      <div className="">
        <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
        {isAdmin && onUpdateYear ? (
          <EditableField
            value={`${year}`}
            onSave={(value) => onUpdateYear(Number(value))}
            type="number"
            min={1900}
            max={new Date().getFullYear()}
          />
        ) : (
          <p className="font-medium">{year}</p>
        )}
      </div>
    )}

    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Seer</p>
      {isAdmin && onUpdateSeer ? (
        <EditableField
          value={`${seer}`}
          onSave={(value) => onUpdateSeer(Number(value))}
          type="number"
          min={0}
        />
      ) : (
        <p className="font-medium">{seer}</p>
      )}
    </div>
  </div>
);

const CoolingSystemCard: React.FC<CoolingSystemCardProps> = ({
  item,
  index,
  isAdmin,
  onUpdateItem,
  driveImages,
}) => {
  const [systemData, setSystemData] = useState<SystemData>({
    type: item.type || "null",
    condition: item.condition || "null",
    currentSEER: typeof item.value === "number" ? item.value : 0,
    recommendedSEER: 16,
    image: item.image,
    year: item.year,
  });

  const [animate, setAnimate] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    if (itemRef.current) observer.observe(itemRef.current);

    return () => {
      if (itemRef.current) observer.unobserve(itemRef.current);
    };
  }, []);

  const updateSystemData = (
    field: keyof SystemData,
    value: string | number,
  ) => {
    const updatedData = {
      ...systemData,
      [field]: value,
    };

    setSystemData(updatedData);

    // Only propagate updates if onUpdateItem is provided
    if (onUpdateItem) {
      console.log({ field, value });
      const updatedItem = {
        ...item,
        type: field === "type" ? (value as string) : item.type,
        condition: field === "condition" ? (value as string) : item.condition,
        value: field === "currentSEER" ? (value as number) : item.value,
        year: field === "year" ? (value as number) : item.year,
        image: field === "image" ? (value as string) : item.image,
      };
      console.log("updatedItem", updatedItem);
      onUpdateItem(updatedItem);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8"
    >
      <Card className="overflow-hidden border-amber-100">
        <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
          <CardTitle className="text-xl text-amber-600 dark:text-amber-200 flex items-center gap-2">
            <Sun className="h-6 w-6" />
            <InPlaceEdit
              initialValue={item.name}
              isAdmin={Boolean(isAdmin && onUpdateItem)}
              onUpdate={(newValue) => {
                if (onUpdateItem) {
                  onUpdateItem({
                    ...item,
                    name: newValue,
                  });
                }
              }}
            />
            -
            <InPlaceEdit
              initialValue={item.parameter}
              isAdmin={Boolean(isAdmin && onUpdateItem)}
              onUpdate={(newValue) => {
                if (onUpdateItem) {
                  onUpdateItem({
                    ...item,
                    parameter: newValue,
                  });
                }
              }}
            />
            Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-amber-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div
                ref={itemRef}
                className="relative bg-[#fffbeb] dark:bg-amber-900/20 rounded-lg p-6"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-500 to-green-500 opacity-5 rounded-lg"
                  style={{
                    mixBlendMode: "overlay",
                  }}
                />
                <h3 className="relative text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-6">
                  Current Performance
                </h3>
                <GaugeChart
                  value={systemData.currentSEER}
                  maxValue={20}
                  label={`cooling-${index}`}
                  animate={animate}
                />
                <div className="mt-8 grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Current {item.parameter}
                    </p>
                    {isAdmin && onUpdateItem ? (
                      <EditableField
                        value={`${systemData.currentSEER}`}
                        onSave={(value) => {
                          const numValue = Number.parseInt(value);
                          updateSystemData("currentSEER", numValue);

                          if (onUpdateItem) {
                            onUpdateItem({
                              ...item,
                              value: numValue,
                            });
                          }
                        }}
                        type="number"
                        min={0}
                        max={20}
                      />
                    ) : (
                      <p className="text-3xl font-bold text-[#b45309] dark:text-amber-400">
                        {systemData.currentSEER}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      BPI Recommends
                    </p>
                    <p className="text-3xl font-bold text-[#65a30d] dark:text-green-400">
                      {systemData.recommendedSEER}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-amber-600" />
                  <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-300">
                    System Details
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Your air conditioner&apos;s current {item.parameter} rating of{" "}
                  {systemData.currentSEER} means it&apos;s operating
                  {systemData.currentSEER < systemData.recommendedSEER
                    ? ` below optimal efficiency. Upgrading to a high-efficiency model with ${systemData.recommendedSEER} ${item.parameter} could result in significant energy savings.`
                    : ` at an efficient level that meets or exceeds recommended standards.`}
                </p>
                <SystemDetails
                  isAdmin={Boolean(isAdmin && onUpdateItem)}
                  type={systemData.type}
                  condition={systemData.condition}
                  year={systemData.year}
                  seer={systemData.currentSEER}
                  onUpdateType={(value) => {
                    updateSystemData("type", value);
                    if (onUpdateItem) {
                      onUpdateItem({
                        ...item,
                        type: value,
                      });
                    }
                  }}
                  onUpdateCondition={(value) => {
                    updateSystemData("condition", value);
                    if (onUpdateItem) {
                      onUpdateItem({
                        ...item,
                        condition: value,
                      });
                    }
                  }}
                  onUpdateYear={(value) => {
                    updateSystemData("year", value);
                    if (onUpdateItem) {
                      onUpdateItem({
                        ...item,
                        year: value,
                      });
                    }
                  }}
                  onUpdateSeer={(value) => {
                    updateSystemData("currentSEER", value);
                    if (onUpdateItem) {
                      onUpdateItem({
                        ...item,
                        value: value,
                      });
                    }
                  }}
                />
                <div className="flex items-center space-x-2 text-amber-600 mt-4">
                  <Zap className="h-5 w-5" />
                  <span className="text-sm">
                    *SEER = Seasonal Energy Efficiency Ratio
                  </span>
                </div>
              </div>

              {isAdmin && onUpdateItem ? (
                <ImageUpload
                  image={systemData.image}
                  onImageChange={(newImage) =>
                    updateSystemData("image", newImage)
                  }
                  driveImages={driveImages}
                />
              ) : (
                // <motion.div
                //   className="relative h-48 overflow-hidden rounded-lg"
                //   whileHover={{ scale: 1.02 }}
                // >
                //   <img
                //     src={"/placeholder.jpg"}
                //     alt="Air Conditioning Unit"
                //     className="object-cover w-full h-full"
                //   />
                //   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                //     <p className="text-white text-sm">
                //       Example of a {systemData.type || "central"} air
                //       conditioning unit
                //     </p>
                //   </div>
                // </motion.div>
                <ImageCustomer
                  image={systemData.image}
                  driveImages={driveImages}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export function CoolingContent({
  data,
  isAdmin = false,
  onUpdateItem,
  driveImages,
  onSave,
}: CoolingContentProps) {
  const params = useParams();

  const bookingNumber = params.bookingNumber;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // Filter cooling-related items
  const coolingItems =
    data?.data?.filter(
      (item) =>
        item.name.toLowerCase().includes("a/c") ||
        item.name.toLowerCase().includes("air condition") ||
        item.name.toLowerCase().includes("cooling") ||
        item.name.toLowerCase().includes("heat pump"),
    ) || [];

  // Handle updating cooling items
  const handleUpdateItem = (updatedItem: HeatingCoolingItem) => {
    if (isAdmin && onUpdateItem) {
      onUpdateItem(updatedItem);
    }
  };

  const onSumit = async () => {
    const REPORT_DATA_KEY = "report_data";
    let updatedReportData;
    try {
      const data = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
      console.log("Data from localStorage:", data);

      if (!data) {
        console.error("No insulation data found in localStorage");
        return;
      }
      // updatedReportData=data;
      updatedReportData = JSON.parse(data, null, 2);
      updatedReportData = {
        reportData: updatedReportData,
        displayReport: true,
        reportUrl: "",
      };

      console.log("Saved insulation data to localStorage");
    } catch (e) {
      console.error("Error getting insulation data to localStorage:", e);
    }

    try {
      console.log("Submitting data:", updatedReportData);
      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/report/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReportData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch report details");
        return;
      }

      const data = await response.json();
      toast.success("Data submitted successfully!");
      console.log("Data submitted successfully:", data);
      onSave();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="space-y-8">
      {isAdmin && (<div className="flex justify-end items-center">
        <button
          onClick={onSumit}
          className=" px-4 py-2 rounded-full bg-green-500 text-white font-bold "
        >
          Save
        </button>
      </div>)}
      <motion.div {...fadeInUp}>
        <Card className="border-amber-100">
          <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
            <CardTitle className="text-2xl text-amber-600 dark:text-amber-200 flex items-center gap-2">
              <Sun className="h-6 w-6" />
              Air Conditioning Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 bg-amber-50/50">
            <p className="text-gray-700 dark:text-gray-300">
              During your Home Energy Assessment, our technician closely
              examined your cooling equipment to determine the efficiency level
              of the system.
            </p>
            <div className="flex items-start space-x-4 text-gray-600 dark:text-gray-300">
              <Info className="h-5 w-5 mt-1 flex-shrink-0 text-amber-600" />
              <p className="text-sm leading-relaxed">
                SEER (Seasonal Energy Efficiency Ratio) - A ratio of the cooling
                output during a typical cooling season with the total electric
                energy input during the same period.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {coolingItems.length > 0 ? (
        coolingItems.map((item, index) => (
          <CoolingSystemCard
            key={`${item.name}-${index}`}
            item={item}
            index={index}
            isAdmin={isAdmin}
            onUpdateItem={handleUpdateItem}
            driveImages={driveImages}
          />
        ))
      ) : (
        <motion.div {...fadeInUp}>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No cooling system data available.</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
