"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminHeader } from "@/components/admin/AdminHeader";
import BookingProgress from "@/components/component/booking-progress";
import { STAGE_LABELS } from "@/constants/booking-stages";
import { formatDate, getStepStatus } from "@/utils/booking-utils";
import { ExternalLink, FolderOpen, ArrowLeft, Search, Check, Clock, X, FileText } from "lucide-react";
import type { Booking, ContractDetails, ContractDoc, Recipient } from "@/types/admin";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingDetailsResponse {
  success: boolean;
  message: string;
  data: {
    booking: Booking;
    report: {
      reportUrl: string;
      reportData: object;
      displayReport: boolean;
    } | null;
    contract: ContractDetails | null
  };
}

interface ContractSearchResponse {
  success: boolean
  message: string
  data: {
    docs: ContractDoc[]
  };
}

export default function BookingDetailsPage({
  params,
}: {
  params: Promise<{ bookingNumber: string }>;
}) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const bookingNumber = unwrappedParams.bookingNumber;

  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [reportUrl, setReportUrl] = useState("")
  const [reportData, setReportData] = useState<Object | null>(null)
  const [reportStatus, setReportStatus] = useState(false)
  const [initialReportStatus, setInitialReportStatus] = useState(false)
  const [contractDetails, setContractDetails] = useState<ContractDetails | null>(null)
  const [contractDisplayStatus, setContractDisplayStatus] = useState(false)
  const [initialContractDisplayStatus, setInitialContractDisplayStatus] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Contract search states
  const [isEditMode, setIsEditMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<ContractDoc[]>([])
  const [selectedContract, setSelectedContract] = useState<ContractDoc | null>(null)
  const [customerRecipient, setCustomerRecipient] = useState("")
  const [cielPowerRepresentative, setCielPowerRepresentative] = useState("")

  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [loadingRecipients, setLoadingRecipients] = useState(false)
  const [selectedCustomerRecipientId, setSelectedCustomerRecipientId] = useState("")
  const [selectedRepresentativeRecipientId, setSelectedRepresentativeRecipientId] = useState("")

  useEffect(() => {
    if (bookingNumber) {
      fetchBookingDetails()
    }
  }, [bookingNumber])

  // Set edit mode when no contract details are available
  useEffect(() => {
    setIsEditMode(!contractDetails)

    if (contractDetails) {
      setContractDisplayStatus(contractDetails.displayContract)
      setInitialContractDisplayStatus(contractDetails.displayContract)
    }
  }, [contractDetails])

  // Track if report status has changed
  useEffect(() => {
    if (reportStatus !== undefined) {
      setInitialReportStatus(reportStatus)
    }
  }, [])

  const fetchBookingDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/bookings/${bookingNumber}`)

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.detail || "Failed to fetch booking details")
        router.push("/admin")
        return
      }

      const data: BookingDetailsResponse = await response.json()

      if (data.success) {
        setBooking(data.data.booking)
        // Handle report data if available
        if (data.data.report) {
          setReportData(data.data.report.reportData || null)
          setReportUrl(data.data.report.reportUrl || "")
          setReportStatus(data.data.report.displayReport || false)
          setInitialReportStatus(data.data.report.displayReport || false)
        } else {
          setReportData(null)
          setReportUrl("")
          setReportStatus(false)
          setInitialReportStatus(false)
        }

        if (data.data.contract) {
          setContractDetails(data.data.contract)
          setContractDisplayStatus(data.data.contract.displayContract)
          setInitialContractDisplayStatus(data.data.contract.displayContract)
        }
      } else {
        toast.error(data.message || "Failed to fetch booking details")
        router.push("/admin")
      }
    } catch (error) {
      console.error("Error fetching booking details:", error)
      toast.error("An error occurred while fetching booking details")
      router.push("/admin")
    } finally {
      setLoading(false)
    }
  }

  const handleSearchContracts = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!searchQuery.trim()) {
      toast.error("Please enter a search term")
      return
    }

    setIsSearching(true)
    setSearchResults([])

    try {
      const response = await fetch(`/api/admin/search/contracts?docName=${encodeURIComponent(searchQuery)}`)

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to search contracts")
        return
      }

      const data: ContractSearchResponse = await response.json()

      if (data.success) {
        setSearchResults(data.data.docs)
      } else {
        toast.error(data.message || "Failed to search contracts")
      }
    } catch (error) {
      console.error("Error searching contracts:", error)
      toast.error("An error occurred while searching contracts")
    } finally {
      setIsSearching(false)
    }
  }

  const fetchRecipients = async (contractId: string) => {
    setLoadingRecipients(true)
    setRecipients([])

    try {
      const response = await fetch(`/api/admin/search/contracts/${contractId}/recipients`)

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to fetch recipients")
        return
      }

      const data = await response.json()

      if (data.success) {
        setRecipients(data.data.recipients)
      } else {
        toast.error(data.message || "Failed to fetch recipients")
      }
    } catch (error) {
      console.error("Error fetching recipients:", error)
      toast.error("An error occurred while fetching recipients")
    } finally {
      setLoadingRecipients(false)
    }
  }

  const handleSelectContract = (contract: ContractDoc) => {
    setSelectedContract(contract)
    // Reset the recipient selections
    setSelectedCustomerRecipientId("")
    setSelectedRepresentativeRecipientId("")
    setCustomerRecipient("")
    setCielPowerRepresentative("")

    // Fetch recipients for this contract
    fetchRecipients(contract.id)
  }

  const handleAttachContract = async () => {
    if (!selectedContract) {
      toast.error("Please select a contract")
      return
    }

    if (!selectedCustomerRecipientId) {
      toast.error("Please select a customer recipient")
      return
    }

    if (!selectedRepresentativeRecipientId) {
      toast.error("Please select a Ciel Power representative")
      return
    }

    setIsSaving(true)

    try {
      const contractData = {
        id: selectedContract.id,
        customerRecipientId: selectedCustomerRecipientId,
        cielPowerRepresentativeRecipientId: selectedRepresentativeRecipientId,
      }

      const response = await fetch(`/api/admin/bookings/${bookingNumber}/contract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Contract attached successfully")
        // Refresh booking details to get the updated contract
        fetchBookingDetails()
      } else {
        toast.error(data.message || "Failed to attach contract")
      }
    } catch (error) {
      console.error("Error attaching contract:", error)
      toast.error("An error occurred while attaching the contract")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    let hasChanges = false
    let reportUpdated = false
    let contractUpdated = false

    try {
      // Check if report data has changed
      // if (reportUrl !== "" || reportStatus !== initialReportStatus) {
      //   hasChanges = true

      //   const updatedReportData = {
      //     reportUrl: reportUrl,
      //     reportData: reportUrl !== "" ? null : reportData,
      //     displayReport: reportStatus,
      //   }

      //   const reportResponse = await fetch(`/api/admin/bookings/${bookingNumber}/report/update`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(updatedReportData),
      //   })

      //   const reportData = await reportResponse.json()

      //   if (reportData.success) {
      //     reportUpdated = true
      //     setInitialReportStatus(reportStatus)
      //   } else {
      //     toast.error(reportData.message || "Failed to update report details")
      //   }
      // }

      // Check if contract display status has changed
      if (contractDetails && contractDisplayStatus !== initialContractDisplayStatus) {
        hasChanges = true

        const contractResponse = await fetch(
          `/api/admin/bookings/${bookingNumber}/contract/toggle?displayContract=${contractDisplayStatus}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          },
        )

        const contractData = await contractResponse.json()

        if (contractData.success) {
          contractUpdated = true
          // Update the contract details with the new display status
          setContractDetails((prev) => (prev ? { ...prev, displayContract: contractData.data.displayContract } : null))
          setInitialContractDisplayStatus(contractData.data.displayContract)
        } else {
          toast.error(contractData.message || "Failed to toggle contract display")
        }
      }

      if (!hasChanges) {
        toast.info("No changes to save")
      } else {
        if (reportUpdated && contractUpdated) {
          toast.success("All changes saved successfully")
        } else if (reportUpdated) {
          toast.success("Report details updated successfully")
        } else if (contractUpdated) {
          toast.success("Contract display toggled successfully")
        }
      }
    } catch (error) {
      console.error("Error saving changes:", error)
      toast.error("An error occurred while saving changes")
    } finally {
      setIsSaving(false)
    }
  }

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
      "document.completed": {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: <Check className="h-3 w-3 mr-1" />,
        label: "Completed",
      },
      "document.viewed": {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <FileText className="h-3 w-3 mr-1" />,
        label: "Viewed",
      },
      "document.draft": {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <Clock className="h-3 w-3 mr-1" />,
        label: "Draft",
      },
      "document.voided": {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: <X className="h-3 w-3 mr-1" />,
        label: "Voided",
      },
    }

    const defaultStatus = {
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: <FileText className="h-3 w-3 mr-1" />,
      label: status.replace("document.", ""),
    }

    const { color, icon, label } = statusMap[status] || defaultStatus

    return (
      <Badge variant="outline" className={`${color} flex items-center`}>
        {icon}
        {label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f9f0]">
        <AdminHeader />
        <main className="container mx-auto px-6 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5cb85c]"></div>
          </div>
        </main>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f5f9f0]">
        <AdminHeader />
        <main className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-1">Booking not found</h3>
              <p className="text-gray-500 max-w-md mb-4">
                The booking you are looking for does not exist or has been removed.
              </p>
              <Button onClick={() => router.push("/admin")} className="bg-[#5cb85c] hover:bg-[#4a9d4a]">
                Return to Dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Check if there are any unsaved changes
  const hasUnsavedChanges =
    reportStatus !== initialReportStatus || (contractDetails && contractDisplayStatus !== initialContractDisplayStatus)

  return (
    <div className="min-h-screen bg-[#f5f9f0]">
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin")}
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push(`/admin/${bookingNumber}/report`)}
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            Go to Report
            <ArrowLeft className="mr-2 h-4 w-4 rotate-180" />
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-8">Booking Details</h1>

          <div className="grid gap-8">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Client Name</h3>
                <p className="mt-1 text-lg font-medium">{booking.title}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Booking Number</h3>
                <p className="mt-1 text-lg font-medium">{booking.bookingNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Service</h3>
                <p className="mt-1">{booking.serviceName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Current Stage</h3>
                <p className="mt-1">{STAGE_LABELS[booking.currentStage] || booking.currentStage}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Start Time</h3>
                <p className="mt-1">{formatDate(booking.startTime)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">End Time</h3>
                <p className="mt-1">{formatDate(booking.endTime)}</p>
              </div>
            </div>

            {/* Google Drive Folder */}
            {booking.googleDriveFolder && (
              <div className="pt-6 border-t">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Google Drive Folder</h3>
                <a
                  href={booking.googleDriveFolder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#5cb85c] hover:text-[#4a9d4a] hover:underline"
                >
                  <FolderOpen className="h-5 w-5" />
                  <span>View Customer Files</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}

            {/* Booking Progress */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium mb-6">Booking Progress</h3>
              <div className="w-full overflow-x-auto pb-4">
                <BookingProgress steps={getStepStatus(booking.currentStage)} />
              </div>
            </div>

            {/* Report Management */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium mb-6">Report Management</h3>
              <div className="space-y-4 max-w-2xl">
                <div className="space-y-2">
                  <Label htmlFor="reportUrl">Report URL</Label>
                  <Input
                    id="reportUrl"
                    value={reportUrl}
                    onChange={(e) => setReportUrl(e.target.value)}
                    placeholder="Enter report URL"
                    disabled={isSaving}
                    className="bg-white"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="reportStatus">Report Display Status</Label>
                  <Switch
                    id="reportStatus"
                    checked={reportStatus}
                    onCheckedChange={setReportStatus}
                    className="data-[state=checked]:bg-[#5cb85c]"
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>

            {/* Contract Management */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium mb-6">Contract Management</h3>

              {isEditMode ? (
                <div className="space-y-6 max-w-2xl">
                  <div className="space-y-4">
                    <form onSubmit={handleSearchContracts} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for contracts by name"
                          disabled={isSearching}
                          className="bg-white"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSearching || !searchQuery.trim()}
                        className="bg-[#5cb85c] hover:bg-[#4a9d4a]"
                      >
                        {isSearching ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                        <span className="ml-2">Search</span>
                      </Button>
                    </form>

                    {searchResults.length > 0 && (
                      <div className="border rounded-md overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 border-b">
                          Search Results ({searchResults.length})
                        </div>
                        <div className="divide-y max-h-64 overflow-y-auto">
                          {searchResults.map((doc) => (
                            <div
                              key={doc.id}
                              className={`px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${selectedContract?.id === doc.id ? "bg-green-50" : ""
                                }`}
                            >
                              <div className="flex-1">
                                <div className="font-medium">{doc.name}</div>
                                <div className="flex items-center gap-3 mt-1">
                                  {renderStatusBadge(doc.status)}
                                  <span className="text-xs text-gray-500">
                                    Created: {new Date(doc.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant={selectedContract?.id === doc.id ? "default" : "outline"}
                                onClick={() => handleSelectContract(doc)}
                                className={selectedContract?.id === doc.id ? "bg-[#5cb85c] hover:bg-[#4a9d4a]" : ""}
                              >
                                {selectedContract?.id === doc.id ? (
                                  <>
                                    <Check className="h-4 w-4 mr-1" />
                                    Selected
                                  </>
                                ) : (
                                  "Select"
                                )}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedContract && (
                    <div className="border rounded-md p-4 bg-gray-50">
                      <h4 className="font-medium mb-4">Attach Contract: {selectedContract.name}</h4>

                      {loadingRecipients ? (
                        <div className="flex justify-center py-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5cb85c]"></div>
                        </div>
                      ) : recipients.length > 0 ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="customerRecipient">Customer Recipient</Label>
                            <Select
                              value={selectedCustomerRecipientId}
                              onValueChange={(value) => {
                                setSelectedCustomerRecipientId(value)
                                const recipient = recipients.find((r) => r.id === value)
                                if (recipient) {
                                  setCustomerRecipient(`${recipient.name} (${recipient.email})`)
                                }
                              }}
                            >
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select customer recipient" />
                              </SelectTrigger>
                              <SelectContent>
                                {recipients.map((recipient) => (
                                  <SelectItem key={recipient.id} value={recipient.id}>
                                    {recipient.name} ({recipient.email})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cielPowerRep">Ciel Power Representative</Label>
                            <Select
                              value={selectedRepresentativeRecipientId}
                              onValueChange={(value) => {
                                setSelectedRepresentativeRecipientId(value)
                                const recipient = recipients.find((r) => r.id === value)
                                if (recipient) {
                                  setCielPowerRepresentative(`${recipient.name} (${recipient.email})`)
                                }
                              }}
                            >
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select Ciel Power representative" />
                              </SelectTrigger>
                              <SelectContent>
                                {recipients.map((recipient) => (
                                  <SelectItem key={recipient.id} value={recipient.id}>
                                    {recipient.name} ({recipient.email})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <Button
                            onClick={handleAttachContract}
                            disabled={isSaving || !selectedCustomerRecipientId || !selectedRepresentativeRecipientId}
                            className="bg-[#5cb85c] hover:bg-[#4a9d4a] w-full"
                          >
                            {isSaving ? (
                              <>
                                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-white"></div>
                                Attaching...
                              </>
                            ) : (
                              "Attach Contract"
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          No recipients found for this contract. Please select a different contract.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : contractDetails ? (
                <div className="space-y-4 max-w-2xl">
                  <div className="space-y-2">
                    <Label>Document Name</Label>
                    <p className="text-gray-700">{contractDetails.name}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Customer Recipient</Label>
                    <p className="text-gray-700">{contractDetails.customerRecipient}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Ciel Power Representative Recipient</Label>
                    <p className="text-gray-700">{contractDetails.cielPowerRepresentativeRecipient}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="contractStatus">Contract Display Status</Label>
                    <Switch
                      id="contractStatus"
                      checked={contractDisplayStatus}
                      onCheckedChange={setContractDisplayStatus}
                      className="data-[state=checked]:bg-[#5cb85c]"
                      disabled={isSaving}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">No contract details available.</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={() => router.push("/admin")} disabled={isSaving} className="px-6">
                Cancel
              </Button>
              <Button
                onClick={handleSaveChanges}
                className="bg-[#5cb85c] hover:bg-[#4a9d4a] px-6"
                disabled={isSaving || !hasUnsavedChanges}
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
