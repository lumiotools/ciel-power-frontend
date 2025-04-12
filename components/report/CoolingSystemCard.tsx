// Completely isolated CoolingSystemCard that uses ref to preserve state
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Zap, Sun } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { ImageCustomer } from "@/components/report/ImageCustomer";
import { driveImages } from "@/utils/image-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const CoolingSystemCard = ({
  item,
  index,
  isAdmin,
  onUpdateItem,
  driveImages,
}: CoolingSystemCardProps) => {
  // Use a ref to store the full item state to prevent any loss between renders
  const itemRef = useRef<HeatingCoolingItem>({ ...item });

  // Use state only for triggering re-renders when fields change
  const [, forceRender] = useState(0);

  // Animation state
  const [animate, setAnimate] = useState(false);
  const elemRef = useRef(null);

  // Update our ref with any initial changes from parent
  useEffect(() => {
    // Only update ref on first render to avoid losing local changes
    if (JSON.stringify(itemRef.current) === JSON.stringify({ ...item })) {
      itemRef.current = { ...item };
    }
  }, [item]);

  // Set up intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    if (elemRef.current) observer.observe(elemRef.current);
    return () => elemRef.current && observer.unobserve(elemRef.current);
  }, []);

  // Update a field while preserving all other values
  const updateField = (field: keyof HeatingCoolingItem, value: any) => {
    // First update our ref
    itemRef.current = {
      ...itemRef.current,
      [field]: value,
    };

    // Force render to reflect changes
    forceRender((prev) => prev + 1);

    // Notify parent (only if provided)
    if (onUpdateItem) {
      console.log(`Updating ${field} to:`, value);
      console.log("Full updated item:", itemRef.current);
      onUpdateItem(itemRef.current);
    }
  };

  // Get the current value to display (numeric or string)
  const getSeerValue = () => {
    return typeof itemRef.current.value === "number"
      ? itemRef.current.value
      : 0;
  };

  // Create description text based on current values
  const getDescriptionText = () => {
    const seerValue = getSeerValue();
    const recommendedSEER = 16;

    return `Your air conditioner's current ${itemRef.current.parameter} rating of ${seerValue} means it's operating ${
      seerValue < recommendedSEER
        ? ` below optimal efficiency. Upgrading to a high-efficiency model with ${recommendedSEER} ${itemRef.current.parameter} could result in significant energy savings.`
        : ` at an efficient level that meets or exceeds recommended standards.`
    }`;
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
            {/* Name field */}
            <div className="text-xl font-bold text-amber-700 flex items-center">
              {isAdmin ? (
                <input
                  type="text"
                  value={itemRef.current.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="bg-transparent border-b border-amber-700 outline-none"
                />
              ) : (
                itemRef.current.name
              )}
            </div>
            -{/* Parameter field */}
            <div className="text-xl font-bold text-amber-700 flex items-center">
              {isAdmin ? (
                <input
                  type="text"
                  value={itemRef.current.parameter}
                  onChange={(e) => updateField("parameter", e.target.value)}
                  className="bg-transparent border-b border-amber-700 outline-none"
                />
              ) : (
                itemRef.current.parameter
              )}
            </div>
            Rating
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 bg-amber-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div
                ref={elemRef}
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

                {/* Gauge visualization */}
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
                        id={`gauge-gradient-cooling-${index}`}
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
                      stroke={`url(#gauge-gradient-cooling-${index})`}
                      strokeWidth="16"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0, 314" }}
                      animate={
                        animate
                          ? {
                              strokeDasharray: `${(getSeerValue() / 20) * 100 * 3.14}, 314`,
                            }
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
                      {getSeerValue()}
                    </text>
                  </svg>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Current {itemRef.current.parameter}
                    </p>
                    {isAdmin ? (
                      <input
                        type="number"
                        value={getSeerValue()}
                        onChange={(e) =>
                          updateField("value", Number(e.target.value))
                        }
                        className="text-3xl font-bold text-[#b45309] bg-transparent border-b border-amber-700 outline-none w-24"
                        min={0}
                        max={40}
                      />
                    ) : (
                      <p className="text-3xl font-bold text-[#b45309] dark:text-amber-400">
                        {getSeerValue()}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      BPI Recommends
                    </p>
                    <p className="text-3xl font-bold text-[#65a30d] dark:text-green-400">
                      16
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
                  {getDescriptionText()}
                </p>

                {/* System details section */}
                <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Type
                    </p>
                    {isAdmin ? (
                      <input
                        type="text"
                        value={itemRef.current.type || ""}
                        onChange={(e) => updateField("type", e.target.value)}
                        className="border-b border-amber-700 bg-transparent outline-none"
                      />
                    ) : (
                      <p className="font-medium">
                        {itemRef.current.type || "Central"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Condition
                    </p>
                    {isAdmin ? (
                      <Select
                        value={itemRef.current.condition}
                        onValueChange={(value) =>
                          updateField("condition", value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue>{itemRef.current.condition}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {["Poor", "Fair", "Good", "Excellent", "N/A"].map(
                            (option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="font-medium">{itemRef.current.condition}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Year
                    </p>
                    {isAdmin ? (
                      <input
                        type="number"
                        value={itemRef.current.year || new Date().getFullYear()}
                        onChange={(e) =>
                          updateField("year", Number(e.target.value))
                        }
                        className="border-b border-amber-700 bg-transparent outline-none"
                        min={1900}
                        max={new Date().getFullYear()}
                      />
                    ) : (
                      <p className="font-medium">{itemRef.current.year}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      SEER
                    </p>
                    {isAdmin ? (
                      <input
                        type="number"
                        value={getSeerValue()}
                        onChange={(e) =>
                          updateField("value", Number(e.target.value))
                        }
                        className="border-b border-amber-700 bg-transparent outline-none"
                        min={0}
                      />
                    ) : (
                      <p className="font-medium">{getSeerValue()}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-amber-600 mt-4">
                  <Zap className="h-5 w-5" />
                  <span className="text-sm">
                    *SEER = Seasonal Energy Efficiency Ratio
                  </span>
                </div>
              </div>

              {/* Image section */}
              {isAdmin ? (
                <ImageUpload
                  image={itemRef.current.image || ""}
                  onImageChange={(newImage) => updateField("image", newImage)}
                  driveImages={driveImages}
                />
              ) : (
                <ImageCustomer
                  image={itemRef.current.image}
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

export default CoolingSystemCard;
