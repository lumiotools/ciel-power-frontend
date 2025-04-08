"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Pencil, Check, X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Define the interfaces for our data
interface TaxCreditItem {
  title: string;
  amount: string;
  note?: string;
}

interface TaxCreditsData {
  title: string;
  data: TaxCreditItem[];
}

// This component will be part of ReportSummary which is in ReportPage
interface FederalTaxCreditsProps {
  data?: TaxCreditsData;
  isAdmin?: boolean;
  onUpdate?: (data: TaxCreditsData) => void;
  bookingNumber?: string;
  reportData?: any; // Access to the overall report data if needed
}

// In-place edit component
interface InPlaceEditProps {
  initialValue?: string;
  isAdmin: boolean;
  onUpdate: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  isAmount?: boolean;
}

const InPlaceEdit: React.FC<InPlaceEditProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  multiline = false,
  placeholder = "Enter text",
  isAmount = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(initialValue || "");
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

  const handleSave = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onUpdate(value);
    }
  };

  const handleCancel = () => {
    setValue(initialValue || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!multiline && e.key === "Enter") {
      handleSave();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        {isAmount ? (
          <div className="flex items-center">
            <span className="p-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-l">$</span>
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={value.replace(/^\$/, '')}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="0"
              className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded-r focus:outline-none focus:border-green-500"
            />
          </div>
        ) : multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          />
        )}
        <button
          onClick={handleSave}
          className="p-1 hover:bg-green-100 rounded text-green-600 transition-colors"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${isAdmin ? 'cursor-pointer hover:bg-gray-50 rounded p-1 group' : ''} ${!value ? 'text-gray-400 italic' : ''}`}
      onClick={handleClick}
    >
      {isAmount ? (
        <span>
          {value.startsWith('$') ? value : `$${value}`}
        </span>
      ) : (
        value || (!isAdmin ? "No content" : placeholder)
      )}
      {isAdmin && (
        <Pencil className="ml-2 h-4 w-4 inline-block text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
};

export function FederalTaxCredits({ data, isAdmin = false, onUpdate, bookingNumber, reportData }: FederalTaxCreditsProps) {
  const [taxCredits, setTaxCredits] = useState<TaxCreditsData>({
    title: "Federal Tax Credits",
    data: [
      { title: "Insulation", amount: "0" },
      { title: "Mechanical Equipment", amount: "0", note: "*after installing proposed upgrades" }
    ]
  });

  const REPORT_DATA_KEY = "report_data";

  // Load data from props or create default
  useEffect(() => {
    if (data) {
      setTaxCredits(data);
    } else if (bookingNumber) {
      // Try to load from localStorage if no data was passed
      const savedData = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (parsedData.federalTaxCredits) {
            setTaxCredits(parsedData.federalTaxCredits);
          }
        } catch (e) {
          console.error("Error parsing tax credits data from localStorage:", e);
        }
      }
    }
  }, [data, bookingNumber]);

  const updateTaxCreditItem = (index: number, field: keyof TaxCreditItem, value: string) => {
    if (!isAdmin) return;

    const newData = [...taxCredits.data];
    if (newData[index]) {
      // If this is an amount field, make sure it doesn't include a dollar sign
      if (field === "amount") {
        value = value.replace(/^\$/, '');
        // If value is empty, set to "0"
        if (!value.trim()) {
          value = "0";
        }
      }

      newData[index] = {
        ...newData[index],
        [field]: value
      };

      const updatedTaxCredits = {
        ...taxCredits,
        data: newData
      };

      setTaxCredits(updatedTaxCredits);

      // Save to localStorage if bookingNumber is available
      if (bookingNumber) {
        try {
          const savedData = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            const updatedData = {
              ...parsedData,
              federalTaxCredits: updatedTaxCredits
            };
            
            localStorage.setItem(
              `${REPORT_DATA_KEY}_${bookingNumber}`,
              JSON.stringify(updatedData)
            );
            console.log("Saved tax credits data to localStorage");
          }
        } catch (e) {
          console.error("Error saving tax credits data to localStorage:", e);
        }
      }

      // Call the onUpdate prop if provided
      if (onUpdate) {
        onUpdate(updatedTaxCredits);
      }
    }
  };

  const addTaxCreditItem = () => {
    if (!isAdmin) return;

    const newItem: TaxCreditItem = { title: "New Tax Credit", amount: "0" };
    const updatedTaxCredits = {
      ...taxCredits,
      data: [...taxCredits.data, newItem]
    };

    setTaxCredits(updatedTaxCredits);

    // Save to localStorage if bookingNumber is available
    if (bookingNumber) {
      try {
        const savedData = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const updatedData = {
            ...parsedData,
            federalTaxCredits: updatedTaxCredits
          };
          
          localStorage.setItem(
            `${REPORT_DATA_KEY}_${bookingNumber}`,
            JSON.stringify(updatedData)
          );
          console.log("Added new tax credit item to localStorage");
        }
      } catch (e) {
        console.error("Error adding tax credit item to localStorage:", e);
      }
    }

    // Call the onUpdate prop if provided
    if (onUpdate) {
      onUpdate(updatedTaxCredits);
    }
  };

  const deleteTaxCreditItem = (index: number) => {
    if (!isAdmin) return;

    const newData = taxCredits.data.filter((_, i) => i !== index);
    const updatedTaxCredits = {
      ...taxCredits,
      data: newData
    };

    setTaxCredits(updatedTaxCredits);

    // Save to localStorage if bookingNumber is available
    if (bookingNumber) {
      try {
        const savedData = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const updatedData = {
            ...parsedData,
            federalTaxCredits: updatedTaxCredits
          };
          
          localStorage.setItem(
            `${REPORT_DATA_KEY}_${bookingNumber}`,
            JSON.stringify(updatedData)
          );
          console.log("Deleted tax credit item from localStorage");
        }
      } catch (e) {
        console.error("Error deleting tax credit item from localStorage:", e);
      }
    }

    // Call the onUpdate prop if provided
    if (onUpdate) {
      onUpdate(updatedTaxCredits);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="border-green-100">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-green-600 dark:text-green-200 flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              Federal Tax Credits
            </CardTitle>
            
            {isAdmin && (
              <div className="flex space-x-2">
                <button
                  onClick={addTaxCreditItem}
                  className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 text-sm font-medium transition-colors"
                  type="button"
                >
                  + Add Item
                </button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4 bg-green-50/50">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Energy Efficient Home Improvement Federal Tax Credit
            </h3>
            <p className="text-gray-600 text-sm mb-6 italic">
              If you make qualified energy-efficient improvements to your home after Jan. 1, 2023, you may qualify for a tax credit up to $3,200.
            </p>

            <div className="space-y-4">
              {taxCredits.data.map((item, index) => (
                <div key={`tax-credit-${index}`} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">
                      <InPlaceEdit
                        initialValue={item.title}
                        isAdmin={isAdmin}
                        onUpdate={(value) => updateTaxCreditItem(index, "title", value)}
                        placeholder="Enter title"
                      />
                    </div>
                    {item.note && (
                      <p className="text-xs text-gray-500">
                        <InPlaceEdit
                          initialValue={item.note}
                          isAdmin={isAdmin}
                          onUpdate={(value) => updateTaxCreditItem(index, "note", value)}
                          placeholder="Enter note"
                        />
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="text-green-600 font-semibold">
                      <InPlaceEdit
                        initialValue={item.amount}
                        isAdmin={isAdmin}
                        onUpdate={(value) => updateTaxCreditItem(index, "amount", value)}
                        placeholder="0"
                        isAmount={true}
                      />
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => deleteTaxCreditItem(index)}
                        className="ml-2 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                How to claim the Energy Efficient Home Improvement Credit
              </h4>
              <p className="text-gray-600 text-sm">
                File Form 5695, Residential Energy Credits Part II, with your tax return to claim the credit. You must claim the credit for the tax year when the property is installed, not merely purchased.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}