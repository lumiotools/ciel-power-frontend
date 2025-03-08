"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2, XCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import RescheduleModal from "@/components/modal/RescheduleModal";
import UtilityBills from "@/components/booking/utilityBills";
import { isBefore } from "date-fns";
import { toast } from "sonner";
import KnowledgeContent from "@/components/booking/knowledgeContent";
import BookingProgress from "@/components/component/booking-progress";
import BlogContent from "@/components/booking/blogs";
import Link from "next/link";

interface Price {
  totalGross: { amount: string; currency: string };
  totalNet: { amount: string; currency: string };
  totalTaxes: { amount: string; currency: string };
  totalPaid: { amount: string; currency: string };
  taxes: unknown[];
}

interface FollowUpDetals {
  startTime: string;
  endTime: string;
  isCancelled: string;
  rescheduleLink: string;
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
    customer: CustomerDetails;
    currentStage: string;
    reportUrl?: string | null;
    newFollowUpScheduleUrl: string;
    followUpScheduleDetails: FollowUpDetals;
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
  blog_id: string;
  title: string;
  description: string;
  thumbnailLink: string;
  pageLink: string;
}

interface CustomerDetails {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumbers: CustomerPhoneNumber[];
  streetAddress: CustomerStreetAddress;
}

interface CustomerPhoneNumber {
  number: string;
  type: "mobile" | "work" | "home" | "fax";
}

interface CustomerStreetAddress {
  line1: string;
  line2: string;
  city: string;
  province: string;
  postalCode: string;
}

const stepsSequence = [
  { label: "Booking Created", key: "bookingCreated" },
  { label: "Utility Bills Uploaded", key: "utilityBills" },
  { label: "Audit Performed", key: "auditPerformed" },
  { label: "Report Generated", key: "reportGenerated" },
  { label: "Follow Up Scheduled", key: "followUpScheduled" },
  { label: "Proposal Signed", key: "proposalSigned" },
  { label: "Payment Done", key: "paymentDone" },
];

const getStepStatus = (currentStage: string) => {
  return stepsSequence.map((step, index) => {
    const status: "completed" | "current" | "upcoming" | "cancelled" =
      stepsSequence.findIndex((s) => s.key === currentStage) > index
        ? "completed"
        : stepsSequence.findIndex((s) => s.key === currentStage) === index
        ? "current"
        : "upcoming";
    return { label: step.label, status };
  });
};

const BookingDetailsPage = () => {
  const params = useParams<{ bookingNumber: string }>();
  const bookingNumber = params.bookingNumber;

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [customerDetails, setCustomerDetails] =
    useState<CustomerDetails | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [youtubeSuggestions, setYoutubeSuggestions] = useState<YouTubeVideo[]>(
    []
  );
  const [followUpScheduleDetails, setFollowUpScheduleDetails] =
    useState<FollowUpDetals | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [currentStage, setCurrentStage] = useState<string>("");
  const [newFollowUpScheduleLink, setNewFollowUpScheduleLink] = useState<
    string | null
  >(null);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const handleRescheduleClick = () => {
    setModalOpen(true);
  };

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

  const handleCancelBooking = async () => {
    try {
      const requestUrl = `/api/user/bookings/${bookingNumber}`;

      const response = await fetch(requestUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log("Booking canceled successfully:", response);
      let data;
      if (response.status !== 204) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Failed to cancel the booking");
      }

      console.log("Booking canceled successfully:", data);
      // setBooking(null);
      // alert("Booking canceled successfully");
      toast.success("Booking canceled successfully");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error canceling booking:", error.message);
        alert(`Error canceling booking: ${error.message}`);
      } else {
        console.error("Unknown error occurred:", error);
        alert("An unknown error occurred");
      }
    }
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
          setCustomerDetails(data.data.customer);
          console.log("youtube videos", data.data.youtubeVideos);
          setYoutubeSuggestions(data.data.youtubeVideos);
          setBlogs(data.data.blogs);
          setFollowUpScheduleDetails(data.data.followUpScheduleDetails);
          setCurrentStage(data.data.currentStage);
          setNewFollowUpScheduleLink(data.data.newFollowUpScheduleUrl || null);
          setReportUrl(data.data.reportUrl || null);
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

  // const formatDateTime = (startStr: string, endStr?: string): string => {
  //   const start = new Date(startStr);
  //   if (isNaN(start.getTime())) {
  //     return "Invalid start time"; // Handle invalid start date
  //   }

  //   const dateFormat = new Intl.DateTimeFormat("en-US", {
  //     timeZone: "UTC",
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });

  //   const timeFormat = new Intl.DateTimeFormat("en-US", {
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true,
  //     timeZone: "UTC",
  //   });

  //   const dateStr = dateFormat.format(start);
  //   const startTimeStr = timeFormat.format(start);

  //   if (!endStr) {
  //     return `${dateStr} at ${startTimeStr}`;
  //   }

  //   const end = new Date(endStr);
  //   if (isNaN(end.getTime())) {
  //     return `${dateStr} at ${startTimeStr}`; // Ignore invalid end date
  //   }

  //   const endTimeStr = timeFormat.format(end);
  //   return `${dateStr} at ${startTimeStr} to ${endTimeStr}`;
  // };

  const formatDateTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    }).format(date);
  };

  const isPastBooking = booking
    ? isBefore(new Date(), new Date(booking.startTime))
    : false;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
          <p className="text-md text-gray-600">Loading booking details...</p>
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
              <Link href={"/dashboard"}>Dashboard</Link>
              <ChevronRight size={16} />
              <Link href={"/dashboard"}>Bookings</Link>
              <ChevronRight size={16} />
              <span>View Details</span>
            </div>
          </div>
          {/* Notification Toggle (Right Side) */}
          {/* <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Push Notifications</span>
       
          </div> */}
        </div>

        {/* ========== PROGRESS BAR ========== */}
        <div className="my-6">
          {/* <BookingProgress
            steps={[
              { label: "Booking Created", status: "completed" },
              { label: "Utility Bills Uploaded", status: "completed" },
              { label: "Audit Performed", status: "upcoming" },
              { label: "Report Generated", status: "upcoming" },
              { label: "Follow Up Scheduled", status: "upcoming" },
              { label: "Proposal Signed", status: "upcoming" },
              { label: "Payment Done", status: "upcoming" },
            ]}
          /> */}
          <BookingProgress steps={getStepStatus(currentStage)} />
        </div>

        {/* ========== MAIN SECTION: Left (Service Details) & Right (Payment, Auditor) ========== */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* LEFT COLUMN (2/3 width) */}
          <div className="md:col-span-2 space-y-6">
            {/* Service Details */}
            <div>
              <h2 className="text-xl font-bold">
                {formatDateTime(booking.startTime)}
              </h2>
              <h3 className="text-[16px] font-semibold">
                {booking.serviceName}
              </h3>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2">
              {/* Icon or any marker if needed */}
              <p className="text-muted-foreground">{`${
                customerDetails?.streetAddress.line1 ?? ""
              } ${customerDetails?.streetAddress.line2 ?? ""}, ${
                customerDetails?.streetAddress.city ?? ""
              }, ${customerDetails?.streetAddress.province ?? ""} ${
                customerDetails?.streetAddress.postalCode ?? ""
              }`}</p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium">
                {" "}
                {`${customerDetails?.firstName ?? ""} ${
                  customerDetails?.lastName ?? ""
                }`}{" "}
              </h4>
              <p className="text-muted-foreground">
                {customerDetails?.phoneNumbers?.[0].number}{" "}
              </p>
            </div>

            {/* Appointment Time */}
            {/* <div>
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
            </div> */}

            {/* What to Expect */}
            {(currentStage === "bookingCreated" ||
              currentStage === "utilityBills") && (
              <div>
                <h4 className="mb-4 font-medium">What to expect?</h4>
                <ol className="ml-4 list-outside list-disc space-y-2 text-muted-foreground">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </li>
                </ol>
              </div>
            )}

            {/* View Report Button */}
            {/* <Button variant="secondary" className="w-full">
              View Report
            </Button> */}

            {/* Reschedule / Cancel Buttons (Only if NOT a Follow-up Meeting) */}
            {(currentStage === "bookingCreated" ||
              currentStage === "utilityBills") && (
              <div className="flex flex-wrap gap-4">
                {!booking.canceled && isPastBooking && (
                  <Button
                    onClick={handleRescheduleClick}
                    variant="default"
                    className="flex-1 bg-[#96C93D] hover:bg-[#85b234]"
                  >
                    Reschedule Booking
                  </Button>
                )}
                {!booking.canceled && isPastBooking && (
                  <Button
                    onClick={() => handleCancelBooking()}
                    variant="outline"
                    className="flex-1 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            )}

            {(currentStage === "reportGenerated" ||
              currentStage === "followUpScheduled" ||
              currentStage === "proposalSigned" ||
              currentStage === "paymentDone") && (
              <div>
                <h4 className="text-lg font-bold">
                  Congratulations, your audit report has been generated!
                </h4>
                {reportUrl && (
                  <Link
                    href={reportUrl}
                    target="_blank"
                    className="text-[#96C93D] hover:text-[#85b234] hover:underline text-sm"
                  >
                    Click here to view the report
                  </Link>
                )}
              </div>
            )}

            {/* Schedule Follow-Up Consultation */}
            {currentStage === "followUpScheduled" &&
            !followUpScheduleDetails?.isCancelled ? (
              <>
                <h4 className="mt-6 text-lg font-bold">
                  Your Follow-Up Consultation Details
                </h4>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm">
                    Scheduled Time:{" "}
                    {followUpScheduleDetails && (
                      <span className="font-semibold">
                        {formatDateTime(followUpScheduleDetails.startTime)}
                      </span>
                    )}
                  </p>
                  {/* Meeting Link (Right) */}
                  <a
                    href={followUpScheduleDetails?.rescheduleLink}
                    target="_blank"
                    className="text-[#96C93D] hover:text-[#85b234] hover:underline text-sm cursor"
                  >
                    Cancel or Reschedule?
                  </a>
                </div>
              </>
            ) : (
              // If no followUpScheduleDetails exists, show header & follow-up link (Spaced Apart)
              (currentStage === "followUpScheduled" ||
                currentStage === "reportGenerated") && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold">
                      Schedule Follow-Up Consultation
                    </h4>
                    {newFollowUpScheduleLink && (
                      <a
                        href={newFollowUpScheduleLink}
                        target="_blank"
                        className="text-[#96C93D] hover:text-[#85b234] hover:underline text-sm cursor"
                      >
                        Schedule Now
                      </a>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          {/* RIGHT COLUMN (1/3 width): Payment & Auditor */}
          <div className="space-y-6">
            {/* Payment Details Card */}
            <Card className="p-6 bg-[#F0F8E6] shadow-md">
              <h4 className="mb-4 text-lg font-medium">Payment details</h4>
              <div className="mb-4 flex justify-between">
                <span className="text-muted-foreground">Payment Status</span>
                <span className="font-medium text-green-600">Paid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Amount</span>
                <span className="font-medium text-green-600">
                  ${booking.price.totalGross.amount}
                </span>
              </div>
              {/* <Button
                variant="outline"
                className="w-full bg-[#96C93D] hover:bg-[#85b234]"
              >
                {/* <Download className="mr-2 size-4" /> *
                Download Invoice
              </Button> */}
            </Card>

            {/* Auditor Card */}
            <Card className="p-6 bg-[#F0F8E6] shadow-md rounded-[6px]">
              <h4 className="mb-4 text-lg font-medium">
                Your Assigned Auditor
              </h4>
              <div className="mb-4 flex flex-col items-center">
                <div className="mb-4 overflow-hidden rounded-lg">
                  {/* Auditor avatar or placeholder image */}
                  <img
                    src="https://st2.depositphotos.com/9998432/48284/v/450/depositphotos_482842120-stock-illustration-default-avatar-photo-placeholder-grey.jpg"
                    alt="Auditor"
                    width={120}
                    height={120}
                    className="object-cover rounded-full"
                  />
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
      </main>
      <div>
        {/* Customer Details */}
        {/* <Card>
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
          </Card> */}

        <UtilityBills
          bookingNumber={bookingNumber as string}
          bookingCancelled={Boolean(booking.canceled)}
        />
        <KnowledgeContent youtubeSuggestions={youtubeSuggestions} />
        <BlogContent blogs={blogs} />
      </div>

      {booking && (
        <RescheduleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onReschedule={handleReschedule}
          bookingNumber={booking.bookingNumber}
          initialDate={new Date(booking.startTime)}
          bookedSlot={{
            eventId: booking.bookingNumber,
            startTime: booking.startTime, // Start time from booking details
            endTime: booking.endTime,
          }}
        />
      )}
    </div>
  );
};

export default BookingDetailsPage;
