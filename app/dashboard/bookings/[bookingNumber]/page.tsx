// app/bookings/[bookingNumber]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import React from "react";

const BookingDetailsPage = () => {
  const { bookingNumber } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button variant={'outline'} size={'icon'}
              onClick={() => window.history.back()}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              Booking Details
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Booking Number Banner */}
          <div className="bg-gray-100 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Booking Number</p>
                <p className="text-lg font-semibold text-gray-900">
                  {bookingNumber}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Confirmed
              </span>
            </div>
          </div>

          {/* Booking Details Content */}
          <div className="px-6 py-6">
            <div className="space-y-6">
              {/* Service Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Service Details
                </h3>
                <div className="mt-3 border-t border-gray-200 pt-4">
                  <p className="text-gray-600">Loading service details...</p>
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Customer Details
                </h3>
                <div className="mt-3 border-t border-gray-200 pt-4">
                  <p className="text-gray-600">Loading customer details...</p>
                </div>
              </div>

              {/* Appointment Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Appointment Details
                </h3>
                <div className="mt-3 border-t border-gray-200 pt-4">
                  <p className="text-gray-600">
                    Loading appointment details...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingDetailsPage;
