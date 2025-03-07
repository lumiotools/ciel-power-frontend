"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { BookingsTable } from "@/components/admin/BookingsTable"
import { BookingDetailsDialog } from "@/components/admin/BookingDetailsDialog"
import { InviteCustomerDialog } from "@/components/admin/InviteCustomerDialog"
import type { Booking, BookingResponse } from "@/types/admin"
import { DUMMY_NUTSHELL_LEADS, generateMockBookings } from "@/constants/dummy-data"

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [reportStatuses, setReportStatuses] = useState<Record<string, boolean>>({})
  const [reportUrl, setReportUrl] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [bookeoNumber, setBookeoNumber] = useState("")
  const [searchedBooking, setSearchedBooking] = useState<Booking | null>(null)
  const [isSearchingBooking, setIsSearchingBooking] = useState(false)
  const [nutshellLeadFound, setNutshellLeadFound] = useState<boolean | null>(null)
  const [nutshellLeadName, setNutshellLeadName] = useState("")
  const [isSearchingLead, setIsSearchingLead] = useState(false)
  const [leadFound, setLeadFound] = useState(false)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // For demo purposes, we'll use the dummy data instead of making an API call
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

        // Generate mock bookings with random stages
        const mockBookings = generateMockBookings()

        const mockResponse: BookingResponse = {
          success: true,
          message: "Bookings retrieved successfully",
          data: {
            bookings: mockBookings,
          },
        }

        setBookings(mockResponse.data.bookings)

        // Initialize report statuses
        const statuses: Record<string, boolean> = {}
        mockResponse.data.bookings.forEach((booking) => {
          statuses[booking.bookingNumber] = false
        })
        setReportStatuses(statuses)
      } catch (error) {
        console.error("Error fetching bookings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking)
    setReportUrl("")
    setIsDialogOpen(true)
  }

  const toggleReportStatus = (bookingNumber: string) => {
    setReportStatuses((prev) => ({
      ...prev,
      [bookingNumber]: !prev[bookingNumber],
    }))
  }

  const handleLogout = () => {
    // Implement logout functionality
    alert("Logout functionality would be implemented here")
  }

  const handleSearchBooking = async () => {
    if (!bookeoNumber.trim()) return

    setIsSearchingBooking(true)
    setSearchedBooking(null)
    setNutshellLeadFound(null)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Search in dummy data
      const foundBooking = bookings.find((b) => b.bookingNumber === bookeoNumber.trim())

      if (foundBooking) {
        setSearchedBooking(foundBooking)

        // Simulate checking for Nutshell lead
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Check if there's a matching lead in our dummy data
        // For this demo, we'll match by name
        const leadExists = DUMMY_NUTSHELL_LEADS.some(
          (lead) => lead.name.toLowerCase() === foundBooking.title.toLowerCase(),
        )
        setNutshellLeadFound(leadExists)
      } else {
        setSearchedBooking(null)
      }
    } catch (error) {
      console.error("Error searching booking:", error)
    } finally {
      setIsSearchingBooking(false)
    }
  }

  const handleSearchLead = async () => {
    if (!nutshellLeadName.trim()) return

    setIsSearchingLead(true)
    setLeadFound(false)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Search in dummy data
      const found = DUMMY_NUTSHELL_LEADS.some((lead) =>
        lead.name.toLowerCase().includes(nutshellLeadName.toLowerCase()),
      )
      setLeadFound(found)
    } catch (error) {
      console.error("Error searching lead:", error)
    } finally {
      setIsSearchingLead(false)
    }
  }

  const handleInviteCustomer = () => {
    const leadName = nutshellLeadFound ? searchedBooking?.title : nutshellLeadName
    const leadDetails = DUMMY_NUTSHELL_LEADS.find((lead) =>
      lead.name.toLowerCase().includes(leadName?.toLowerCase() || ""),
    )

    alert(
      `Invitation sent to ${leadDetails?.name} (${leadDetails?.email})\nFor booking: ${searchedBooking?.bookingNumber} - ${searchedBooking?.serviceName}`,
    )

    // Reset the form
    setIsInviteDialogOpen(false)
    resetInviteForm()
  }

  const resetInviteForm = () => {
    setBookeoNumber("")
    setSearchedBooking(null)
    setNutshellLeadFound(null)
    setNutshellLeadName("")
    setLeadFound(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f9f0]">
      <AdminHeader onLogout={handleLogout} />

      {/* Main content */}
      <main className="container mx-auto px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Bookings</h2>
          <Button
            onClick={() => {
              resetInviteForm()
              setIsInviteDialogOpen(true)
            }}
            className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
          >
            Invite Customer
          </Button>
        </div>

        <BookingsTable
          bookings={bookings}
          reportStatuses={reportStatuses}
          onToggleReportStatus={toggleReportStatus}
          onViewDetails={handleBookingClick}
          isLoading={loading}
        />
      </main>

      {/* Dialogs */}
      <BookingDetailsDialog
        booking={selectedBooking}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        reportUrl={reportUrl}
        onReportUrlChange={setReportUrl}
        reportStatus={selectedBooking ? reportStatuses[selectedBooking.bookingNumber] : false}
        onToggleReportStatus={() => selectedBooking && toggleReportStatus(selectedBooking.bookingNumber)}
      />

      <InviteCustomerDialog
        isOpen={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        bookeoNumber={bookeoNumber}
        onBookeoNumberChange={setBookeoNumber}
        searchedBooking={searchedBooking}
        isSearchingBooking={isSearchingBooking}
        onSearchBooking={handleSearchBooking}
        nutshellLeadFound={nutshellLeadFound}
        nutshellLeadName={nutshellLeadName}
        onNutshellLeadNameChange={setNutshellLeadName}
        isSearchingLead={isSearchingLead}
        onSearchLead={handleSearchLead}
        leadFound={leadFound}
        onInviteCustomer={handleInviteCustomer}
        onReset={resetInviteForm}
      />
    </div>
  )
}

