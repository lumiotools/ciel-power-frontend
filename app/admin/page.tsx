"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { InviteCustomerDialog } from "@/components/admin/InviteCustomerDialog";
import type { Booking, BookingResponse, NutshellLead } from "@/types/admin";
import { toast } from "sonner";
import { Settings, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [bookeoNumber, setBookeoNumber] = useState("");
  const [searchedBooking, setSearchedBooking] = useState<Booking | null>(null);
  const [isSearchingBooking, setIsSearchingBooking] = useState(false);
  const [nutshellLeadFound, setNutshellLeadFound] = useState<boolean | null>(
    null
  );
  const [nutshellLeadName, setNutshellLeadName] = useState("");
  const [isSearchingLead, setIsSearchingLead] = useState(false);
  const [foundLeads, setFoundLeads] = useState<NutshellLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<NutshellLead | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [hasSearchedLead, setHasSearchedLead] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const bookingsPerPage = 10;

  useEffect(() => {
    fetchBookings();
  }, [currentPage]);

  const fetchBookings = async () => {
    setLoading(true);
    setBookings([]);
    try {
      const response = await fetch(
        `/api/admin/bookings?page=${currentPage}&limit=${bookingsPerPage}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch bookings");
        return;
      }

      const data: BookingResponse = await response.json();

      if (data.success) {
        setBookings(data.data.bookings);
        setTotalBookings(data.data.pagination.total_records || 0);
        setTotalPages(data.data.pagination.total_pages || 1);
      } else {
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("An error occurred while fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchBooking = async () => {
    if (!bookeoNumber.trim()) return;

    setIsSearchingBooking(true);
    setSearchedBooking(null);
    setNutshellLeadFound(null);
    setBookingError(null);

    try {
      // Call the booking search API
      const response = await fetch(
        `/api/admin/search/booking?bookingNumber=${bookeoNumber.trim()}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        setBookingError(errorData.detail || "Error searching for booking");
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Set the found booking
        setSearchedBooking(data.data.booking);

        // Check if there's a lead associated with the booking
        setNutshellLeadFound(data.data.lead !== null);

        // If there's a lead, set it as the selected lead
        if (data.data.lead) {
          setSelectedLead(data.data.lead);
        }
      } else {
        // Only set the booking error if the API returns an error
        if (!data.success) {
          setBookingError(data.message || "Booking not found");
        }
      }
    } catch (error) {
      console.error("Error searching booking:", error);
      setBookingError("An error occurred while searching for the booking");
    } finally {
      setIsSearchingBooking(false);
    }
  };

  const handleSearchLead = async () => {
    if (!nutshellLeadName.trim()) return;

    setIsSearchingLead(true);
    setFoundLeads([]);
    setSelectedLead(null);
    setHasSearchedLead(false); // Reset search flag before starting new search
    setLeadError(null); // Reset lead error

    try {
      // Call the lead search API
      const response = await fetch(
        `/api/admin/search/leads?leadName=${encodeURIComponent(nutshellLeadName.trim())}`
      );

      // Set search flag to true after search completes
      setHasSearchedLead(true);

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail === "Leads not found") {
          // This is an expected error when no leads are found
          setFoundLeads([]);
          setLeadError("No leads found with this name");
        } else {
          // This is an unexpected error
          console.error("Error response from lead search API:", errorData);
          setLeadError(errorData.detail || "Error searching for leads");
        }
        return;
      }

      const data = await response.json();

      if (data.success && data.data.leads.length > 0) {
        setFoundLeads(data.data.leads);
      } else {
        setFoundLeads([]);
        setLeadError("No leads found with this name");
      }
    } catch (error) {
      console.error("Error searching lead:", error);
      setLeadError("An error occurred while searching for leads");
    } finally {
      setIsSearchingLead(false);
    }
  };

  const handleSelectLead = (lead: NutshellLead) => {
    setSelectedLead(lead);
  };

  const handleInviteCustomer = async () => {
    if (!searchedBooking || (!nutshellLeadFound && !selectedLead)) {
      toast.error("Both booking and lead are required to send an invitation.");
      return;
    }

    setIsInviting(true);

    try {
      // Prepare the request body
      const requestBody = {
        bookeoBookingNumber: searchedBooking.bookingNumber,
        nutshellLeadId: nutshellLeadFound
          ? selectedLead?.id.toString() // If lead was found with booking, use the customer ID
          : selectedLead?.id.toString(), // Otherwise use the selected lead ID
      };

      // Call the invite API
      const response = await fetch("/api/admin/customer/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Show success message
        toast.success("Customer invited successfully");

        // Refresh the bookings list to show any updates
        fetchBookings();

        // Close the dialog and reset the form
        setIsInviteDialogOpen(false);
        resetInviteForm();
      } else {
        // Show error message
        const errorMessage =
          data.detail || data.message || "Failed to invite customer";

        if (errorMessage.includes("already invited")) {
          toast.info("This customer has already been invited to the portal.");
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error inviting customer:", error);
      toast.error("An unexpected error occurred while inviting the customer.");
    } finally {
      setIsInviting(false);
    }
  };

  const resetInviteForm = () => {
    setBookeoNumber("");
    setSearchedBooking(null);
    setNutshellLeadFound(null);
    setNutshellLeadName("");
    setFoundLeads([]);
    setSelectedLead(null);
    setBookingError(null);
    setLeadError(null);
    setHasSearchedLead(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f9f0]">
      <AdminHeader />

      {/* Main content */}
      <main className="container mx-auto px-6 py-4">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Bookings Dashboard
            </h2>

            <div className="flex gap-3">
              {/* <Button
                onClick={fetchBookings}
                variant="outline"
                className="text-[#5cb85c] border-[#5cb85c] hover:bg-[#5cb85c]/10"
                disabled={loading}
                size="icon"
              >
                <RotateCw className={loading ? "animate-spin" : ""} />
              </Button> */}
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Search..."
                  disabled={loading}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchBookings();
                    }
                  }}
                />
                <Button
                  className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
                  disabled={loading}
                  onClick={fetchBookings}
                >
                  Search
                </Button>
              </div>

              <Button
                onClick={() => {
                  resetInviteForm();
                  setIsInviteDialogOpen(true);
                }}
                className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
              >
                Invite Customer
              </Button>
              <Button asChild variant="outline" className="border-gray-300">
                <Link href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              Manage all customer bookings and their progress through the energy
              audit process.
            </p>
          </div>

          <BookingsTable bookings={bookings} isLoading={loading} />

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing page {currentPage} of {totalPages} ({totalBookings} total
              bookings)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || loading}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loading}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <main className="container mx-auto px-6 py-4">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Manage your Auditors
            </h2>
            <div className="flex gap-3">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Search..."
                  disabled={loading}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchBookings();
                    }
                  }}
                />
                <Button
                  className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
                  disabled={loading}
                  onClick={fetchBookings}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">Manage all auditors</p>
          </div>

          {/* <BookingsTable bookings={bookings} isLoading={loading} /> */}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing page {currentPage} of {totalPages} ({totalBookings} total
              bookings)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || loading}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loading}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Dialogs */}
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
        foundLeads={foundLeads}
        selectedLead={selectedLead}
        onSelectLead={handleSelectLead}
        onInviteCustomer={handleInviteCustomer}
        onReset={resetInviteForm}
        bookingError={bookingError}
        leadError={leadError}
        hasSearchedLead={hasSearchedLead}
        isInviting={isInviting}
      />
    </div>
  );
}
