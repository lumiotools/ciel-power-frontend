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
import { ExternalLink, FolderOpen, ArrowLeft } from "lucide-react";
import type { Booking } from "@/types/admin";
import { toast } from "sonner";

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
  const [reportData, setReportData] = useState<Object | null>({});
  const [reportStatus, setReportStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingNumber]);

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
        console.log(data.data.report);
        if (data.data.report) {
          setReportData(data.data.report.reportData || {});
          setReportUrl(data.data.report.reportUrl || "");
          setReportStatus(data.data.report.displayReport || false);
        } else {
          setReportData({});
          setReportUrl("");
          setReportStatus(false);
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

  const handleSaveChanges = async () => {
    setIsSaving(true);

    if (reportUrl !== "") {
      setReportData(null);
    } else {
      setReportData(
        JSON.parse(
          localStorage.getItem(`report_data_${bookingNumber}`) || "{}",
        ),
      );
    }

    try {
      const updatedReportData = {
        reportUrl: reportUrl,
        reportData: reportData,
        displayReport: reportStatus,
      };

      console.log("Updated Report Data:", updatedReportData);

      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/report/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReportData),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Report details updated successfully");
      } else {
        toast.error(data.message || "Failed to update report details");
      }
    } catch (error) {
      console.error("Error updating report details:", error);
      toast.error("An error occurred while updating report details");
    } finally {
      setIsSaving(false);
    }
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
        <div className=" flex justify-between items-center">
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
                <h3 className="text-sm font-medium text-gray-500">Service</h3>
                <p className="mt-1">{booking.serviceName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Current Stage
                </h3>
                <p className="mt-1">{STAGE_LABELS[booking.currentStage]}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Start Time
                </h3>
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

            {/* Action Buttons */}
            <div className="pt-6 border-t flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/admin")}
                disabled={isSaving}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveChanges}
                className="bg-[#5cb85c] hover:bg-[#4a9d4a] px-6"
                disabled={isSaving}
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
  );
}
