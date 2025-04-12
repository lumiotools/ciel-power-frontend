"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageCustomer } from "@/components/report/ImageCustomer";
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
  onSave?: () => void;
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
  value: number | string;
  parameterName: string;
  onUpdateType: (value: string) => void;
  onUpdateCondition: (value: string) => void;
  onUpdateYear?: (value: number) => void;
  onUpdateValue: (value: number | string) => void;
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
  label?: string;
}

// Enhanced EditableAFUE component with better UI and validation
const EditableAFUE: React.FC<EditableAFUEProps> = ({
  value,
  onChange,
  label = "%",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep local state in sync with props
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // Auto-focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    // Ensure we have a valid number
    const numValue = Number(editValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
      setIsEditing(false);
    } else {
      // Reset to original value if invalid input
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(Number(e.target.value))}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="border border-amber-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-amber-500"
          min={0}
          max={100}
          step="0.1"
        />
        <span className="text-gray-500">{label}</span>
        <button
          onClick={handleSave}
          className="p-1 bg-green-100 hover:bg-green-200 rounded text-green-600 transition-colors"
          title="Save"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setEditValue(value);
            setIsEditing(false);
          }}
          className="p-1 bg-red-100 hover:bg-red-200 rounded text-red-600 transition-colors"
          title="Cancel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group">
      <p className="text-xl font-bold text-amber-700 dark:text-amber-400">
        {value}
        {label}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-amber-100 rounded transition-all"
        title="Edit value"
      >
        <Pencil className="w-4 h-4 text-amber-600" />
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

// MODIFIED: PerformanceCard using EditableAFUE component
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
        <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
          {value}%
        </p>
      )}
    </div>
    <div>
      <p className="text-base text-gray-600 dark:text-gray-400">
        BPI Recommends
      </p>
      <p className="text-2xl font-bold text-green-700 dark:text-green-400">
        {recommended}%
      </p>
    </div>
  </div>
);

// Original InPlaceEdit component
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

// Enhanced SystemDetails component with AFUE/UEF value as part of the details
const SystemDetails: React.FC<SystemDetailsProps> = ({
  isAdmin,
  type,
  condition,
  year,
  value,
  parameterName,
  onUpdateType,
  onUpdateCondition,
  onUpdateYear,
  onUpdateValue,
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
    {/* Add AFUE/UEF value to system details */}
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {parameterName}
      </p>
      {isAdmin ? (
        <EditableAFUE
          value={typeof value === "number" ? value : 0}
          onChange={onUpdateValue}
        />
      ) : (
        <p className="font-medium">
          {typeof value === "number" ? `${value}%` : value}
        </p>
      )}
    </div>
    {year && (
      <div>
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

// MODIFIED: HeatingSystemCard with enhanced SystemDetails component
const HeatingSystemCard: React.FC<HeatingSystemCardProps> = ({
  item,
  index,
  isAdmin,
  recommendedValue = 92,
  onUpdateItem,
  driveImages,
  allData,
}) => {
  const [systemData, setSystemData] = useState({
    type: item?.type ?? "null",
    condition: item?.condition ?? "null",
    value: typeof item?.value === "number" ? item.value : 0,
    parameterName: item?.parameter ?? "null",
    year: item?.year,
    image: item?.image,
  });

  const [animate, setAnimate] = useState(false);
  const itemRef = useRef(null);

  // Set up intersection observer for animation
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
      entries.forEach((entry) => {
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

  // Update state when props change
  useEffect(() => {
    setSystemData({
      type: item.type || "null",
      condition: item.condition || "null",
      value: typeof item.value === "number" ? item.value : 0,
      parameterName: item.parameter || "null",
      year: item.year,
      image: item?.image,
    });
  }, [item]);

  // Update local state and propagate changes to parent component
  const updateSystemData = (field: keyof typeof systemData, value: any) => {
    console.log("System Data", systemData);
    const updatedData = {
      ...systemData,
      [field]: value,
    };

    setSystemData(updatedData);

    console.log("Item: ", item);

    // Only call onUpdateItem if it exists
    if (onUpdateItem) {
      const updatedItem = {
        ...item,
        type: field === "type" ? value : item.type,
        condition: field === "condition" ? value : item.condition,
        value: field === "value" ? value : item.value,
        parameter: field === "parameterName" ? value : item.parameter,
        year: field === "year" ? value : item.year,
        image: field === "image" ? value : item.image,
      };

      onUpdateItem(updatedItem);
    }
  };

  // Helper function to determine if we should show a numeric gauge chart
  const shouldShowGaugeChart = () => {
    return typeof systemData.value === "number" && systemData.value > 0;
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

  // Determine if this is a water heater based on name
  const isWaterHeater = item?.name?.toLowerCase()?.includes("water");

  // Get description text based on item type
  const getDescriptionText = () => {
    if (isWaterHeater) {
      return shouldShowGaugeChart()
        ? `This ${item?.name?.toLowerCase()} has a ${systemData.parameterName} rating of ${systemData.value}%. ${systemData.value < recommendedValue
          ? `Upgrading to a high-efficiency model with ${recommendedValue}% ${systemData.parameterName} could result in significant energy savings.`
          : `This is an efficient unit that meets or exceeds recommended standards.`
        }`
        : `This ${item?.name?.toLowerCase()} does not have a specified ${systemData.parameterName} rating.`;
    } else {
      return shouldShowGaugeChart()
        ? `This ${item?.name?.toLowerCase()} has a ${systemData.parameterName} rating of ${systemData.value}%. ${systemData.value < recommendedValue
          ? `Upgrading to a high-efficiency model with ${recommendedValue}% ${systemData.parameterName} could result in significant energy savings.`
          : `This is an efficient unit that meets or exceeds recommended standards.`
        }`
        : `This ${item?.name?.toLowerCase()} does not have a specified ${systemData.parameterName} rating.`;
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

                {shouldShowGaugeChart() ? (
                  <GaugeChart
                    value={systemData.value as number}
                    maxValue={100}
                    label={`${item.name.split(" ").join("-")}-${index}`}
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
                        }}
                      />
                    ) : (
                      <p className="text-4xl font-bold text-amber-600">
                        {renderValue()}
                      </p>
                    )}
                  </div>
                )}

                {shouldShowGaugeChart() && (
                  <PerformanceCard
                    isAdmin={isAdmin}
                    value={systemData.value as number}
                    recommended={recommendedValue}
                    label={systemData.parameterName}
                    onUpdate={(value) => {
                      updateSystemData("value", value);
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
                  {getDescriptionText()}
                </p>

                {/* Use enhanced SystemDetails component that includes the AFUE/UEF value */}
                <SystemDetails
                  isAdmin={Boolean(isAdmin && onUpdateItem)}
                  type={systemData.type}
                  condition={systemData.condition}
                  year={systemData.year}
                  value={systemData.value}
                  parameterName={systemData.parameterName}
                  onUpdateType={(value) => {
                    updateSystemData("type", value);
                  }}
                  onUpdateCondition={(value) => {
                    updateSystemData("condition", value);
                  }}
                  onUpdateYear={(value) => {
                    updateSystemData("year", value);
                  }}
                  onUpdateValue={(value) => {
                    updateSystemData("value", value);
                  }}
                />

                {isAdmin && onUpdateItem ? (
                  <div className="mt-4">
                    <ImageUpload
                      image={systemData.image ?? ""}
                      onImageChange={(newImage) =>
                        updateSystemData("image", newImage)
                      }
                      driveImages={driveImages}
                    />
                  </div>
                ) : (
                  // systemData.image && (
                  <motion.div
                    className="relative h-48 overflow-hidden rounded-lg mt-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <ImageCustomer
                      image={systemData.image}
                      driveImages={driveImages}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <p className="text-white text-sm">
                        {item.name} - {systemData.type || "standard"} unit
                      </p>
                    </div>
                  </motion.div>

                  // )
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DEFAULT_HEATING_ITEMS = [
  {
    condition: "N/A",
    name: "Primary Heating System",
    parameter: "AFUE",
    type: "None",
    value: 0,
    year: new Date().getFullYear(),
  },
  {
    condition: "N/A",
    name: "Water Heater",
    parameter: "UEF",
    type: "None",
    value: 0,
    year: new Date().getFullYear(),
  },
];

// HeatingContent component with the ability to save data
// Modified HeatingContent component with default data cards
export function HeatingContent({
  data,
  isAdmin = false,
  onUpdateItem,
  driveImages,
  onSave,
}: HeatingContentProps) {
  const params = useParams();
  const bookingNumber = params.bookingNumber;

  // Default heating items
  const DEFAULT_HEATING_ITEMS = {
    heatingSystem: {
      condition: "N/A",
      name: "Primary Heating System",
      parameter: "AFUE",
      type: "None",
      value: 0,
      year: new Date().getFullYear(),
    },
    waterHeater: {
      condition: "N/A",
      name: "Water Heater",
      parameter: "UEF",
      type: "None",
      value: 0,
      year: new Date().getFullYear(),
    },
  };

  // State for each card separately
  const [heatingSystemItem, setHeatingSystemItem] = useState([]);
  const [waterHeaterItem, setWaterHeaterItem] = useState([]);
  useEffect(() => {
    console.log("Heating system item:", heatingSystemItem);
  }, [heatingSystemItem]);

  // Initialize state from provided data
  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      // Look for heating system and water heater in provided data
      console.log("Data received:", data.data);
      const heatingItem = data.data.filter(
        (item) => !item?.name?.toLowerCase()?.includes("water"),
      );

      console.log("heating item", heatingItem)

      const waterItem = data.data.find((item) =>
        item.name.toLowerCase().includes("water"),
      );


      // Update state if items are found
      if (heatingItem) {
        console.log("heating item", heatingItem)
        setHeatingSystemItem(heatingItem);
      }

      if (waterItem) {
        setWaterHeaterItem(waterItem);
      }
    } else {
      setHeatingSystemItem([DEFAULT_HEATING_ITEMS.heatingSystem]);
      setWaterHeaterItem(DEFAULT_HEATING_ITEMS.waterHeater);
    }
  }, [data]);

  // Handle update for either card
  const handleUpdateItem = (updatedItem: HeatingCoolingItem) => {
    if (!isAdmin || !onUpdateItem) return;

    // Pass update to parent
    onUpdateItem(updatedItem);
  };

  const handleSave = async () => {
    const REPORT_DATA_KEY = "report_data";
    let updatedReportData;
    try {
      const data = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
      if (!data) {
        toast.error("No data found in localStorage");
        return;
      }

      updatedReportData = JSON.parse(data);
      updatedReportData = {
        reportData: updatedReportData,
        reportUrl: "",
      };

      console.log("Data being saved:", updatedReportData);
    } catch (e) {
      console.error("Error getting data from localStorage:", e);
      toast.error("Error preparing data for submission");
      return;
    }

    try {
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
        toast.error(errorData.detail || "Failed to update report");
        return;
      }

      toast.success("Heating systems data saved successfully!");
      if (onSave) onSave();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred while saving the data");
    }
  };

  console.log("heating system item", heatingSystemItem);

  return (
    <div className="space-y-8">
      {isAdmin && (
        <div className="flex justify-end items-center">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
          >
            Save
          </button>
        </div>
      )}

      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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

      {/* Primary Heating System Card - always displayed */}
      {heatingSystemItem.length > 0 ? heatingSystemItem.map((item, i) => {
        return (
          <HeatingSystemCard
            key={`heating-system-${i}`}
            item={item}
            index={0}
            isAdmin={isAdmin}
            recommendedValue={92}
            onUpdateItem={handleUpdateItem}
            driveImages={driveImages}
            allData={heatingSystemItem}
          />
        );
      })
        :
        <HeatingSystemCard
          key="heating-system-default"
          item={DEFAULT_HEATING_ITEMS.heatingSystem}
          index={0}
          isAdmin={isAdmin}
          recommendedValue={92}
          onUpdateItem={handleUpdateItem}
          driveImages={driveImages}
          allData={heatingSystemItem}
        />
      }

      {/* Water Heater Card - only displayed if water heater item is found */}

      {/* Water Heater Card - always displayed */}
      <HeatingSystemCard
        key="water-heater"
        item={waterHeaterItem}
        index={1}
        isAdmin={isAdmin}
        recommendedValue={62}
        onUpdateItem={handleUpdateItem}
        driveImages={driveImages}
      />
    </div>
  );
}
