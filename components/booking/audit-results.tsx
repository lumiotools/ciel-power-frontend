// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import {
//   LogOut,
//   FileText,
//   Award,
//   LayoutDashboard,
//   Home,
//   ChevronRight,
//   Percent,
//   FileCheck,
//   Zap,
//   DollarSign,
//   Leaf,
//   Calendar,
//   Clock,
//   HelpCircle,
//   Lightbulb,
//   ClipboardList,
//   Heart,
//   Compass,
//   ArrowRight,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useContext, useEffect } from "react";
// import BookingProgress from "../component/booking-progress";
// import { BOOKING_CONTEXT, type BookingDetails } from "@/providers/booking";
// import React from "react";

// interface ConsultationDetailsProps {
//   ConsultationDetails:
//     | {
//         startTime: string;
//         endTime: string;
//         isCancelled: boolean;
//         rescheduleLink: string;
//       }
//     | undefined;
//   BookingDetails:
//     | {
//         startTime: string;
//       }
//     | undefined;
//   onClick: () => void;
// }

// export default function AuditResults({
//   ConsultationDetails,
// }: ConsultationDetailsProps) {
//   const { bookingDetails } = useContext(BOOKING_CONTEXT);
//   const [openSection, setOpenSection] = useState<string | null>(null);
//   const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
//   const [latestState, setLatestState] = useState<keyof BookingDetails | null>(
//     null
//   );

//   const State: Array<keyof BookingDetails> = [
//     "bookingDetails",
//     "utilityBillDetails",
//     "reportConsultation",
//     "consultationDetails",
//     "proposalDetails",
//     "paymentDetails",
//   ];

//   useEffect(() => {
//     if (bookingDetails) {
//       // Start from the end (latest state) and work backwards
//       for (let i = State.length - 1; i >= 0; i--) {
//         const key = State[i];

//         // Check if the property exists in bookingDetails
//         if (bookingDetails[key]) {
//           // Special cases for each state
//           switch (key) {
//             case "paymentDetails":
//               // Only consider payment details if payment is in progress
//               if (bookingDetails.paymentDetails) {
//                 setLatestState(key);
//                 return;
//               }
//               break;

//             case "proposalDetails":
//               // Consider proposal details if they exist
//               if (bookingDetails.proposalDetails) {
//                 setLatestState(key);
//                 return;
//               }
//               break;

//             case "consultationDetails":
//               // Consider consultation details if not cancelled
//               if (
//                 bookingDetails.consultationDetails &&
//                 !bookingDetails.consultationDetails.isCancelled
//               ) {
//                 setLatestState(key);
//                 return;
//               }
//               break;

//             case "reportConsultation":
//               // Consider report consultation if it exists
//               if (bookingDetails.reportConsultation) {
//                 setLatestState(key);
//                 return;
//               }
//               break;

//             case "utilityBillDetails":
//               // Only consider utility bill details if count > 0
//               if (
//                 bookingDetails.utilityBillDetails &&
//                 bookingDetails.utilityBillDetails.count > 0
//               ) {
//                 setLatestState(key);
//                 return;
//               }
//               break;

//             case "bookingDetails":
//               // This is the default first state
//               if (bookingDetails.bookingDetails) {
//                 setLatestState(key);
//                 return;
//               }
//               break;

//             default:
//               break;
//           }
//         }
//       }

//       // Default to booking details if nothing else matches
//       if (bookingDetails.bookingDetails) {
//         setLatestState("bookingDetails");
//       } else {
//         setLatestState(null);
//       }
//     }
//   }, [bookingDetails]);

//   const toggleSection = (section: string) => {
//     if (openSection === section) {
//       setOpenSection(null);
//     } else {
//       setOpenSection(section);
//     }
//   };

//   const openRescheduleModal = (bookingId: string) => {
//     console.log(`Opening reschedule modal for booking ID: ${bookingId}`);
//     setRescheduleModalOpen(true);
//   };

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Main Content */}
//       <div className="flex-1 overflow-auto p-8 bg-white">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold">Booking Details</h1>
//           <p className="text-gray-600">View and manage booking</p>

//           {/* Breadcrumb */}
//           <div className="flex items-center text-sm text-gray-500 mt-2">
//             <Link href="/dashboard" className="hover:text-[#8bc34a]">
//               Dashboard
//             </Link>
//             <ChevronRight size={16} className="mx-2" />
//             <Link href="/dashboard" className="hover:text-[#8bc34a]">
//               Audit Details
//             </Link>
//             <ChevronRight size={16} className="mx-2" />
//             <span>Your Audit Results</span>
//             <ChevronRight size={16} className="mx-2" />
//             <span>View Details</span>
//           </div>
//         </div>

//         {/* Progress Tracker - Now using BookingProgress component */}
//         <BookingProgress className="mb-8" />

//         <div className="flex">
//           {/* Main Content */}
//           <div className="flex-1">
//             <h2 className="text-2xl font-bold mb-3">
//               Your Audit Results Are In
//             </h2>
//             <h3 className="text-xl font-semibold mb-6">
//               Your comprehensive home energy report is now ready for review.
//               This personalized report includes everything we uncovered during
//               your audit — from areas of energy loss and safety findings to a
//               prioritized list of recommended improvements, complete with
//               estimated savings, incentive eligibility, and upgrade costs.
//             </h3>

//             {/* Main Content Section */}
//             <div className="mb-4 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
//               <div className="flex items-center gap-2 mb-4">
//                 <h3 className="text-black text-lg font-bold">
//                   What’s in Your Report:
//                 </h3>
//               </div>
//               <ul className="list-disc pl-6 mb-4 space-y-5">
//                 <li>
//                   A detailed summary of your home’s current energy performance
//                 </li>
//                 <li>
//                   Specific recommendations to improve comfort, efficiency, and
//                   safety
//                 </li>
//                 <li>
//                   Estimated utility rebates, tax credits, and available
//                   financing
//                 </li>
//                 <li>A customized project plan tailored to your home</li>
//               </ul>
//               <p className="mb-3">
//                 You can access your full report at any time using the link
//                 below. It’s stored here in your portal for ongoing reference.
//               </p>
//             </div>
//             <div className="mb-8 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
//               <div className="flex items-center gap-2 mb-4">
//                 <h3 className="text-black text-lg font-bold">
//                   Your Consultation Is Scheduled
//                 </h3>
//               </div>
//               <p className="mb-3">
//                 Your next step is to meet with your Ciel Home Performance
//                 Consultant to walk through your results and explore what’s next.
//                 This is a conversation designed around you — your goals, your
//                 questions, your home.
//               </p>

//               <Link
//                 href={ConsultationDetails?.rescheduleLink || ""}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`${ConsultationDetails?.rescheduleLink !== null ? "bg-[#8bc34a] w-40 mb-3 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors" : "pointer-events-none opacity-35 bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 h-9"}`}
//               >
//                 <Clock size={18} className="text-white" />
//                 Reschedule
//               </Link>
//               <p className="mb-3">
//                 Need to change your appointment? Use the link above at any time.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Calendar,
  Clock,
  HelpCircle,
  Lightbulb,
  ClipboardList,
  Heart,
  Compass,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import BookingProgress from "../component/booking-progress";
import { BOOKING_CONTEXT, type BookingDetails } from "@/providers/booking";
import React from "react";

export default function AuditResults() {
  const { bookingDetails } = useContext(BOOKING_CONTEXT);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [latestState, setLatestState] = useState<keyof BookingDetails | null>(
    null
  );
  const [showReportDetails, setShowReportDetails] = useState(false);

  // Extract consultation details from bookingDetails context
  const consultationDetails = bookingDetails?.consultationDetails;

  const State: Array<keyof BookingDetails> = [
    "bookingDetails",
    "utilityBillDetails",
    "reportConsultation",
    "consultationDetails",
    "proposalDetails",
    "paymentDetails",
  ];

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

  const toggleReportDetails = () => {
    setShowReportDetails(!showReportDetails);
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

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3">
              Your Audit Results Are In
            </h2>
            <h3 className="text-xl font-semibold mb-6">
              Your comprehensive home energy report is now ready for review.
              This personalized report includes everything we uncovered during
              your audit — from areas of energy loss and safety findings to a
              prioritized list of recommended improvements, complete with
              estimated savings, incentive eligibility, and upgrade costs.
            </h3>
            {/* Main Content Section */}
            <div className="mb-4 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-black text-lg font-bold">
                  What's in Your Report:
                </h3>
              </div>
              <ul className="list-disc pl-6 mb-4 space-y-5">
                <li>
                  A detailed summary of your home's current energy performance
                </li>
                <li>
                  Specific recommendations to improve comfort, efficiency, and
                  safety
                </li>
                <li>
                  Estimated utility rebates, tax credits, and available
                  financing
                </li>
                <li>A customized project plan tailored to your home</li>
              </ul>
              <p className="mb-3">
                You can access your full report at any time using the link
                below. It's stored here in your portal for ongoing reference.
              </p>
              <div className="mb-4">
                <Link href="/dashboard/report">
                  <button className="bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors">
                    <FileText size={18} />
                    Go to Your Report
                  </button>
                </Link>
              </div>
            </div>
            <div className="mb-4 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0] transform transition-transform duration-300">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-black text-lg font-bold">
                  Your Consultation Is Scheduled
                </h3>
              </div>
              <p className="mb-3">
                Your next step is to meet with your Ciel Home Performance
                Consultant to walk through your results and explore what's next.
                This is a conversation designed around you — your goals, your
                questions, your home.
              </p>

              {/* Updated reschedule button using consultationDetails from context */}
              <Link
                href={consultationDetails?.rescheduleLink || ""}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  consultationDetails?.rescheduleLink
                    ? "bg-[#8bc34a] w-40 mb-3 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#95c25a] transition-colors"
                    : "w-40 mb-3 pointer-events-none opacity-35 bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 h-9"
                }`}
              >
                <Clock size={18} className="text-white" />
                Reschedule
              </Link>
              <p className="mb-3">
                Need to change your appointment? Use the link above at any time.
              </p>
            </div>
            <div className="mb-4 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-black text-lg font-bold">
                  Help Us Help You
                </h3>
              </div>
              <p className="mb-3">
                We encourage you to be open during your consultation. Tell us
                how your home feels — especially during extreme weather. Let us
                know if you or anyone in your household has allergy
                sensitivities, noise concerns, or comfort issues in specific
                rooms. If you joined the program with a particular goal in mind
                — reducing energy bills, improving indoor air quality, preparing
                for resale — we want to hear about it.
              </p>
              <p className="mb-3">
                We’re here to help make your home healthier, more comfortable,
                and more energy efficient. The more we know, the better we can
                tailor your plan.
              </p>
            </div>
            <div className="mb-4 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-black text-lg font-bold">Moving Forward</h3>
              </div>
              <p className="mb-3">
                If you choose to move ahead with any recommended improvements,
                your consultant will handle everything from securing rebates to
                coordinating installation. Most of the documents can be reviewed
                and signed electronically — simple, secure, and convenient.
              </p>
              <p className="mb-3">
                Have questions before your consultation? Just reach out. We’re
                always here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
