/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useContext, useCallback } from "react";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import ServiceCard from "../../components/component/ServiceCard";
import { AUTH_CONTEXT } from "../../providers/auth"; // Adjust the import path as necessary
import BookingProgress from "@/components/component/booking-progress";
// import CountdownTimer from "@/components/component/CountdownTimer";
import { Clock, AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ChatBot } from "@/components/modal/ChatBot";
import Link from "next/link";
import { FAQDetails, FAQQuestions } from "./_comp/utils";
import Image from "next/image";
import GoogleReview from "./_comp/Google-review";
import Recommendation from "./_comp/Recommendation";

import {
  LogOut,
  ClipboardList,
  FileText,
  Award,
  LayoutDashboard,
  MapPin,
  Calendar,
  CheckCircle,
  PenToolIcon as Tool,
  Hammer,
  CheckSquare,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  FileCheck,
  ArrowUpCircle,
  ChevronRight,
  Percent,
  Zap,
  DollarSign,
  Home,
  Leaf,
  ListChecks,
  FileSpreadsheet,
} from "lucide-react";
import RescheduleModal from "@/components/component/reshedule-modal";
import PaymentModal from "@/components/payment/modal";
import { BOOKING_CONTEXT } from "@/providers/booking";

// interface Service {
//   id: string;
//   name: string;
//   images?: { url: string }[];
//   price?: { amount: number };
//   description: string;
// }

interface Price {
  totalGross: {
    amount: string;
    currency: string;
  };
  totalNet: {
    amount: string;
    currency: string;
  };
  totalTaxes: {
    amount: string;
    currency: string;
  };
  totalPaid: {
    amount: string;
    currency: string;
  };
  taxes: Array<[]>;
}

interface Booking {
  bookingNumber: string;
  startTime: string;
  endTime: string;
  title: string;
  canceled: boolean;
  accepted: boolean;
  creationTime: string;
  serviceName: string;
  serviceId: string;
  price: Price;
  currentStage?: string;
}

interface AllBookings {
  bookingDetails: {
    serviceName: string;
    startTime: string;
    endTime: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      province: string;
      countryCode: string;
      postalCode: string;
    };
    auditor: {
      name: string;
    };
    rescheduleAvailable: boolean;
  };
  utilityBillDetails: {
    count: number;
  };

  reportConsultation: {
    consultationBookingUrl: string;
  };
  consultationDetails: {
    startTime: string;
    endTime: string;
    isCancelled: boolean;
    rescheduleLink: string;
  };
  proposalDetails: {
    count: number;
    completedContractLink: string;
  };
  paymentDetails: {
    amount: number;
    status: string;
  };
}

interface BookingsResponse {
  success: boolean;
  message: string;
  data: {
    bookings: Booking[];
  };
}

interface RecommendationData {
  description: string;
  thumbnail: string;
  title: string;
  url: string;
  videoId: string;
}

const stepsSequence = [
  { label: "Booking Created", key: "bookingCreated" },
  { label: "Utility Bills Uploaded", key: "utilityBills" },
  { label: "Audit Performed", key: "auditPerformed" },
  { label: "Follow Up Scheduled", key: "followUpSchedule" },
  { label: "Report Generated", key: "reportGenerated" },
  { label: "Proposal Signed", key: "proposalSigned" },
  { label: "Payment Done", key: "paymentDone" },
];

const getStepStatus = (currentStage: string) => {
  return stepsSequence.map((step, index) => {
    const status: "completed" | "current" | "upcoming" | "cancelled" =
      stepsSequence.findIndex((s) => s.key === currentStage) > index
        ? "completed"
        : stepsSequence.findIndex((s) => s.key === currentStage) === index
          ? "current"
          : "upcoming";
    return { label: step.label, status };
  });
};

const isOneAndHalfHourAhead = (startTime: string): boolean => {
  const startDate = new Date(startTime);
  const currentDate = new Date();
  if (currentDate < startDate) return false;
  const diffInHours =
    (startDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
  return diffInHours >= 1.5;
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    weekday: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const formatTime = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  }).format(date);
};

export default function DashboardPage() {
  // const router = useRouter();
  // const [services, setServices] = useState<Service[]>([]);
  const { isLoading, bookingDetails, recommendedVideos, refreshBookingData } =
    useContext(BOOKING_CONTEXT);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to track if timeline is expanded or collapsed
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(true);
  // State for reschedule modal
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState("");
  const [latestState, setLatestState] = useState("");

  const State: Array<keyof AllBookings> = [
    "bookingDetails",
    "utilityBillDetails",
    "reportConsultation",
    "consultationDetails",
    "proposalDetails",
    "paymentDetails",
  ];

  // Toggle timeline expansion
  const toggleTimeline = () => {
    setIsTimelineExpanded(!isTimelineExpanded);
  };

  useEffect(() => {
    // Your existing code that doesn't involve data fetching can stay here
    if (bookingDetails) {
      for (let i = 0; i < State.length; i++) {
        const key = State[i];
        if (bookingDetails[key]) {
          console.log("bookings[key]:", bookingDetails[key]);
          console.log("State[i]:", key);
          setLatestState(key);
        } else {
          break;
        }
      }
      console.log("latestState", latestState);
    }
  }, [bookingDetails]);

  const CloseModalContent = () => {
    switch (latestState) {
      case "bookingDetails":
        return (
          <EnergyAudit
            BookingDetails={bookingDetails?.bookingDetails}
            onClick={() => openRescheduleModal("AUDIT-345678")}
          />
        );
      case "utilityBillDetails":
        return (
          <UtilityBills
            UtilityBillDetails={bookingDetails?.utilityBillDetails}
          />
        );
      case "reportConsultation":
        return bookingDetails?.reportConsultation ? (
          <ReportConsaltation
            ReportConsultation={bookingDetails?.reportConsultation}
          />
        ) : null;

      case "consultationDetails":
        return bookingDetails?.consultationDetails ? (
          <ConsultationDerails
            BookingDetails={bookingDetails.bookingDetails}
            ConsultationDetails={bookingDetails.consultationDetails}
            onClick={() => openRescheduleModal("AUDIT-RESULTS-123")}
          />
        ) : null;

      case "proposalDetails":
        return isOneAndHalfHourAhead(
          bookingDetails?.bookingDetails?.startTime
        ) ? (
          <WeAreLinning />
        ) : null;

      case "paymentDetails":
        return (
          <PaymentDetails
            PaymentDetails={bookingDetails?.paymentDetails}
            userDetails={userDetails}
            onClick={() => setIsModalOpen(false)}
          />
        );
      default:
        return "";
    }
  };
  // Open reschedule modal
  const openRescheduleModal = (bookingId: string) => {
    setCurrentBookingId(bookingId);
    setIsRescheduleModalOpen(true);
  };

  // Handle reschedule confirmation
  const handleRescheduleConfirm = (date: Date, timeSlot: string) => {
    console.log(
      `Booking ${currentBookingId} rescheduled to ${date.toDateString()} at ${timeSlot}`
    );
    // In a real app, you would make an API call here
  };

  // const [currentIndex, setCurrentIndex] = useState<number>(0);

  //usestate condition for dropdown

  const [openDropdown, setOpenDropdown] = useState<boolean[]>(
    Array(FAQDetails.length).fill(false)
  );

  const [faqOpen, setFaqOpen] = useState<boolean[]>(
    Array(FAQQuestions.length).fill(false)
  );

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
    if (index === FAQDetails.length - 1) {
      setFaqOpen((prev) => prev.map(() => false));
    }
  };

  const toggleFaqQuestion = (index: number) => {
    setFaqOpen((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };

  const { userDetails } = useContext(AUTH_CONTEXT);
  console.log("User Details:", userDetails);

  // const getServices = useCallback(async () => {
  //   try {
  //     const response = await fetch(`/api/booking/services`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     setServices(data?.data?.services || []);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("No Services Found");
  //   }
  // }, []);

  // const getBookings = useCallback(async () => {
  //   try {
  //     const response = await fetch(`/api/user/bookings`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data: BookingsResponse = await response.json();

  //     if (data.success) {
  //       console.log("Bookings data:", data.data.bookings);
  //       setBookings(data.data.bookings);
  //     } else {
  //       throw new Error(data.message || "Failed to fetch bookings");
  //     }
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "An error occurred");
  //     toast.error("No Bookings Found");
  //   }
  // }, []);

  // const handleNext = () => {
  //   setCurrentIndex((prev) => Math.min(services.length - 1, prev + 1));
  // };

  // const handlePrev = () => {
  //   setCurrentIndex((prev) => Math.max(0, prev - 1));
  // };

  // const handleWheel = (e: React.WheelEvent) => {
  //   if (e.deltaY > 0) {
  //     handleNext();
  //   } else {
  //     handlePrev();
  //   }
  // };

  // const getStatusBadge = (booking: Booking): React.ReactElement => {
  //   if (booking.canceled) {
  //     return (
  //       <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
  //         Cancelled
  //       </span>
  //     );
  //   }
  //   if (booking.accepted) {
  //     return (
  //       <div className="flex items-center">
  //         <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-green-100 text-lime-500">
  //           Confirmed
  //         </span>
  //         <CountdownTimer startTime={booking.startTime} />
  //       </div>
  //     );
  //   }
  //   return (
  //     <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
  //       Pending
  //     </span>
  //   );
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       await Promise.all([
  //         // getServices(),
  //         getBookings(),
  //       ]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError("Failed to load dashboard data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
          <p className="text-md text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="bg-white p-6 rounded-lg shadow-md">
  //         <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
  //         <p className="text-gray-700 text-center">{error}</p>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-6">
        {/* Main Content Container */}
        <div className="container mx-auto p-6">
          {/* main component */}

          <div className="flex-1 overflow-auto p-8 bg-white">
            <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>

            {/* Container Card with Light Green Background */}
            <div className="bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm relative mt-8">
              {/* Collapse/Expand button positioned half on/half off the container */}
              <button
                onClick={toggleTimeline}
                className="absolute -top-4 right-6 flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#8bc34a] hover:bg-[#f5f9ed] transition-colors border border-[#e0f0d0] shadow-sm z-10"
                aria-label={
                  isTimelineExpanded ? "Collapse Timeline" : "Expand Timeline"
                }
              >
                {isTimelineExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              <div className="timeline-container relative">
                {/* Card Stack Effect when collapsed */}
                {!isTimelineExpanded && (
                  <>
                    {/* Third card peeking out */}
                    {/* <div className="absolute top-8 left-0 right-0 h-4 bg-white rounded-lg border border-gray-200 shadow-sm z-10"></div> */}
                    {/* Second card peeking out */}
                    {/* <div className="absolute top-4 left-0 right-0 h-4 bg-white rounded-lg border border-gray-200 shadow-sm z-20"></div> */}

                    {CloseModalContent()}
                  </>
                )}

                {/* Top Timeline Item - You&apos;re Officially Certified! */}
                {/* <div
                  className={`timeline-item mb-6 relative transition-all duration-500 ease-in-out z-30 ${
                    isTimelineExpanded ? "" : "shadow-lg"
                  }`}
                >
                  <div className="bg-[#f5f9ed] rounded-lg p-6 border border-[#e0f0d0]">
                    <div className="flex items-center mb-4">
                      <Award size={24} className="text-[#8bc34a] mr-2" />
                      <div className="font-medium text-lg">
                        You&apos;re Officially Certified!
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">
                      Your Pearl Certification is being issued — your
                      energy-efficient upgrades are complete and recognized.
                    </p>
                    <Link href="/pearl-certification">
                      <button className="text-[#007BFF] text-sm font-medium">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div> */}

                {/* The rest of the timeline items - only shown when expanded */}
                <div
                  className={`timeline-items-container transition-all duration-500 ease-in-out overflow-hidden ${
                    isTimelineExpanded
                      ? "max-h-[5000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {/* Timeline Item - Final Review by Your Utility */}
                  {/* <div className="timeline-item mb-6 relative">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center mb-4">
                        <ClipboardList
                          size={24}
                          className="text-[#8bc34a] mr-2"
                        />
                        <div className="font-medium text-lg">
                          Final Review by Your Utility
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        Your project is being reviewed for approval. Some homes
                        are selected for a quality check — Let us know if yours
                        is.
                      </p>

                      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
                        <div className="flex items-center gap-1 ml-auto">
                          <span className="font-medium">Status:</span>
                          <span className="text-[#8bc34a] font-medium">
                            Final Review
                          </span>
                        </div>
                      </div>
                      <Link href="/final-review">
                        <button className="text-[#007BFF] text-sm font-medium">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div> */}

                  {/* Timeline Item - Confirm & Complete Your Project */}
                  {/* <div className="timeline-item mb-6 relative">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <ThumbsUp size={24} className="text-[#8bc34a] mr-2" />
                          <div className="font-medium text-lg">
                            Confirm & Complete Your Project
                          </div>
                        </div>
                        <button className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2">
                          <CheckCircle size={18} />
                          Confirm
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4">
                        Confirming your project completion takes just a moment —
                        and helps unlock your final rebates and certification.
                        We&apos;ll guide you through the documents so you can move
                        forward with full confidence.
                      </p>
                      <Link href="/confirm-project">
                        <button className="text-[#007BFF] text-sm font-medium">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div> */}

                  {/* Timeline Item - Confirming Your Home Is Ready */}
                  {/* <div className="timeline-item mb-6 relative">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center mb-4">
                        <CheckSquare
                          size={24}
                          className="text-[#8bc34a] mr-2"
                        />
                        <div className="font-medium text-lg">
                          Confirming Your Home Is Ready
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        We take this step seriously because we know how much
                        your home means to you. This final check allows us to
                        make sure it&apos;s performing beautifully — and gives you
                        the comfort, safety, and savings we set out to deliver.
                      </p>

                      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
                        <div className="flex items-center gap-1">
                          <ClipboardList size={16} className="text-[#8bc34a]" />
                          <span>Post-Install Check</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} className="text-[#8bc34a]" />
                          <span>Fri 7 Feb</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-[#8bc34a]" />
                          <span>11:00 AM</span>
                        </div>
                        <div className="flex items-center gap-1 ml-auto">
                          <span className="font-medium">Status:</span>
                          <span className="text-[#8bc34a] font-medium">
                            In Progress
                          </span>
                        </div>
                      </div>
                      <Link href="/home-ready">
                        <button className="text-[#007BFF] text-sm font-medium">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div> */}

                  {/* Timeline Item - Your Home is Being Upgraded - CHANGED ICON */}
                  {/* <div className="timeline-item mb-6 relative">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center mb-4">
                        <ArrowUpCircle
                          size={24}
                          className="text-[#8bc34a] mr-2"
                        />
                        <div className="font-medium text-lg">
                          Your Home is Being Upgraded
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        We&apos;re working on your home with care — improving
                        efficiency, comfort, and performance at every step.
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start p-3 bg-[#f5f9ed] rounded-md">
                          <Hammer
                            size={18}
                            className="text-[#8bc34a] mr-2 mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">
                                Insulation Installation
                              </div>
                              <div className="text-[#8bc34a] text-sm font-medium flex items-center">
                                <span className="animate-pulse mr-1">●</span> In
                                Progress
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Started: Mon 3 Feb, 9:00 AM • Estimated
                              completion: 1:00 PM
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start p-3 bg-[#f5f9ed] rounded-md">
                          <Hammer
                            size={18}
                            className="text-[#8bc34a] mr-2 mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">
                                HVAC Installation
                              </div>
                              <div className="text-[#8bc34a] text-sm font-medium flex items-center">
                                <span className="animate-pulse mr-1">●</span> In
                                Progress
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Started: Wed 5 Feb, 10:00 AM • Estimated
                              completion: 4:00 PM
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
                        <div className="flex items-center gap-1 ml-auto">
                          <span className="font-medium">Status:</span>
                          <span className="text-[#8bc34a] font-medium">
                            Ongoing
                          </span>
                        </div>
                      </div>
                      <Link href="/home-upgrade">
                        <button className="text-[#007BFF] text-sm font-medium">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div> */}

                  {/* Timeline Item - Installation is Scheduled */}
                  {/* <div className="timeline-item mb-6 relative">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="mb-4">
                        <div className="flex items-center">
                          <Calendar size={24} className="text-[#8bc34a] mr-2" />
                          <div className="font-medium text-lg">
                            Installation is Scheduled
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        Your energy upgrades are on the calendar. We&apos;ll make
                        sure you know exactly what to expect before we get
                        started.
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start p-3 bg-[#f5f9ed] rounded-md">
                          <Tool
                            size={18}
                            className="text-[#8bc34a] mr-2 mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">
                                Insulation Installation
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                              <Calendar size={14} className="text-[#8bc34a]" />
                              <span>Mon 3 Feb</span>
                              <Clock
                                size={14}
                                className="text-[#8bc34a] ml-2"
                              />
                              <span>9:00 AM - 1:00 PM</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start p-3 bg-[#f5f9ed] rounded-md">
                          <Tool
                            size={18}
                            className="text-[#8bc34a] mr-2 mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">
                                HVAC Installation
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                              <Calendar size={14} className="text-[#8bc34a]" />
                              <span>Wed 5 Feb</span>
                              <Clock
                                size={14}
                                className="text-[#8bc34a] ml-2"
                              />
                              <span>10:00 AM - 4:00 PM</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
                        <div className="flex items-center gap-1 ml-auto">
                          <span className="font-medium">Status:</span>
                          <span className="text-[#8bc34a] font-medium">
                            Scheduled
                          </span>
                        </div>
                      </div>
                      <Link href="/installation-scheduled">
                        <button className="text-[#007BFF] text-sm font-medium">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div> */}

                  {/* Timeline Item - One Last Thing! */}
                  {/* <div className="timeline-item mb-6 relative">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center mb-4">
                        <Tool size={24} className="text-[#8bc34a] mr-2" />
                        <div className="font-medium text-lg">
                          One Last Thing!
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        To finalize your project and secure your installation
                        dates, please complete the payment for your selected
                        upgrades. Your investment in energy efficiency is just a
                        click away.
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start p-3 bg-[#f5f9ed] rounded-md">
                          <Hammer
                            size={18}
                            className="text-[#8bc34a] mr-2 mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">
                                Insulation Installation
                              </div>
                              <div className="text-gray-700 text-sm">
                                $2,350.00
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start p-3 bg-[#f5f9ed] rounded-md">
                          <Zap size={18} className="text-[#8bc34a] mr-2 mt-1" />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">
                                HVAC Installation
                              </div>
                              <div className="text-gray-700 text-sm">
                                $2,525.00
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-gray-700 text-sm">
                          <span className="font-medium">Total:</span> $4,875.00
                        </div>
                        <a
                          href="https://stripe.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#8bc34a] text-white px-4 py-2 rounded-md hover:bg-[#95c25a] transition-colors"
                        >
                          Payment Gateway
                        </a>
                      </div>

                      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
                        <div className="flex items-center gap-1 ml-auto">
                          <span className="font-medium">Status:</span>
                          <span className="text-[#8bc34a] font-medium">
                            Pending
                          </span>
                        </div>
                      </div>
                      <Link href="/one-last-thing">
                        <button className="text-[#007BFF] text-sm font-medium">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div> */}

                  {/* New Payment Process */}
                  <PaymentDetails
                    PaymentDetails={bookingDetails?.paymentDetails}
                    userDetails={userDetails}
                    onClick={() => setIsModalOpen(false)}
                  />
                  {/* {bookings?.paymentDetails && (
                    <div className="timeline-item mb-6 relative">
                      <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-pen-tool text-[#8bc34a] mr-2"
                          >
                            <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
                            <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
                            <path d="m2.3 2.3 7.286 7.286"></path>
                            <circle cx="11" cy="11" r="2"></circle>
                          </svg>
                          <div className="font-medium text-lg">
                            One Last Thing!
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                          To finalize your project and secure your installation
                          dates, please complete the payment for your selected
                          upgrades. Your investment in energy efficiency is just
                          a click away.
                        </p>
                        <div className="mb-4">
                          <div className="flex items-start p-3 bg-[#f5f9ed] rounded-md">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-dollar-sign text-[#8bc34a] mr-2 mt-1"
                            >
                              <line x1="12" x2="12" y1="2" y2="22"></line>
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <div className="font-medium">Total amount</div>
                                <div className="text-gray-700 text-sm">
                                  ${bookings?.paymentDetails?.amount}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-gray-700 text-sm">
                            <span className="font-medium"></span>
                          </div>
                          {userDetails?.bookingNumber && (
                            <button
                              disabled={
                                bookings?.paymentDetails?.status === "Completed"
                              }
                              onClick={() => setIsModalOpen(true)}
                              className="bg-[#8bc34a] text-white px-4 py-2 rounded-md hover:bg-[#95c25a] transition-colors"
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
                          <a href="/one-last-thing">
                            <button className="text-[#007BFF] text-sm font-medium">
                              View Details
                            </button>
                          </a>
                          <div className="flex items-center gap-1 ml-auto">
                            <span className="font-medium">Status:</span>
                            <span className="text-[#8bc34a] font-medium">
                              {bookings?.paymentDetails?.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}

                  {/* Timeline Item - Your Project Plans Are Ready */}
                  {/* {bookings?.proposalDetails && (
                    <div className="timeline-item mb-6 relative">
                      <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center mb-4">
                          <FileCheck
                            size={24}
                            className="text-[#8bc34a] mr-2"
                          />
                          <div className="font-medium text-lg">
                            Your Project Plans Are Ready
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">
                          Review & sign the proposal which works for you! We&apos;ve
                          prepared detailed project plans based on your audit
                          results. Choose the option that best fits your needs
                          and budget to move forward with your home energy
                          improvements.
                        </p>

                        <div className="mb-4">
                          {bookings?.proposalDetails?.count > 0 && (
                            <Link href="/document-portal#review-plans">
                              <button className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors">
                                <FileText size={18} />
                                Go to Your Proposals
                              </button>
                            </Link>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
                          <div className="flex items-center gap-1 ml-auto">
                            <span className="font-medium">Status:</span>
                            <span className="text-[#8bc34a] font-medium">
                              Complete
                            </span>
                          </div>
                        </div>
                        <Link href="/project-plans-ready">
                          <button className="text-[#007BFF] text-sm font-medium">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  )} */}

                  <ProjectPlansReady
                    ProposalDetails={bookingDetails?.proposalDetails}
                  />

                  {/* Timeline Item - We&apos;re Lining Everything Up */}
                  {isOneAndHalfHourAhead(
                    bookingDetails?.bookingDetails?.startTime
                  ) && <WeAreLinning />}

                  {/* Timeline Item - Your Audit Results are in - MOVED HERE */}
                  {bookingDetails?.consultationDetails && (
                    <ConsultationDerails
                      BookingDetails={bookingDetails.bookingDetails}
                      ConsultationDetails={bookingDetails.consultationDetails}
                      onClick={() => openRescheduleModal("AUDIT-RESULTS-123")}
                    />
                  )}

                  {/* Timeline Item - Your Results Are In — Let&apos;s Talk */}
                  {bookingDetails?.reportConsultation && (
                    <ReportConsaltation
                      ReportConsultation={bookingDetails?.reportConsultation}
                    />
                  )}

                  {/* Timeline Item - Upload Utility Bills */}
                  {/* <div className="timeline-item mb-6 relative">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center mb-4">
                        <FileText size={24} className="text-[#8bc34a] mr-2" />
                        <div className="font-medium text-lg">
                          Upload Your Utility Bills
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        Refer to the Document Portal on the sidebar to upload
                        your Utility Bills, our auditor will review this next.
                        Sharing your utility bills helps us analyze your energy
                        usage patterns and identify potential savings.
                      </p>

                      <div className="flex justify-between items-center">
                        <Link href="/document-portal#upload-utility-bills">
                          <button className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors">
                            <FileText size={18} />
                            Go to Your Bills
                          </button>
                        </Link>

                        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Status:</span>
                            <span className="text-[#8bc34a] font-medium">
                              {bookings?.utilityBillDetails?.count > 0
                                ? "Completed"
                                : "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link href="/utility-bills-details">
                          <button className="text-[#007BFF] text-sm font-medium">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div> */}

                  <UtilityBills
                    UtilityBillDetails={bookingDetails?.utilityBillDetails}
                  />

                  {/* Timeline Item - Professional Home Energy Audit */}
                  {/* <div className="timeline-item mb-6 relative">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <ListChecks
                            size={24}
                            className="text-[#8bc34a] mr-2"
                          />
                          <div>
                            <div className="font-medium text-lg">
                              Professional Home Energy Audit
                            </div>
                            <div className="text-sm text-gray-500">
                              Auditor Assigned:{" "}
                              <span className="text-[#8bc34a] font-medium">
                                {bookings?.bookingDetails?.auditor?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => openRescheduleModal("AUDIT-345678")}
                          disabled={
                            !bookings?.bookingDetails?.rescheduleAvailable
                          }
                          className={`${!bookings?.bookingDetails?.rescheduleAvailable ? "opacity-35" : ""} bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors`}
                        >
                          <Clock size={18} />
                          Reschedule
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4">
                        We&apos;re preparing for an in-home visit to evaluate how
                        your home uses energy. Your Ciel Home Energy Auditor
                        will collect important details to help us understand how
                        your home is performing.
                      </p>

                      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} className="text-[#8bc34a]" />
                          <span>
                            {formatDate(bookings?.bookingDetails?.startTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-[#8bc34a]" />
                          <span>
                            {formatTime(bookings?.bookingDetails?.startTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} className="text-[#8bc34a]" />
                          <span>
                            {!!bookings?.bookingDetails?.address?.line1
                              ? `${bookings?.bookingDetails?.address?.line1},`
                              : ""}
                          </span>
                          <span>
                            {!!bookings?.bookingDetails?.address?.line2
                              ? `${bookings?.bookingDetails?.address?.line2},`
                              : ""}
                          </span>
                          <span>
                            {!!bookings?.bookingDetails?.address?.city
                              ? `${bookings?.bookingDetails?.address?.city},`
                              : ""}
                          </span>
                          <span>
                            {!!bookings?.bookingDetails?.address?.province
                              ? `${bookings?.bookingDetails?.address?.province},`
                              : ""}
                          </span>
                          <span>
                            {!!bookings?.bookingDetails?.address?.countryCode
                              ? `${bookings?.bookingDetails?.address?.countryCode}`
                              : ""}
                          </span>
                          <span>
                            {!!bookings?.bookingDetails?.address?.postalCode
                              ? `${bookings?.bookingDetails?.address?.postalCode}`
                              : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 ml-auto">
                          <span className="font-medium">Status:</span>
                          <span className="text-[#8bc34a] font-medium">
                            Scheduled
                          </span>
                        </div>
                      </div>

                      <Link href="/audit-details">
                        <button className="text-[#007BFF] text-sm font-medium">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div> */}

                  <EnergyAudit
                    BookingDetails={bookingDetails?.bookingDetails}
                    onClick={() => openRescheduleModal("AUDIT-345678")}
                  />
                </div>
              </div>
            </div>

            {/* Recommended for You Section */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Recommended for You</h2>
                <Link
                  href="/recommendations"
                  className="text-[#8bc34a] flex items-center"
                >
                  View More Recommendations <ChevronRight className="ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <Image
                      src="/professional-audit.png"
                      alt="Professional Audit"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-[#8bc34a] font-medium">
                        Professional Audit
                      </h3>
                      <ChevronRight className="text-[#8bc34a]" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Cut energy costs with a professional audit
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <Image
                      src="/attic-insulation.png"
                      alt="Attic Insulation"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-[#8bc34a] font-medium">
                        Attic Insulation
                      </h3>
                      <ChevronRight className="text-[#8bc34a]" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Keeps your home warmer in winter and cooler in summer
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <Image
                      src="/solar-panels.png"
                      alt="Solar Panels Electrification"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-[#8bc34a] font-medium">
                        Solar Panels Electrification
                      </h3>
                      <ChevronRight className="text-[#8bc34a]" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Electrifying home is a smart way to lower household energy
                      consumption
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <Image
                      src="/ac-installation.png"
                      alt="AC Installation and Setup"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-[#8bc34a] font-medium">
                        AC Installation and Setup
                      </h3>
                      <ChevronRight className="text-[#8bc34a]" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Experience the best in cooling with our top-notch AC
                      installation services
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Reviews Section */}
            <div className="mt-12 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-700">
                    Our Google Reviews
                  </h3>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6 text-[#8bc34a] fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      4.9 rating of 39 reviews
                    </span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-[#a6d66b] to-[#8bc34a] hover:opacity-90 text-white font-medium py-2 px-6 rounded-md flex items-center gap-2">
                  <FileText size={18} />
                  Write a review
                </button>
              </div>

              {/* Reviews Carousel */}
              <div className="relative">
                <div className="flex space-x-6 overflow-x-auto pb-4 hide-scrollbar">
                  {/* Review 1 */}
                  <div className="bg-white rounded-lg border border-[#e0f0d0] p-6 min-w-[350px] max-w-[350px] flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-[#4CAF50] flex items-center justify-center text-white font-bold text-lg">
                        MK
                      </div>
                      <div>
                        <div className="font-medium">Maria Korsgaard</div>
                        <div className="text-sm text-gray-500">15/03/2023</div>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-[#8bc34a] fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 flex-grow">
                      The energy auditor was thorough and professional. They
                      identified several areas where we could improve
                      efficiency. After implementing their recommendations, our
                      energy bills dropped by 25%! Highly recommend Ciel Power.
                    </p>
                    <div className="flex justify-end">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="bg-white rounded-lg border border-[#e0f0d0] p-6 min-w-[350px] max-w-[350px] flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-[#2196F3] flex items-center justify-center text-white font-bold text-lg">
                        MC
                      </div>
                      <div>
                        <div className="font-medium">Maren Calzoni</div>
                        <div className="text-sm text-gray-500">12/03/2023</div>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-[#8bc34a] fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 flex-grow">
                      Our home was always cold in winter despite cranking up the
                      heat. The Ciel Power audit revealed poor insulation and
                      air leaks. After fixing these issues, our home stays warm
                      and comfortable with much lower heating costs. 10/10!
                    </p>
                    <div className="flex justify-end">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Review 3 */}
                  <div className="bg-white rounded-lg border border-[#e0f0d0] p-6 min-w-[350px] max-w-[350px] flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-[#FF9800] flex items-center justify-center text-white font-bold text-lg">
                        DD
                      </div>
                      <div>
                        <div className="font-medium">Davis Dokidis</div>
                        <div className="text-sm text-gray-500">08/03/2021</div>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-[#8bc34a] fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 flex-grow">
                      Mark from Ciel Power was knowledgeable and friendly. The
                      thermal imaging showed exactly where we were losing
                      energy. The detailed report helped us prioritize upgrades.
                      Our home is now more comfortable and efficient...
                      <span className="text-[#8bc34a] cursor-pointer">
                        See more
                      </span>
                    </p>
                    <div className="flex justify-end">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Review 4 */}
                  <div className="bg-white rounded-lg border border-[#e0f0d0] p-6 min-w-[350px] max-w-[350px] flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-[#9C27B0] flex items-center justify-center text-white font-bold text-lg">
                        JT
                      </div>
                      <div>
                        <div className="font-medium">James Thompson</div>
                        <div className="text-sm text-gray-500">22/02/2023</div>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-[#8bc34a] fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 flex-grow">
                      We were skeptical about the value of an energy audit, but
                      it was worth every penny. Ciel Power identified issues we
                      never would have found ourselves. The rebates they helped
                      us get covered most of the audit cost. Excellent service!
                    </p>
                    <div className="flex justify-end">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10 border border-[#e0f0d0]">
                  <ChevronDown className="rotate-90 text-[#8bc34a]" size={24} />
                </button>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10 border border-[#e0f0d0]">
                  <ChevronDown
                    className="-rotate-90 text-[#8bc34a]"
                    size={24}
                  />
                </button>
              </div>
            </div>
            {/* Reschedule Modal */}
            <RescheduleModal
              isOpen={isRescheduleModalOpen}
              onClose={() => setIsRescheduleModalOpen(false)}
              bookingId={currentBookingId}
              onConfirm={handleRescheduleConfirm}
            />
            {userDetails?.bookingNumber && (
              <PaymentModal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  refreshBookingData();
                }}
                bookingNumber={userDetails?.bookingNumber}
              />
            )}
          </div>

          {/* faq section */}
          <div className="bg-gray-100 p-6">
            <div className="mt-10">
              {FAQDetails.map((faq) => (
                <div
                  key={faq.id}
                  className="mb-4 border border-[#B7E2C7] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleDropdown(faq.id)}
                    className="w-full flex items-center justify-between p-4 bg-[#F9FCF6] hover:bg-[#F0F8E6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-[#B7E2C7]">
                        <img
                          src={faq.logo || "/placeholder.svg"}
                          alt={faq.title}
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="text-[#4D7C32] text-lg font-medium">
                          {faq.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {faq.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`transform transition-transform duration-200 ${openDropdown[faq.id] ? "rotate-180" : ""}`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#4D7C32"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {openDropdown[faq.id] && (
                    <div className="p-4 bg-white border-t border-[#B7E2C7]">
                      <CardData
                        index={faq.id}
                        faqOpen={faqOpen}
                        toggleFaqQuestion={toggleFaqQuestion}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended for you */}
          <Recommendation data={recommendedVideos} />

          {/* Google review */}
          <GoogleReview />
          <ChatBot />

          {/* FAQs Section */}
          {/* <div className="flex justify-between items-center mt-5">
            <h2 className="text-2xl font-medium">FAQs</h2>
          </div> */}
        </div>
      </div>
    </div>
  );
}

interface CardDataProps {
  index: number;
  faqOpen: boolean[];
  toggleFaqQuestion: (index: number) => void;
}

const CardData = ({ index, faqOpen, toggleFaqQuestion }: CardDataProps) => {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-col gap-3 py-3 px-10 items-center justify-center text-center">
          <div className="bg-light-green border-[1.5px] rounded-full p-1.5 w-fit">
            <p className="text-deep-green text-sm">
              Thanks for booking Energy Audit!{" "}
            </p>
          </div>
          <p className="text-2xl font-bold">
            What to Expect During Your Home Energy Audit
          </p>
          <p className="text-sm">
            Discover the Power of Energy Efficiency with a Ciel Home Energy
            Audit.
          </p>
          <p>
            <span className="text-2xl text-deep-green">&quot;</span> The first
            step to accessing NJ&apos;s utility programs for <br />{" "}
            energy-efficient home upgrades.{" "}
            <span className="text-2xl text-deep-green">&quot;</span>{" "}
          </p>
          <div className="aspect-video min-w-[70%]">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/FH0hdanGxkM"
              title="Energy Audit Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Added content from the image */}
          <div className="max-w-3xl mx-auto mt-10 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              What You&apos;ll Gain from Your Audit Comfort, savings, and peace
              of mind — your audit is the first step toward a better home.
            </h2>

            <p className="text-gray-600 my-4">
              A Home Energy Audit is about more than energy use — it&apos;s
              about how your home supports your everyday life. We take a deeper
              look at the things that can affect your comfort, your health, and
              your monthly expenses. It&apos;s not just about finding problems.
              It&apos;s about finding solutions that work for you.
            </p>

            <p className="text-gray-600 my-4">
              We understand that your home is more than just walls and systems —
              it&apos;s where you and your family rest, breathe, and recharge.
              Through the audit, we uncover opportunities to help your home feel
              better, function better, and cost less to run.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">
              Generous Incentives and Financing
            </h3>

            <p className="text-gray-600 mb-2">
              Thanks to support from New Jersey&apos;s Clean Energy Program and
              the federal government, many homeowners are eligible for
              substantial financial benefits, including:
            </p>
            <ul className="list-disc pl-8 text-gray-600 mb-4">
              <li>Up to $6,000 in cash-back incentives</li>
              <li>
                Up to $25,000 in zero-interest financing for up to 10 years
              </li>
              <li>Federal tax credits</li>
            </ul>

            <p className="text-gray-600 mb-2">
              These benefits help reduce the cost of improvements such as:
            </p>
            <ul className="list-disc pl-8 text-gray-600 mb-4">
              <li>Insulation and air sealing</li>
              <li>Heating and cooling system upgrades</li>
              <li>High-efficiency water heaters</li>
              <li>Ventilation systems</li>
            </ul>

            <p className="text-gray-600 mb-6">
              We&apos;ll help you understand what you qualify for — and how to
              take full advantage of these programs.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">
              A Healthier, More Comfortable Living Space
            </h3>

            <p className="text-gray-600 mb-4">
              Your audit isn&apos;t just about improving efficiency — it&apos;s
              also a step toward improving how you feel at home. We assess how
              well your home manages airflow, temperature, and moisture, which
              are all connected to your daily comfort and long-term health.
            </p>

            <p className="text-gray-600 mb-2">
              With the right upgrades, you may experience:
            </p>
            <ul className="list-disc pl-8 text-gray-600 mb-4">
              <li>
                Fewer allergens and pollutants circulating through your air
              </li>
              <li>
                More stable and comfortable temperatures, season to season
              </li>
              <li>Lower risk of mold and moisture buildup</li>
              <li>A quieter, calmer home environment</li>
            </ul>

            <p className="text-gray-600 mb-6">
              We understand that even small changes can make a big difference.
              Whether it&apos;s helping you sleep more soundly or making your
              home feel more balanced and breathable, we&apos;re here to guide
              you toward solutions that fit your lifestyle.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">
              Personalized, Practical Recommendations
            </h3>

            <p className="text-gray-600 mb-4">
              After your home visit, your personalized results will be added to
              your customer portal. You&apos;ll be able to log in anytime to
              explore insights about your home&apos;s energy use, review
              suggested improvements, and track available incentives. Everything
              is organized in one place — clear, simple, and tailored to your
              home. No dense reports, just useful information you can act on
              when you&apos;re ready.
            </p>
          </div>
        </div>
      );
    case 1:
      return (
        <div className=" flex flex-col gap-3 p-3">
          <div className=" w-full flex gap-2 ">
            <div className="w-[60%] border rounded-xl p-2 relative shadow-lg">
              <div
                className="absolute  left-[29px] top-[12%] bottom-[5%] w-0.5 bg-green-500/30"
                style={{ zIndex: 0 }}
              ></div>

              <div
                className="relative flex gap-2 items-center z-50"
                style={{ zIndex: 50 }}
              >
                <LogoContainer
                  logo={"/dashboard/Frame.svg"}
                  className={"z-50"}
                />
                <div>
                  <p className=" text-xl">On-Site Application</p>
                  <p className=" text-xs">
                    BPI auditor will evaluate home energy performance.
                  </p>
                </div>
              </div>
              <ul className=" text-xs pl-4 pt-4 flex flex-col gap-3">
                <li className=" flex gap-2 items-center">
                  <Circle />
                  <p>
                    <span className="font-bold"> Gather details</span> on
                    insulation, construction specifications, and heating,
                    cooling, & hot water systems.
                  </p>
                </li>
                <li className=" flex gap-2 items-center">
                  <Circle />
                  <p>
                    Perform a{" "}
                    <span className="font-bold">blower door test</span> to
                    assess air tightness and use infrared cameras to locate air
                    leaks.
                  </p>
                </li>
                <li className=" flex gap-2 items-center">
                  <Circle />
                  <p>
                    Conduct{" "}
                    <span className="font-bold">safety inspections</span> to
                    identify hazards such as gas leaks, carbon monoxide, mold,
                    and asbestos
                  </p>
                </li>
              </ul>
            </div>
            <div className=" w-[40%] border rounded-xl p-2 shadow-lg">
              <div className=" flex gap-2">
                <LogoContainer logo={"/dashboard/analysis.svg"} />
                <p className=" text-xl">Engineering Analysis</p>
              </div>
              <p className=" text-xs">
                After the inspection, the data collected will be used to create
                a virtual model of your home.
              </p>
              <div className="flex flex-col gap-3 p-3 ">
                <div className="relative bg-light-green border border-green-300 border-opacity-40 rounded-xl p-3">
                  <p className=" text-sm">
                    {" "}
                    Projects <span className="font-bold">
                      energy savings
                    </span>{" "}
                    from recommended improvements
                  </p>
                  {/* <div className=""> */}
                  <Image
                    src={"/dashboard/Bulb.svg"}
                    width={30}
                    height={30}
                    alt="logo"
                    className="absolute -top-3 -left-1 rounded-full"
                  />
                </div>
                <div className="relative bg-light-green border border-green-300 border-opacity-40 rounded-xl p-3">
                  <p className=" text-sm">
                    {" "}
                    Identifies{" "}
                    <span className="font-bold">
                      utility incentives
                    </span> and <span className="font-bold">tax credits</span>{" "}
                    available to you (up to 30% of costs)
                  </p>
                  {/* <div className=""> */}
                  <Image
                    src={"/dashboard/coin.svg"}
                    width={30}
                    height={30}
                    alt="logo"
                    className="absolute -top-3 -left-1 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" p-3 border shadow-md rounded-xl flex gap-2">
            <Image
              src={"/dashboard/report.svg"}
              alt="report"
              width={281}
              height={276}
            />
            <div className=" ">
              <p className=" text-xl font-bold  ">Your Final Report</p>
              <p className=" text-xs text-gray-400 ">
                Within a few days of the visit, you will receive a detailed
                report including:
              </p>
              <p>
                A certified auditor, accredited by the Building Performance
                Institute (BPI), will visit your home to assess its energy
                performance.
              </p>
              <ul className=" text-xs pl-4 pt-4 flex flex-col gap-3">
                <li className=" flex gap-2 items-center">
                  <SimpleCircle />
                  <p>
                    <span className="font-bold"> Gather details</span> on
                    insulation, construction specifications, and heating,
                    cooling, & hot water systems.
                  </p>
                </li>
                <li className=" flex gap-2 items-center">
                  <SimpleCircle />
                  <p>
                    Perform a{" "}
                    <span className="font-bold">blower door test</span> to
                    assess air tightness and use infrared cameras to locate air
                    leaks.
                  </p>
                </li>
                <li className=" flex gap-2 items-center">
                  <SimpleCircle />
                  <p>
                    Conduct{" "}
                    <span className="font-bold">safety inspections</span> to
                    identify hazards such as gas leaks, carbon monoxide, mold,
                    and asbestos
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className=" flex flex-col gap-3 p-3">
          <div className="flex flex-col gap-3 border border-gray-300 p-3 rounded-md">
            <div className=" flex gap-2">
              <LogoContainer logo={"/dashboard/home.svg"} />
              <div>
                <p className=" text-xl">Provide Home access</p>
                <p className=" text-xs">
                  Ensure key areas of your home are accessible for inspection:
                </p>
              </div>
            </div>
            <div className=" flex gap-7">
              <Image
                src={"/dashboard/image.svg"}
                width={209}
                height={200}
                alt="image"
                className="rounded-md"
              />
              <Image
                src={"/dashboard/image1.svg"}
                width={209}
                height={200}
                alt="image"
                className="rounded-md"
              />
              <Image
                src={"/dashboard/image2.svg"}
                width={209}
                height={200}
                alt="image"
                className="rounded-md"
              />
              <Image
                src={"/dashboard/image3.svg"}
                width={209}
                height={200}
                alt="image"
                className="rounded-md"
              />
            </div>
          </div>
          <div className="flex  gap-3 border border-gray-300 p-3 w-full rounded-md">
            <div className=" w-1/2 flex flex-col gap-2">
              <div className=" flex gap-2">
                <LogoContainer logo="/dashboard/info.svg" />
                <div>
                  <p className=" text-xl">Utility Information</p>
                  <p className=" text-xs text-gray-400">
                    Upload recent utility bills before audit.
                  </p>
                </div>
              </div>
              <ul className=" flex flex-col gap-2">
                <li className=" flex gap-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-deep-green rounded"></div>
                  <div className=" pl-4">
                    <p className="text-sm font-bold">
                      Upload Bills Before Audit
                    </p>
                    <p className=" text-gray text-xs">
                      Upload your most recent gas and electric utility
                      bills through the portal before your audit.
                    </p>
                  </div>
                </li>
                <li className=" flex gap-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-deep-green rounded"></div>
                  <div className=" pl-4">
                    <p className="text-sm font-bold">Accurate Audit Report</p>
                    <p className=" text-gray text-xs">
                      Ensures precise report generation by verifying energy
                      usage and system performance.
                    </p>
                  </div>
                </li>
                <li className=" flex gap-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-deep-green rounded"></div>
                  <div className=" pl-4">
                    <p className="text-sm font-bold">Incentives & Savings</p>
                    <p className=" text-gray text-xs">
                      Identifies eligible incentives and cost-saving
                      opportunities to optimize energy efficiency.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className=" w-1/2 flex flex-col gap-2">
              <div className=" flex gap-2">
                <LogoContainer logo="/dashboard/paw.svg" />
                <div>
                  <p className=" text-xl">Secure Pets</p>
                  <p className=" text-xs text-gray-400">
                    Keeping Pets Safe & Ensuring a Smooth Audit
                  </p>
                </div>
              </div>
              <ul className=" flex flex-col gap-2">
                <li className=" flex gap-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-deep-green rounded"></div>
                  <div className=" pl-4">
                    <p className="text-sm font-bold">Pet Safety During Audit</p>
                    <p className=" text-gray text-xs">
                      If you have pets, consider keeping them in a safe space to
                      ensure the technician can work without interruptions
                    </p>
                  </div>
                </li>
                <li className=" flex gap-2 ">
                  <LogoContainer logo="/dashboard/man.svg" />
                  <div>
                    <p className=" text-xl">Plan for someone to be home</p>
                    <p className=" text-xs text-gray-400">
                      Ensure Access & Discuss Concerns
                    </p>
                  </div>
                </li>
                <li className=" flex gap-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-deep-green rounded"></div>
                  <div className=" pl-4">
                    <p className="text-sm font-bold">
                      Upload Bills Before Audit
                    </p>
                    <p className=" text-gray text-xs">
                      It&apos;s helpful for someone to be present to provide
                      access and discuss any concerns or observations about your
                      home.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className=" flex flex-col gap-3 p-3 border rounded-md m-3">
          {FAQQuestions.map((item) => (
            <div key={item.id} className="">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaqQuestion(item.id)}
              >
                <div className=" flex gap-2 items-center">
                  <div className="w-8 h-8 flex justify-center items-center p-2 flex-shrink-0 bg-medium-green rounded-full">
                    <p className="">{item.id + 1}</p>
                  </div>
                  <p>{item.title}</p>
                </div>
                <Image
                  src={"/dashboard/arrow-down.svg"}
                  width={20}
                  height={20}
                  alt="arrow"
                  className={`${(faqOpen[item.id] === true) === true ? "rotate-180" : " -rotate-90"}`}
                />
              </div>
              {faqOpen[item.id] === true && (
                <p className=" py-3 text-gray">{item.description}</p>
              )}
              <hr className="w-full h-[0.5px] bg-gray mt-2" />
            </div>
          ))}
        </div>
      );
  }
};

const LogoContainer = ({
  logo,
  className,
}: {
  logo: string;
  className?: string;
}) => {
  return (
    <div className=" p-2 border rounded-lg flex justify-center items-center gap-2 bg-white">
      <Image
        src={logo || "/placeholder.svg"}
        width={24}
        height={24}
        alt="logo"
        className={className}
      />
    </div>
  );
};

const Circle = () => {
  return (
    <div className="min-w-3 min-h-3 flex-shrink-0 border-2  bg-deep-green rounded-full ring-3"></div>
  );
};

const SimpleCircle = () => {
  return (
    <div className="min-w-2 min-h-2 flex-shrink-0 border-2  bg-black rounded-full"></div>
  );
};

const PaymentDetails = ({ PaymentDetails, userDetails, onClick }) => {
  if (!PaymentDetails) return null;
  // {bookings?.paymentDetails && (
  return (
    <div className="timeline-item mb-6 relative">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-pen-tool text-[#8bc34a] mr-2"
          >
            <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
            <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
            <path d="m2.3 2.3 7.286 7.286"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
          <div className="font-medium text-lg">One Last Thing!</div>
        </div>
        <p className="text-gray-600 mb-4">
          To finalize your project and secure your installation dates, please
          complete the payment for your selected upgrades. Your investment in
          energy efficiency is just a click away.
        </p>
        <div className="mb-4">
          <div className="flex items-start p-3 bg-[#f5f9ed] rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-dollar-sign text-[#8bc34a] mr-2 mt-1"
            >
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="font-medium">Total amount</div>
                <div className="text-gray-700 text-sm">
                  ${PaymentDetails?.amount}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-700 text-sm">
            <span className="font-medium"></span>
          </div>
          {userDetails?.bookingNumber && (
            <button
              disabled={PaymentDetails?.status === "Completed"}
              onClick={onClick}
              className="bg-[#8bc34a] text-white px-4 py-2 rounded-md hover:bg-[#95c25a] transition-colors"
            >
              Pay Now
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
          <a href="/one-last-thing">
            <button className="text-[#007BFF] text-sm font-medium">
              View Details
            </button>
          </a>
          <div className="flex items-center gap-1 ml-auto">
            <span className="font-medium">Status:</span>
            <span className="text-[#8bc34a] font-medium">
              {PaymentDetails?.status}
            </span>
          </div>
        </div>
      </div>
    </div>
    // )}
  );
};

const ProjectPlansReady = ({ ProposalDetails }) => {
  // bookings?.proposalDetails &&
  if (!ProposalDetails) return null;
  return (
    <div className="timeline-item mb-6 relative">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <FileCheck size={24} className="text-[#8bc34a] mr-2" />
          <div className="font-medium text-lg">
            Your Project Plans Are Ready
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Review & sign the proposal which works for you! We&apos;ve prepared
          detailed project plans based on your audit results. Choose the option
          that best fits your needs and budget to move forward with your home
          energy improvements.
        </p>

        <div className="mb-4">
          {ProposalDetails?.count > 0 && (
            <Link href="/document-portal#review-plans">
              <button className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors">
                <FileText size={18} />
                Go to Your Proposals
              </button>
            </Link>
          )}
        </div>

        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
          <div className="flex items-center gap-1 ml-auto">
            <span className="font-medium">Status:</span>
            <span className="text-[#8bc34a] font-medium">Complete</span>
          </div>
        </div>
        <Link href="/project-plans-ready">
          <button className="text-[#007BFF] text-sm font-medium">
            View Details
          </button>
        </Link>
      </div>
    </div>
    // )}
  );
};

const WeAreLinning = () => {
  return (
    <div className="timeline-item mb-6 relative">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center mb-2">
          <CheckCircle size={24} className="text-[#8bc34a] mr-2" />
          <div className="font-medium text-lg">
            We&apos;re Lining Everything Up
          </div>
        </div>

        <div className="mb-3 text-[#8bc34a] font-medium">
          Thanks for signing off!
        </div>

        <p className="text-gray-600 mb-4">
          We&apos;re wrapping up final details and approvals. Installation will
          be scheduled soon, and we&apos;ll keep you informed along the way.
        </p>

        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
          <div className="flex items-center gap-1 ml-auto">
            <span className="font-medium">Status:</span>
            <span className="text-[#8bc34a] font-medium">Processing</span>
          </div>
        </div>
        <Link href="/lining-everything-up">
          <button className="text-[#007BFF] text-sm font-medium">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

const ConsultationDerails = ({
  ConsultationDetails,
  BookingDetails,
  onClick,
}) => {
  // () =>
  //   openRescheduleModal("AUDIT-RESULTS-123")
  return (
    <div className="timeline-item mb-6 relative">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FileCheck size={24} className="text-[#8bc34a] mr-2" />
            <div className="font-medium text-lg">Your Audit Results are in</div>
          </div>
          {!isOneAndHalfHourAhead(BookingDetails?.startTime) &&
          ConsultationDetails?.rescheduleLink ? (
            <Link
              href={ConsultationDetails?.rescheduleLink}
              onClick={onClick}
              className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors"
            >
              <Clock size={18} />
              Reschedule
            </Link>
          ) : (
            <button
              disabled={
                isOneAndHalfHourAhead(BookingDetails?.startTime) &&
                ConsultationDetails?.rescheduleLink
              }
              className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors"
            >
              {" "}
              <Clock size={18} />
              Reschedule
            </button>
          )}
        </div>

        <p className="text-gray-600 mb-4">
          Your comprehensive home energy report is now available. Review your
          project plan and sign the contracts to proceed. All necessary
          documents, including your detailed report with findings,
          recommendations, and potential savings calculations are available for
          your review.
        </p>

        <div className="mb-4">
          <Link href="/report">
            <button className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors">
              <FileText size={18} />
              Go to Your Report
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-4">
          <div className="flex items-center gap-1">
            <ClipboardList size={16} className="text-[#8bc34a]" />
            <span>Consultation</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-[#8bc34a]" />
            <span>{formatDate(ConsultationDetails.startTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-[#8bc34a]" />
            <span>{formatTime(ConsultationDetails.startTime)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
          <div className="flex items-center gap-1 ml-auto">
            <span className="font-medium">Status:</span>
            <span className="text-[#8bc34a] font-medium">Complete</span>
          </div>
        </div>
        <Link href="/audit-results">
          <button className="text-[#007BFF] text-sm font-medium">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

const ReportConsaltation = ({ ReportConsultation }) => {
  return (
    <div className="timeline-item mb-6 relative">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FileSpreadsheet size={24} className="text-[#8bc34a] mr-2" />
            <div className="font-medium text-lg">
              Your Results Are In — Let&apos;s Talk
            </div>
          </div>
          <div className="flex gap-3 items-center">
            {ReportConsultation?.consultationBookingUrl ? (
              <Link
                target="_blank"
                href={ReportConsultation?.consultationBookingUrl}
                className={` bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 h-9`}
              >
                <Calendar size={18} />
                Book Consultation
              </Link>
            ) : (
              <button
                disabled={true}
                className={`opacity-35 bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 h-9`}
              >
                {" "}
                <Calendar size={18} />
                Book Consultation
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          We&apos;ve completed your audit and reviewed your home&apos;s
          performance. Now it&apos;s time to schedule a consultation with your
          Ciel Home Performance Consultant to walk through the findings and talk
          about what&apos;s next.
        </p>

        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
          <div className="flex items-center gap-1 ml-auto">
            <span className="font-medium">Status:</span>
            <span className="text-[#8bc34a] font-medium">Audit Complete</span>
          </div>
        </div>
        <Link href="/results-lets-talk">
          <button className="text-[#007BFF] text-sm font-medium">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

const UtilityBills = ({ UtilityBillDetails }) => {
  return (
    <div className="timeline-item mb-6 relative">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <FileText size={24} className="text-[#8bc34a] mr-2" />
          <div className="font-medium text-lg">Upload Your Utility Bills</div>
        </div>

        <p className="text-gray-600 mb-4">
          Refer to the Document Portal on the sidebar to upload your Utility
          Bills, our auditor will review this next. Sharing your utility bills
          helps us analyze your energy usage patterns and identify potential
          savings.
        </p>

        <div className="flex justify-between items-center">
          <Link href="/document-portal#upload-utility-bills">
            <button className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors">
              <FileText size={18} />
              Go to Your Bills
            </button>
          </Link>

          <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4">
            <div className="flex items-center gap-1">
              <span className="font-medium">Status:</span>
              <span className="text-[#8bc34a] font-medium">
                {UtilityBillDetails?.count > 0 ? "Completed" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link href="/utility-bills-details">
            <button className="text-[#007BFF] text-sm font-medium">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const EnergyAudit = ({ BookingDetails, onClick }) => {
  return (
    <div className="timeline-item mb-6 relative">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <ListChecks size={24} className="text-[#8bc34a] mr-2" />
            <div>
              <div className="font-medium text-lg">
                Professional Home Energy Audit
              </div>
              <div className="text-sm text-gray-500">
                Auditor Assigned:{" "}
                <span className="text-[#8bc34a] font-medium">
                  {BookingDetails?.auditor?.name}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClick}
            disabled={!BookingDetails?.rescheduleAvailable}
            className={`${!BookingDetails?.rescheduleAvailable ? "opacity-35" : ""} bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors`}
          >
            <Clock size={18} />
            Reschedule
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          We&apos;re preparing for an in-home visit to evaluate how your home
          uses energy. Your Ciel Home Energy Auditor will collect important
          details to help us understand how your home is performing.
        </p>

        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-[#8bc34a]" />
            <span>{formatDate(BookingDetails?.startTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-[#8bc34a]" />
            <span>{formatTime(BookingDetails?.startTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={16} className="text-[#8bc34a]" />
            <span>
              {!!BookingDetails?.address?.line1
                ? `${BookingDetails?.address?.line1},`
                : ""}
            </span>
            <span>
              {!!BookingDetails?.address?.line2
                ? `${BookingDetails?.address?.line2},`
                : ""}
            </span>
            <span>
              {!!BookingDetails?.address?.city
                ? `${BookingDetails?.address?.city},`
                : ""}
            </span>
            <span>
              {!!BookingDetails?.address?.province
                ? `${BookingDetails?.address?.province},`
                : ""}
            </span>
            <span>
              {!!BookingDetails?.address?.countryCode
                ? `${BookingDetails?.address?.countryCode}`
                : ""}
            </span>
            <span>
              {!!BookingDetails?.address?.postalCode
                ? `${BookingDetails?.address?.postalCode}`
                : ""}
            </span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <span className="font-medium">Status:</span>
            <span className="text-[#8bc34a] font-medium">Scheduled</span>
          </div>
        </div>

        <Link href="/dashboard/audit-details">
          <button className="text-[#007BFF] text-sm font-medium">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};
