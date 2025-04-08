"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Thermometer,
  Flame,
  Info,
  AlertCircle,
  Edit2,
  Check,
  X,
  Pencil,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { ImageUpload } from "./ImageUpload";
import { driveImages } from "@/utils/image-utils";
import Image from "next/image";

// All interfaces remain the same
interface GaugeChartProps {
  value: number;
  maxValue: number;
  label: string;
  animate: boolean;
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

interface HeatingData {
  data: HeatingCoolingItem[];
  title: string;
}

interface HeatingContentProps {
  data?: HeatingData;
  isAdmin?: boolean;
  onUpdateItem?: (updatedItem: HeatingCoolingItem) => void;
  driveImages?: driveImages[];
}

interface PerformanceCardProps {
  isAdmin: boolean;
  value: number;
  recommended: number;
  label: string;
  onUpdate: (value: number) => void;
}

interface SystemDetailsProps {
  isAdmin: boolean;
  type: string;
  condition: string;
  year?: number;
  onUpdateType: (value: string) => void;
  onUpdateCondition: (value: string) => void;
  onUpdateYear?: (value: number) => void;
}

interface HeatingSystemCardProps {
  item: HeatingCoolingItem;
  index: number;
  isAdmin: boolean;
  recommendedValue?: number;
  onUpdateItem?: (updatedItem: HeatingCoolingItem) => void;
  driveImages?: driveImages[];
}

interface InPlaceEditProps {
  initialValue: string;
  isAdmin: boolean;
  onUpdate: (value: string) => void;
  label?: string | null;
}

interface EditableAFUEProps {
  value: number;
  onChange: (value: number) => void;
}

// NEW COMPONENT: Dedicated component for editable AFUE values
const EditableAFUE: React.FC<EditableAFUEProps> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  // Keep local state in sync with props
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onChange(Number(editValue));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(Number(e.target.value))}
          className="border rounded px-2 py-1 w-20"
          min={0}
          max={100}
          autoFocus
        />
        <button
          onClick={handleSave}
          className="p-1 bg-green-100 hover:bg-green-200 rounded text-green-600"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setEditValue(value);
            setIsEditing(false);
          }}
          className="p-1 bg-red-100 hover:bg-red-200 rounded text-red-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-2xl font-bold text-[#b45309] dark:text-amber-400">
        {value}%
      </p>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  );
};

// Original GaugeChart component - unchanged
const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  maxValue,
  label,
  animate,
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
          fill="currentColor"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
};

// Original EditableField component - unchanged
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

// MODIFIED: Simplified PerformanceCard component that uses the dedicated EditableAFUE component
const PerformanceCard: React.FC<PerformanceCardProps> = ({
  isAdmin,
  value,
  recommended,
  label,
  onUpdate,
}) => (
  <div className="mt-8 grid grid-cols-2 gap-8">
    <div>
      <p className="text-base text-gray-600 dark:text-gray-400">
        Current {label}
      </p>
      {isAdmin ? (
        <EditableAFUE value={value} onChange={onUpdate} />
      ) : (
        <p className="text-2xl font-bold text-[#b45309] dark:text-amber-400">
          {value}%
        </p>
      )}
    </div>
    <div>
      <p className="text-base text-gray-600 dark:text-gray-400">
        BPI Recommends
      </p>
      <p className="text-2xl font-bold text-[#65a30d] dark:text-green-400">
        {recommended}%
      </p>
    </div>
  </div>
);

// Original InPlaceEdit component - unchanged
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
        className="text-2xl font-bold text-amber-700 bg-transparent border-b border-amber-700 outline-none"
      />
    );
  }

  return (
    <div
      className="text-2xl font-bold text-amber-700 flex items-center cursor-pointer"
      onClick={handleClick}
    >
      {value}
      {label ? ` ${label}` : ""}
      {isAdmin && <Pencil className="ml-2 h-5 w-5 text-gray-400" />}
    </div>
  );
};

// Original SystemDetails component - unchanged
const SystemDetails: React.FC<SystemDetailsProps> = ({
  isAdmin,
  type,
  condition,
  year,
  onUpdateType,
  onUpdateCondition,
  onUpdateYear,
}) => (
  <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 rounded-lg p-4">
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
      {isAdmin ? (
        <EditableField value={type} onSave={onUpdateType} type="text" />
      ) : (
        <p className="font-medium">{type}</p>
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
      <div className="col-span-2">
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
  </div>
);

// MODIFIED: HeatingSystemCard with direct isAdmin prop passing
const HeatingSystemCard: React.FC<HeatingSystemCardProps> = ({
  item,
  index,
  isAdmin,
  recommendedValue = 92,
  onUpdateItem,
  driveImages,
}) => {
  const [systemData, setSystemData] = useState({
    type: item.type || "null",
    condition: item.condition || "null",
    value: typeof item.value === "number" ? item.value : 0,
    parameterName: item.parameter || "null",
    year: item.year,
    image: item?.image,
  });

  const [animate, setAnimate] = useState(false);
  const itemRef = useRef(null);

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

  interface SystemData {
    type: string;
    condition: string;
    value: number | string;
    parameterName: string;
    year?: number;
    image: string;
  }

  // Update local state and propagate changes to parent component
  const updateSystemData = (
    field: keyof SystemData,
    value: string | number,
  ) => {
    const updatedData = {
      ...systemData,
      [field]: value,
    };

    setSystemData(updatedData);

    // Only call onUpdateItem if it exists
    if (onUpdateItem) {
      const updatedItem = {
        ...item,
        type: field === "type" ? (value as string) : item.type,
        condition: field === "condition" ? (value as string) : item.condition,
        value: field === "value" ? value : item.value,
        parameter:
          field === "parameterName" ? (value as string) : item.parameter,
        year: field === "year" ? (value as number) : item.year,
        image: field === "image" ? (value as string) : item.image,
      };

      onUpdateItem(updatedItem);
    }
  };

  const renderValue = () => {
    if (typeof systemData.value === "number") {
      return systemData.value;
    } else if (systemData.value === "") {
      return "N/A";
    } else {
      return systemData.value;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden mb-8">
        <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
          <CardTitle className="text-xl text-amber-600 dark:text-amber-200 flex items-center gap-2">
            <Flame className="h-6 w-6" />
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
              initialValue={systemData.parameterName}
              isAdmin={Boolean(isAdmin && onUpdateItem)}
              onUpdate={(newValue) => {
                updateSystemData("parameterName", newValue);
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
        <CardContent className="p-6">
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
                {typeof systemData.value === "number" ? (
                  <GaugeChart
                    value={systemData.value}
                    maxValue={100}
                    label={`${item.name}-${index}`}
                    animate={animate}
                  />
                ) : (
                  <div className="flex justify-center items-center h-40">
                    {isAdmin && onUpdateItem ? (
                      <InPlaceEdit
                        initialValue={renderValue().toString()}
                        isAdmin={Boolean(isAdmin && onUpdateItem)}
                        onUpdate={(newValue) => {
                          const numValue = Number(newValue);
                          const isNumeric = !isNaN(numValue);

                          updateSystemData(
                            "value",
                            isNumeric ? numValue : newValue,
                          );

                          if (onUpdateItem) {
                            onUpdateItem({
                              ...item,
                              value: isNumeric ? numValue : newValue,
                            });
                          }
                        }}
                      />
                    ) : (
                      <p className="text-4xl font-bold text-amber-600">
                        {renderValue()}
                      </p>
                    )}
                  </div>
                )}
                {typeof systemData.value === "number" && (
                  <PerformanceCard
                    isAdmin={isAdmin} // MODIFIED: Pass isAdmin directly
                    value={systemData.value}
                    recommended={recommendedValue}
                    label={systemData.parameterName}
                    onUpdate={(value) => {
                      updateSystemData("value", value);

                      if (onUpdateItem) {
                        onUpdateItem({
                          ...item,
                          value: value,
                        });
                      }
                    }}
                  />
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-amber-50 dark:bg-amber-900/50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-300">
                    System Details
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {typeof systemData.value === "number" ? (
                    <>
                      This {item.name.toLowerCase()} has a{" "}
                      {systemData.parameterName} rating of {systemData.value}%.
                      {systemData.value < recommendedValue
                        ? ` Upgrading to a high-efficiency model with ${recommendedValue}% ${systemData.parameterName} could result in significant energy savings.`
                        : ` This is an efficient unit that meets or exceeds recommended standards.`}
                    </>
                  ) : (
                    `This ${item.name.toLowerCase()} does not have a specified ${
                      systemData.parameterName
                    } rating.`
                  )}
                </p>
                <SystemDetails
                  isAdmin={Boolean(isAdmin && onUpdateItem)}
                  type={systemData.type}
                  condition={systemData.condition}
                  year={systemData.year}
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
                />
                {isAdmin && onUpdateItem ? (
                  <ImageUpload
                    image={systemData.image ?? ""}
                    onImageChange={(newImage) =>
                      updateSystemData("image", newImage)
                    }
                    driveImages={driveImages}
                  />
                ) : (
                  <motion.div
                    className="relative h-48 overflow-hidden rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={systemData.image ?? ""}
                      alt="Air Conditioning Unit"
                      className="object-cover w-full h-full"
                      width={500}
                      height={500}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <p className="text-white text-sm">
                        Example of a {systemData.type || "central"} air
                        conditioning unit
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// HeatingContent component with direct isAdmin prop passing
export function HeatingContent({
  data,
  isAdmin = false,
  onUpdateItem,
  driveImages,
}: HeatingContentProps) {
  const params = useParams();

  const bookingNumber = params.bookingNumber;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // Group heating items from heatingAndCooling and water heaters
  const heatingItems =
    data?.data?.filter(
      (item) =>
        item.name.toLowerCase().includes("furnace") ||
        item.name.toLowerCase().includes("boiler") ||
        item.name.toLowerCase().includes("heat") ||
        item.name.toLowerCase().includes("water"),
    ) || [];

  console.log("Heating Items:", heatingItems);

  // Function to handle updates to heating items
  const handleUpdateItem = (updatedItem: HeatingCoolingItem) => {
    console.log("Updated Item in HeatingContent:", updatedItem);
    console.log("isAdmin in HeatingContent:", isAdmin);
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
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end items-center">
        <button
          onClick={onSumit}
          className=" px-4 py-2 rounded-full bg-green-500 text-white font-bold "
        >
          Save
        </button>
      </div>
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
            <CardTitle className="text-2xl text-amber-600 dark:text-amber-200 flex items-center gap-2">
              <Thermometer className="h-6 w-6" />
              Understanding Your Home&apos;s Heating Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 text-gray-600 dark:text-gray-300">
              <Info className="h-5 w-5 mt-1 flex-shrink-0 text-amber-600" />
              <p className="text-sm leading-relaxed">
                Your home&apos;s heating systems are crucial for comfort and
                energy efficiency. We assess both your furnace&apos;s AFUE
                (Annual Fuel Utilization Efficiency) and your water
                heater&apos;s UEF (Uniform Energy Factor) to ensure optimal
                performance and identify potential savings opportunities.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {heatingItems.length > 0 ? (
        heatingItems.map((item, index) => (
          <HeatingSystemCard
            key={`${item.name}-${index}`}
            item={item}
            index={index}
            isAdmin={isAdmin} // MODIFIED: Pass isAdmin directly
            recommendedValue={
              item.name.toLowerCase().includes("water") ? 62 : 92
            }
            onUpdateItem={handleUpdateItem}
            driveImages={driveImages}
          />
        ))
      ) : (
        <motion.div {...fadeInUp}>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No heating system data available.</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
