"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import PaymentModal from "@/components/payment/modal";
import { AUTH_CONTEXT } from "@/providers/auth";

export default function BookingPaymentPage() {
  const { userDetails } = useContext(AUTH_CONTEXT);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // This would typically come from a route parameter or state
  const bookingNumber = userDetails?.bookingNumber;

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Booking Number:</span> {bookingNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Status:</span> Pending Payment
          </p>
        </div>
        {bookingNumber && (
          <Button className="w-full" onClick={() => setIsModalOpen(true)}>
            Pay Now
          </Button>
        )}
      </div>

      {bookingNumber && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bookingNumber={bookingNumber}
        />
      )}
    </div>
  );
}
