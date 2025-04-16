import { cn } from "@/lib/utils";
import { BadgeX } from "lucide-react";
import type React from "react";
import { useContext } from "react";
import { BOOKING_CONTEXT } from "@/providers/booking";

interface Step {
  label: string;
  status: "completed" | "current" | "upcoming" | "cancelled";
}

interface BookingProgressProps {
  className?: string;
}

const StatusIcon: React.FC<{ status: Step["status"] }> = ({ status }) =>
  status === "cancelled" ? (
    <BadgeX className="size-11 fill-destructive text-white" />
  ) : (
    <div className="relative w-8 h-8">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("transition-colors", {
          "text-[#5ea502]": status === "completed",
          "text-[#d1d5db]": status === "current" || status === "upcoming",
        })}
      >
        <circle cx="16" cy="16" r="16" fill="white" />
        <path
          d="M20.1339 1.74002C19.5955 1.18911 18.9525 0.751346 18.2426 0.45247C17.5326 0.153595 16.7701 -0.000366211 15.9999 -0.000366211C15.2296 -0.000366211 14.4671 0.153595 13.7571 0.45247C13.0472 0.751346 12.4042 1.18911 11.8659 1.74002L10.6219 3.01602L8.84186 2.99402C8.07135 2.98491 7.30681 3.12994 6.59318 3.4206C5.87955 3.71126 5.23124 4.14168 4.68637 4.68654C4.14151 5.23141 3.71109 5.87972 3.42043 6.59335C3.12977 7.30698 2.98474 8.07153 2.99386 8.84203L3.01386 10.622L1.74186 11.866C1.19094 12.4044 0.753176 13.0474 0.454301 13.7573C0.155426 14.4672 0.00146484 15.2298 0.00146484 16C0.00146484 16.7703 0.155426 17.5328 0.454301 18.2427C0.753176 18.9527 1.19094 19.5957 1.74186 20.134L3.01586 21.378L2.99386 23.158C2.98474 23.9285 3.12977 24.6931 3.42043 25.4067C3.71109 26.1203 4.14151 26.7686 4.68637 27.3135C5.23124 27.8584 5.87955 28.2888 6.59318 28.5795C7.30681 28.8701 8.07135 29.0151 8.84186 29.006L10.6219 28.986L11.8659 30.258C12.4042 30.8089 13.0472 31.2467 13.7571 31.5456C14.4671 31.8445 15.2296 31.9984 15.9999 31.9984C16.7701 31.9984 17.5326 31.8445 18.2426 31.5456C18.9525 31.2467 19.5955 30.8089 20.1339 30.258L21.3779 28.984L23.1579 29.006C23.9284 29.0151 24.6929 28.8701 25.4065 28.5795C26.1202 28.2888 26.7685 27.8584 27.3133 27.3135C27.8582 26.7686 28.2886 26.1203 28.5793 25.4067C28.8699 24.6931 29.015 23.9285 29.0059 23.158L28.9859 21.378L30.2579 20.134C30.8088 19.5957 31.2465 18.9527 31.5454 18.2427C31.8443 17.5328 31.9982 16.7703 31.9982 16C31.9982 15.2298 31.8443 14.4672 31.5454 13.7573C31.2465 13.0474 30.8088 12.4044 30.2579 11.866L28.9839 10.622L29.0059 8.84203C29.015 8.07153 28.8699 7.30698 28.5793 6.59335C28.2886 5.87972 27.8582 5.23141 27.3133 4.68654C26.7685 4.14168 26.1202 3.71126 25.4065 3.4206C24.6929 3.12994 23.9284 2.98491 23.1579 2.99402L21.3779 3.01402L20.1339 1.74002ZM20.7079 13.708L14.7079 19.708C14.615 19.8012 14.5046 19.875 14.3831 19.9255C14.2616 19.9759 14.1314 20.0018 13.9999 20.0018C13.8683 20.0018 13.7381 19.9759 13.6166 19.9255C13.4951 19.875 13.3847 19.8012 13.2919 19.708L10.2919 16.708C10.1989 16.6151 10.1251 16.5047 10.0748 16.3832C10.0245 16.2617 9.99859 16.1315 9.99859 16C9.99859 15.8685 10.0245 15.7383 10.0748 15.6169C10.1251 15.4954 10.1989 15.385 10.2919 15.292C10.3848 15.1991 10.4952 15.1253 10.6167 15.075C10.7382 15.0247 10.8684 14.9988 10.9999 14.9988C11.1313 14.9988 11.2615 15.0247 11.383 15.075C11.5045 15.1253 11.6149 15.1991 11.7079 15.292L13.9999 17.586L19.2919 12.292C19.4796 12.1043 19.7343 11.9988 19.9999 11.9988C20.2654 11.9988 20.5201 12.1043 20.7079 12.292C20.8956 12.4798 21.0011 12.7345 21.0011 13C21.0011 13.2656 20.8956 13.5203 20.7079 13.708Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );

export const BookingProgress: React.FC<BookingProgressProps> = ({
  className,
}) => {
  const { bookingDetails } = useContext(BOOKING_CONTEXT);

  // Log the booking data for debugging
  console.log("Booking data:", bookingDetails);

  // Determine current stage based on available data
  const currentStage = () => {
    if (!bookingDetails) return 1;

    // Step 6: Payment Complete
    if (bookingDetails.paymentDetails?.status === "Paid") {
      console.log("Payment is complete");
      return 6;
    }

    // Step 5: Proposals Signed
    if (bookingDetails.proposalDetails?.completedContractLink) {
      console.log("Proposal has been signed");
      return 5;
    }

    // Step 4: Consultation Scheduled
    if (bookingDetails.consultationDetails?.startTime) {
      console.log("Consultation has been scheduled");
      return 4;
    }

    // Step 3: Audit Performed
    if (bookingDetails.reportConsultation) {
      console.log("Audit has been performed");
      return 3;
    }

    // Step 2: Utility Bills Uploaded
    if (bookingDetails.utilityBillDetails?.count > 0) {
      console.log("Utility bills have been uploaded");
      return 2;
    }

    // Step 1: Booking Created (default)
    console.log("Booking has been created (default)");
    return 1;
  };

  const stage = currentStage();
  console.log("Current stage determined:", stage);

  // Define booking progress steps
  const steps: Step[] = [
    {
      label: "Booking Created",
      status: stage >= 1 ? "completed" : "upcoming",
    },
    {
      label: "Utility Bills Uploaded",
      status: stage >= 2 ? "completed" : stage === 1 ? "current" : "upcoming",
    },
    {
      label: "Report Generated",
      status: stage >= 3 ? "completed" : stage === 2 ? "current" : "upcoming",
    },
    {
      label: "Consultation Scheduled",
      status: stage >= 4 ? "completed" : stage === 3 ? "current" : "upcoming",
    },
    {
      label: "Proposals Signed",
      status: stage >= 5 ? "completed" : stage === 4 ? "current" : "upcoming",
    },
    {
      label: "Payment Complete",
      status: stage >= 6 ? "completed" : stage === 5 ? "current" : "upcoming",
    },
  ];

  return (
    <div className={cn("relative w-full mt-4", className)}>
      <div className="overflow-x-auto md:overflow-x-auto scrollbar-hide">
        <div className="flex flex-nowrap items-center">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center flex-none">
              <div className="flex flex-col items-center text-center min-w-[120px] sm:min-w-[100px]">
                <StatusIcon status={step.status} />
                <span className="text-[14px] sm:text-[12px] text-black font-medium mt-2 ">
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-[2px] w-8 sm:w-12 md:w-16",
                    step.status === "completed"
                      ? "bg-[#5ea502]"
                      : "bg-[#d1d5db]"
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingProgress;
