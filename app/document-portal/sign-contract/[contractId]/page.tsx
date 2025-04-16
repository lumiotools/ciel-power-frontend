"use client";

import { Sidebar } from "@/components/common/sidebar";
import { AUTH_CONTEXT } from "@/providers/auth";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const BookingContractPage = () => {
  const params = useParams<{ contractId: string }>();
  const { userDetails } = useContext(AUTH_CONTEXT);
  const bookingNumber = userDetails?.bookingNumber;
  const contractId = params.contractId;

  const [signUrl, setSignUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleAcceptContract = async () => {
    let loading = toast.loading("Updating contract status...");
    try {
      const response = await fetch(
        `/api/user/bookings/${bookingNumber}/contract/${contractId}/accept`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.detail || "Failed to accept contract");
      }
      toast.dismiss(loading);
      toast.success("Contract accepted successfully");
      router.replace(`/document-portal`);
    } catch (error) {
      toast.dismiss(loading);
      toast.error((error as Error).message || "Failed to accept contract");
    }
  };

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
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 bg-white flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Sign Proposal</h1>
              <p className="text-gray-500">All signed documents are stored securely and can be downloaded anytime.</p>
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                <Link href={"/document-portal"}>Document Portal</Link>
                <ChevronRight size={16} />
                <span>Sign Proposal</span>
              </div>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          {error && (
            <div className="flex justify-center items-center h-64 text-red-500">
              <p>{error}</p>
            </div>
          )}
          {signUrl && <iframe className="flex-1" src={signUrl} />}
        </main>
    </div>
  );
};

export default BookingContractPage;
