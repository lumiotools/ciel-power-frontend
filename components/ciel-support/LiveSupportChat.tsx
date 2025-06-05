"use client";

import type React from "react";
import { useState } from "react";
import { Phone, Clock } from "lucide-react";

type CallStatus = "idle" | "submitting" | "submitted" | "failed";

export default function SimpleCallRequest() {
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState("");
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [callDetails, setCallDetails] = useState<any>(null);

  const handleSubmitRequest = async () => {
    if (!customerPhone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    setCallStatus("submitting");

    try {
      const response = await fetch(
        "http://localhost:8000/call/request-callback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: customerPhone,
            customer_name: customerName || "Customer",
            message: message || null,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setCallStatus("submitted");
        setCallDetails(data.data);

        // Auto-reset after 3 minutes
        setTimeout(() => {
          setCallStatus("idle");
          setCallDetails(null);
          setCustomerPhone("");
          setCustomerName("");
          setMessage("");
        }, 180000);
      } else {
        throw new Error(data.detail || "Failed to submit request");
      }
    } catch (error) {
      console.error("Request error:", error);
      setCallStatus("failed");

      // Reset after 5 seconds
      setTimeout(() => setCallStatus("idle"), 5000);
    }
  };

  if (callStatus === "submitted") {
    return (
      <div className="flex flex-col h-[650px] border rounded-lg shadow-sm overflow-auto bg-white">
        <div className="bg-[#8bc34a] text-white p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone size={32} className="text-white" />
          </div>
          <h2 className="text-xl font-bold mb-2">Request Submitted!</h2>
          <p className="text-green-100">We've received your callback request</p>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-center">
          <div className="text-center space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                What happens next?
              </h3>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#8bc34a] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Email sent to our team</p>
                    <p className="text-sm text-gray-600">
                      Your request has been forwarded immediately
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#8bc34a] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">We'll call you back</p>
                    <p className="text-sm text-gray-600">
                      Expect a call at <strong>{customerPhone}</strong> within{" "}
                      {callDetails?.estimated_callback_time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#8bc34a] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Expert assistance</p>
                    <p className="text-sm text-gray-600">
                      Our energy specialist will help with your inquiry
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {callDetails && (
              <div className="bg-gray-50 border rounded-lg p-4">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Reference ID:</span>
                    <span className="font-mono text-xs">
                      {callDetails.call_id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone Number:</span>
                    <span>{customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Expected Callback:</span>
                    <span>{callDetails.estimated_callback_time}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setCallStatus("idle");
                setCallDetails(null);
                setCustomerPhone("");
                setCustomerName("");
                setMessage("");
              }}
              className="text-[#8bc34a] hover:text-[#7cb342] font-medium"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[650px] border rounded-lg shadow-sm overflow-hidden bg-white">
      {/* Header */}
      <div className="bg-[#8bc34a] text-white p-6 text-center">
        <Phone size={48} className="mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Request a Callback</h2>
        <p className="text-green-100">
          Get expert help from our energy specialists
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* Phone Number (Required) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#8bc34a] focus:border-transparent"
              disabled={callStatus === "submitting"}
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll call you back at this number
            </p>
          </div>

          {/* Name (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#8bc34a] focus:border-transparent"
              disabled={callStatus === "submitting"}
            />
          </div>

          {/* Message (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brief Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us briefly how we can help you..."
              rows={3}
              className="w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#8bc34a] focus:border-transparent resize-none"
              disabled={callStatus === "submitting"}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitRequest}
            disabled={callStatus === "submitting" || !customerPhone.trim()}
            className="w-full bg-[#8bc34a] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#7cb342] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {callStatus === "submitting" ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting Request...
              </>
            ) : (
              <>
                <Phone size={20} />
                Request Callback
              </>
            )}
          </button>

          {callStatus === "failed" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">
                Failed to submit request. Please check your phone number and try
                again.
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Response Time</h4>
                <p className="text-sm text-blue-700">
                  We typically call back within 15-30 minutes during business
                  hours (Monday-Friday, 9 AM - 6 PM EST)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
