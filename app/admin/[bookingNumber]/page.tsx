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
import {
  ExternalLink,
  FolderOpen,
  ArrowLeft,
  Search,
  Check,
  Clock,
  X,
  FileText,
  Eye,
  Trash2,
  Plus,
} from "lucide-react";
import type { Booking, ContractDoc, Recipient } from "@/types/admin";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface BookingDetailsResponse {
  success: boolean;
  message: string;
  data: {
    booking: Booking;
    report: {
      reportUrl: string;
      reportData: object;
      displayReport: string;
    } | null;
    offeredContracts: OfferedContract[] | null;
    completedContractLink: string | null;
    payment: {
      amount: number;
      currency: string;
      status: string;
      updated_at: string;
    } | null;
  };
}

interface OfferedContract {
  id: string;
  name: string;
  status: string;
  displayContract: boolean;
  customerRecipient: string;
  cielPowerRepresentativeRecipient: string;
  accepted: boolean;
  link: string;
  created_at: string;
  updated_at: string;
}

interface ContractSearchResponse {
  success: boolean;
  message: string;
  data: {
    docs: ContractDoc[];
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

  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [reportUrl, setReportUrl] = useState("");
  const [reportData, setReportData] = useState<Object | null>(null);
  const [reportStatus, setReportStatus] = useState("NONE");
  const [offeredContracts, setOfferedContracts] = useState<OfferedContract[]>(
    [],
  );
  const [completedContractFileUrl, setCompletedContractFileUrl] = useState<
    string | null
  >(null);
  const [hasReportChanges, setHasReportChanges] = useState(false);

  // Separate loading states for different actions
  const [isSavingReport, setIsSavingReport] = useState(false);
  const [isTogglingContract, setIsTogglingContract] = useState<string | null>(
    null,
  );
  const [isRemovingContract, setIsRemovingContract] = useState<string | null>(
    null,
  );
  const [isAttachingContract, setIsAttachingContract] = useState(false);

  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewContractId, setPreviewContractId] = useState("");

  // Contract search states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<ContractDoc[]>([]);
  const [selectedContract, setSelectedContract] = useState<ContractDoc | null>(
    null,
  );

  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loadingRecipients, setLoadingRecipients] = useState(false);
  const [selectedCustomerRecipientId, setSelectedCustomerRecipientId] =
    useState("");
  const [
    selectedRepresentativeRecipientId,
    setSelectedRepresentativeRecipientId,
  ] = useState("");

  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const [payment, setPayment] = useState<{
    amount: number;
    currency: string;
    status: string;
    updated_at: string;
  } | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [isDeletingPayment, setIsDeletingPayment] = useState(false);

  useEffect(() => {
    if (bookingNumber) {
      fetchBookingDetails();
    }
  }, [bookingNumber]);

  useEffect(() => {
    setHasReportChanges(true);
  }, [reportUrl, reportStatus]);

  const fetchBookingDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/bookings/${bookingNumber}`);

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch booking details");
        router.push("/admin");
        return;
      }

      const data: BookingDetailsResponse = await response.json();

      if (data.success) {
        setBooking(data.data.booking);
        // Handle report data if available
        if (data.data.report) {
          setReportData(data.data.report.reportData || null);
          setReportUrl(data.data.report.reportUrl || "");
          setReportStatus(data.data.report.displayReport ?? "NONE");
          setTimeout(() => {
            setHasReportChanges(false);
          }, 500);
        } else {
          setReportData(null);
          setReportUrl("");
          setReportStatus("NONE");
        }

        // Handle offered contracts
        if (data.data.offeredContracts) {
          setOfferedContracts(data.data.offeredContracts);
        } else {
          setOfferedContracts([]);
        }
        if (data.data.completedContractLink) {
          setCompletedContractFileUrl(data.data.completedContractLink);
        }
        if (data.data.payment) {
          setPayment(data.data.payment);
        } else {
          setPayment(null);
        }
      } else {
        toast.error(data.message || "Failed to fetch booking details");
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
      toast.error("An error occurred while fetching booking details");
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchContracts = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setIsSearching(true);
    setSearchResults([]);

    try {
      const response = await fetch(
        `/api/admin/search/contracts?docName=${encodeURIComponent(searchQuery)}`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to search contracts");
        return;
      }

      const data: ContractSearchResponse = await response.json();

      if (data.success) {
        setSearchResults(data.data.docs);
      } else {
        toast.error(data.message || "Failed to search contracts");
      }
    } catch (error) {
      console.error("Error searching contracts:", error);
      toast.error("An error occurred while searching contracts");
    } finally {
      setIsSearching(false);
    }
  };

  const fetchRecipients = async (contractId: string) => {
    setLoadingRecipients(true);
    setRecipients([]);

    try {
      const response = await fetch(
        `/api/admin/search/contracts/${contractId}/recipients`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to fetch recipients");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setRecipients(data.data.recipients);
      } else {
        toast.error(data.message || "Failed to fetch recipients");
      }
    } catch (error) {
      console.error("Error fetching recipients:", error);
      toast.error("An error occurred while fetching recipients");
    } finally {
      setLoadingRecipients(false);
    }
  };

  const handleSelectContract = (contract: ContractDoc) => {
    setSelectedContract(contract);
    // Reset the recipient selections
    setSelectedCustomerRecipientId("");
    setSelectedRepresentativeRecipientId("");

    // Fetch recipients for this contract
    fetchRecipients(contract.id);
  };

  const handleAttachContract = async () => {
    if (!selectedContract) {
      toast.error("Please select a contract");
      return;
    }

    if (!selectedCustomerRecipientId) {
      toast.error("Please select a customer recipient");
      return;
    }

    if (!selectedRepresentativeRecipientId) {
      toast.error("Please select a Ciel Power representative");
      return;
    }

    setIsAttachingContract(true);

    try {
      const contractData = {
        id: selectedContract.id,
        customerRecipientId: selectedCustomerRecipientId,
        cielPowerRepresentativeRecipientId: selectedRepresentativeRecipientId,
      };

      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/contract`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contractData),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Contract attached successfully");
        // Close the modal and reset form
        setIsContractModalOpen(false);
        setSelectedContract(null);
        setSelectedCustomerRecipientId("");
        setSelectedRepresentativeRecipientId("");
        setSearchQuery("");
        setSearchResults([]);
        // Refresh booking details to get the updated contract
        fetchBookingDetails();
      } else {
        toast.error(data.message || "Failed to attach contract");
      }
    } catch (error) {
      console.error("Error attaching contract:", error);
      toast.error("An error occurred while attaching the contract");
    } finally {
      setIsAttachingContract(false);
    }
  };

  const handleToggleContractDisplay = async (
    contractId: string,
    display: boolean,
  ) => {
    setIsTogglingContract(contractId);
    try {
      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/contract/${contractId}/toggle?displayContract=${display}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Contract display toggled successfully");
        // Update the local state to reflect the change
        setOfferedContracts((prevContracts) =>
          prevContracts.map((contract) =>
            contract.id === contractId
              ? { ...contract, displayContract: display }
              : contract,
          ),
        );
      } else {
        toast.error(data.message || "Failed to toggle contract display");
      }
    } catch (error) {
      console.error("Error toggling contract display:", error);
      toast.error("An error occurred while toggling contract display");
    } finally {
      setIsTogglingContract(null);
    }
  };

  const handleRemoveContract = async (contractId: string) => {
    if (!confirm("Are you sure you want to remove this contract?")) {
      return;
    }

    setIsRemovingContract(contractId);
    try {
      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/contract/${contractId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Contract removed successfully");
        // Remove the contract from the local state
        setOfferedContracts((prevContracts) =>
          prevContracts.filter((contract) => contract.id !== contractId),
        );
      } else {
        toast.error(data.message || "Failed to remove contract");
      }
    } catch (error) {
      console.error("Error removing contract:", error);
      toast.error("An error occurred while removing the contract");
    } finally {
      setIsRemovingContract(null);
    }
  };

  const handlePreviewContract = (contractId: string) => {
    setPreviewContractId(contractId);
    setIsPreviewModalOpen(true);
  };

  const handleSaveChanges = async () => {
    setIsSavingReport(true);
    let hasChanges = false;
    let reportUpdated = false;

    try {
      // Check if report data has changed
      if (hasReportChanges) {
        hasChanges = true;

        const updatedReportData: {
          reportUrl: string;
          reportData: object | null;
          displayReport: string;
        } = {
          reportUrl: reportUrl,
          reportData: reportUrl !== "" ? null : reportData,
          displayReport: reportStatus,
        };

        const reportResponse = await fetch(
          `/api/admin/bookings/${bookingNumber}/report/update`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedReportData),
          },
        );

        const responseData = await reportResponse.json();

        if (responseData.success) {
          reportUpdated = true;
        } else {
          toast.error(
            responseData.message || "Failed to update report details",
          );
        }
      }

      if (!hasChanges) {
        toast.info("No changes to save");
      } else if (reportUpdated) {
        toast.success("Report details updated successfully");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("An error occurred while saving changes");
    } finally {
      setIsSavingReport(false);
    }
  };

  const handleAddPayment = async () => {
    if (!paymentAmount || isNaN(parseFloat(paymentAmount))) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsAddingPayment(true);
    try {
      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: parseFloat(paymentAmount) }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Payment details added successfully");
        setPaymentAmount("");
        fetchBookingDetails(); // Refresh to get updated payment details
      } else {
        toast.error(data.message || "Failed to add payment details");
      }
    } catch (error) {
      console.error("Error adding payment details:", error);
      toast.error("An error occurred while adding payment details");
    } finally {
      setIsAddingPayment(false);
    }
  };

  const handleDeletePayment = async () => {
    if (!confirm("Are you sure you want to delete this payment?")) {
      return;
    }

    setIsDeletingPayment(true);
    try {
      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/payment`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Payment details deleted successfully");
        setPayment(null);
      } else {
        toast.error(data.message || "Failed to delete payment details");
      }
    } catch (error) {
      console.error("Error deleting payment details:", error);
      toast.error("An error occurred while deleting payment details");
    } finally {
      setIsDeletingPayment(false);
    }
  };

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      { color: string; icon: React.ReactNode; label: string }
    > = {
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
    };

    const defaultStatus = {
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: <FileText className="h-3 w-3 mr-1" />,
      label: status.replace("document.", ""),
    };

    const { color, icon, label } = statusMap[status] || defaultStatus;

    return (
      <Badge variant="outline" className={`${color} flex items-center`}>
        {icon}
        {label}
      </Badge>
    );
  };

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
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f5f9f0]">
        <AdminHeader />
        <main className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Booking not found
              </h3>
              <p className="text-gray-500 max-w-md mb-4">
                The booking you are looking for does not exist or has been
                removed.
              </p>
              <Button
                onClick={() => router.push("/admin")}
                className="bg-[#5cb85c] hover:bg-[#4a9d4a]"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
                <h3 className="text-sm font-medium text-gray-500">
                  Client Name
                </h3>
                <p className="mt-1 text-lg font-medium">{booking.title}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Booking Number
                </h3>
                <p className="mt-1 text-lg font-medium">
                  {booking.bookingNumber}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1">{booking.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Email Address
                </h3>
                <p className="mt-1">{booking.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Start Time
                </h3>
                <p className="mt-1">{formatDate(booking.startTime)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Current Stage
                </h3>
                <p className="mt-1">
                  {STAGE_LABELS[booking.currentStage] || booking.currentStage}
                </p>
              </div>
            </div>

            {/* Google Drive Folder */}
            {booking.googleDriveFolder && (
              <div className="pt-6 border-t">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Google Drive Folder
                </h3>
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
                    disabled={isSavingReport}
                    className="bg-white"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="reportStatus">Report Display Status</Label>
                  <Tabs
                    defaultValue="NONE"
                    value={reportStatus}
                    onValueChange={setReportStatus}
                  >
                    <TabsList>
                      <TabsTrigger value="NONE">None</TabsTrigger>
                      <TabsTrigger value="STATIC">Static</TabsTrigger>
                      <TabsTrigger value="AUTOMATED">Automated</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    onClick={handleSaveChanges}
                    className="bg-[#5cb85c] hover:bg-[#4a9d4a] px-6"
                    disabled={isSavingReport || !hasReportChanges}
                  >
                    {isSavingReport ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      "Save Report Changes"
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Contract Management */}
            <div className="pt-6 border-t">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Contract Management</h3>
                <Button
                  onClick={() => setIsContractModalOpen(true)}
                  className="bg-[#5cb85c] hover:bg-[#4a9d4a]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Attach Contract
                </Button>
              </div>

              {offeredContracts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {offeredContracts.map((contract) => (
                    <Card
                      key={contract.id}
                      className="border-gray-200 flex flex-col"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex justify-between items-start">
                          <span>{contract.name}</span>
                          {renderStatusBadge(contract.status)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-500">Customer:</span>{" "}
                            {contract.customerRecipient}
                          </div>
                          <div>
                            <span className="text-gray-500">
                              Representative:
                            </span>{" "}
                            {contract.cielPowerRepresentativeRecipient}
                          </div>
                          <div>
                            <span className="text-gray-500">Created:</span>{" "}
                            {new Date(contract.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-gray-500">
                              Display to Customer:
                            </span>
                            <div className="flex items-center">
                              <Switch
                                checked={contract.displayContract}
                                onCheckedChange={(checked) =>
                                  handleToggleContractDisplay(
                                    contract.id,
                                    checked,
                                  )
                                }
                                className="data-[state=checked]:bg-[#5cb85c]"
                                disabled={
                                  !!completedContractFileUrl ||
                                  isTogglingContract === contract.id
                                }
                              />
                              {isTogglingContract === contract.id && (
                                <div className="ml-2 animate-spin rounded-full h-3 w-3 border-2 border-gray-300 border-t-[#5cb85c]"></div>
                              )}
                            </div>
                          </div>
                          {contract.accepted && (
                            <div className="flex justify-between items-center py-2">
                              <span className="text-green-500 font-medium">
                                Customer has signed this contract
                                {!completedContractFileUrl && (
                                  <>
                                    ,<br />
                                    Pending Ciel Power Representative signature
                                  </>
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-4 pt-2">
                        <Link href={contract.link} target="_blank">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Open in PandaDoc
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreviewContract(contract.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto"
                          onClick={() => handleRemoveContract(contract.id)}
                          disabled={
                            !!completedContractFileUrl ||
                            isRemovingContract === contract.id
                          }
                        >
                          {isRemovingContract === contract.id ? (
                            <>
                              <div className="h-3 w-3 mr-1 animate-spin rounded-full border-b-2 border-red-500"></div>
                              Removing...
                            </>
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border rounded-md p-6 text-center">
                  <p className="text-gray-500">
                    No contracts have been attached to this booking yet.
                  </p>
                  <Button
                    onClick={() => setIsContractModalOpen(true)}
                    variant="outline"
                    className="mt-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Attach Contract
                  </Button>
                </div>
              )}
            </div>
            {/* Payment Details */}
            <div className="pt-6 border-t">
              {payment ? (
                <Card className="max-w-md">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-medium">
                        {payment.amount} {payment.currency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <Badge
                        variant={
                          payment.status === "Paid"
                            ? "default"
                            : payment.status === "Failed"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Updated:</span>
                      <span>
                        {new Date(payment.updated_at).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                  {payment.status !== "Paid" && (
                    <CardFooter>
                      <Button
                        variant="destructive"
                        onClick={handleDeletePayment}
                        disabled={isDeletingPayment}
                      >
                        {isDeletingPayment ? (
                          <>
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-white"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Payment
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ) : (
                <div className="max-w-md space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentAmount">Payment Amount</Label>
                    <div className="flex gap-2">
                      <Input
                        id="paymentAmount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="bg-white"
                      />
                      <Button
                        onClick={handleAddPayment}
                        disabled={isAddingPayment || !paymentAmount}
                        className="bg-[#5cb85c] hover:bg-[#4a9d4a]"
                      >
                        {isAddingPayment ? (
                          <>
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-white"></div>
                            Adding...
                          </>
                        ) : (
                          "Add Payment"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Attach Contract Modal */}
      <Dialog open={isContractModalOpen} onOpenChange={setIsContractModalOpen}>
        <DialogContent className="sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Attach Contract</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Contract Search Form */}
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

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 border-b">
                  Search Results ({searchResults.length})
                </div>
                <div className="divide-y max-h-64 overflow-y-auto">
                  {searchResults.map((doc) => (
                    <div
                      key={doc.id}
                      className={`px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                        selectedContract?.id === doc.id ? "bg-green-50" : ""
                      }`}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{doc.name}</div>
                        <div className="flex items-center gap-3 mt-1">
                          {renderStatusBadge(doc.status)}
                          <span className="text-xs text-gray-500">
                            Created:{" "}
                            {new Date(doc.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={
                          selectedContract?.id === doc.id
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handleSelectContract(doc)}
                        className={
                          selectedContract?.id === doc.id
                            ? "bg-[#5cb85c] hover:bg-[#4a9d4a]"
                            : ""
                        }
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

            {/* Recipients Selection */}
            {selectedContract && (
              <div className="border rounded-md p-4 bg-gray-50">
                <h4 className="font-medium mb-4">
                  Attach Contract: {selectedContract.name}
                </h4>

                {loadingRecipients ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5cb85c]"></div>
                  </div>
                ) : recipients.length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerRecipient">
                        Customer Recipient
                      </Label>
                      <Select
                        value={selectedCustomerRecipientId}
                        onValueChange={(value) => {
                          setSelectedCustomerRecipientId(value);
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
                      <Label htmlFor="cielPowerRep">
                        Ciel Power Representative
                      </Label>
                      <Select
                        value={selectedRepresentativeRecipientId}
                        onValueChange={(value) => {
                          setSelectedRepresentativeRecipientId(value);
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
                      disabled={
                        isAttachingContract ||
                        !selectedCustomerRecipientId ||
                        !selectedRepresentativeRecipientId
                      }
                      className="bg-[#5cb85c] hover:bg-[#4a9d4a] w-full"
                    >
                      {isAttachingContract ? (
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
                    No recipients found for this contract. Please select a
                    different contract.
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setIsContractModalOpen(false);
                setSelectedContract(null);
                setSelectedCustomerRecipientId("");
                setSelectedRepresentativeRecipientId("");
                setSearchQuery("");
                setSearchResults([]);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contract Preview Modal */}
      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="sm:max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Contract Preview</DialogTitle>
          </DialogHeader>

          <div className="flex-grow overflow-hidden relative">
            {isIframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-[#96C93D] animate-spin"></div>
                  <p className="mt-4 text-sm text-gray-500">
                    Loading document...
                  </p>
                </div>
              </div>
            )}

            {previewContractId && (
              <iframe
                src={`/api/admin/bookings/${bookingNumber}/contract/${previewContractId}/preview`}
                className="w-full h-full border-0"
                title="Contract Preview"
                onLoad={() => setIsIframeLoading(false)}
              />
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                setIsPreviewModalOpen(false);
                setPreviewContractId("");
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
