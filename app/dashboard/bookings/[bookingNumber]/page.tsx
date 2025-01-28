"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  User,
  Building2,
  Calendar,
  Loader2,
  BadgeCheck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RescheduleModal from "@/components/modal/RescheduleModal";
import UtilityBills from "@/components/booking/utilityBills";

interface Price {
  totalGross: { amount: string; currency: string };
  totalNet: { amount: string; currency: string };
  totalTaxes: { amount: string; currency: string };
  totalPaid: { amount: string; currency: string };
  taxes: unknown[];
}

interface BookingDetails {
  bookingNumber: string;
  startTime: string;
  endTime: string;
  title: string;
  creationTime: string;
  canceled: boolean;
  cancelationTime?: string;
  accepted: boolean;
  serviceName: string;
  serviceId: string;
  price: Price;
  auditor: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    booking: BookingDetails;
  };
}

const BookingDetailsPage = () => {
  const { bookingNumber } = useParams();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleRescheduleClick = () => {
    setModalOpen(true);
  };
  


  // const [uploading, setUploading] = useState(false);
  // const MAX_SIZE_MB = 20; 
  
 
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleReschedule = (startTime?: string, endTime?: string) => {
    setBooking((prevBooking) => {
      if (!prevBooking) return null;

      return {
        ...prevBooking,
        startTime: startTime || prevBooking.startTime,
        endTime: endTime || prevBooking.endTime,
      };
    });
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/user/bookings/${bookingNumber}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data: ApiResponse = await response.json();
        if (data.success) {
          setBooking(data.data.booking);
        } else {
          throw new Error(data.message || "Failed to fetch booking details");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingNumber]);

  const formatDateTime = (startStr: string, endStr?: string): string => {
    const start = new Date(startStr);
    const end = new Date(endStr ?? "");

    const dateFormat = new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const timeFormat = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    });

    const dateStr = dateFormat.format(start);
    const startTimeStr = timeFormat.format(start);
    const endTimeStr = timeFormat.format(end);

    return `${dateStr} at ${startTimeStr}${endStr ? " to " + endTimeStr : ""}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-lg text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error Loading Booking
              </h3>
              <p className="text-gray-500">
                {error || "Unable to load booking details"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Booking Details
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Reference: {booking.bookingNumber}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Status Card */}
          <Card className="md:col-span-3">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {booking.canceled ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : booking.accepted ? (
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      booking.canceled
                        ? "text-red-700"
                        : booking.accepted
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {booking.canceled
                      ? "Cancelled"
                      : booking.accepted
                      ? "Confirmed"
                      : "Pending"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${booking.price.totalGross.amount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="flex items-center text-lg font-medium text-gray-900">
                    <Building2 className="h-5 w-5 mr-2 text-gray-400" />
                    Service Information
                  </h3>
                  <Separator className="my-3" />
                  <div className="space-y-2">
                    <p className="text-gray-900 font-medium">
                      {booking.serviceName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Service ID: {booking.serviceId}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Auditor: {booking.auditor}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center text-lg font-medium text-gray-900 mt-6">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    Appointment Time
                  </h3>
                  <Separator className="my-3" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex space-x-2">
                        <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                        <p className="text-gray-900">
                          {formatDateTime(booking.startTime, booking.endTime)}
                        </p>
                      </div>
                      <Button
                        variant="link"
                        className="text-blue-600 hover:underline"
                        onClick={handleRescheduleClick}
                      >
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="flex items-center text-lg font-medium text-gray-900">
                <User className="h-5 w-5 mr-2 text-gray-400" />
                Customer Details
              </h3>
              <Separator className="my-3" />
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">{booking.title}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    Created:{" "}
                    {formatDateTime(booking.creationTime, booking.creationTime)}
                  </p>
                  {booking.canceled && booking.cancelationTime && (
                    <p>
                      Cancelled:{" "}
                      {formatDateTime(
                        booking.cancelationTime,
                        booking.cancelationTime
                      )}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <UtilityBills bookingNumber={bookingNumber as string}  />
        </div>
      </main>
      {booking && (
        <RescheduleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onReschedule={handleReschedule}
          bookingNumber={booking.bookingNumber}
        />
      )}

    </div>
  );
};

export default BookingDetailsPage;
