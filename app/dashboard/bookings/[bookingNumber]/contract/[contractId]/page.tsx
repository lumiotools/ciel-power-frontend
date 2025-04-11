"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const BookingContractPage = () => {
  const params = useParams<{ bookingNumber: string; contractId: string }>();
  const bookingNumber = params.bookingNumber;
  const contractId = params.contractId;

  const [signUrl, setSignUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleAcceptContract = async () => {
    let loading = toast.loading("Updating contract status...");
    try {
      const response = await fetch(`/api/user/bookings/${bookingNumber}/contract/${contractId}/accept`, {
        method: "POST",
      })
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.detail || "Failed to accept contract");
      }
      toast.dismiss(loading);
      toast.success("Contract accepted successfully");
      router.replace(`/dashboard/bookings/${bookingNumber}`);
    } catch (error) {
      toast.dismiss(loading);
      toast.error((error as Error).message || "Failed to accept contract");
    }
  }

  const sessionStatus = (event: MessageEvent<any>) => {
    const type = event.data && event.data.type;
    const payload = event.data && event.data.payload;

    switch (type) {
      case "session_view.document.loaded":
        console.log("Session view is loaded");
        break;
      case "session_view.document.completed":
        handleAcceptContract();
        break;
      case "session_view.document.exception":
        console.log("Exception during document finalization");
        break;
    }
  };

  useEffect(() => {
    const fetchSignUrl = async () => {
      try {
        const response = await fetch(
          `/api/user/bookings/${bookingNumber}/contract/${contractId}`
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

    window.addEventListener("message", sessionStatus);

    return () => {
      window.removeEventListener("message", sessionStatus);
    };
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
