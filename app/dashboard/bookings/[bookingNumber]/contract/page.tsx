"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BookingContractPage = () => {
  const params = useParams<{ bookingNumber: string }>();
  const bookingNumber = params.bookingNumber;

  const [signUrl, setSignUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignUrl = async () => {
      try {
        const response = await fetch(
          `/api/user/bookings/${bookingNumber}/contract`
        );
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.detail || "Failed to fetch sign URL");
        }
        setSignUrl(data.data.embeddedSignSessionUrl);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSignUrl();
  }, []);

  return (
      <main className="min-h-screen bg-white p-8 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <p className="text-gray-500">View and manage booking</p>
            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
              <Link href={"/dashboard"}>Dashboard</Link>
              <ChevronRight size={16} />
              <Link href={"/dashboard"}>Bookings</Link>
              <ChevronRight size={16} />
              <Link href={`/dashboard/bookings/${bookingNumber}`}>
                Booking: {bookingNumber}
              </Link>
              <ChevronRight size={16} />
              <span>Contract</span>
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5cb85c]"></div>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-64 text-red-500">
            <p>{error}</p>
          </div>
        )}
        {signUrl && <iframe className="flex-1" src={signUrl} />}
      </main>
  );
};

export default BookingContractPage;
