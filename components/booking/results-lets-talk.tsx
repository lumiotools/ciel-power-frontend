/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { BOOKING_CONTEXT } from "@/providers/booking";
import {
  LogOut,
  FileText,
  Award,
  LayoutDashboard,
  Home,
  ChevronRight,
  Percent,
  FileCheck,
  Zap,
  DollarSign,
  Leaf,
  Calendar,
  Upload,
  PiggyBank,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";
import BookingProgress from "../component/booking-progress";

export default function ResultsLetsTalk() {
  const { bookingDetails } = useContext(BOOKING_CONTEXT);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

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
            <span>Your Results Are In — Let&apos;s Talk</span>
            <ChevronRight size={16} className="mx-2" />
            <span>View Details</span>
          </div>
        </div>

        {/* Progress Tracker - Using BookingProgress component */}
        <BookingProgress className="mb-8" />

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3">
              {bookingDetails?.bookingDetails?.startTime
                ? new Date(
                    bookingDetails.bookingDetails.startTime
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  }) +
                  ", " +
                  new Date(
                    bookingDetails.bookingDetails.startTime
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })
                : "May 6, 9:00 AM"}
            </h2>
            <h3 className="text-xl font-semibold mb-6">
              {bookingDetails?.bookingDetails?.serviceName ||
                "Ciel Power Home Energy Audit"}
            </h3>

            <p className="text-gray-600 mb-6">
              {bookingDetails?.bookingDetails?.address
                ? `${bookingDetails.bookingDetails.address.line1}, ${bookingDetails.bookingDetails.address.city}, ${bookingDetails.bookingDetails.address.province} ${bookingDetails.bookingDetails.address.postalCode}`
                : "532 lafayette road, harrington park, New Jersey 07640"}
            </p>

            <div className="mb-6">
              <h4 className="font-medium mb-1">Michael Eisner</h4>
              <p className="text-gray-600">8455968349</p>
            </div>

            {/* Reviewing Your Results Section */}
            <div className="mb-8 text-gray-600 bg-[#f9fcf6] p-6 rounded-lg border border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <Home className="text-[#8bc34a]" size={22} />
                <h3 className="text-[#8bc34a] text-lg font-medium">
                  Reviewing Your Results
                </h3>
              </div>
              <p className="mb-3">
                We&apos;ve completed your Home Energy Audit and collected the
                information needed to understand how your home is performing.
                Right now, we&apos;re carefully reviewing the results to build
                your personalized energy profile — a detailed look at how your
                home uses energy and where you might benefit from targeted
                improvements.
              </p>
            </div>

            {/* Accordion Sections */}
            <div className="mt-8 space-y-4">
              {/* Section 1: Schedule Your Follow-Up Consultation */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6] overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                        <Calendar className="text-[#8bc34a]" size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-[#8bc34a] text-lg font-medium">
                          Schedule Your Follow-Up Consultation
                        </h3>
                        <p className="text-gray-600">
                          Now it&apos;s time for the next step: meeting with
                          your Ciel Home Performance Consultant.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-[#a6d66b] hover:bg-[#95c25a] text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
                        onClick={() => {}}
                        disabled={
                          bookingDetails?.consultationDetails?.startTime !==
                          undefined
                        }
                      >
                        <Calendar className="text-white" size={18} />
                        <span>
                          {bookingDetails?.consultationDetails?.startTime
                            ? "Already Booked"
                            : "Book Consultation"}
                        </span>
                      </button>
                      <button onClick={() => toggleSection("consultation")}>
                        <ChevronRight
                          className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "consultation" ? "rotate-90" : ""}`}
                        />
                      </button>
                    </div>
                  </div>

                  {openSection === "consultation" && (
                    <div className="ml-12 text-gray-700">
                      <p className="mb-3">
                        During this consultation, you&apos;ll walk through your
                        audit results together, explore what they mean for your
                        home, and discuss upgrade options that align with your
                        comfort, health, and savings goals.
                      </p>
                      <p className="mb-3">Your consultant will help you:</p>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>
                          Understand how your home is currently performing
                        </li>
                        <li>
                          Learn about incentives and financing programs you may
                          qualify for
                        </li>
                        <li>
                          Prioritize improvements based on what matters most to
                          you
                        </li>
                        <li>Ask questions and move forward at your own pace</li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-3">
                        Choose a date and time that works for you.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Upload Your Utility Information */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6] overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                        <Upload className="text-[#8bc34a]" size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-[#8bc34a] text-lg font-medium">
                          Upload Your Utility Information
                        </h3>
                        <p className="text-gray-600">
                          {bookingDetails?.utilityBillDetails &&
                          bookingDetails.utilityBillDetails.count > 0
                            ? `You've uploaded ${bookingDetails.utilityBillDetails.count} utility bill${bookingDetails.utilityBillDetails.count > 1 ? "s" : ""}.`
                            : "If you haven't already, please upload your most recent utility bill."}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-[#a6d66b] hover:bg-[#95c25a] text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
                        onClick={() => {}}
                      >
                        <FileText className="text-white" size={18} />
                        <span>Go to Your Bills</span>
                      </button>
                      <button onClick={() => toggleSection("utility")}>
                        <ChevronRight
                          className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "utility" ? "rotate-90" : ""}`}
                        />
                      </button>
                    </div>
                  </div>

                  {openSection === "utility" && (
                    <div className="ml-12 text-gray-700">
                      <p className="mb-4">
                        This helps us finish your energy modeling with accuracy
                        — and ensures you get the full benefit of available
                        incentives.
                      </p>
                      <p className="text-sm text-gray-600">
                        It only takes a minute and helps us make the most of
                        your audit.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: Unlock Your Incentives and Savings */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6] overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                        <PiggyBank className="text-[#8bc34a]" size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-[#8bc34a] text-lg font-medium">
                          Unlock Your Incentives and Savings
                        </h3>
                        <p className="text-gray-600">
                          Your Home Energy Audit opens the door to valuable
                          programs that can make upgrading your home more
                          affordable.
                        </p>
                      </div>
                    </div>
                    <button onClick={() => toggleSection("incentives")}>
                      <ChevronRight
                        className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "incentives" ? "rotate-90" : ""}`}
                      />
                    </button>
                  </div>

                  {openSection === "incentives" && (
                    <div className="ml-12 mt-3 text-gray-700">
                      <ul className="list-disc pl-5 mb-4 space-y-2">
                        <li>
                          Up to $6,000 in cash-back incentives through New
                          Jersey&apos;s Clean Energy Program
                        </li>
                        <li>
                          Up to $25,000 in 0% financing for up to 10 years
                        </li>
                        <li>
                          Federal tax credits covering up to 30% of eligible
                          upgrade costs
                        </li>
                      </ul>
                      <p>
                        We&apos;ll help you understand which benefits apply to
                        your home — and how to take full advantage of them.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 4: What Happens Next */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6] overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                        <ArrowRight className="text-[#8bc34a]" size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-[#8bc34a] text-lg font-medium">
                          What Happens Next
                        </h3>
                        <p className="text-gray-600">
                          Once you&apos;ve scheduled your consultation,
                          here&apos;s what to expect.
                        </p>
                      </div>
                    </div>
                    <button onClick={() => toggleSection("next")}>
                      <ChevronRight
                        className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "next" ? "rotate-90" : ""}`}
                      />
                    </button>
                  </div>

                  {openSection === "next" && (
                    <div className="ml-12 mt-3 text-gray-700">
                      <ul className="list-disc pl-5 mb-4 space-y-2">
                        <li>
                          You&apos;ll receive a calendar invite with all the
                          details
                        </li>
                        <li>
                          Your consultant will come prepared with your
                          personalized audit results
                        </li>
                        <li>
                          You&apos;ll review your options together and decide
                          what&apos;s next — no pressure, just guidance
                        </li>
                      </ul>
                      <p>
                        If you have any questions ahead of your meeting,
                        don&apos;t hesitate to reach out. We&apos;re here to
                        support you every step of the way.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
