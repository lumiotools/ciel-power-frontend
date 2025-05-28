// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { BOOKING_CONTEXT } from "@/providers/booking";
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
//   Upload,
//   PiggyBank,
//   ArrowRight,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useContext } from "react";
// import BookingProgress from "../component/booking-progress";

// export default function ResultsLetsTalk() {
//   const { bookingDetails } = useContext(BOOKING_CONTEXT);
//   const [openSection, setOpenSection] = useState<string | null>(null);

//   const toggleSection = (section: string) => {
//     if (openSection === section) {
//       setOpenSection(null);
//     } else {
//       setOpenSection(section);
//     }
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
//             <span>Your Results Are In — Let&apos;s Talk</span>
//             <ChevronRight size={16} className="mx-2" />
//             <span>View Details</span>
//           </div>
//         </div>

//         {/* Progress Tracker - Using BookingProgress component */}
//         <BookingProgress className="mb-8" />

//         <div className="flex">
//           {/* Main Content */}
//           <div className="flex-1">
//             <h2 className="text-2xl font-bold mb-3">
//               Your Results Are In — Let’s Talk
//             </h2>
//             <h3 className="text-xl font-semibold mb-6">
//               We’ve completed your audit and reviewed your home’s performance.
//               Now it’s time to schedule a consultation with your Ciel Home
//               Performance Consultant to walk through the findings and explore
//               your options. Your consultant is a trained expert in building
//               science and energy efficiency programs. They’ll take time to
//               explain what we found, answer your questions, and help you
//               understand which improvements offer the best value for your home,
//               comfort, and budget.
//             </h3>

//             <div className="flex">
//               {/* Main Content */}
//               <div className="flex-1">
//                 {/* Main Content Section */}
//                 <div className="mb-4 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
//                   <div className="flex items-center gap-2 mb-4">
//                     <h3 className="text-black text-lg font-bold">
//                       What to Expect During the Consultation
//                     </h3>
//                   </div>
//                   <p className="mb-3">
//                     This is a one-on-one conversation focused entirely on your
//                     home. We’ll walk through:
//                   </p>
//                   <ul className="list-disc pl-6 mb-4 space-y-5">
//                     <li>Your home’s energy model and audit results</li>
//                     <li>
//                       Recommendations for improvements, including pricing and
//                       projected savings
//                     </li>
//                     <li>
//                       Available rebates, financing options, and tax credits
//                     </li>
//                     <li>Any concerns or goals you’d like to discuss</li>
//                   </ul>
//                   <p className="mb-3">
//                     Your audit report and recommendations will also be available
//                     here in the portal for your ongoing reference.
//                   </p>
//                 </div>
//                 <div className="mb-4 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
//                   <div className="flex items-center gap-2 mb-4">
//                     <h3 className="text-black text-lg font-bold">
//                       Ready to Take the Next Step?
//                     </h3>
//                   </div>
//                   <p className="mb-3">
//                     If you decide to move forward, your consultant will
//                     coordinate everything — from finalizing the scope of work to
//                     facilitating your participation in New Jersey’s utility
//                     incentive programs. Most of the paperwork is handled online,
//                     and many documents can be signed electronically right from
//                     the portal or your inbox.
//                   </p>
//                 </div>
//                 <div className="mb-8 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
//                   <div className="flex items-center gap-2 mb-4">
//                     <h3 className="text-black text-lg font-bold">
//                       Book Your Consultation{" "}
//                     </h3>
//                   </div>
//                   <p className="mb-3">
//                     Choose a time that works best for you using the scheduler
//                     below. You’ll be able to meet by phone or video, and you’ll
//                     receive a summary after the meeting for your records.
//                   </p>
//                   <div className="flex gap-3 items-center">
//                     {ReportConsultation?.consultationBookingUrl ? (
//                       <Link
//                         target="_blank"
//                         href={ReportConsultation.consultationBookingUrl}
//                         className={`bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 h-9`}
//                       >
//                         <Calendar size={18} />
//                         Book Consultation
//                       </Link>
//                     ) : (
//                       <button
//                         disabled={true}
//                         className={`opacity-35 bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 h-9`}
//                       >
//                         <Calendar size={18} />
//                         Book Consultation
//                       </button>
//                     )}
//                   </div>
//                   <p className="mb-3">
//                     If you have any questions before your consultation or need
//                     help scheduling, we’re just a message away.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  Upload,
  PiggyBank,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";
import BookingProgress from "../component/booking-progress";

export default function ResultsLetsTalk() {
  const { bookingDetails } = useContext(BOOKING_CONTEXT);
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Extract reportConsultation from bookingDetails context
  const reportConsultation = bookingDetails?.reportConsultation;

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
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
            <span>Your Results Are In — Let&apos;s Talk</span>
            <ChevronRight size={16} className="mx-2" />
            <span>View Details</span>
          </div>
        </div>

        {/* Progress Tracker - Using BookingProgress component */}
        <BookingProgress className="mb-8" />

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3">
              Your Results Are In — Let's Talk
            </h2>
            <h3 className="text-xl font-semibold mb-6">
              We've completed your audit and reviewed your home's performance.
              Now it's time to schedule a consultation with your Ciel Home
              Performance Consultant to walk through the findings and explore
              your options. Your consultant is a trained expert in building
              science and energy efficiency programs. They'll take time to
              explain what we found, answer your questions, and help you
              understand which improvements offer the best value for your home,
              comfort, and budget.
            </h3>

            <div className="flex">
              {/* Main Content */}
              <div className="flex-1">
                {/* Main Content Section */}
                <div className="mb-4 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-black text-lg font-bold">
                      What to Expect During the Consultation
                    </h3>
                  </div>
                  <p className="mb-3">
                    This is a one-on-one conversation focused entirely on your
                    home. We'll walk through:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-5">
                    <li>Your home's energy model and audit results</li>
                    <li>
                      Recommendations for improvements, including pricing and
                      projected savings
                    </li>
                    <li>
                      Available rebates, financing options, and tax credits
                    </li>
                    <li>Any concerns or goals you'd like to discuss</li>
                  </ul>
                  <p className="mb-3">
                    Your audit report and recommendations will also be available
                    here in the portal for your ongoing reference.
                  </p>
                </div>
                <div className="mb-4 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-black text-lg font-bold">
                      Ready to Take the Next Step?
                    </h3>
                  </div>
                  <p className="mb-3">
                    If you decide to move forward, your consultant will
                    coordinate everything — from finalizing the scope of work to
                    facilitating your participation in New Jersey's utility
                    incentive programs. Most of the paperwork is handled online,
                    and many documents can be signed electronically right from
                    the portal or your inbox.
                  </p>
                </div>
                <div className="mb-8 text-gray-600 p-6 rounded-lg border-2 border-[#e0f0d0]">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-black text-lg font-bold">
                      Book Your Consultation{" "}
                    </h3>
                  </div>
                  <p className="mb-3">
                    Choose a time that works best for you using the scheduler
                    below. You'll be able to meet by phone or video, and you'll
                    receive a summary after the meeting for your records.
                  </p>
                  <div className="flex gap-3 items-center">
                    {reportConsultation?.consultationBookingUrl ? (
                      <Link
                        target="_blank"
                        href={reportConsultation.consultationBookingUrl}
                        className={`mb-3 bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 h-9 hover:bg-[#95c25a] transition-colors`}
                      >
                        <Calendar size={18} />
                        Book Consultation
                      </Link>
                    ) : (
                      <button
                        disabled={true}
                        className={`mb-3 pointer-events-none opacity-35 bg-[#8bc34a] text-white px-4 py-2 rounded-md flex items-center gap-2 h-9`}
                      >
                        <Calendar size={18} />
                        Book Consultation
                      </button>
                    )}
                  </div>
                  <p className="mb-3">
                    If you have any questions before your consultation or need
                    help scheduling, we're just a message away.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
