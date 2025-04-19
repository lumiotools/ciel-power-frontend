"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

// Initialize Stripe outside of the component to avoid recreating it on each render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingNumber: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  bookingNumber,
}: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/user/bookings/${bookingNumber}/initiate-payment`
      );
      const responseJson = await response.json();

      if (!responseJson.success) {
        throw new Error(responseJson.detail);
      }

      setClientSecret(responseJson.data.clientSecret);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !clientSecret) {
      initiatePayment();
    }
  }, [isOpen, clientSecret, bookingNumber]);

  // Reset client secret when modal is closed
  const handleClose = () => {
    onClose();
    setClientSecret(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold ">Complete Payment</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Preparing payment...</span>
          </div>
        ) : (
          <>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm onSuccess={handleClose} />
              </Elements>
            )}

            {error && (
              <div className="py-4 text-center text-red-500">
                {error}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, // This won't be used as we're handling completion manually
      },
      redirect: "if_required",
    });

    if (error) {
      setPaymentError(
        error.message || "Something went wrong with your payment"
      );
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Payment successful, close the modal
      setIsProcessing(false);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[80dvh] overflow-x-hidden">
      <PaymentElement />

      {paymentError && (
        <div className="text-red-500 text-sm">{paymentError}</div>
      )}

      <div className="flex gap-4 w-full">
        <Button
          type="button"
          variant="outline"
          className="w-1/2 h-12 py-3 text-base border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          onClick={onSuccess}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-1/2 h-12 py-3 text-base text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </Button>
      </div>
    </form>
  );
}
