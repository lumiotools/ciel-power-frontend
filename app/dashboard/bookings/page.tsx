"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Price {
  totalGross: {
    amount: string;
    currency: string;
  };
  totalNet: {
    amount: string;
    currency: string;
  };
  totalTaxes: {
    amount: string;
    currency: string;
  };
  totalPaid: {
    amount: string;
    currency: string;
  };
  taxes: any[];
}

interface Booking {
  bookingNumber: string;
  startTime: string;
  endTime: string;
  title: string;
  canceled: boolean;
  accepted: boolean;
  creationTime: string;
  serviceName: string;
  serviceId: string;
  price: Price;
}

interface BookingsResponse {
  success: boolean;
  message: string;
  data: {
    bookings: Booking[];
  };
}

const BookingsPage: React.FC = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/user/bookings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data: BookingsResponse = await response.json();
        if (data.success) {
          setBookings(data.data.bookings);
        } else {
          throw new Error(data.message || "Failed to fetch bookings");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDateTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const handleViewDetails = (bookingNumber: string) => {
    router.push(`/dashboard/bookings/${bookingNumber}`);
  };

  const getStatusBadge = (booking: Booking): JSX.Element => {
    if (booking.canceled) {
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
          Cancelled
        </span>
      );
    }
    if (booking.accepted) {
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
          Confirmed
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
        Pending
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              New Booking
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.bookingNumber}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {booking.serviceName}
                    </h2>
                    {getStatusBadge(booking)}
                  </div>

                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {formatDateTime(booking.startTime)} -{" "}
                        {formatDateTime(booking.endTime)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Booking #{booking.bookingNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${booking.price.totalGross.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.price.totalPaid.amount === "0"
                        ? "Unpaid"
                        : "Paid"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleViewDetails(booking.bookingNumber)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {bookings.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No bookings found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookingsPage;