"use client";

import { FileText, Home, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BookingProgress from "../component/booking-progress";
import { useState } from "react";
import PaymentModal from "../payment/modal";

export default function OneLastThing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bookingNumber = "BK-23456"; // You can replace this with your actual booking number variable

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
            <span>One Last Thing</span>
            <ChevronRight size={16} className="mx-2" />
            <span>View Details</span>
          </div>
        </div>

        <BookingProgress />

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
                  You’re almost there — let’s lock in your project.
                </h3>
              </div>
              <p className="mb-3">
                To finalize your upgrade and reserve your installation dates, we
                just need your deposit. This step secures your place on our
                schedule and allows us to begin coordinating materials,
                contractors, and next steps.
                <br />{" "}
                <span className="mt-3 block">
                  Your payment goes directly toward the improvements you’ve
                  selected — upgrades designed to make your home more
                  comfortable, efficient, and valuable.
                </span>
              </p>
              <p className="mb-3"></p>
              You can complete your deposit securely right here in the portal.
              If you have any questions or need help with payment options, your
              Ciel Home Performance Consultant or Krystal, our Customer
              Experience Manager, is happy to assist. <br />
              <p className="mt-3">
                We’re excited to move forward — and grateful to be your partner
                in creating a healthier, high-performing home.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingNumber={bookingNumber}
      />
    </div>
  );
}
