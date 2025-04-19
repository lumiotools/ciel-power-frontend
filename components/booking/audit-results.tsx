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
  Clock,
  HelpCircle,
  Lightbulb,
  ClipboardList,
  Heart,
  Compass,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";
import BookingProgress from "../component/booking-progress";

export default function AuditResults() {
  const { bookingDetails } = useContext(BOOKING_CONTEXT);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  const openRescheduleModal = (bookingId: string) => {
    console.log(`Opening reschedule modal for booking ID: ${bookingId}`);
    setRescheduleModalOpen(true);
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
            <span>Your Audit Results</span>
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
              Your Audit Results Are In
            </h2>
            <h3 className="text-xl font-semibold mb-6">
              Let&apos;s turn insights into impact
            </h3>

            <div className="mb-6">
              <h4 className="font-medium mb-1">Michael Eisner</h4>
              <p className="text-gray-600">8455968349</p>
            </div>

            {/* First Container */}
            <div className="mb-4 text-gray-600 bg-[#f9fcf6] p-6 rounded-lg border border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="text-[#8bc34a]" size={22} />
                <h3 className="text-[#8bc34a] text-lg font-medium">
                  Your Home&apos;s Potential
                </h3>
              </div>
              <p className="mb-4">
                You&apos;ve taken the first step toward a more efficient,
                comfortable, and resilient home. Now it&apos;s time to see what
                your home is truly capable of.
              </p>
              <p className="mb-0">
                Your Ciel Home Performance Consultant is ready to walk you
                through a personalized project plan — a carefully considered set
                of upgrades designed not just to save energy, but to improve how
                your home feels, functions, and supports your well-being.
              </p>
            </div>

            {/* Second Container */}
            <div className="mb-8 text-gray-600 bg-[#f9fcf6] p-6 rounded-lg border border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList className="text-[#8bc34a]" size={22} />
                <h3 className="text-[#8bc34a] text-lg font-medium">
                  What You&apos;ll Discover in Your Project Plan
                </h3>
              </div>
              <p className="mb-3">
                This isn&apos;t a one-size-fits-all checklist — it&apos;s a
                customized roadmap for transforming your home into a space that
                works for you.
              </p>
              <p className="mb-2">Here&apos;s what&apos;s inside:</p>
              <ul className="list-none mb-4 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-[#8bc34a]">●</div>
                  <span>
                    A clear picture of how your home is performing today
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-[#8bc34a]">●</div>
                  <span>
                    Tailored recommendations to improve comfort, efficiency, and
                    air quality
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-[#8bc34a]">●</div>
                  <span>
                    Prioritized steps to reduce energy waste and enhance
                    everyday livability
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-[#8bc34a]">●</div>
                  <span>
                    Your eligibility for rebates, 0% financing, and federal tax
                    credits
                  </span>
                </li>
              </ul>
              <p className="mb-0">
                Each suggestion is grounded in building science — and shaped by
                your goals.
              </p>
            </div>

            {/* Accordion Sections */}
            <div className="mt-8 space-y-4">
              {/* Section 1: Why This Matters */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6] overflow-hidden">
                <button
                  className="w-full p-4 flex items-start justify-between"
                  onClick={() => toggleSection("matters")}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <Heart className="text-[#8bc34a]" size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        Why This Matters
                      </h3>
                      <p className="text-gray-600">
                        Your home is more than a structure. It&apos;s where you
                        rest, recharge, and care for the people you love.
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "matters" ? "rotate-90" : ""}`}
                  />
                </button>

                {openSection === "matters" && (
                  <div className="px-4 pb-4">
                    <div className="ml-12 text-gray-700">
                      <p className="mb-3">Upgrading your home can mean:</p>
                      <ul className="list-none mb-4 space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 text-[#8bc34a]">●</div>
                          <span>More consistent temperatures, year-round</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 text-[#8bc34a]">●</div>
                          <span>Quieter rooms and fewer drafts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 text-[#8bc34a]">●</div>
                          <span>
                            Cleaner indoor air, with fewer allergens and
                            pollutants
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 text-[#8bc34a]">●</div>
                          <span>Lower monthly energy bills</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 text-[#8bc34a]">●</div>
                          <span>A lighter environmental footprint</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 text-[#8bc34a]">●</div>
                          <span>
                            A certified, high-performing home you can feel proud
                            of
                          </span>
                        </li>
                      </ul>
                      <p>
                        This is what we mean by a Functional Home — one that
                        supports your health, your comfort, and your future.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: You&apos;re in the Driver&apos;s Seat */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6] overflow-hidden">
                <button
                  className="w-full p-4 flex items-start justify-between"
                  onClick={() => toggleSection("drivers-seat")}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <Compass className="text-[#8bc34a]" size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        You&apos;re in the Driver&apos;s Seat
                      </h3>
                      <p className="text-gray-600">
                        There&apos;s no pressure, no hard sell. This is a
                        collaborative conversation.
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "drivers-seat" ? "rotate-90" : ""}`}
                  />
                </button>

                {openSection === "drivers-seat" && (
                  <div className="px-4 pb-4">
                    <div className="ml-12 text-gray-700">
                      <p className="mb-4">
                        This is a collaborative conversation — your consultant
                        is here to guide, clarify, and help you make decisions
                        that feel right for your home and your budget.
                      </p>
                      <p>
                        When you&apos;re ready to move forward, we&apos;ll be
                        right here to make it easy.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Ready to Take the Next Step? */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6] overflow-hidden">
                <button
                  className="w-full p-4 flex items-start justify-between"
                  onClick={() => toggleSection("next-step")}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <ArrowRight className="text-[#8bc34a]" size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        Ready to Take the Next Step?
                      </h3>
                      <p className="text-gray-600">
                        When you say &quot;go,&quot; we&apos;ll help you move
                        forward with your project.
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "next-step" ? "rotate-90" : ""}`}
                  />
                </button>

                {openSection === "next-step" && (
                  <div className="px-4 pb-4">
                    <div className="ml-12 text-gray-700">
                      <p className="mb-3">
                        When you say &quot;go,&quot; we&apos;ll:
                      </p>
                      <ul className="list-none mb-4 space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 text-[#8bc34a]">●</div>
                          <span>
                            Finalize your project details and participation
                            paperwork
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 text-[#8bc34a]">●</div>
                          <span>
                            Line up your financing and rebate documentation
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 text-[#8bc34a]">●</div>
                          <span>Prepare to schedule your installation</span>
                        </li>
                      </ul>
                      <p>
                        Whether you&apos;re ready now or just gathering
                        information, this space is always here when you are.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 4: Have Questions? */}
              <div className="border border-[#e0f0d0] rounded-lg bg-[#f9fcf6] overflow-hidden">
                <button
                  className="w-full p-4 flex items-start justify-between"
                  onClick={() => toggleSection("questions")}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                      <HelpCircle className="text-[#8bc34a]" size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#8bc34a] text-lg font-medium">
                        Have Questions?
                      </h3>
                      <p className="text-gray-600">
                        Curious about what&apos;s possible? We&apos;re here to
                        help.
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "questions" ? "rotate-90" : ""}`}
                  />
                </button>

                {openSection === "questions" && (
                  <div className="px-4 pb-4">
                    <div className="ml-12 text-gray-700">
                      <p className="mb-4">
                        Your Ciel team is just a click away — and ready to help
                        you create a more comfortable, healthier, and smarter
                        home.
                      </p>
                      <button className="bg-[#a6d66b] hover:bg-[#95c25a] text-white font-medium py-2 px-4 rounded-md transition-colors mb-3">
                        Contact Us
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Assigned Consultant */}
          <div className="w-80">
            <div className="bg-[#f5f9ed] rounded-lg p-6">
              <h3 className="text-lg font-medium text-center mb-6">
                Assigned Consultant
              </h3>

              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
                  <Image
                    src="/mark-johnson.png"
                    alt="Robert Bale"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium text-lg mb-4">Robert Bale</h4>

                <p className="text-gray-700 text-center mb-4 flex items-center justify-center gap-2">
                  <Calendar size={16} className="text-[#8bc34a]" />
                  <span className="font-medium">
                    {bookingDetails?.consultationDetails?.startTime
                      ? new Date(
                          bookingDetails.consultationDetails.startTime
                        ).toLocaleDateString("en-US", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })
                      : "Wed 31 Jan"}
                  </span>
                  <span className="mx-1">•</span>
                  <Clock size={16} className="text-[#8bc34a]" />
                  <span className="font-medium">
                    {bookingDetails?.consultationDetails?.startTime
                      ? new Date(
                          bookingDetails.consultationDetails.startTime
                        ).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      : "2:00 PM"}
                  </span>
                </p>
                <p className="text-gray-700 text-center mb-6 italic w-full">
                  This session will take place virtually, so you can join from
                  wherever you&apos;re most comfortable.
                </p>
                <p className="text-gray-600 text-center text-sm mb-4">
                  Need to reschedule? No problem.
                </p>
                <div className="flex justify-center items-center w-full">
                  <a
                    href={
                      bookingDetails?.consultationDetails?.rescheduleLink ||
                      "AUDIT-RESULTS-123"
                    }
                    className={`bg-[#a6d66b] hover:bg-[#95c25a] text-white font-medium py-2 px-4 rounded-md transition-colors ${bookingDetails?.consultationDetails?.isCancelled ? "opacity-50 pointer-events-none" : ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reschedule
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
