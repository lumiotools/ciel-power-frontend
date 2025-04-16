"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Activity, Pencil, Check, X, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define the interfaces for our data
interface TaxCreditItem {
  title: string
  amount: string
  note?: string
}

interface TaxCreditsData {
  title: string
  data: TaxCreditItem[]
}

// This component will be part of ReportSummary which is in ReportPage
interface FederalTaxCreditsProps {
  data?: TaxCreditsData
  isAdmin?: boolean
  onUpdate?: (data: TaxCreditsData) => void
  bookingNumber?: string
  reportData?: any // Access to the overall report data if needed
}

// In-place edit component
interface InPlaceEditProps {
  initialValue?: string
  isAdmin: boolean
  onUpdate: (value: string) => void
  multiline?: boolean
  placeholder?: string
  isAmount?: boolean
}

const InPlaceEdit: React.FC<InPlaceEditProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  multiline = false,
  placeholder = "Enter text",
  isAmount = false,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue || "")
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setValue(initialValue || "")
  }, [initialValue])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleClick = () => {
    if (isAdmin) {
      setIsEditing(true)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    if (value !== initialValue) {
      onUpdate(value)
    }
  }

  const handleCancel = () => {
    setValue(initialValue || "")
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!multiline && e.key === "Enter") {
      handleSave()
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        {isAmount ? (
          <div className="flex items-center">
            <span className="p-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-l">$</span>
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={value.replace(/^\$/, "")}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="0"
              className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded-r focus:outline-none focus:border-[#67B502]"
            />
          </div>
        ) : multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-[#67B502]"
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
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-[#67B502]"
          />
        )}
        <button onClick={handleSave} className="p-1 hover:bg-[#67B5021A] rounded text-[#67B502] transition-colors">
          <Check className="w-4 h-4" />
        </button>
        <button onClick={handleCancel} className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      className={`${isAdmin ? "cursor-pointer hover:bg-gray-50 rounded p-1 group" : ""} ${!value ? "text-gray-400 italic" : ""}`}
      onClick={handleClick}
    >
      {isAmount ? (
        <span>{value.startsWith("$") ? value : `${value}`}</span>
      ) : (
        value || (!isAdmin ? "No content" : placeholder)
      )}
      {isAdmin && (
        <Pencil className="ml-2 h-4 w-4 inline-block text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
}

export function FederalTaxCredits({
  data,
  isAdmin = false,
  onUpdate,
  bookingNumber,
  reportData,
}: FederalTaxCreditsProps) {
  const [taxCredits, setTaxCredits] = useState<TaxCreditsData>({
    title: "Federal Tax Credits",
    data: [
      { title: "Insulation", amount: "1200.00" },
      {
        title: "Mechanical Equipment",
        amount: "0",
        note: "*after installing proposed upgrades",
      },
    ],
  })

  const REPORT_DATA_KEY = "report_data"

  // Load data from props or create default
  useEffect(() => {
    if (data) {
      setTaxCredits(data)
    } else if (bookingNumber) {
      // Try to load from localStorage if no data was passed
      const savedData = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`)
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          if (parsedData.federalTaxCredits) {
            setTaxCredits(parsedData.federalTaxCredits)
          }
        } catch (e) {
          console.error("Error parsing tax credits data from localStorage:", e)
        }
      }
    }
  }, [data, bookingNumber])

  const updateTaxCreditItem = (index: number, field: keyof TaxCreditItem, value: string) => {
    if (!isAdmin) return

    const newData = [...taxCredits.data]
    if (newData[index]) {
      // If this is an amount field, make sure it doesn't include a dollar sign
      if (field === "amount") {
        value = value.replace(/^\$/, "")
        // If value is empty, set to "0"
        if (!value.trim()) {
          value = "0"
        }
      }

      newData[index] = {
        ...newData[index],
        [field]: value,
      }

      const updatedTaxCredits = {
        ...taxCredits,
        data: newData,
      }

      setTaxCredits(updatedTaxCredits)

      // Call the onUpdate prop if provided
      if (onUpdate) {
        onUpdate(updatedTaxCredits)
      }
    }
  }

  const addTaxCreditItem = () => {
    if (!isAdmin) return

    const newItem: TaxCreditItem = { title: "New Tax Credit", amount: "0" }
    const updatedTaxCredits = {
      ...taxCredits,
      data: [...taxCredits.data, newItem],
    }

    setTaxCredits(updatedTaxCredits)

    // Call the onUpdate prop if provided
    if (onUpdate) {
      onUpdate(updatedTaxCredits)
    }
  }

  const deleteTaxCreditItem = (index: number) => {
    if (!isAdmin) return

    const newData = taxCredits.data.filter((_, i) => i !== index)
    const updatedTaxCredits = {
      ...taxCredits,
      data: newData,
    }

    setTaxCredits(updatedTaxCredits)

    // Call the onUpdate prop if provided
    if (onUpdate) {
      onUpdate(updatedTaxCredits)
    }
  }

  const formatCurrency = (amount: string): string => {
    // Convert to number, format, then back to string
    const numericValue = Number.parseFloat(amount)
    if (isNaN(numericValue)) return "$0.00"

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(numericValue)
  }

  return (
    <Card className="rounded-xl border shadow-sm overflow-hidden">
      <CardHeader className="py-4 px-6" style={{ backgroundColor: "#67B5021A" }}>
        <CardTitle 
          className="flex items-center gap-2" 
          style={{ 
            fontFamily: "Poppins", 
            fontWeight: 500, 
            fontSize: 16, 
            color: "#67B502" 
          }}
        >
          <Activity className="h-5 w-5" style={{ color: "#67B502" }} />
          Federal Tax Credits
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6" style={{ backgroundColor: "#ffffff" }}>
        {/* Static introduction text */}
        <div className="mb-5 p-5 rounded-lg" style={{ backgroundColor: "#67B5020A" }}>
          <div className="space-y-2">
            <div 
              className="text-lg font-medium text-gray-800" 
              style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 16 }}
            >
              Energy Efficient Home Improvement Federal Tax Credit
            </div>
            <div 
              className="text-gray-700 italic" 
              style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 14 }}
            >
              If you make qualified energy-efficient improvements to your home after Jan. 1, 2023, you may qualify for a
              tax credit up to $3,200.
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {taxCredits.data.length > 0 ? (
            taxCredits.data.map((item, index) => (
              <motion.div
                key={`tax-credit-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-5 rounded-lg"
                style={{ backgroundColor: "#67B5020A" }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                    style={{ backgroundColor: "#67B5021A" }}
                  >
                    <Activity className="h-5 w-5" style={{ color: "#67B502" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="font-medium mb-1" style={{ color: "#67B502" }}>
                        {isAdmin ? (
                          <InPlaceEdit
                            initialValue={item.title}
                            isAdmin={isAdmin}
                            onUpdate={(value) => updateTaxCreditItem(index, "title", value)}
                            placeholder="Enter title"
                          />
                        ) : (
                          item.title
                        )}
                      </div>
                      <div className="flex items-center font-semibold" style={{ color: "#67B502" }}>
                        {isAdmin ? (
                          <InPlaceEdit
                            initialValue={item.amount}
                            isAdmin={isAdmin}
                            onUpdate={(value) => updateTaxCreditItem(index, "amount", value)}
                            placeholder="0"
                            isAmount={true}
                          />
                        ) : item.amount === "0" ? (
                          "--"
                        ) : (
                          formatCurrency(item.amount)
                        )}
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
                    {item.note && (
                      <div className="text-gray-700 text-sm">
                        {isAdmin ? (
                          <InPlaceEdit
                            initialValue={item.note}
                            isAdmin={isAdmin}
                            onUpdate={(value) => updateTaxCreditItem(index, "note", value)}
                            placeholder="Enter note"
                          />
                        ) : (
                          item.note
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-5 rounded-lg"
              style={{ backgroundColor: "#67B5020A" }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                  style={{ backgroundColor: "#67B5021A" }}
                >
                  <Activity className="h-5 w-5" style={{ color: "#67B502" }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium" style={{ color: "#67B502" }}>No Tax Credits</h3>
                  <p className="text-gray-700 text-sm mt-1">No tax credits have been added yet.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Add new item button for admin */}
          {isAdmin && (
            <div className="flex justify-end p-4">
              <button
                onClick={addTaxCreditItem}
                className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1"
                style={{ backgroundColor: "#67B5021A", color: "#67B502" }}
                type="button"
              >
                + Add Tax Credit
              </button>
            </div>
          )}
        </div>

        {/* Static instructions text */}
        <div className="mt-5 p-5 rounded-lg" style={{ backgroundColor: "#67B5020A" }}>
          <div className="space-y-2">
            <div 
              className="text-lg font-medium text-gray-800" 
              style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 16 }}
            >
              How to claim the Energy Efficient Home Improvement Credit
            </div>
            <div 
              className="text-gray-700" 
              style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 14 }}
            >
              File Form 5695, Residential Energy Credits Part II, with your tax return to claim the credit. You must
              claim the credit for the tax year when the property is installed, not merely purchased.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}