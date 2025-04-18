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
import EnergyAuditAccordions from "./energy-audit-accordion";

export default function BookingDetails() {
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
            <span>
              {bookingDetails?.bookingDetails?.serviceName ||
                "Professional Home Energy Audit"}
            </span>
            <ChevronRight size={16} className="mx-2" />
            <span>View Details</span>
          </div>
        </div>

        {/* Progress Tracker - Now using BookingProgress component */}
        <BookingProgress className="mb-8" />

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3">May 6, 9:00 AM</h2>
            <h3 className="text-xl font-semibold mb-6">
              Ciel Power Home Energy Audit
            </h3>

            <p className="text-gray-600 mb-6">
              532 lafayette road, harrington park, New Jersey 07640
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
            <EnergyAuditAccordions />
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
                    alt="Mark Johnson"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium text-lg">Mark Johnson</h4>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 justify-between">
              <button className="bg-[#a6d66b] hover:bg-[#95c25a] text-white font-medium py-2 px-3 rounded-md transition-colors text-sm flex-1">
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
