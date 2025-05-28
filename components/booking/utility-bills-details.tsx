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
import NeedHelpSection from "./need-help-section";

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
            <h2 className="text-2xl font-bold mb-3">
              Upload Your Utility Bills
            </h2>
            <h3 className="text-xl font-semibold mb-6">
              Help us help you — we need a picture of your home’s energy use
              over the past year.
            </h3>

            <p className="text-black mb-6">
              To accurately model your home and qualify you for
              utility-sponsored incentives, we’ll need{" "}
              <b>12 months of usage data </b>
              for each <b>fuel type</b> your home uses — electric, gas, oil,
              propane, or other.
            </p>
          </div>
        </div>
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
            {/* Main Content Section */}
            <div className="mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-black text-lg font-bold">What to Upload</h3>
              </div>
              <p className="mb-3 font-bold">
                🔌 If your home uses metered services (like electric or natural
                gas):
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-5">
                <li>
                  <b>Upload your most recent bill</b> — if it includes a
                  <b> 12-month usage summary</b> (like a chart from PSE&G),
                  that’s all we need.
                </li>
                <li>
                  If your bill doesn’t include 12 months of data, please upload
                  <b> individual copies of your last 12 monthly bills.</b>
                </li>
              </ul>
              <p className="mb-3 font-bold">
                If your home uses delivered fuels (like oil or propane):
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-5">
                <li>
                  Contact your fuel provider and ask for a{" "}
                  <b>12-month delivery history.</b>
                </li>
                <li>If they provide a summary or chart, upload that.</li>
                <li>
                  Otherwise, send copies of{" "}
                  <b>the individual delivery records </b>
                  covering the past year.
                </li>
              </ul>
            </div>
            <div className="mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-black text-lg font-bold">
                  Important Guidelines
                </h3>
              </div>
              <ul className="list-disc pl-6 mb-4 space-y-5">
                <li>
                  <b>Please do not redact or alter your utility bills.</b> We
                  understand the concern — but in order to submit your project
                  to the utility company for rebates or financing, your bills
                  must include:
                  <ul className="list-inside list-disc pl-6 mt-4 space-y-5">
                    <li>Your name</li>
                    <li>Service address</li>
                    <li>Account number</li>
                    <li>Usage history</li>
                  </ul>
                </li>
                <li>
                  Uploading screenshots, spreadsheets, or summaries you’ve
                  created yourself <b>may delay or disqualify</b> your
                  application for incentives.
                </li>
                <li>
                  We <b>will never use your account information</b> to switch
                  your energy provider or make changes to your service.
                </li>
              </ul>
              <p className="mb-3">
                Your documents are stored securely, used only to support your
                participation in the incentive programs, and are never shared
                for marketing or sales purposes.
              </p>
            </div>
            <div className="mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-black text-lg font-bold">How to Upload</h3>
              </div>
              <p className="mb-3">
                Use the <b>Document Portal</b> in your Ciel Customer Portal to
                upload your files. PDF format is preferred, but we also accept
                high-quality photos or screenshots.
              </p>
              <Link href="/document-portal#upload-utility-bills">
                <button className="mb-3 bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors">
                  <FileText size={18} />
                  Go to Your Bills
                </button>
              </Link>
              
            </div>
            <div className="mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
              <NeedHelpSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
