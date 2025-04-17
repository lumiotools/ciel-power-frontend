"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AUTH_CONTEXT } from "./auth";
import { getBookingDetails, getRecommendedVideos } from "@/utils/booking";

export interface BookingDetails {
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
    consultationBookingUrl: string | null;
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

export interface RecommendedVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

export const BOOKING_CONTEXT = createContext<{
  isLoading: boolean;
  bookingDetails?: BookingDetails;
  recommendedVideos: RecommendedVideo[];
  refreshBookingData: () => Promise<void>;
}>({
  isLoading: true,
  recommendedVideos: [],
  refreshBookingData: async () => {},
});

const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<
    BookingDetails | undefined
  >();
  const [recommendedVideos, setRecommendedVideos] = useState<
    RecommendedVideo[]
  >([]);

  const { userDetails, isLoggedIn } = useContext(AUTH_CONTEXT);

  const refreshBookingData = async () => {
    if (isLoggedIn && userDetails?.bookingNumber) {
      setIsLoading(true);
      try {
        // Fetch booking data in parallel
        const [bookingDetailsResponse, recommendedVideosResponse] =
          await Promise.all([
            getBookingDetails(userDetails.bookingNumber),
            getRecommendedVideos(userDetails.bookingNumber),
          ]);
        console.log("recommended videos", recommendedVideosResponse);

        setBookingDetails(bookingDetailsResponse);
        setRecommendedVideos(recommendedVideosResponse || []);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshBookingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails?.bookingNumber, isLoggedIn]);

  return (
    <BOOKING_CONTEXT.Provider
      value={{
        isLoading,
        bookingDetails,
        recommendedVideos,
        refreshBookingData,
      }}
    >
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        children
      )}
    </BOOKING_CONTEXT.Provider>
  );
};

export default BookingProvider;
