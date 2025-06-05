"use client";

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
import React from "react";
import { useState } from "react";
import BookingProgress from "../component/booking-progress";

export default function LiningEverythingUp() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
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
            <span>We&apos;re Lining Everything Up</span>
            <ChevronRight size={16} className="mx-2" />
            <span>View Details</span>
          </div>
        </div>

        {/* Progress Tracker */}
        <BookingProgress className="mb-8" />

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3">
              We&apos;re Lining Everything Up
            </h2>
            <h3 className="text-xl font-semibold mb-6">
              We’re thrilled to be moving forward with your energy efficiency
              upgrades. Right now, we’re finalizing approvals, coordinating
              materials, and preparing to schedule your installation. You’re in
              great hands.
            </h3>

            {/* Main Content Section */}
            <div className="mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-black text-lg font-bold">
                  What’s Happening Now
                </h3>
              </div>
              <p className="mb-3">
                Your Ciel Home Performance Consultant and Krystal, our Customer
                Experience Manager, will be working closely with you in the
                coming days to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-5">
                <li>Confirm your installation timeline</li>
                <li>
                  Answer questions and review what to expect during your project
                </li>
                <li>Coordinate with you to ensure everything goes smoothly</li>
                <li>
                  Handle all required paperwork, permits, and utility approvals
                  behind the scenes
                </li>
              </ul>
              <p className="mb-3">
                We’ll stay in touch every step of the way — and we’ll always let
                you know what’s coming next.
              </p>
            </div>
            <div className="mb-8 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-black text-lg font-bold">
                  What to Expect During Installation
                </h3>
              </div>
              <p className="mb-3">
                Once scheduled, your installation will be handled by a team of
                skilled professionals who specialize in energy-efficient
                improvements. We’ll work efficiently, protect your space, and
                treat your home with care and respect. Most projects are
                completed in just a few days, depending on the scope.
              </p>
              <p className="mb-3">
                Before the work begins, we’ll give you a clear schedule and let
                you know what to expect — no surprises.
              </p>
            </div>
            {/* <div className="mb-8 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-black text-lg font-bold">
                  Your Upgrades, Certified
                </h3>
              </div>
              <p className="mb-3">
                When your project is complete, you’ll receive documentation of
                your improvements through <b>Pearl Certification</b> — a
                nationally recognized third-party program that validates the
                added value and performance of your home upgrades. This
                certification helps your improvements stand out if you ever sell
                or refinance, and serves as a lasting record of your investment
                in efficiency and comfort.
              </p>
              <p className="mb-3">
                We’re proud to be your partner on this journey. If you have any
                questions in the meantime, your consultant and Krystal are just
                a call or message away. We're excited for what’s ahead.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
