export interface Booking {
  bookingNumber: string;
  startTime: string;
  title: string;
  address: string;
  creationTime: string;
  utilityBillsUploaded: boolean;
  currentStage: string;
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
    pagination: {
      current_page: number;
      total_pages: number;
      total_records: number;
      limit: number;
    }
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
