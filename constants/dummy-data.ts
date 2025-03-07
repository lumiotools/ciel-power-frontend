import { Booking, NutshellLead } from "@/types/admin"
import { BOOKING_STAGES } from "./booking-stages"

// Dummy data constants
export const DUMMY_BOOKEO_BOOKINGS = [
  {
    bookingNumber: "2559503043874179",
    title: "Dawood Khatri",
    serviceName: "Ciel Power Home Energy Audit",
    startTime: "2025-03-17T09:00:00+00:00",
    endTime: "2025-03-17T12:00:00+00:00"
  },
  {
    bookingNumber: "2559503057370772",
    title: "Dawood 2",
    serviceName: "Westfield Home Energy Savings Program",
    startTime: "2025-03-22T12:00:00+00:00",
    endTime: "2025-03-22T12:30:00+00:00"
  },
  {
    bookingNumber: "2559503066288994",
    title: "Monil Pokar",
    serviceName: "Ciel Power Home Energy Audit",
    startTime: "2025-03-07T12:00:00+00:00",
    endTime: "2025-03-07T15:00:00+00:00"
  },
  {
    bookingNumber: "1234567890",
    title: "John Smith",
    serviceName: "Home Energy Assessment",
    startTime: "2025-03-15T10:00:00+00:00",
    endTime: "2025-03-15T13:00:00+00:00"
  },
  {
    bookingNumber: "9876543210",
    title: "Sarah Johnson",
    serviceName: "Solar Panel Consultation",
    startTime: "2025-03-20T14:00:00+00:00",
    endTime: "2025-03-20T15:30:00+00:00"
  }
]

export const DUMMY_NUTSHELL_LEADS: NutshellLead[] = [
  { name: "Dawood Khatri", email: "dawood@example.com", phone: "555-123-4567" },
  { name: "Monil Pokar", email: "monil@example.com", phone: "555-987-6543" },
  { name: "John Smith", email: "john@example.com", phone: "555-111-2222" },
  { name: "Sarah Johnson", email: "sarah@example.com", phone: "555-333-4444" },
  { name: "Michael Brown", email: "michael@example.com", phone: "555-555-5555" }
]

export const generateMockBookings = () => {
  return DUMMY_BOOKEO_BOOKINGS.map(booking => ({
    ...booking,
    canceled: false,
    accepted: true,
    creationTime: new Date().toISOString(),
    // Assign a random stage for each booking
    currentStage: BOOKING_STAGES[Math.floor(Math.random() * BOOKING_STAGES.length)]
  }))
}
