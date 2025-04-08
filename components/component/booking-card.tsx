import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import CountdownTimer from "@/components/component/CountdownTimer";
import { useRouter } from "next/navigation";
import type React from "react"; // Added import for React

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

interface BookingCardProps {
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
}

export default function BookingCard({
  bookingNumber,
  startTime,
  endTime,
  serviceName,
  canceled,
  accepted,
  price,
}: BookingCardProps) {
  const router = useRouter();

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

  const getStatusBadge = (): React.ReactElement => {
    if (canceled) {
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
          Cancelled
        </span>
      );
    }
    if (accepted) {
      return (
        <div className="flex items-center">
          <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-green-100 text-green-800">
            Confirmed
          </span>
          <CountdownTimer startTime={startTime} />
        </div>
      );
    }
    return (
      <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
        Pending
      </span>
    );
  };

  const handleViewDetails = () => {
    router.push(`/dashboard/bookings/${bookingNumber}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {serviceName}
            </h2>
            {getStatusBadge()}
          </div>

          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {formatDateTime(startTime)} - {formatDateTime(endTime)}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>Booking #{bookingNumber}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              ${price.totalGross.amount}
            </p>
            <p className="text-sm text-gray-500">
              {price.totalPaid.amount === "0" ? "Unpaid" : "Paid"}
            </p>
          </div>
          <Button onClick={handleViewDetails} variant="outline">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
