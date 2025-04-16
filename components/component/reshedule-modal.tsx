"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

type RescheduleModalProps = {
  isOpen: boolean
  onClose: () => void
  bookingId?: string
  onConfirm: (date: Date, timeSlot: string) => void
}

export default function RescheduleModal({
  isOpen,
  onClose,
  bookingId = "11504099960263",
  onConfirm,
}: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Available time slots - in a real app, these would be fetched based on the selected date
  const availableTimeSlots = ["9:00 AM - 12:00 PM", "1:00 PM - 3:00 PM", "3:30 PM - 5:30 PM"]

  if (!isOpen) return null

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null) // Reset time slot when date changes
  }

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
  }

  const handleConfirm = () => {
    if (selectedDate && selectedTimeSlot) {
      onConfirm(selectedDate, selectedTimeSlot)
      onClose()
    }
  }

  // Calendar navigation
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Array to hold all calendar days
    const days = []

    // Add days from previous month to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      })
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    // Add days from next month to fill the last week
    const remainingDays = 7 - (days.length % 7)
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          isCurrentMonth: false,
        })
      }
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const monthName = currentMonth.toLocaleString("default", { month: "long" })
  const year = currentMonth.getFullYear()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Reschedule Booking {bookingId}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Calendar */}
        <div className="border rounded-lg p-4 mb-6">
          {/* Month navigation */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-1">
              <ChevronLeft size={20} />
            </button>
            <h3 className="text-lg font-medium">
              {monthName} {year}
            </h3>
            <button onClick={nextMonth} className="p-1">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const isSelected =
                selectedDate &&
                selectedDate.getDate() === day.date.getDate() &&
                selectedDate.getMonth() === day.date.getMonth() &&
                selectedDate.getFullYear() === day.date.getFullYear()

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day.date)}
                  className={`
                    h-10 w-10 rounded-full flex items-center justify-center text-sm
                    ${!day.isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                    ${isSelected ? "bg-[#8bc34a] text-white" : "hover:bg-gray-100"}
                  `}
                  disabled={!day.isCurrentMonth}
                >
                  {day.date.getDate()}
                </button>
              )
            })}
          </div>
        </div>

        {/* Available slots */}
        {selectedDate && (
          <div>
            <h3 className="text-lg font-medium mb-3">Available Slots</h3>
            <div className="grid grid-cols-1 gap-2 mb-6">
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleTimeSlotClick(slot)}
                  className={`
                    border rounded-md py-2 px-4 text-left
                    ${
                      selectedTimeSlot === slot
                        ? "border-[#8bc34a] bg-[#f5f9ed]"
                        : "border-gray-200 hover:border-[#8bc34a]"
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTimeSlot}
            className={`
              px-4 py-2 rounded-md text-white
              ${
                !selectedDate || !selectedTimeSlot
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#c5e1a5] hover:bg-[#8bc34a]"
              }
            `}
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  )
}
