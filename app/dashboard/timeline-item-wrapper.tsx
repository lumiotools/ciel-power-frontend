import type React from "react";
import type { BookingDetails } from "@/providers/booking";

// Update the TimelineItemWrapperProps interface
interface TimelineItemWrapperProps {
  state: keyof BookingDetails;
  currentState: keyof BookingDetails | null;
  bookingDetails?: BookingDetails;
  children: React.ReactNode;
}

export const shouldBeGreen = (
  state: keyof BookingDetails,
  bookingDetails?: BookingDetails
): boolean => {
  if (!bookingDetails) return false;

  switch (state) {
    case "bookingDetails":
      return true; // Always green
    case "utilityBillDetails":
      return bookingDetails.utilityBillDetails?.count > 0;
    case "reportConsultation":
      return true; // Always green
    case "consultationDetails":
      return true; // Always green
    case "proposalDetails":
      return !!bookingDetails.proposalDetails?.completedContractLink;
    case "paymentDetails":
      return bookingDetails.paymentDetails?.status === "Paid";
    default:
      return false;
  }
};

// Update the isLatest check
export default function TimelineItemWrapper({
  state,
  currentState,
  bookingDetails,
  children,
}: TimelineItemWrapperProps) {
  const isLatest = state === currentState && currentState !== null;
  const isGreen = isLatest && shouldBeGreen(state, bookingDetails);
  const bgColorClass = isGreen ? "bg-[#f0f8e6]" : "bg-white";
  const borderColorClass = isGreen ? "border-[#7ab236]" : "border-gray-200";

  return (
    <div className="timeline-item mb-6 relative">
      <div className={`${bgColorClass} rounded-lg p-6 border-2 ${borderColorClass}`}>
        {children}
      </div>
    </div>
  );
}
