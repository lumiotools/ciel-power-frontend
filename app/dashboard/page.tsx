"use client";

import type React from "react";

import { useEffect, useState, useContext } from "react";
import { AUTH_CONTEXT, type UserDetails } from "../../providers/auth";
import { Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import GoogleReview from "./_comp/Google-review";
import Recommendation from "./_comp/Recommendation";

import {
  ClipboardList,
  FileText,
  MapPin,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileCheck,
  ListChecks,
  FileSpreadsheet,
} from "lucide-react";
import RescheduleModal from "@/components/component/reshedule-modal";
import PaymentModal from "@/components/payment/modal";
import { BOOKING_CONTEXT, type BookingDetails } from "@/providers/booking";

interface PaymentDetailsProps {
  PaymentDetails:
    | {
        amount: number;
        status: string;
      }
    | undefined;
  userDetails: UserDetails | undefined;
  onClick: () => void;
}

interface ProjectPlansReadyProps {
  ProposalDetails:
    | {
        count: number;
        completedContractLink: string;
      }
    | undefined;
}

interface ReportConsultationProps {
  ReportConsultation:
    | {
        consultationBookingUrl: string | null;
      }
    | undefined;
}

interface UtilityBillsProps {
  UtilityBillDetails:
    | {
        count: number;
      }
    | undefined;
}

interface EnergyAuditProps {
  BookingDetails:
    | {
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
      }
    | undefined;
  onClick: () => void;
}

interface ConsultationDetailsProps {
  ConsultationDetails:
    | {
        startTime: string;
        endTime: string;
        isCancelled: boolean;
        rescheduleLink: string;
      }
    | undefined;
  BookingDetails:
    | {
        startTime: string;
      }
    | undefined;
  onClick: () => void;
}

interface TimelineItemProps {
  state: keyof BookingDetails;
  currentState: keyof BookingDetails | null;
  bookingDetails: BookingDetails;
  children: React.ReactNode;
}

const isOneAndHalfHourAhead = (startTime?: string): boolean => {
  if (!startTime) return false;
  const startDate = new Date(startTime);
  const currentDate = new Date();
  if (currentDate < startDate) return false;
  const diffInHours =
    (startDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
  return diffInHours >= 1.5;
};

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    weekday: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const formatTime = (dateStr?: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  }).format(date);
};

// Replace the shouldBeGreen function with this updated version
const shouldBeGreen = (
  state: keyof BookingDetails,
  bookingDetails: BookingDetails,
  latestState: keyof BookingDetails | null
): boolean => {
  // Only the current/latest state should be green
  return state === latestState;
};

// Update the TimelineItem component to pass latestState to shouldBeGreen
const TimelineItem = ({
  state,
  currentState,
  bookingDetails,
  children,
}: TimelineItemProps) => {
  const isGreen = shouldBeGreen(state, bookingDetails, currentState);
  const greenBgClass = isGreen ? "bg-[#f0f8e6]" : "bg-white";

  return (
    <div className="timeline-item mb-6 relative">
      <div className={`${greenBgClass} rounded-lg p-6 border border-gray-200`}>
        {children}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { isLoading, bookingDetails, recommendedVideos, refreshBookingData } =
    useContext(BOOKING_CONTEXT);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to track if timeline is expanded or collapsed
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(true);
  // State for reschedule modal
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState("");
  const [latestState, setLatestState] = useState<keyof BookingDetails | null>(
    null
  );

  const State: Array<keyof BookingDetails> = [
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
    if (bookingDetails) {
      // Start from the end (latest state) and work backwards
      for (let i = State.length - 1; i >= 0; i--) {
        const key = State[i];

        // Check if the property exists in bookingDetails
        if (bookingDetails[key]) {
          // Special cases for each state
          switch (key) {
            case "paymentDetails":
              // Only consider payment details if payment is in progress
              if (bookingDetails.paymentDetails) {
                setLatestState(key);
                return;
              }
              break;

            case "proposalDetails":
              // Consider proposal details if they exist
              if (bookingDetails.proposalDetails) {
                setLatestState(key);
                return;
              }
              break;

            case "consultationDetails":
              // Consider consultation details if not cancelled
              if (
                bookingDetails.consultationDetails &&
                !bookingDetails.consultationDetails.isCancelled
              ) {
                setLatestState(key);
                return;
              }
              break;

            case "reportConsultation":
              // Consider report consultation if it exists
              if (bookingDetails.reportConsultation) {
                setLatestState(key);
                return;
              }
              break;

            case "utilityBillDetails":
              // Only consider utility bill details if count > 0
              if (
                bookingDetails.utilityBillDetails &&
                bookingDetails.utilityBillDetails.count > 0
              ) {
                setLatestState(key);
                return;
              }
              break;

            case "bookingDetails":
              // This is the default first state
              if (bookingDetails.bookingDetails) {
                setLatestState(key);
                return;
              }
              break;

            default:
              break;
          }
        }
      }

      // Default to booking details if nothing else matches
      if (bookingDetails.bookingDetails) {
        setLatestState("bookingDetails");
      } else {
        setLatestState(null);
      }
    }
  }, [bookingDetails]);

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

  const { userDetails } = useContext(AUTH_CONTEXT);

  // Function to render the latest state component
  // Update the renderLatestStateComponent function to use the new shouldBeGreen logic
  const renderLatestStateComponent = () => {
    if (!latestState || !bookingDetails) return null;

    const isGreen = shouldBeGreen(latestState, bookingDetails, latestState);
    const greenBgClass = isGreen ? "bg-[#f0f8e6]" : "bg-white";

    switch (latestState) {
      case "paymentDetails":
        return bookingDetails?.paymentDetails ? (
          <div
            className={`${greenBgClass} rounded-lg p-6 border border-gray-200`}
          >
            <PaymentDetails
              PaymentDetails={bookingDetails.paymentDetails}
              userDetails={userDetails}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        ) : null;
      case "proposalDetails":
        return bookingDetails?.proposalDetails ? (
          <div
            className={`${greenBgClass} rounded-lg p-6 border border-gray-200`}
          >
            <ProjectPlansReady
              ProposalDetails={bookingDetails.proposalDetails}
            />
          </div>
        ) : null;
      case "consultationDetails":
        return bookingDetails?.consultationDetails ? (
          <div
            className={`${greenBgClass} rounded-lg p-6 border border-gray-200`}
          >
            <ConsultationDerails
              BookingDetails={bookingDetails.bookingDetails}
              ConsultationDetails={bookingDetails.consultationDetails}
              onClick={() => openRescheduleModal("AUDIT-RESULTS-123")}
            />
          </div>
        ) : null;
      case "reportConsultation":
        return bookingDetails?.reportConsultation ? (
          <div
            className={`${greenBgClass} rounded-lg p-6 border border-gray-200`}
          >
            <ReportConsaltation
              ReportConsultation={bookingDetails.reportConsultation}
            />
          </div>
        ) : null;
      case "utilityBillDetails":
        return bookingDetails?.utilityBillDetails ? (
          <div
            className={`${greenBgClass} rounded-lg p-6 border border-gray-200`}
          >
            <UtilityBills
              UtilityBillDetails={bookingDetails.utilityBillDetails}
            />
          </div>
        ) : null;
      case "bookingDetails":
        return bookingDetails?.bookingDetails ? (
          <div
            className={`${greenBgClass} rounded-lg p-6 border border-gray-200`}
          >
            <EnergyAudit
              BookingDetails={bookingDetails.bookingDetails}
              onClick={() => openRescheduleModal("AUDIT-345678")}
            />
          </div>
        ) : null;
      default:
        return null;
    }
  };

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
                {/* Show only the latest state component when collapsed */}
                {!isTimelineExpanded && renderLatestStateComponent()}

                {/* Show all timeline items when expanded */}
                {isTimelineExpanded && (
                  <div className="timeline-items-container">
                    {/* Payment Details */}
                    {bookingDetails?.paymentDetails && (
                      <TimelineItem
                        state="paymentDetails"
                        currentState={latestState}
                        bookingDetails={bookingDetails}
                      >
                        <PaymentDetails
                          PaymentDetails={bookingDetails?.paymentDetails}
                          userDetails={userDetails}
                          onClick={() => setIsModalOpen(true)}
                        />
                      </TimelineItem>
                    )}

                    {/* Project Plans Ready */}
                    {bookingDetails?.proposalDetails && (
                      <TimelineItem
                        state="proposalDetails"
                        currentState={latestState}
                        bookingDetails={bookingDetails}
                      >
                        <ProjectPlansReady
                          ProposalDetails={bookingDetails?.proposalDetails}
                        />
                      </TimelineItem>
                    )}

                    {/* Timeline Item - We're Lining Everything Up */}
                    {isOneAndHalfHourAhead(
                      bookingDetails?.bookingDetails?.startTime
                    ) && (
                      <div className="timeline-item mb-6 relative">
                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                          <WeAreLinning />
                        </div>
                      </div>
                    )}

                    {/* Timeline Item - Your Audit Results are in */}
                    {bookingDetails?.consultationDetails && (
                      <TimelineItem
                        state="consultationDetails"
                        currentState={latestState}
                        bookingDetails={bookingDetails}
                      >
                        <ConsultationDerails
                          BookingDetails={bookingDetails.bookingDetails}
                          ConsultationDetails={
                            bookingDetails.consultationDetails
                          }
                          onClick={() =>
                            openRescheduleModal("AUDIT-RESULTS-123")
                          }
                        />
                      </TimelineItem>
                    )}

                    {/* Timeline Item - Your Results Are In — Let's Talk */}
                    {bookingDetails?.reportConsultation && (
                      <TimelineItem
                        state="reportConsultation"
                        currentState={latestState}
                        bookingDetails={bookingDetails}
                      >
                        <ReportConsaltation
                          ReportConsultation={
                            bookingDetails?.reportConsultation
                          }
                        />
                      </TimelineItem>
                    )}

                    {/* Timeline Item - Upload Your Utility Bills */}
                    {bookingDetails?.utilityBillDetails && (
                      <TimelineItem
                        state="utilityBillDetails"
                        currentState={latestState}
                        bookingDetails={bookingDetails}
                      >
                        <UtilityBills
                          UtilityBillDetails={
                            bookingDetails?.utilityBillDetails
                          }
                        />
                      </TimelineItem>
                    )}

                    {/* Timeline Item - Professional Home Energy Audit */}
                    {bookingDetails?.bookingDetails && (
                      <TimelineItem
                        state="bookingDetails"
                        currentState={latestState}
                        bookingDetails={bookingDetails}
                      >
                        <EnergyAudit
                          BookingDetails={bookingDetails?.bookingDetails}
                          onClick={() => openRescheduleModal("AUDIT-345678")}
                        />
                      </TimelineItem>
                    )}
                  </div>
                )}
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

          {/* Recommended for you */}
          {recommendedVideos && recommendedVideos.length > 0 && (
            <Recommendation data={recommendedVideos} />
          )}

          {/* Google review */}
          <GoogleReview />
        </div>
      </div>
    </div>
  );
}

const PaymentDetails = ({
  PaymentDetails,
  userDetails,
  onClick,
}: PaymentDetailsProps) => {
  if (!PaymentDetails) return null;
  return (
    <>
      <div className="flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            disabled={PaymentDetails?.status === "Paid"}
            onClick={onClick}
            className="bg-[#8bc34a] text-white px-4 py-2 rounded-md hover:bg-[#95c25a] transition-colors"
          >
            Pay Now
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
        <a href="/dashboard/one-last-thing">
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
    </>
  );
};

const ProjectPlansReady = ({ ProposalDetails }: ProjectPlansReadyProps) => {
  if (!ProposalDetails) return null;
  return (
    <>
      <div className="flex items-center mb-4">
        <FileCheck size={24} className="text-[#8bc34a] mr-2" />
        <div className="font-medium text-lg">Your Project Plans Are Ready</div>
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
      <Link href="/dashboard/project-plans-ready">
        <button className="text-[#007BFF] text-sm font-medium">
          View Details
        </button>
      </Link>
    </>
  );
};

const WeAreLinning = () => {
  return (
    <>
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
        We&apos;re wrapping up final details and approvals. Installation will be
        scheduled soon, and we&apos;ll keep you informed along the way.
      </p>

      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
        <div className="flex items-center gap-1 ml-auto">
          <span className="font-medium">Status:</span>
          <span className="text-[#8bc34a] font-medium">Processing</span>
        </div>
      </div>
      <Link href="/dashboard/lining-everything-up">
        <button className="text-[#007BFF] text-sm font-medium">
          View Details
        </button>
      </Link>
    </>
  );
};

const ConsultationDerails = ({
  ConsultationDetails,
  BookingDetails,
}: ConsultationDetailsProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FileCheck size={24} className="text-[#8bc34a] mr-2" />
          <div className="font-medium text-lg">Your Audit Results are in</div>
        </div>
        {!isOneAndHalfHourAhead(BookingDetails?.startTime) &&
        ConsultationDetails?.rescheduleLink ? (
          <Link
            href={ConsultationDetails?.rescheduleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors"
          >
            <Clock size={18} />
            Reschedule
          </Link>
        ) : (
          <button
            disabled={Boolean(
              isOneAndHalfHourAhead(BookingDetails?.startTime) &&
                ConsultationDetails?.rescheduleLink
            )}
            className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors"
          >
            <Clock size={18} />
            Reschedule
          </button>
        )}
      </div>

      <p className="text-gray-600 mb-4">
        Your comprehensive home energy report is now available. Review your
        project plan and sign the contracts to proceed. All necessary documents,
        including your detailed report with findings, recommendations, and
        potential savings calculations are available for your review.
      </p>

      <div className="mb-4">
        <Link href="/dashboard/report">
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
          <span>{formatDate(ConsultationDetails?.startTime)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-[#8bc34a]" />
          <span>{formatTime(ConsultationDetails?.startTime)}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-2">
        <div className="flex items-center gap-1 ml-auto">
          <span className="font-medium">Status:</span>
          <span className="text-[#8bc34a] font-medium">Complete</span>
        </div>
      </div>
      <Link href="/dashboard/audit-results">
        <button className="text-[#007BFF] text-sm font-medium">
          View Details
        </button>
      </Link>
    </>
  );
};

const ReportConsaltation = ({
  ReportConsultation,
}: ReportConsultationProps) => {
  return (
    <>
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
              href={ReportConsultation.consultationBookingUrl}
              className={`bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 h-9`}
            >
              <Calendar size={18} />
              Book Consultation
            </Link>
          ) : (
            <button
              disabled={true}
              className={`opacity-35 bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 h-9`}
            >
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
          <span className="text-[#8bc34a] font-medium">Complete</span>
        </div>
      </div>
      <Link href="/dashboard/results-lets-talk">
        <button className="text-[#007BFF] text-sm font-medium">
          View Details
        </button>
      </Link>
    </>
  );
};

const UtilityBills = ({ UtilityBillDetails }: UtilityBillsProps) => {
  return (
    <>
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
              {UtilityBillDetails && UtilityBillDetails.count > 0
                ? "Completed"
                : "Pending"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/dashboard/utility-bills-details">
          <button className="text-[#007BFF] text-sm font-medium">
            View Details
          </button>
        </Link>
      </div>
    </>
  );
};

const EnergyAudit = ({ BookingDetails, onClick }: EnergyAuditProps) => {
  return (
    <>
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
          className={`${
            !BookingDetails?.rescheduleAvailable ? "opacity-35" : ""
          } bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors`}
        >
          <Clock size={18} />
          Reschedule
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        We&apos;re preparing for an in-home visit to evaluate how your home uses
        energy. Your Ciel Home Energy Auditor will collect important details to
        help us understand how your home is performing.
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
        <div className="flex items-center gap-1">
          <span className="font-medium">Status:</span>
          <span className="text-[#8bc34a] font-medium">Scheduled</span>
        </div>
      </div>

      <Link href="/dashboard/audit-details">
        <button className="text-[#007BFF] text-sm font-medium">
          View Details
        </button>
      </Link>
    </>
  );
};
