



"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { AUTH_CONTEXT } from "../../../../providers/auth"; // Adjust the import path as needed
import {
  ArrowLeft,
  Clock,
  User,
  Building2,
  Calendar,
  Loader2,
  BadgeCheck,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RescheduleModal from "@/components/modal/RescheduleModal";
import UtilityBills from "@/components/booking/utilityBills";
import KnowledgeContent from "@/components/booking/knowledgeContent";
import BookingProgress from "@/components/component/booking-progress";
import BlogContent from "@/components/booking/blogs";

interface Price {
  totalGross: { amount: string; currency: string };
  totalNet: { amount: string; currency: string };
  totalTaxes: { amount: string; currency: string };
  totalPaid: { amount: string; currency: string };
  taxes: unknown[];
}

interface BookingDetails {
  bookingNumber: string;
  startTime: string;
  endTime: string;
  title: string;
  creationTime: string;
  canceled: boolean;
  cancelationTime?: string;
  accepted: boolean;
  serviceName: string;
  serviceId: string;
  price: Price;
  auditor: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    booking: BookingDetails;
    youtubeVideos: YouTubeVideo[]; 
    blogs: BlogPost[];
  };
}

interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface BlogPost {
  blog_id: number
  title: string
  description: string
  thumbnailLink: string
  pageLink: string
}

const BookingDetailsPage = () => {
  const { bookingNumber } = useParams();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [youtubeSuggestions, setYoutubeSuggestions] = useState<YouTubeVideo[]>([]); 
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const { userDetails, isLoggedIn, isLoading, checkAuth } =
  useContext(AUTH_CONTEXT);
  const handleRescheduleClick = () => {
    setModalOpen(true);
  };
 
  const contact_number = userDetails ? userDetails['phoneNumbers'][0]['number'] : '';
  
 
  

  let full_address = "";
  if (userDetails) {
    const street_address = userDetails.streetAddress;
    full_address = `${street_address.line1} ${street_address.line2}, ${street_address.city}, ${street_address.province} ${street_address.postalCode}`;
    console.log(full_address);
  }
  // const [uploading, setUploading] = useState(false);
  // const MAX_SIZE_MB = 20; 
  
  async function handleCancelBooking(bookingNumber:BookingDetails['bookingNumber']) {
    try {
      // Adjust your endpoint as needed (e.g., "/api/bookings" vs. "/bookings")
      const response = await fetch(`/api/user/bookings/${bookingNumber}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        // Handle non-2xx responses
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to cancel booking");
      }
  
      // If successful, parse JSON
      const data = await response.json();
      alert(data.message || "Booking canceled successfully");
      
     
     window.location.reload(); // or setState(...)
  
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } 
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleReschedule = (startTime?: string, endTime?: string) => {
    setBooking((prevBooking) => {
      if (!prevBooking) return null;

      return {
        ...prevBooking,
        startTime: startTime || prevBooking.startTime,
        endTime: endTime || prevBooking.endTime,
      };
    });
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/user/bookings/${bookingNumber}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data: ApiResponse = await response.json();
        if (data.success) {
          setBooking(data.data.booking);
          console.log( 'youtube videos',data.data.youtubeVideos)
          setYoutubeSuggestions(data.data.youtubeVideos)
          setBlogs(data.data.blogs)
        } else {
          throw new Error(data.message || "Failed to fetch booking details");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingNumber]);

  const formatDateTime = (startStr: string, endStr?: string): string => {
    const start = new Date(startStr);
    if (isNaN(start.getTime())) {
      return "Invalid start time"; // Handle invalid start date
    }
  
    const dateFormat = new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    const timeFormat = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    });
  
    const dateStr = dateFormat.format(start);
    const startTimeStr = timeFormat.format(start);
  
    if (!endStr) {
      return `${dateStr} at ${startTimeStr}`;
    }
  
    const end = new Date(endStr);
    if (isNaN(end.getTime())) {
      return `${dateStr} at ${startTimeStr}`; // Ignore invalid end date
    }
  
    const endTimeStr = timeFormat.format(end);
    return `${dateStr} at ${startTimeStr} to ${endTimeStr}`;
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-lg text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error Loading Booking
              </h3>
              <p className="text-gray-500">
                {error || "Unable to load booking details"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-white">
      <main className="p-8">
        {/* ========== TOP ROW: Booking Heading & Notifications ========== */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <p className="text-gray-500">View and manage booking</p>
            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <ChevronRight size={16} />
              <span>Bookings</span>
              <ChevronRight size={16} />
              <span>View Details</span>
            </div>
          </div>
          {/* Notification Toggle (Right Side) */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Push Notifications</span>
            {/* <Switch /> or any toggle component */}
          </div>
        </div>

        {/* ========== PROGRESS BAR ========== */}
        <div className="mb-10 mt-10">
          <BookingProgress
            steps={[
              { label: "Created", status: "completed" },
              {
                label: "Confirmed",
                status: booking.accepted ? "completed" : "upcoming",
              },
              { label: "Auditor Assigned", status: "upcoming" },
              { label: "On the Way", status: "upcoming" },
              { label: "Ongoing", status: "upcoming" },
              { label: "Complete", status: "upcoming" },
            ]}
          />
        </div>

        {/* ========== MAIN SECTION: Left (Service Details) & Right (Payment, Auditor) ========== */}
        <div className="grid grid-cols-3 gap-8">
          {/* LEFT COLUMN (2/3 width) */}
          <div className="col-span-2 space-y-6">
            {/* Service Details */}
            <div>
              <h2 className="text-2xl font-bold">Thu 30 Jan | 10:00 AM</h2>
              <h3 className="text-xl font-semibold">{booking.serviceName}</h3>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2">
              {/* Icon or any marker if needed */}
              <p className="text-muted-foreground">
                {full_address}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium"> {`${userDetails?.firstName ?? ''} ${userDetails?.lastName ?? ''}`} </h4>
              <p className="text-muted-foreground">{contact_number} </p>
            </div>

            {/* Appointment Time */}
            <div>
              <h3 className="mb-3 flex items-center text-lg font-medium text-gray-900">
                <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                Appointment Time
              </h3>
              <Separator className="my-3" />
              <div className="space-y-2">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex space-x-2">
                    <Clock className="mt-0.5 h-5 w-5 text-gray-400" />
                    <p className="text-gray-900">
                      {formatDateTime(booking.startTime, booking.endTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div>
              <h4 className="mb-4 font-medium">What to expect?</h4>
              <ul className="list-inside space-y-2 text-muted-foreground">
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </li>
              
              </ul>
            </div>

            {/* View Report Button */}
            <Button variant="secondary" className="w-full">
              View Report
            </Button>

            {/* Reschedule / Cancel Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleRescheduleClick}
                variant="default"
                className="flex-1 bg-[#96C93D] hover:bg-[#85b234]"
              >
                Reschedule Booking
              </Button>
              <Button
                onClick={() => handleCancelBooking(booking.bookingNumber)}
                variant="outline"
                className="flex-1 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                Cancel Booking
              </Button>

            </div>
          </div>

          {/* RIGHT COLUMN (1/3 width): Payment & Auditor */}
          <div className="col-span-1 space-y-6">
            {/* Payment Details Card */}
            <Card className="p-6 bg-[#F0F8E6]">
              <h4 className="mb-4 text-lg font-medium">Payment details</h4>
              <div className="mb-4 flex justify-between">
                <span className="text-muted-foreground">Payment Status</span>
                <span className="font-medium text-green-600">Paid</span>
              </div>
              <div className="mb-6 flex justify-between">
                <span className="text-muted-foreground">Payment Amount</span>
                {/* e.g., credit card brand logo or PayPal */}
              </div>
              <Button variant="outline" className="w-full bg-[#96C93D] hover:bg-[#85b234]">
                {/* <Download className="mr-2 size-4" /> */}
                Download Invoice
              </Button>
            </Card>

            {/* Auditor Card */}
            <Card className="p-6 bg-[#F0F8E6]">
              <h4 className="mb-4 text-lg font-medium">Your Assigned Auditor</h4>
              <div className="mb-4 flex flex-col items-center">
                <div className="mb-4 overflow-hidden rounded-lg">
                  {/* Auditor avatar or placeholder image */}
                  {/* <Image src="/placeholder.svg" alt="Auditor" width={120} height={120} className="object-cover" /> */}
                </div>
                <h5 className="font-medium">{booking.auditor}</h5>
              </div>
              <Button className="w-full bg-[#96C93D] hover:bg-[#85b234]">
                Track Professional
              </Button>
            </Card>
          </div>
        </div>

        {/* ========== ADDITIONAL SECTIONS BELOW ========== */}
        <div className="mt-8 space-y-6">
          {/* Customer Details */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="flex items-center text-lg font-medium text-gray-900">
                <User className="mr-2 h-5 w-5 text-gray-400" />
                Customer Details
              </h3>
              <Separator className="my-3" />
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{booking.title}</p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>Created: {formatDateTime(booking.creationTime)}</p>
                  {booking.canceled && booking.cancelationTime && (
                    <p>
                      Cancelled:{" "}
                      {formatDateTime(
                        booking.cancelationTime,
                        booking.cancelationTime
                      )}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <UtilityBills bookingNumber={bookingNumber as string} />
          <KnowledgeContent youtubeSuggestions={youtubeSuggestions} />
          <BlogContent  blogs={blogs} />
        </div>
      </main>

      {booking && (
        <RescheduleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onReschedule={handleReschedule}
          bookingNumber={booking.bookingNumber}
        />
      )}
    </div>
  );
};

export default BookingDetailsPage;
