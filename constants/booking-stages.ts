// Stage mapping and configuration
export const BOOKING_STAGES = [
    "bookingCreated",
    "utilityBills",
    "auditPerformed",
    "reportGenerated",
    "followUpScheduled",
    "proposalSigned",
    "paymentDone"
  ]
  
  export const STAGE_LABELS: Record<string, string> = {
    "bookingCreated": "Booking Created",
    "utilityBills": "Utility Bills Uploaded",
    "auditPerformed": "Audit Performed",
    "reportGenerated": "Report Generated",
    "followUpScheduled": "Follow Up Scheduled",
    "proposalSigned": "Proposal Signed",
    "paymentDone": "Payment Done"
  }
  