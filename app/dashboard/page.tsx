"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useContext, useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ServiceCard from "../../components/component/ServiceCard";
import { AUTH_CONTEXT } from "../../providers/auth"; // Adjust the import path as necessary
import BookingProgress from "@/components/component/booking-progress";
// import CountdownTimer from "@/components/component/CountdownTimer";
import { Clock, AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ChatBot } from "@/components/modal/ChatBot";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  images?: { url: string }[];
  price?: { amount: number };
  description: string;
}

interface Price {
  totalGross: {
    amount: string;
    currency: string;
  };
  totalNet: {
    amount: string;
    currency: string;
  };
  totalTaxes: {
    amount: string;
    currency: string;
  };
  totalPaid: {
    amount: string;
    currency: string;
  };
  taxes: Array<[]>;
}

interface Booking {
  bookingNumber: string;
  startTime: string;
  endTime: string;
  title: string;
  canceled: boolean;
  accepted: boolean;
  creationTime: string;
  serviceName: string;
  serviceId: string;
  price: Price;
  currentStage?: string;
}

interface BookingsResponse {
  success: boolean;
  message: string;
  data: {
    bookings: Booking[];
  };
}

const stepsSequence = [
  { label: "Booking Created", key: "bookingCreated" },
  { label: "Utility Bills Uploaded", key: "utilityBills" },
  { label: "Audit Performed", key: "auditPerformed" },
  { label: "Report Generated", key: "reportGenerated" },
  { label: "Follow Up Scheduled", key: "followUpSchedule" },
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

export default function DashboardPage() {
  const router = useRouter();
  // const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { userDetails } = useContext(AUTH_CONTEXT);

  // const getServices = useCallback(async () => {
  //   try {
  //     const response = await fetch(`/api/booking/services`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     setServices(data?.data?.services || []);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("No Services Found");
  //   }
  // }, []);

  const getBookings = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/bookings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data: BookingsResponse = await response.json();
      if (data.success) {
        setBookings(data.data.bookings);
      } else {
        throw new Error(data.message || "Failed to fetch bookings");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("No Bookings Found");
    }
  }, []);

  // const handleNext = () => {
  //   setCurrentIndex((prev) => Math.min(services.length - 1, prev + 1));
  // };

  // const handlePrev = () => {
  //   setCurrentIndex((prev) => Math.max(0, prev - 1));
  // };

  // const handleWheel = (e: React.WheelEvent) => {
  //   if (e.deltaY > 0) {
  //     handleNext();
  //   } else {
  //     handlePrev();
  //   }
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

  // const getStatusBadge = (booking: Booking): React.ReactElement => {
  //   if (booking.canceled) {
  //     return (
  //       <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
  //         Cancelled
  //       </span>
  //     );
  //   }
  //   if (booking.accepted) {
  //     return (
  //       <div className="flex items-center">
  //         <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-green-100 text-lime-500">
  //           Confirmed
  //         </span>
  //         <CountdownTimer startTime={booking.startTime} />
  //       </div>
  //     );
  //   }
  //   return (
  //     <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
  //       Pending
  //     </span>
  //   );
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          // getServices(),
          getBookings(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    // getServices,
    getBookings,
  ]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
          <p className="text-md text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 text-center">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-6">
        {/* Header Section */}
        <div
          className="flex-1 px-8 py-4"
          style={{ backgroundColor: "#F0F8E6" }}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Welcome {userDetails?.firstName}!
            </h1>
            <div className="p-2 rounded-full bg-gray-100">
              {/* Profile Image with Circular Crop */}
              <img
                src="profile.png"
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="container mx-auto p-6">
          {/* Suggested Services Section */}
          {/* <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-medium">Suggested Services</h2>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex relative overflow-x-auto"
              onWheel={handleWheel}
              style={{ cursor: "pointer", overflow: "hidden" }}
            >
              <div
                className="flex transition-all ease-in-out duration-300 gap-6"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {services.map((service) => (
                  <ServiceCard service={service} key={service.id} />
                ))}
              </div>

              {currentIndex > 0 && (
                <div
                  onClick={handlePrev} // Implement handlePrev
                  className="absolute top-0 left-0 h-full w-24 flex items-center justify-center cursor-pointer z-10"
                  style={{
                    background:
                      "linear-gradient(90deg, #636561 -18.5%, rgba(99, 101, 97, 0.7) 58.92%, rgba(99, 101, 97, 0.2) 139.5%)",
                  }}
                >
                  <svg
                    width="13"
                    height="35"
                    viewBox="0 0 13 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="12"
                      width="20.4583"
                      height="1.16905"
                      transform="rotate(123.122 12 0)"
                      fill="#D9D9D9"
                    />
                    <rect
                      width="20.4583"
                      height="1.16905"
                      transform="matrix(-0.546427 -0.837507 0.837507 -0.546427 12 34.5779)"
                      fill="#D9D9D9"
                    />
                  </svg>
                </div>
              )}

              <div
                onClick={handleNext}
                className="absolute top-0 right-0 h-full w-24 flex items-center justify-center cursor-pointer z-10"
                style={{
                  background:
                    "linear-gradient(270deg, #636561 -18.5%, rgba(99, 101, 97, 0.7) 58.92%, rgba(99, 101, 97, 0.2) 139.5%)",
                }}
              >
                <svg
                  width="13"
                  height="35"
                  viewBox="0 0 13 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.979004"
                    width="20.4583"
                    height="1.16905"
                    transform="rotate(56.8778 0.979004 0)"
                    fill="#D9D9D9"
                  />
                  <rect
                    width="20.4583"
                    height="1.16905"
                    transform="matrix(0.546427 -0.837507 -0.837507 -0.546427 0.979004 34.5779)"
                    fill="#D9D9D9"
                  />
                </svg>
              </div>
            </div>
          </div> */}

          {/* Your Bookings Section */}
          <div className="flex justify-between items-center mt-5">
            <h2 className="text-2xl font-medium">Your Bookings</h2>
          </div>

          <section
            className="bg-white rounded-lg p-6 mt-6"
            style={{ backgroundColor: "#F0F8E6" }}
          >
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card
                  key={booking.bookingNumber}
                  className="mb-6 relative p-6 rounded-[12px]"
                >
                  {/* <div key={booking.bookingNumber} className="mb-6 relative"> */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">
                        {formatDateTime(booking.startTime)}
                      </h3>
                      <p className="text-[#636561] font-medium">
                        {booking.serviceName}
                      </p>
                      <div className="flex items-center text-[#636561] text-sm mt-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Booking #{booking.bookingNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* <BookingProgress
                    steps={[
                      { label: "Created", status: "completed" },
                      {
                        label: booking.canceled ? "Cancelled" : "Confirmed",
                        status: booking.canceled
                          ? "cancelled"
                          : booking.accepted
                            ? "completed"
                            : "upcoming",
                      },
                      { label: "Auditor Assigned", status: "upcoming" },
                      { label: "On the Way", status: "upcoming" },
                      { label: "Ongoing", status: "upcoming" },
                      { label: "Complete", status: "upcoming" },
                    ]}
                  /> */}

                  <BookingProgress
                    steps={getStepStatus(
                      booking.currentStage || "bookingCreated"
                    )}
                  />

                  <div className="flex flex-wrap justify-between mt-4">
                    <Link href={`/dashboard/bookings/${booking.bookingNumber}`}>
                      <Button variant="link" className="text-blue-600">
                        View Details
                      </Button>
                    </Link>
                    {/* <div>
                      <Button className="bg-[#5ea502] hover:bg-[#5ea502]/90">
                        Reschedule
                      </Button>
                    </div> */}
                  </div>
                  {/* </div> */}
                </Card>
              ))
            ) : (
              <div className="relative flex h-[250px] items-stretch rounded-lg bg-[#f0f8e6] overflow-hidden">
                {/* Left Column with Image (30% width) */}
                <div className="relative w-[30%]">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NobookingsLeft-HfKNAPd5hBQiuWSXWbJBLgcAfYZg76.png"
                    alt="Left Icon"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(103, 181, 2, 0.2) 0%, rgba(174, 216, 121, 0.7) 48.43%, #F0F8E6 93.13%)",
                    }}
                  />
                </div>

                {/* Middle Column with Text Content (40% width) */}
                <div className="flex w-[40%] flex-col items-center justify-center gap-4 px-8">
                  <div className="flex items-center gap-2">
                    <img
                      src="/calendarIcon.png"
                      alt="Icon"
                      className="h-8 w-8"
                    />
                    <p className="text-lg font-medium text-[#4d4e4b]">
                      No Current Bookings
                    </p>
                  </div>
                  <Button className="rounded-3xl bg-[#76BC1C] px-6 py-2 text-white hover:bg-[#67b502] outline outline-2 outline-white outline-offset-2 focus:outline-offset-2 focus:outline-white">
                    Book Your First Service
                  </Button>
                </div>

                {/* Right Column with Image (30% width) */}
                <div className="relative w-[30%]">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NobookingsRight-Cmh90ifFQDGvXhLdSTeJDXVP0hWr3i.png"
                    alt="Right Icon"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(270deg, rgba(103, 181, 2, 0.2) 0%, rgba(174, 216, 121, 0.7) 48.43%, #F0F8E6 93.13%)",
                    }}
                  />
                </div>
              </div>
            )}
          </section>

          <ChatBot />

          {/* FAQs Section */}
          {/* <div className="flex justify-between items-center mt-5">
            <h2 className="text-2xl font-medium">FAQs</h2>
          </div> */}
        </div>
      </div>
    </div>
  );
}
