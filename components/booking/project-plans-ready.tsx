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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import BookingProgress from "../component/booking-progress";

export default function ProjectPlansReady() {
  const { bookingDetails } = useContext(BOOKING_CONTEXT);

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
            <span>Your Project Plans Are Ready</span>
            <ChevronRight size={16} className="mx-2" />
            <span>View Details</span>
          </div>
        </div>

        {/* Progress Tracker - Using BookingProgress component */}
        <BookingProgress className="mb-8" />

        <div className="flex gap-8">
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

            {/* Understanding Your Home Section */}
            <div className="mb-8 text-gray-600 bg-[#f9fcf6] p-6 rounded-lg border border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <Home className="text-[#8bc34a]" size={22} />
                <h3 className="text-[#8bc34a] text-lg font-medium">
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
            <div className="mt-8 space-y-4">
              {/* Section 1: What You&apos;ll Gain from Your Audit */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6]">
                <div className="w-full p-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <FileText className="text-[#8bc34a]" size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        What You&apos;ll Gain from Your Audit
                      </h3>
                      <p className="text-gray-600">
                        Comfort, savings, and peace of mind — your audit is the
                        first step toward a better home.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#8bc34a] flex-shrink-0" />
                </div>
              </div>

              {/* Section 2: What Happens During the Audit */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6]">
                <div className="w-full p-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <div className="text-[#8bc34a]">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 18C17 16.3431 14.7614 15 12 15C9.23858 15 7 16.3431 7 18"
                            stroke="#8bc34a"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="10"
                            cy="10"
                            r="2"
                            stroke="#8bc34a"
                            strokeWidth="2"
                          />
                          <circle
                            cx="14"
                            cy="10"
                            r="2"
                            stroke="#8bc34a"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        What Happens During the Audit
                      </h3>
                      <p className="text-gray-600">
                        We&apos;re here to help, not to disrupt — here&apos;s
                        how we&apos;ll move through your home and what
                        we&apos;ll be looking for.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#8bc34a] flex-shrink-0" />
                </div>
              </div>

              {/* Section 3: How To Prepare */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6]">
                <div className="w-full p-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <FileText className="text-[#8bc34a]" size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        How To Prepare
                      </h3>
                      <p className="text-gray-600">
                        We&apos;ll come prepared — this is simply to keep you in
                        the loop and avoid surprises.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#8bc34a] flex-shrink-0" />
                </div>
              </div>

              {/* Section 4: Frequently Asked Questions(FAQ) */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6]">
                <div className="w-full p-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <div className="text-[#8bc34a] text-xl font-bold">?</div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        Frequently Asked Questions(FAQ)
                      </h3>
                      <p className="text-gray-600">
                        Have questions? You&apos;re not alone — here are answers
                        to the things most homeowners want to know.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-[#8bc34a] flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80">
            <div className="bg-[#f5f9ed] rounded-lg p-6">
              <h3 className="text-lg font-medium text-center mb-6">
                Your Assigned Auditor
              </h3>

              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
                  <Image
                    src="/profileDummy.png"
                    alt={
                      bookingDetails?.bookingDetails?.auditor?.name ||
                      "Mark Johnson"
                    }
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium text-lg">
                  {bookingDetails?.bookingDetails?.auditor?.name ||
                    "Mark Johnson"}
                </h4>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden flex gap-3 mt-4 justify-between">
              <button className="bg-[#a6d66b] hover:bg-[#95c25a] text-white font-medium py-2 px-3 rounded-md transition-colors text-sm flex-1">
                Review Proposals
              </button>
              <button className="bg-white border border-gray-300 text-gray-600 font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors text-sm flex-1">
                Contact Us
              </button>
            </div>

            {/* Display proposal information if available */}
            {bookingDetails?.proposalDetails &&
              bookingDetails.proposalDetails.count > 0 && (
                <div className="mt-4 bg-[#f5f9ed] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-center mb-4">
                    Your Project Proposals
                  </h3>
                  <p className="text-center text-gray-700 mb-4">
                    {bookingDetails.proposalDetails.count}{" "}
                    {bookingDetails.proposalDetails.count === 1
                      ? "proposal"
                      : "proposals"}{" "}
                    available
                  </p>
                  {bookingDetails.proposalDetails.completedContractLink && (
                    <Link
                      href="/document-portal#review-plans"
                      className="bg-[#a6d66b] hover:bg-[#95c25a] text-white font-medium py-2 px-3 rounded-md transition-colors text-sm flex-1 block text-center"
                    >
                      Review Proposals
                    </Link>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
