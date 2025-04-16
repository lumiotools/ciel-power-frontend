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
import { useState } from "react";

export default function LiningEverythingUp() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#a6d66b] flex flex-col">
        <div className="p-6">
          <div className="flex items-center">
            <Image
              src="/ciel-power-logo.png"
              alt="Ciel Power Logo"
              width={130}
              height={50}
              className="mt-2"
            />
          </div>
        </div>

        {/* Sidebar buttons */}
        <div className="flex-1 flex flex-col gap-4 px-4 mt-4">
          <Link href="/dashboard">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </button>
          </Link>

          <Link href="/report">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <FileText size={20} />
              <span className="font-medium">Your Report</span>
            </button>
          </Link>

          <Link href="/pearl-certification">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <Award size={20} />
              <span className="font-medium">Pearl Certification</span>
            </button>
          </Link>

          <Link href="/incentives">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <DollarSign size={20} />
              <span className="font-medium">Incentives</span>
            </button>
          </Link>

          <Link href="/tax-credits">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <Percent size={20} />
              <span className="font-medium">Tax Credits</span>
            </button>
          </Link>

          <Link href="/document-portal">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <FileCheck size={20} />
              <span className="font-medium">Document Portal</span>
            </button>
          </Link>

          <Link href="/knowledge-base">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <Zap size={20} />
              <span className="font-medium">Knowledge Base</span>
            </button>
          </Link>

          <Link href="/about-us">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <Home size={20} />
              <span className="font-medium">About Us</span>
            </button>
          </Link>

          <Link href="/affiliate-program">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <Leaf size={20} />
              <span className="font-medium">Affiliate Program</span>
            </button>
          </Link>
        </div>

        <div className="p-6 mt-auto">
          <button className="flex items-center gap-2 text-white">
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>

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
        <div className="flex justify-between items-center mb-8 relative">
          {/* Line connecting all steps */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#8bc34a] -z-10 transform -translate-y-1/2"></div>

          {/* Step 1 - Booking Created */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#8bc34a] mb-2 z-10 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xs text-center">Booking Created</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#8bc34a] mb-2 z-10 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xs text-center">Utility Bills Uploaded</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#8bc34a] mb-2 z-10 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xs text-center">Audit Performed</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#8bc34a] mb-2 z-10 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xs text-center">Follow Up Scheduled</span>
          </div>

          {/* Step 5 - Current */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#8bc34a] mb-2 z-10 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xs text-center">Report Generated</span>
          </div>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3">
              We&apos;re Lining Everything Up
            </h2>
            <h3 className="text-xl font-semibold mb-6">
              Your project is officially in motion — and your future home is
              already on the way.
            </h3>

            <div className="mb-6">
              <h4 className="font-medium mb-1">Michael Eisner</h4>
              <p className="text-gray-600">8455968349</p>
            </div>

            {/* Main Content Section */}
            <div className="mb-8 text-gray-600 bg-[#f9fcf6] p-6 rounded-lg border border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <Home className="text-[#8bc34a]" size={22} />
                <h3 className="text-[#8bc34a] text-lg font-medium">
                  Congratulations!
                </h3>
              </div>
              <p className="mb-3">
                You&apos;ve taken a meaningful step toward a home that&apos;s
                more comfortable, more efficient, and more aligned with the way
                you want to live.
              </p>
              <p className="mb-3">
                Right now, we&apos;re coordinating the next steps behind the
                scenes. That may include approvals, scheduling, materials, or
                utility paperwork — but you don&apos;t need to worry about any
                of that. We&apos;ve got it covered.
              </p>
            </div>

            {/* Accordion Sections */}
            <div className="mt-8 space-y-4">
              {/* Section 1: What&apos;s Ahead */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6]">
                <div
                  className="w-full p-4 flex items-start justify-between cursor-pointer"
                  onClick={() => toggleSection("section1")}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <FileText className="text-[#8bc34a]" size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        What&apos;s Ahead
                      </h3>
                      <p className="text-gray-600">
                        While we get everything ready, here&apos;s a reminder of
                        what your upgraded, high-performance home will offer.
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`text-[#8bc34a] flex-shrink-0 transition-transform ${
                      openSection === "section1" ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {openSection === "section1" && (
                  <div className="px-4 pb-4 ml-12">
                    <ul className="list-none space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-[#8bc34a]">●</div>
                        <span>
                          Even, steady temperatures — fewer hot spots in summer
                          and cold corners in winter
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-[#8bc34a]">●</div>
                        <span>
                          Quieter rooms and cleaner air — for healthier living
                          and more peaceful rest
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-[#8bc34a]">●</div>
                        <span>
                          Lower energy bills — and a lighter footprint on the
                          planet
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-[#8bc34a]">●</div>
                        <span>
                          Comfort that&apos;s not just felt — but sustained,
                          season after season
                        </span>
                      </li>
                    </ul>
                    <p className="mt-4">
                      This is the start of your Functional Home — a space that
                      actively supports your well-being.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 2: What You Can Expect from Us */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6]">
                <div
                  className="w-full p-4 flex items-start justify-between cursor-pointer"
                  onClick={() => toggleSection("section2")}
                >
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
                        What You Can Expect from Us
                      </h3>
                      <p className="text-gray-600">
                        Over the coming days, we&apos;ll be working behind the
                        scenes to prepare for your installation.
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`text-[#8bc34a] flex-shrink-0 transition-transform ${
                      openSection === "section2" ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {openSection === "section2" && (
                  <div className="px-4 pb-4 ml-12">
                    <ul className="list-none space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-[#8bc34a]">●</div>
                        <span>
                          Coordinate behind-the-scenes logistics to prepare for
                          installation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-[#8bc34a]">●</div>
                        <span>Reach out if anything is needed from you</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-[#8bc34a]">●</div>
                        <span>
                          Keep you updated through your portal and directly via
                          your Ciel team
                        </span>
                      </li>
                    </ul>
                    <p className="mt-4">
                      No need to check in — we&apos;ll keep you informed as we
                      move toward your installation day.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 3: In the Meantime... */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6]">
                <div
                  className="w-full p-4 flex items-start justify-between cursor-pointer"
                  onClick={() => toggleSection("section3")}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <FileText className="text-[#8bc34a]" size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        In the Meantime...
                      </h3>
                      <p className="text-gray-600">
                        We invite you to explore the benefits of your upgrades,
                        review your project plan, or revisit your energy audit
                        insights.
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`text-[#8bc34a] flex-shrink-0 transition-transform ${
                      openSection === "section3" ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {openSection === "section3" && (
                  <div className="px-4 pb-4 ml-12">
                    <p className="text-gray-700">
                      We invite you to explore the benefits of your upgrades,
                      review your project plan, or revisit your energy audit
                      insights anytime through your portal. Every detail is
                      there when you need it.
                    </p>
                    <p className="text-gray-700 mt-3">
                      This is your space. Your timeline. Your journey.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 4: Thank You for Trusting Us */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6]">
                <div
                  className="w-full p-4 flex items-start justify-between cursor-pointer"
                  onClick={() => toggleSection("section4")}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <div className="text-[#8bc34a] text-xl font-bold">❤</div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        Thank You for Trusting Us
                      </h3>
                      <p className="text-gray-600">
                        We&apos;re honored to be part of this transformation
                        with you.
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`text-[#8bc34a] flex-shrink-0 transition-transform ${
                      openSection === "section4" ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {openSection === "section4" && (
                  <div className="px-4 pb-4 ml-12">
                    <p className="text-gray-700">
                      We&apos;re honored to be part of this transformation with
                      you. From here forward, our goal is simple: to deliver a
                      home that feels better, functions better, and supports
                      your life in every season.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
