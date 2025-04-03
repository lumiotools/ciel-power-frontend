"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState, useContext, useCallback } from "react"
import { toast } from "sonner"
// import { useRouter } from "next/navigation";
// import ServiceCard from "../../components/component/ServiceCard";
import { AUTH_CONTEXT } from "../../providers/auth" // Adjust the import path as necessary
import BookingProgress from "@/components/component/booking-progress"
// import CountdownTimer from "@/components/component/CountdownTimer";
import { Clock, AlertCircle, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ChatBot } from "@/components/modal/ChatBot"
import Link from "next/link"
import { FAQDetails, FAQQuestions } from "./_comp/utils"
import Image from "next/image"

// interface Service {
//   id: string;
//   name: string;
//   images?: { url: string }[];
//   price?: { amount: number };
//   description: string;
// }

interface Price {
  totalGross: {
    amount: string
    currency: string
  }
  totalNet: {
    amount: string
    currency: string
  }
  totalTaxes: {
    amount: string
    currency: string
  }
  totalPaid: {
    amount: string
    currency: string
  }
  taxes: Array<[]>
}

interface Booking {
  bookingNumber: string
  startTime: string
  endTime: string
  title: string
  canceled: boolean
  accepted: boolean
  creationTime: string
  serviceName: string
  serviceId: string
  price: Price
  currentStage?: string
}

interface BookingsResponse {
  success: boolean
  message: string
  data: {
    bookings: Booking[]
  }
}

const stepsSequence = [
  { label: "Booking Created", key: "bookingCreated" },
  { label: "Utility Bills Uploaded", key: "utilityBills" },
  { label: "Audit Performed", key: "auditPerformed" },
  { label: "Report Generated", key: "reportGenerated" },
  { label: "Follow Up Scheduled", key: "followUpSchedule" },
  { label: "Proposal Signed", key: "proposalSigned" },
  { label: "Payment Done", key: "paymentDone" },
]

const getStepStatus = (currentStage: string) => {
  return stepsSequence.map((step, index) => {
    const status: "completed" | "current" | "upcoming" | "cancelled" =
      stepsSequence.findIndex((s) => s.key === currentStage) > index
        ? "completed"
        : stepsSequence.findIndex((s) => s.key === currentStage) === index
          ? "current"
          : "upcoming"
    return { label: step.label, status }
  })
}

export default function DashboardPage() {
  // const router = useRouter();
  // const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  // const [currentIndex, setCurrentIndex] = useState<number>(0);

  //usestate condition for dropdown

  const [openDropdown, setOpenDropdown] = useState<boolean[]>(Array(FAQDetails.length).fill(false))

  const [faqOpen, setFaqOpen] = useState<boolean[]>(Array(FAQQuestions.length).fill(false))

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prev) => prev.map((item, i) => (i === index ? !item : item)))
    if (index === FAQDetails.length - 1) {
      setFaqOpen((prev) => prev.map(() => false))
    }
  }

  const toggleFaqQuestion = (index: number) => {
    setFaqOpen((prev) => prev.map((item, i) => (i === index ? !item : item)))
  }

  const { userDetails } = useContext(AUTH_CONTEXT)

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
      })
      const data: BookingsResponse = await response.json()
      if (data.success) {
        setBookings(data.data.bookings)
      } else {
        throw new Error(data.message || "Failed to fetch bookings")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast.error("No Bookings Found")
    }
  }, [])

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
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    }).format(date)
  }

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
      setLoading(true)
      try {
        await Promise.all([
          // getServices(),
          getBookings(),
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [
    // getServices,
    getBookings,
  ])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
          <p className="text-md text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 text-center">{error}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex-1 px-8 py-4" style={{ backgroundColor: "#F0F8E6" }}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Welcome {userDetails?.firstName}!</h1>
            <div className="p-2 rounded-full bg-gray-100">
              {/* Profile Image with Circular Crop */}
              <img src="profile.png" alt="Profile" className="h-10 w-10 rounded-full" />
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
          <div className="mt-5">
            <h2 className="text-2xl font-medium text-left">Your Home Energy Audit Details</h2>
          </div>

          <div
            className="mt-3 mb-4 text-gray-700"
            style={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "150%",
              letterSpacing: "0%",
              color: "#545454",
              width: "100%",
              height: "100%",
            }}
          >
            <p className="mb-3 text-left">
              We're preparing for an in-home visit to evaluate how your home uses energy. Your Ciel Home Energy Auditor
              will collect important details to help us understand how your home is performing — here's what to expect
              and how to prepare.
            </p>
            <p className="text-left">
              Once we've gathered all the information from your home visit, we'll get to work on your personalized
              energy report — it'll be ready for you a few days after the visit. To complete the report, we'll also need
              a copy of your most recent energy bill.
            </p>
          </div>

          <section className="bg-white rounded-lg p-6 mt-6" style={{ backgroundColor: "#F0F8E6" }}>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card key={booking.bookingNumber} className="mb-6 relative p-6 rounded-[12px]">
                  {/* <div key={booking.bookingNumber} className="mb-6 relative"> */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{formatDateTime(booking.startTime)}</h3>
                      <p className="text-[#636561] font-medium">{booking.serviceName}</p>
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

                  <BookingProgress steps={getStepStatus(booking.currentStage || "bookingCreated")} />

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
                    <img src="/calendarIcon.png" alt="Icon" className="h-8 w-8" />
                    <p className="text-lg font-medium text-[#4d4e4b]">No Current Bookings</p>
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

          {/* faq section */}
          <div className="bg-gray-100 p-6">
            <div className="mt-10">
              {FAQDetails.map((faq) => (
                <div key={faq.id} className="mb-4 border border-[#B7E2C7] rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleDropdown(faq.id)}
                    className="w-full flex items-center justify-between p-4 bg-[#F9FCF6] hover:bg-[#F0F8E6] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-[#B7E2C7]">
                        <img src={faq.logo || "/placeholder.svg"} alt={faq.title} className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-[#4D7C32] text-lg font-medium">{faq.title}</h3>
                        <p className="text-sm text-gray-600">{faq.description}</p>
                      </div>
                    </div>
                    <div
                      className={`transform transition-transform duration-200 ${openDropdown[faq.id] ? "rotate-180" : ""}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#4D7C32"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {openDropdown[faq.id] && (
                    <div className="p-4 bg-white border-t border-[#B7E2C7]">
                      <CardData index={faq.id} faqOpen={faqOpen} toggleFaqQuestion={toggleFaqQuestion} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <ChatBot />

          {/* FAQs Section */}
          {/* <div className="flex justify-between items-center mt-5">
            <h2 className="text-2xl font-medium">FAQs</h2>
          </div> */}
        </div>
      </div>
    </div>
  )
}

interface CardDataProps {
  index: number
  faqOpen: boolean[]
  toggleFaqQuestion: (index: number) => void
}

const CardData = ({ index, faqOpen, toggleFaqQuestion }: CardDataProps) => {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-col gap-3 py-3 px-10 items-center justify-center text-center">
          <div className="bg-light-green border-[1.5px] rounded-full p-1.5 w-fit">
            <p className="text-deep-green text-sm">Thanks for booking Energy Audit! </p>
          </div>
          <p className="text-2xl font-bold">What to Expect During Your Home Energy Audit</p>
          <p className="text-sm">Discover the Power of Energy Efficiency with a Ciel Home Energy Audit.</p>
          <p>
            <span className="text-2xl text-deep-green">"</span> The first step to accessing NJ's utility programs for{" "}
            <br /> energy-efficient home upgrades. <span className="text-2xl text-deep-green">"</span>{" "}
          </p>
          <div className="aspect-video min-w-[70%]">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/FH0hdanGxkM"
              title="Energy Audit Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Added content from the image */}
          <div className="max-w-3xl mx-auto mt-10 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              What You'll Gain from Your Audit Comfort, savings, and peace of mind — your audit is the first step toward
              a better home.
            </h2>

            <p className="text-gray-600 my-4">
              A Home Energy Audit is about more than energy use — it's about how your home supports your everyday life.
              We take a deeper look at the things that can affect your comfort, your health, and your monthly expenses.
              It's not just about finding problems. It's about finding solutions that work for you.
            </p>

            <p className="text-gray-600 my-4">
              We understand that your home is more than just walls and systems — it's where you and your family rest,
              breathe, and recharge. Through the audit, we uncover opportunities to help your home feel better, function
              better, and cost less to run.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Generous Incentives and Financing</h3>

            <p className="text-gray-600 mb-2">
              Thanks to support from New Jersey's Clean Energy Program and the federal government, many homeowners are
              eligible for substantial financial benefits, including:
            </p>
            <ul className="list-disc pl-8 text-gray-600 mb-4">
              <li>Up to $6,000 in cash-back incentives</li>
              <li>Up to $25,000 in zero-interest financing for up to 10 years</li>
              <li>Federal tax credits</li>
            </ul>

            <p className="text-gray-600 mb-2">These benefits help reduce the cost of improvements such as:</p>
            <ul className="list-disc pl-8 text-gray-600 mb-4">
              <li>Insulation and air sealing</li>
              <li>Heating and cooling system upgrades</li>
              <li>High-efficiency water heaters</li>
              <li>Ventilation systems</li>
            </ul>

            <p className="text-gray-600 mb-6">
              We'll help you understand what you qualify for — and how to take full advantage of these programs.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">A Healthier, More Comfortable Living Space</h3>

            <p className="text-gray-600 mb-4">
              Your audit isn't just about improving efficiency — it's also a step toward improving how you feel at home.
              We assess how well your home manages airflow, temperature, and moisture, which are all connected to your
              daily comfort and long-term health.
            </p>

            <p className="text-gray-600 mb-2">With the right upgrades, you may experience:</p>
            <ul className="list-disc pl-8 text-gray-600 mb-4">
              <li>Fewer allergens and pollutants circulating through your air</li>
              <li>More stable and comfortable temperatures, season to season</li>
              <li>Lower risk of mold and moisture buildup</li>
              <li>A quieter, calmer home environment</li>
            </ul>

            <p className="text-gray-600 mb-6">
              We understand that even small changes can make a big difference. Whether it's helping you sleep more
              soundly or making your home feel more balanced and breathable, we're here to guide you toward solutions
              that fit your lifestyle.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Personalized, Practical Recommendations</h3>

            <p className="text-gray-600 mb-4">
              After your home visit, your personalized results will be added to your customer portal. You'll be able to
              log in anytime to explore insights about your home's energy use, review suggested improvements, and track
              available incentives. Everything is organized in one place — clear, simple, and tailored to your home. No
              dense reports, just useful information you can act on when you're ready.
            </p>
          </div>
        </div>
      )
    case 1:
      return (
        <div className=" flex flex-col gap-3 p-3">
          <div className=" w-full flex gap-2 ">
            <div className="w-[60%] border rounded-xl p-2 relative shadow-lg">
              <div
                className="absolute  left-[29px] top-[12%] bottom-[5%] w-0.5 bg-green-500/30"
                style={{ zIndex: 0 }}
              ></div>

              <div className="relative flex gap-2 items-center z-50" style={{ zIndex: 50 }}>
                <LogoContainer logo={"/dashboard/Frame.svg"} className={"z-50"} />
                <div>
                  <p className=" text-xl">On-Site Application</p>
                  <p className=" text-xs">BPI auditor will evaluate home energy performance.</p>
                </div>
              </div>
              <ul className=" text-xs pl-4 pt-4 flex flex-col gap-3">
                <li className=" flex gap-2 items-center">
                  <Circle />
                  <p>
                    <span className="font-bold"> Gather details</span> on insulation, construction specifications, and
                    heating, cooling, & hot water systems.
                  </p>
                </li>
                <li className=" flex gap-2 items-center">
                  <Circle />
                  <p>
                    Perform a <span className="font-bold">blower door test</span> to assess air tightness and use
                    infrared cameras to locate air leaks.
                  </p>
                </li>
                <li className=" flex gap-2 items-center">
                  <Circle />
                  <p>
                    Conduct <span className="font-bold">safety inspections</span> to identify hazards such as gas leaks,
                    carbon monoxide, mold, and asbestos
                  </p>
                </li>
              </ul>
            </div>
            <div className=" w-[40%] border rounded-xl p-2 shadow-lg">
              <div className=" flex gap-2">
                <LogoContainer logo={"/dashboard/analysis.svg"} />
                <p className=" text-xl">Engineering Analysis</p>
              </div>
              <p className=" text-xs">
                After the inspection, the data collected will be used to create a virtual model of your home.
              </p>
              <div className="flex flex-col gap-3 p-3 ">
                <div className="relative bg-light-green border border-green-300 border-opacity-40 rounded-xl p-3">
                  <p className=" text-sm">
                    {" "}
                    Projects <span className="font-bold">energy savings</span> from recommended improvements
                  </p>
                  {/* <div className=""> */}
                  <Image
                    src={"/dashboard/Bulb.svg"}
                    width={30}
                    height={30}
                    alt="logo"
                    className="absolute -top-3 -left-1 rounded-full"
                  />
                </div>
                <div className="relative bg-light-green border border-green-300 border-opacity-40 rounded-xl p-3">
                  <p className=" text-sm">
                    {" "}
                    Identifies <span className="font-bold">utility incentives</span> and{" "}
                    <span className="font-bold">tax credits</span> available to you (up to 30% of costs)
                  </p>
                  {/* <div className=""> */}
                  <Image
                    src={"/dashboard/coin.svg"}
                    width={30}
                    height={30}
                    alt="logo"
                    className="absolute -top-3 -left-1 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" p-3 border shadow-md rounded-xl flex gap-2">
            <Image src={"/dashboard/report.svg"} alt="report" width={281} height={276} />
            <div className=" ">
              <p className=" text-xl font-bold  ">Your Final Report</p>
              <p className=" text-xs text-gray-400 ">
                Within a few days of the visit, you will receive a detailed report including:
              </p>
              <p>
                A certified auditor, accredited by the Building Performance Institute (BPI), will visit your home to
                assess its energy performance.
              </p>
              <ul className=" text-xs pl-4 pt-4 flex flex-col gap-3">
                <li className=" flex gap-2 items-center">
                  <SimpleCircle />
                  <p>
                    <span className="font-bold"> Gather details</span> on insulation, construction specifications, and
                    heating, cooling, & hot water systems.
                  </p>
                </li>
                <li className=" flex gap-2 items-center">
                  <SimpleCircle />
                  <p>
                    Perform a <span className="font-bold">blower door test</span> to assess air tightness and use
                    infrared cameras to locate air leaks.
                  </p>
                </li>
                <li className=" flex gap-2 items-center">
                  <SimpleCircle />
                  <p>
                    Conduct <span className="font-bold">safety inspections</span> to identify hazards such as gas leaks,
                    carbon monoxide, mold, and asbestos
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    case 2:
      return (
        <div className=" flex flex-col gap-3 p-3">
          <div className="flex flex-col gap-3 border border-gray-300 p-3 rounded-md">
            <div className=" flex gap-2">
              <LogoContainer logo={"/dashboard/home.svg"} />
              <div>
                <p className=" text-xl">Provide Home access</p>
                <p className=" text-xs">Ensure key areas of your home are accessible for inspection:</p>
              </div>
            </div>
            <div className=" flex gap-7">
              <Image src={"/dashboard/image.svg"} width={209} height={200} alt="image" className="rounded-md" />
              <Image src={"/dashboard/image1.svg"} width={209} height={200} alt="image" className="rounded-md" />
              <Image src={"/dashboard/image2.svg"} width={209} height={200} alt="image" className="rounded-md" />
              <Image src={"/dashboard/image3.svg"} width={209} height={200} alt="image" className="rounded-md" />
            </div>
          </div>
          <div className="flex  gap-3 border border-gray-300 p-3 w-full rounded-md">
            <div className=" w-1/2 flex flex-col gap-2">
              <div className=" flex gap-2">
                <LogoContainer logo="/dashboard/info.svg" />
                <div>
                  <p className=" text-xl">Utility Information</p>
                  <p className=" text-xs text-gray-400">Upload recent utility bills before audit.</p>
                </div>
              </div>
              <ul className=" flex flex-col gap-2">
                <li className=" flex gap-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-deep-green rounded"></div>
                  <div className=" pl-4">
                    <p className="text-sm font-bold">Upload Bills Before Audit</p>
                    <p className=" text-gray text-xs">
                      Upload your most recent gas and electric utility bills through the portal before your audit.
                    </p>
                  </div>
                </li>
                <li className=" flex gap-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-deep-green rounded"></div>
                  <div className=" pl-4">
                    <p className="text-sm font-bold">Accurate Audit Report</p>
                    <p className=" text-gray text-xs">
                      Ensures precise report generation by verifying energy usage and system performance.
                    </p>
                  </div>
                </li>
                <li className=" flex gap-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-deep-green rounded"></div>
                  <div className=" pl-4">
                    <p className="text-sm font-bold">Incentives & Savings</p>
                    <p className=" text-gray text-xs">
                      Identifies eligible incentives and cost-saving opportunities to optimize energy efficiency.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className=" w-1/2 flex flex-col gap-2">
              <div className=" flex gap-2">
                <LogoContainer logo="/dashboard/paw.svg" />
                <div>
                  <p className=" text-xl">Secure Pets</p>
                  <p className=" text-xs text-gray-400">Keeping Pets Safe & Ensuring a Smooth Audit</p>
                </div>
              </div>
              <ul className=" flex flex-col gap-2">
                <li className=" flex gap-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-deep-green rounded"></div>
                  <div className=" pl-4">
                    <p className="text-sm font-bold">Pet Safety During Audit</p>
                    <p className=" text-gray text-xs">
                      If you have pets, consider keeping them in a safe space to ensure the technician can work without
                      interruptions
                    </p>
                  </div>
                </li>
                <li className=" flex gap-2 ">
                  <LogoContainer logo="/dashboard/man.svg" />
                  <div>
                    <p className=" text-xl">Plan for someone to be home</p>
                    <p className=" text-xs text-gray-400">Ensure Access & Discuss Concerns</p>
                  </div>
                </li>
                <li className=" flex gap-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-deep-green rounded"></div>
                  <div className=" pl-4">
                    <p className="text-sm font-bold">Upload Bills Before Audit</p>
                    <p className=" text-gray text-xs">
                      It&apos;s helpful for someone to be present to provide access and discuss any concerns or
                      observations about your home.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    case 3:
      return (
        <div className=" flex flex-col gap-3 p-3 border rounded-md m-3">
          {FAQQuestions.map((item) => (
            <div key={item.id} className="">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaqQuestion(item.id)}
              >
                <div className=" flex gap-2 items-center">
                  <div className="w-8 h-8 flex justify-center items-center p-2 flex-shrink-0 bg-medium-green rounded-full">
                    <p className="">{item.id + 1}</p>
                  </div>
                  <p>{item.title}</p>
                </div>
                <Image
                  src={"/dashboard/arrow-down.svg"}
                  width={20}
                  height={20}
                  alt="arrow"
                  className={`${(faqOpen[item.id] === true) === true ? "rotate-180" : " -rotate-90"}`}
                />
              </div>
              {faqOpen[item.id] === true && <p className=" py-3 text-gray">{item.description}</p>}
              <hr className="w-full h-[0.5px] bg-gray mt-2" />
            </div>
          ))}
        </div>
      )
  }
}

const LogoContainer = ({
  logo,
  className,
}: {
  logo: string
  className?: string
}) => {
  return (
    <div className=" p-2 border rounded-lg flex justify-center items-center gap-2 bg-white">
      <Image src={logo || "/placeholder.svg"} width={24} height={24} alt="logo" className={className} />
    </div>
  )
}

const Circle = () => {
  return <div className="min-w-3 min-h-3 flex-shrink-0 border-2  bg-deep-green rounded-full ring-3"></div>
}

const SimpleCircle = () => {
  return <div className="min-w-2 min-h-2 flex-shrink-0 border-2  bg-black rounded-full"></div>
}

