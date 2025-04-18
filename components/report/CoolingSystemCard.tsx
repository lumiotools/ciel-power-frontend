"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Sun, AlertCircle, Edit2, Check, X, Pencil } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { ImageCustomer } from "@/components/report/ImageCustomer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PercentageGauge from "@/components/report/PercentageGauge";
import ValueGauge from "./ValueGauge";

// Only include the necessary interfaces
interface HeatingCoolingItem {
  condition: string;
  name: string;
  parameter: string;
  type: string;
  value: number | string;
  year?: number;
  image?: string;
}

interface CoolingSystemCardProps {
  item: HeatingCoolingItem;
  index: number;
  isAdmin: boolean;
  onUpdateItem?: (updatedItem: HeatingCoolingItem) => void;
  driveImages?: any[];
}

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  type: "text" | "select" | "number";
  options?: string[];
  min?: number;
  max?: number;
}

interface EditableSEERProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

interface InPlaceEditProps {
  initialValue: string;
  isAdmin: boolean;
  onUpdate: (value: string) => void;
  label?: string | null;
}

// Enhanced EditableSEER component with better UI and validation
const EditableSEER: React.FC<EditableSEERProps> = ({
  value,
  onChange,
  label = "",
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
          max={30}
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
      <p className="text-xl font-bold" style={{ color: "#D62501" }}>
        {value}
        {label}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-amber-100 rounded transition-all"
        title="Edit value"
      >
        <Pencil className="w-4 h-4" style={{ color: "#B18C2E" }} />
      </button>
    </div>
  );
};

// Original EditableField component
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

// InPlaceEdit component
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
        className="text-2xl font-bold bg-transparent border-b outline-none"
        style={{ color: "#B18C2E", borderBottomColor: "#B18C2E" }}
      />
    );
  }

  return (
    <div
      className="text-2xl font-bold flex items-center cursor-pointer"
      onClick={handleClick}
      style={{ color: "#B18C2E" }}
    >
      {value}
      {label ? ` ${label}` : ""}
      {isAdmin && <Pencil className="ml-2 h-5 w-5 text-gray-400" />}
    </div>
  );
};

const CoolingSystemCard = ({
  item,
  index,
  isAdmin,
  onUpdateItem,
  driveImages,
}: CoolingSystemCardProps) => {
  const [systemData, setSystemData] = useState({
    type: item?.type ?? "null",
    condition: item?.condition ?? "null",
    value: typeof item?.value === "number" ? item.value : 0,
    parameterName: item?.parameter ?? "SEER",
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
      observer: IntersectionObserver
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
      observerOptions
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
      parameterName: item.parameter || "SEER",
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

  // Get description text based on item type
  const getDescriptionText = () => {
    const seerValue =
      typeof systemData.value === "number" ? systemData.value : 0;
    const recommendedSEER = 16;

    return `Your ${item?.name?.toLowerCase()} has a ${systemData.parameterName} rating of ${seerValue}. ${
      seerValue < recommendedSEER
        ? `Upgrading to a high-efficiency model with ${recommendedSEER} ${systemData.parameterName} could result in significant energy savings.`
        : `This is an efficient unit that meets or exceeds recommended standards.`
    }`;
  };

  // Common heading style for section headings
  const sectionHeadingStyle = {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0%",
    color: "#B18C2E",
  };

  // Consistent card style matching Overview component
  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={cardStyle}>
        <div className="py-3 px-5" style={{ backgroundColor: "#FFFCF3" }}>
          <h2
            className="flex items-center gap-3 font-medium"
            style={{ color: "#B18C2E" }}
          >
            <Sun style={{ color: "#B18C2E" }} className="h-6 w-6" />
            {item.name}
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column - Current Performance and Type/Condition/Year/SEER */}
            <div className="space-y-6">
              {/* Current Performance Box */}
              <div
                ref={itemRef}
                className="rounded-lg p-6"
                style={{
                  backgroundColor: "#FFFCF3",
                  border: "0.5px solid #FDC02529",
                }}
              >
                <h3 className="flex items-center" style={sectionHeadingStyle}>
                  Current Performance
                </h3>

                {shouldShowGaugeChart() ? (
                  <div className="space-y-6">
                    <ValueGauge
                      value={systemData.value}
                      minValue={0}
                      maxValue={16}
                      title={systemData.parameterName}
                    />

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Current {systemData.parameterName}
                        </p>
                        <p
                          className="text-2xl font-bold"
                          style={{ color: "#D62501" }}
                        >
                          {systemData.value}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          BPI Recommends
                        </p>
                        <p
                          className="text-2xl font-bold"
                          style={{ color: "#22C80F" }}
                        >
                          16
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40">
                    {isAdmin && onUpdateItem ? (
                      <InPlaceEdit
                        initialValue={renderValue().toString()}
                        isAdmin={Boolean(isAdmin && onUpdateItem)}
                        onUpdate={(newValue) => {
                          const numValue = Number(newValue);
                          const isNumeric = !isNaN(numValue);
                          updateSystemData(
                            "value",
                            isNumeric ? numValue : newValue
                          );
                        }}
                      />
                    ) : (
                      <p
                        className="text-4xl font-bold"
                        style={{ color: "#D62501" }}
                      >
                        {renderValue()}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Type and Condition Grid */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="font-medium">
                    {isAdmin ? (
                      <EditableField
                        value={systemData.type}
                        onSave={(value) => updateSystemData("type", value)}
                        type="text"
                      />
                    ) : (
                      systemData.type || "Standard"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Condition</p>
                  <p className="font-medium">
                    {isAdmin ? (
                      <EditableField
                        value={systemData.condition}
                        onSave={(value) => updateSystemData("condition", value)}
                        type="select"
                        options={["Poor", "Fair", "Good", "Excellent"]}
                      />
                    ) : (
                      systemData.condition
                    )}
                  </p>
                </div>
              </div>

              {/* Year and SEER Grid */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Year</p>
                  <p className="font-medium">
                    {isAdmin ? (
                      <EditableField
                        value={`${systemData.year || new Date().getFullYear()}`}
                        onSave={(value) =>
                          updateSystemData("year", Number(value))
                        }
                        type="number"
                        min={1900}
                        max={new Date().getFullYear()}
                      />
                    ) : (
                      systemData.year || new Date().getFullYear()
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    {systemData.parameterName}
                  </p>
                  <p className="font-medium">
                    {isAdmin ? (
                      <EditableSEER
                        value={
                          typeof systemData.value === "number"
                            ? systemData.value
                            : 0
                        }
                        onChange={(value) => updateSystemData("value", value)}
                      />
                    ) : typeof systemData.value === "number" ? (
                      systemData.value
                    ) : (
                      systemData.value
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - System Details and Image */}
            <div className="space-y-6">
              <div
                className="rounded-lg p-6"
                style={{
                  backgroundColor: "#FFFCF3",
                  border: "0.5px solid #FDC02529",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle
                    className="h-6 w-6"
                    style={{ color: "#B18C2E" }}
                  />
                  <h3 style={sectionHeadingStyle}>System Details</h3>
                </div>

                <p className="text-gray-700 mb-4">{getDescriptionText()}</p>

                <div
                  className="flex items-center space-x-3 mt-4 py-2"
                  style={{ color: "#B18C2E" }}
                >
                  <Zap className="h-5 w-5" />
                  <span className="text-sm">
                    *Estimated based on Age & Type
                  </span>
                </div>
              </div>

              {/* Image section */}
              <div className="rounded-lg overflow-hidden">
                {isAdmin && onUpdateItem ? (
                  <ImageUpload
                    image={systemData.image ?? ""}
                    onImageChange={(newImage) =>
                      updateSystemData("image", newImage)
                    }
                    driveImages={driveImages}
                  />
                ) : (
                  <div className="relative">
                    <ImageCustomer
                      image={systemData.image}
                      driveImages={driveImages}
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                      Example of a {systemData.type.toLowerCase() || "standard"}{" "}
                      {item.name.toLowerCase()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoolingSystemCard;
