// Stage mapping and configuration
export const BOOKING_STAGES = [
  "bookingCreated",
  "utilityBills",
  "auditPerformed",
  "followUpScheduled",
  "reportGenerated",
  "proposalSigned",
  "paymentCompleted",
];

export const STAGE_LABELS: Record<string, string> = {
  bookingCreated: "Booking Created",
  utilityBills: "Utility Bills Uploaded",
  auditPerformed: "Audit Performed",
  followUpScheduled: "Follow Up Scheduled",
  reportGenerated: "Report Generated",
  proposalSigned: "Proposal Signed",
  paymentCompleted: "Payment Completed",
};
