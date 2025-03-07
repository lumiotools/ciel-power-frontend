export interface Booking {
    bookingNumber: string
    startTime: string
    endTime: string
    title: string
    canceled: boolean
    accepted: boolean
    creationTime: string
    serviceName: string
    currentStage: string
  }
  
  export interface BookingResponse {
    success: boolean
    message: string
    data: {
      bookings: Booking[]
    }
  }
  
  export interface NutshellLead {
    name: string
    email: string
    phone: string
  }
  