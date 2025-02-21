"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle, Clock, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  price: {
    totalGross: {
      amount: string;
      currency: string;
    };
  };
}

interface Customer {
  customerId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  bookings: Booking[];
}

interface BookingResponse {
  status: string;
  data: Customer[];
}

function BookingStatus({
  accepted,
  canceled,
}: {
  accepted: boolean;
  canceled: boolean;
}) {
  if (canceled) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <XCircle className="h-4 w-4" />
        Canceled
      </Badge>
    );
  }

  if (accepted) {
    return (
      <Badge
        variant="secondary"
        className="flex items-center gap-1 bg-green-500 text-white"
      >
        <CheckCircle2 className="h-4 w-4" />
        Confirmed
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <Clock className="h-4 w-4" />
      Pending
    </Badge>
  );
}

function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#f8faf5]">
          <TableHead>Booking Number</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.bookingNumber}>
            <TableCell className="font-medium">
              {booking.bookingNumber}
            </TableCell>
            <TableCell>
              <span>{format(new Date(booking.startTime), "MMM d, yyyy")}</span>
              <br />
              <span className="text-sm text-muted-foreground">
                {format(new Date(booking.startTime), "h:mm a")} -{" "}
                {format(new Date(booking.endTime), "h:mm a")}
              </span>
            </TableCell>
            <TableCell>{booking.serviceName}</TableCell>
            <TableCell>{booking.title}</TableCell>
            <TableCell>
              ${booking.price.totalGross.amount}{" "}
              {booking.price.totalGross.currency}
            </TableCell>
            <TableCell>
              <BookingStatus
                accepted={booking.accepted}
                canceled={booking.canceled}
              />
            </TableCell>
            <TableCell>
              <Link href={`/admin/${booking.bookingNumber}/report`} passHref>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  View Report
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}

export default function BookingsPage() {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [bookingNumber, setBookingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  async function fetchAllBookings() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/bookings/");

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data: BookingResponse = await res.json();
      setAllCustomers(data.data);
      const allBookings = data.data.flatMap((customer) => customer.bookings);
      setFilteredBookings(allBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("An error occurred while fetching bookings");
    } finally {
      setIsLoading(false);
    }
  }

  function handleFilter() {
    let filtered: Booking[] = [];

    if (selectedCustomerId && selectedCustomerId !== "all") {
      const customer = allCustomers.find(
        (c) => c.customerId === selectedCustomerId
      );
      filtered = customer ? customer.bookings : [];
    } else {
      filtered = allCustomers.flatMap((customer) => customer.bookings);
    }

    if (bookingNumber) {
      filtered = filtered.filter((booking) =>
        booking.bookingNumber.includes(bookingNumber)
      );
    }

    setFilteredBookings(filtered);
  }

  return (
    <div className="min-h-screen bg-[#f8faf5] py-10">
      <div className="container mx-auto px-4">
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-[#B4D892] text-white">
            <CardTitle className="text-3xl font-bold">Bookings</CardTitle>
            <CardDescription className="text-white/80">
              Manage your upcoming and past bookings
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Select onValueChange={setSelectedCustomerId}>
                <SelectTrigger className="w-[200px] bg-white">
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  {allCustomers.map((customer) => (
                    <SelectItem
                      key={customer.customerId}
                      value={customer.customerId}
                    >
                      {customer.firstName} {customer.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                value={bookingNumber}
                onChange={(e) => setBookingNumber(e.target.value)}
                placeholder="Enter Booking Number"
                className="max-w-sm bg-white"
              />
              <Button
                onClick={handleFilter}
                className="bg-[#B4D892] text-white hover:bg-[#a3c781]"
              >
                Filter
              </Button>
              {(selectedCustomerId || bookingNumber) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCustomerId("");
                    setBookingNumber("");
                    setFilteredBookings(
                      allCustomers.flatMap((customer) => customer.bookings)
                    );
                  }}
                  className="border-[#B4D892] text-[#B4D892] hover:bg-[#f8faf5]"
                >
                  Clear Filter
                </Button>
              )}
            </div>
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <BookingsTable bookings={filteredBookings} />
              </div>
            ) : (
              <p className="text-center py-4">
                No bookings found. Try clearing the filter.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
