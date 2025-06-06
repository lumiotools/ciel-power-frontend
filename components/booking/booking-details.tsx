/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BOOKING_CONTEXT } from "@/providers/booking";
import BookingProgress from "../component/booking-progress";
import EnergyAuditAccordions from "./energy-audit-accordion";

interface AuditorInfo {
  name: string;
  description?: string;
  file_id?: string;
}

export default function BookingDetails() {
  const { bookingDetails } = useContext(BOOKING_CONTEXT);
  const booking = bookingDetails?.bookingDetails;

  const [auditorInfo, setAuditorInfo] = useState<AuditorInfo | null>(null);
  const [loadingAuditor, setLoadingAuditor] = useState(false);

  const auditorNameRaw = booking?.auditor?.name || "";
  const auditorName = auditorNameRaw.replace(/^\d+-/, "") || "Auditor";

  useEffect(() => {
    if (!auditorNameRaw) {
      setAuditorInfo(null);
      return;
    }

    async function fetchAuditorInfo() {
      setLoadingAuditor(true);
      try {
        const res = await fetch(
          `/api/user/auditors/info?name=${encodeURIComponent(auditorNameRaw)}`
        );
        if (!res.ok) {
          setAuditorInfo(null);
          return;
        }
        const data = await res.json();
        setAuditorInfo(data);
      } catch (error) {
        console.error("Failed to fetch auditor info:", error);
        setAuditorInfo(null);
      } finally {
        setLoadingAuditor(false);
      }
    }

    fetchAuditorInfo();
  }, [auditorNameRaw]);

  // Determine image URL: if file_id exists, use the route, else placeholder
  const auditorImageSrc =
    auditorInfo?.file_id && auditorInfo.file_id !== ""
      ? `/api/user/auditors/image?name=${encodeURIComponent(auditorNameRaw)}`
      : "/profileDummy.png";

  // Format date and time helper
  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return { date: "", time: "" };
    const date = new Date(dateTimeString);
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return {
      date: date.toLocaleDateString("en-US", dateOptions),
      time: date.toLocaleTimeString("en-US", timeOptions),
    };
  };

  // Format address helper
  const formatAddress = (address: any) => {
    if (!address) return "";
    const parts = [
      address.line1,
      address.line2,
      address.city,
      address.province,
      address.postalCode,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const { date, time } = formatDateTime(booking?.startTime || "");
  const formattedAddress = formatAddress(booking?.address);

  return (
    <div className="flex h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 bg-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <p className="text-gray-600">View and manage booking</p>

          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Link href="/dashboard" className="hover:text-[#8bc34a]">
              Dashboard
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <Link href="/dashboard" className="hover:text-[#8bc34a]">
              Audit Details
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span>
              {booking?.serviceName || "Professional Home Energy Audit"}
            </span>
            <ChevronRight size={16} className="mx-2" />
            <span>View Details</span>
          </div>
        </div>

        {/* Progress Tracker */}
        <BookingProgress className="mb-8" />

        <div className="flex gap-8">
          {/* Left Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3">
              {date && time ? `${date}, ${time}` : "Date & Time TBD"}
            </h2>
            <h3 className="text-xl font-semibold mb-6">
              {booking?.serviceName || "Ciel Power Home Energy Audit"}
            </h3>

            <p className="text-gray-600 mb-6">
              {formattedAddress || "Address TBD"}
            </p>

            {/* Understanding Your Home Section */}
            <div className="mb-8 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                {/* <Home className="text-[#8bc34a]" size={22} /> */}
                <h3 className="text-black text-lg font-bold">
                  Understanding Your Home
                </h3>
              </div>
              <p className="mb-3">
                Your home does a lot for you — this visit helps us understand
                how it&apos;s working, and how it could be doing even more.
              </p>
              <p className="mb-3">
                During your Ciel Home Energy Audit, we&apos;ll take a closer
                look at how your home uses energy, where it may be working
                harder than it needs to, and what can be done to make it more
                comfortable, efficient, and supportive of your daily life.
              </p>
              <p>
                Below, you&apos;ll find a few simple ways to prepare so that we
                can make the most of our visit.
              </p>
            </div>

            {/* Accordion Sections */}
            <EnergyAuditAccordions />
          </div>

          {/* Right Sidebar */}
          <div className="w-80">
            <div className="rounded-lg p-4 border-2 border-[#e0f0d0]">
              <h3 className="text-lg font-medium text-center mb-3">
                Your Assigned Auditor
              </h3>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden relative">
                  {loadingAuditor ? (
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5cb85c]" />
                    </div>
                  ) : (
                    <Image
                      src={auditorImageSrc}
                      alt={auditorInfo?.name || auditorName}
                      fill
                      className="object-cover"
                      unoptimized={true}
                      priority
                    />
                  )}
                </div>
                <h4 className="font-medium text-lg">{auditorName}</h4>
                <p className="text-center text-sm mt-3">
                  {loadingAuditor
                    ? "Loading..."
                    : auditorInfo?.description
                    ? auditorInfo.description
                    : `${auditorInfo?.name || auditorName} is your assigned auditor`}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 justify-between">
              <button
                className={`font-medium py-2 px-3 rounded-md transition-colors text-sm flex-1 ${
                  booking?.rescheduleAvailable
                    ? "bg-[#a6d66b] hover:bg-[#95c25a] text-white"
                    : "bg-[#a6d66b]/60 text-white pointer-events-none"
                }`}
                disabled={!booking?.rescheduleAvailable}
              >
                Reschedule
              </button>
              <button className="bg-white border border-gray-300 text-gray-600 font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors text-sm flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

