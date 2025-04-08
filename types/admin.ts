export interface Booking {
  bookingNumber: string;
  startTime: string;
  endTime: string;
  title: string;
  canceled: boolean;
  accepted?: boolean;
  creationTime: string;
  serviceName: string;
  currentStage: string;
  customerId?: string;
  googleDriveFolder?: string;
  price?: {
    totalGross: { amount: string; currency: string };
    totalNet: { amount: string; currency: string };
    totalTaxes: { amount: string; currency: string };
    totalPaid: { amount: string; currency: string };
    taxes: any[];
  };
  auditor?: string;
}

export interface ContractDetails {
  id: string;
  name: string;
  status: string;
  displayContract: boolean;
  customerRecipient: string;
  cielPowerRepresentativeRecipient: string;
  created_at: string;
  updated_at: string;
}

export interface ContractDoc {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updateAt: string;
}

export interface Recipient {
  id: string;
  name: string;
  email: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    bookings: Booking[];
  };
}

export interface BookingDetailsResponse {
  success: boolean;
  message: string;
  data: {
    booking: Booking;
    report: {
      reportUrl: string;
      display: boolean;
    } | null;
  };
}

export interface BookingSearchResponse {
  success: boolean;
  message: string;
  data: {
    booking: Booking;
    cielPortalId: string | null;
    lead: NutshellLead | null;
  };
}

export interface NutshellLead {
  id: number;
  name: string;
  createdTime: string;
}

export interface LeadSearchResponse {
  success: boolean;
  message: string;
  data: {
    leads: NutshellLead[];
  };
}

export interface RecipientsResponse {
  success: boolean;
  message: string;
  data: {
    recipients: Recipient[];
  };
}
