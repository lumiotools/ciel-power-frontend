"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Booking } from "@/types/admin";
import { STAGE_LABELS } from "@/constants/booking-stages";
import { formatDate } from "@/utils/booking-utils";
import Link from "next/link";

interface BookingsTableProps {
  bookings: Booking[];
  isLoading: boolean;
}

export function BookingsTable({ bookings, isLoading }: BookingsTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5cb85c]"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No bookings found
          </h3>
          <p className="text-gray-500 max-w-md">
            There are currently no bookings in the system. New bookings will
            appear here once they are created.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold">Booking Number</TableHead>
            <TableHead className="font-semibold">Client Name</TableHead>
            <TableHead className="font-semibold">Address</TableHead>
            <TableHead className="font-semibold">Date & Time</TableHead>
            <TableHead className="font-semibold">Current Stage</TableHead>
            <TableHead className="font-semibold">Utility Bills Uploaded</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.bookingNumber} className="hover:bg-gray-50"> 
              <TableCell className="font-medium">
                {booking.bookingNumber}
              </TableCell>
              <TableCell>{booking.title}</TableCell>
              <TableCell>{booking.address}</TableCell>
              <TableCell>{formatDate(booking.startTime)}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {STAGE_LABELS[booking.currentStage]}
                </span>
              </TableCell>
              <TableCell>{booking.utilityBillsUploaded ? "Yes": "No"}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-[#5cb85c] hover:text-[#4a9d4a] hover:bg-green-50"
                >
                  <Link href={`/admin/${booking.bookingNumber}`}>
                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
