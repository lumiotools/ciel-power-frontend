"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { DollarSign, Pencil, Check, X, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Interface for financial item
interface FinancialItem {
  title: string
  amount: string
}

// Interface for financial data
interface FinancialData {
  title: string
  data: FinancialItem[]
  monthlyPayment: string
  financingPeriodYears: number
}

interface ProjectCostsProps {
  data?: {
    financialSummary?: FinancialData
  }
  isAdmin?: boolean
  bookingNumber?: string
  onUpdateFinancials?: (financials: FinancialData) => void
}

interface InPlaceEditTextProps {
  initialValue: string
  isAdmin: boolean
  onUpdate: (value: string) => void
  placeholder?: string
}

// Component for in-place editing of text
const InPlaceEditText: React.FC<InPlaceEditTextProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  placeholder = "Enter text",
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState<string>(initialValue || "")
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-[#67B502]"
        />
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
      className={`font-medium ${isAdmin ? "cursor-pointer hover:bg-gray-50 rounded p-1 group" : ""}`}
      onClick={handleClick}
    >
      {value || placeholder}
      {isAdmin && (
        <Pencil className="ml-2 h-4 w-4 inline-block text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
}

interface InPlaceEditCurrencyProps {
  initialValue: string
  isAdmin: boolean
  onUpdate: (value: string) => void
  placeholder?: string
}

// Component for in-place editing of currency values
const InPlaceEditCurrency: React.FC<InPlaceEditCurrencyProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  placeholder = "Enter amount",
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState<string>(initialValue || "0")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue(initialValue || "0")
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
    setValue(initialValue || "0")
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
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

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          step="0.01"
          min="0"
          className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-[#67B502]"
        />
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
      className={`font-medium ${isAdmin ? "cursor-pointer hover:bg-gray-50 rounded p-1 group" : ""}`}
      onClick={handleClick}
    >
      {formatCurrency(value)}
      {isAdmin && (
        <Pencil className="ml-2 h-4 w-4 inline-block text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
}

interface InPlaceEditNumberProps {
  initialValue: number
  isAdmin: boolean
  onUpdate: (value: number) => void
  min?: number
  max?: number
  label?: string
}

// Component for in-place editing of numbers
const InPlaceEditNumber: React.FC<InPlaceEditNumberProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  min = 1,
  max = 30,
  label = "years",
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState<string>((initialValue || 10).toString())
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue((initialValue || 10).toString())
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
    if (Number.parseInt(value, 10) !== initialValue) {
      onUpdate(Number.parseInt(value, 10) || 10)
    }
  }

  const handleCancel = () => {
    setValue((initialValue || 10).toString())
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          className="w-20 p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-[#67B502]"
        />
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
      className={`font-medium ${isAdmin ? "cursor-pointer hover:bg-gray-50 rounded p-1 group" : ""}`}
      onClick={handleClick}
    >
      {Number.parseInt(value, 10) || 10} {label}
      {isAdmin && (
        <Pencil className="ml-2 h-4 w-4 inline-block text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
}

export function ProjectCosts({ data, isAdmin = false, bookingNumber = "", onUpdateFinancials }: ProjectCostsProps) {
  const REPORT_DATA_KEY = "report_data"

  // Initial financial items suggestions
  const initialItems: FinancialItem[] = [
    { title: "Total Project Costs", amount: "0.00" },
    { title: "Audit Refund", amount: "0.00" },
    { title: "NJ HPwES Cash Back Incentive", amount: "0.00" },
    { title: "Remaining Balance", amount: "0.00" },
    { title: "Amount Eligible for NJ HPwES Financing", amount: "0.00" },
    { title: "Remaining Out of Pocket Expenses", amount: "0.00" },
  ]

  // Initialize financial data
  const [financialItems, setFinancialItems] = useState<FinancialItem[]>([])

  // Initialize financial summary data
  const [financialSummary, setFinancialSummary] = useState<FinancialData>({
    title: "Financial Summary",
    data: [],
    monthlyPayment: "125.00",
    financingPeriodYears: 10,
  })

  // Load data from props if available
  useEffect(() => {
    if (data?.financialSummary) {
      // Load from props
      setFinancialSummary(data.financialSummary)
      setFinancialItems(data.financialSummary.data || [])
    } else if (bookingNumber) {
      // If no data in props, try to load from localStorage
      try {
        const savedData = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`)
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          if (parsedData.financialSummary) {
            setFinancialSummary(parsedData.financialSummary)
            setFinancialItems(parsedData.financialSummary.data || [])
          } else {
            // If financialSummary doesn't exist in localStorage, use initial suggestions
            setFinancialItems(initialItems)
            setFinancialSummary({
              title: "Financial Summary",
              data: initialItems,
              monthlyPayment: "0.00",
              financingPeriodYears: 10,
            })
          }
        } else {
          // If no data in localStorage, use initial suggestions
          setFinancialItems(initialItems)
          setFinancialSummary({
            title: "Financial Summary",
            data: initialItems,
            monthlyPayment: "0.00",
            financingPeriodYears: 10,
          })
        }
      } catch (e) {
        console.error("Error loading financial data:", e)
        // Fallback to initial suggestions on error
        setFinancialItems(initialItems)
        setFinancialSummary({
          title: "Financial Summary",
          data: initialItems,
          monthlyPayment: "0.00",
          financingPeriodYears: 10,
        })
      }
    } else {
      // No data and no bookingNumber, use initial suggestions
      setFinancialItems(initialItems)
      setFinancialSummary({
        title: "Financial Summary",
        data: initialItems,
        monthlyPayment: "0.00",
        financingPeriodYears: 10,
      })
    }
  }, [data, bookingNumber])

  // Update an item's title
  const updateItemTitle = (index: number, title: string) => {
    const newItems = [...financialItems]
    newItems[index] = {
      ...newItems[index],
      title,
    }

    updateFinancialSummary({
      ...financialSummary,
      data: newItems,
    })
  }

  // Update an item's amount
  const updateItemAmount = (index: number, amount: string) => {
    const newItems = [...financialItems]
    newItems[index] = {
      ...newItems[index],
      amount,
    }

    updateFinancialSummary({
      ...financialSummary,
      data: newItems,
    })
  }

  // Update monthly payment
  const updateMonthlyPayment = (amount: string) => {
    updateFinancialSummary({
      ...financialSummary,
      monthlyPayment: amount,
    })
  }

  // Update financing period years
  const updateFinancingPeriod = (years: number) => {
    updateFinancialSummary({
      ...financialSummary,
      financingPeriodYears: years,
    })
  }

  // Add a new financial item
  const addFinancialItem = () => {
    const newItem: FinancialItem = {
      title: "New Item",
      amount: "0",
    }

    const newItems = [...financialItems, newItem]
    updateFinancialSummary({
      ...financialSummary,
      data: newItems,
    })
  }

  // Delete a financial item
  const deleteFinancialItem = (index: number) => {
    const newItems = [...financialItems]
    newItems.splice(index, 1)

    updateFinancialSummary({
      ...financialSummary,
      data: newItems,
    })
  }

  // Update the full financial summary
  const updateFinancialSummary = (newFinancialSummary: FinancialData) => {
    setFinancialSummary(newFinancialSummary)
    setFinancialItems(newFinancialSummary.data)

    // If callback provided, call it with updated data
    if (onUpdateFinancials) {
      onUpdateFinancials(newFinancialSummary)
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
          <DollarSign className="h-5 w-5" style={{ color: "#67B502" }} />
          Project Costs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="space-y-4">
          {/* Render all financial items */}
          {financialItems.map((item, index) => (
            <motion.div
              key={`item-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="p-5 rounded-lg"
              style={{ backgroundColor: "#67B5020A" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                    style={{ backgroundColor: "#67B5021A" }}
                  >
                    <DollarSign className="h-5 w-5" style={{ color: "#67B502" }} />
                  </div>
                  <div>
                    <h3 className="font-medium" style={{ color: "#67B502" }}>
                      {isAdmin ? (
                        <InPlaceEditText
                          initialValue={item.title}
                          isAdmin={isAdmin}
                          onUpdate={(title) => updateItemTitle(index, title)}
                        />
                      ) : (
                        item.title
                      )}
                    </h3>
                    {item.title.toLowerCase().includes("financing") && (
                      <p className="text-xs text-gray-500">*if qualified by financing company (0% Interest Rate)</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center font-semibold" style={{ color: "#67B502" }}>
                  {isAdmin ? (
                    <InPlaceEditCurrency
                      initialValue={item.amount}
                      isAdmin={isAdmin}
                      onUpdate={(amount) => updateItemAmount(index, amount)}
                    />
                  ) : (
                    formatCurrency(item.amount)
                  )}
                  {isAdmin && (
                    <button
                      onClick={() => deleteFinancialItem(index)}
                      className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add new item button for admin */}
          {isAdmin && financialItems.length > 0 && (
            <div className="flex justify-end p-4">
              <button
                onClick={addFinancialItem}
                className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1"
                style={{ backgroundColor: "#67B5021A", color: "#67B502" }}
                type="button"
              >
                + Add Financial Item
              </button>
            </div>
          )}

          {/* Empty state */}
          {financialItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-lg"
              style={{ backgroundColor: "#67B5020A" }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                  style={{ backgroundColor: "#67B5021A" }}
                >
                  <DollarSign className="h-5 w-5" style={{ color: "#67B502" }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium" style={{ color: "#67B502" }}>No Financial Items</h3>
                  <p className="text-gray-700 text-sm mt-1">No financial items have been added yet.</p>

                  {isAdmin && (
                    <button
                      onClick={addFinancialItem}
                      className="mt-4 px-4 py-2 rounded text-sm font-medium transition-colors"
                      style={{ backgroundColor: "#67B5021A", color: "#67B502" }}
                      type="button"
                    >
                      + Add Financial Item
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Render monthly payment at the bottom */}
          {financialItems.length > 0 && (
            <div
              className="p-5 rounded-lg text-center"
              style={{ backgroundColor: "#67B5020A" }}
            >
              <h3 className="font-medium mb-2" style={{ color: "#67B502" }}>Monthly Payment</h3>
              {isAdmin ? (
                <div className="flex justify-center items-center my-2">
                  <InPlaceEditCurrency
                    initialValue={financialSummary.monthlyPayment}
                    isAdmin={isAdmin}
                    onUpdate={updateMonthlyPayment}
                  />
                  <span className="text-2xl font-bold ml-1" style={{ color: "#67B502" }}>/month</span>
                </div>
              ) : (
                <p className="text-2xl font-bold" style={{ color: "#67B502" }}>
                  {formatCurrency(financialSummary.monthlyPayment)}/month
                </p>
              )}
              <div className="text-xs text-gray-600 mt-2 flex items-center justify-center">
                <span>*Over a </span>
                {isAdmin ? (
                  <span className="mx-1">
                    <InPlaceEditNumber
                      initialValue={financialSummary.financingPeriodYears}
                      isAdmin={isAdmin}
                      onUpdate={updateFinancingPeriod}
                      min={1}
                      max={30}
                      label=""
                    />
                  </span>
                ) : (
                  <span className="mx-1">{financialSummary.financingPeriodYears}</span>
                )}
                <span> year period</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}