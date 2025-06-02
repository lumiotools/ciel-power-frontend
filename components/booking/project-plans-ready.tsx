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
            <h3 className="text-xl font-semibold mb-6 mt-6">
              Ciel Power Home Energy Audit
            </h3>

            {/* Understanding Your Home Section */}
            <div className="mb-8 text-gray-600 p-6 rounded-lg border border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <Home className="text-[#8bc34a]" size={22} />
                <h3 className="text-black text-lg font-bold">
                  Let’s bring your home upgrade to life.
                </h3>
              </div>
              <p className="mb-3">
                Your personalized proposal is now available for review. It
                outlines the full scope of work based on your audit results —
                including the recommended improvements, estimated energy
                savings, utility incentives, and financing options.
              </p>
              <p className="mb-3"></p>
              Take a moment to look everything over, and if everything looks
              good, you can sign your agreement electronically right here in the
              portal. <br />
              <p className="mt-3">
                Your Ciel Home Performance Consultant is standing by if you have
                any questions or want to talk through the details. Once signed,
                we’ll begin preparing for installation and keep you informed
                every step of the way.
              </p>
            </div>
          </div>
          <div className="w-80">
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
