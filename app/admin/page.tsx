/* eslint-disable @typescript-eslint/no-unused-vars */
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
    taxes: [];
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

  // async function fetchAllBookings() {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const res = await fetch("/api/admin/bookings/");

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch bookings");
  //     }

  //     const data: BookingResponse = await res.json();
  //     setAllCustomers(data.data);
  //     const allBookings = data.data.flatMap((customer) => customer.bookings);
  //     setFilteredBookings(allBookings);
  //   } catch (error) {
  //     console.error("Error fetching bookings:", error);
  //     setError("An error occurred while fetching bookings");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  function fetchAllBookings() {
    setIsLoading(true);
    setError(null);
    try {
      const customData: Customer[] = [
        {
          customerId: "42559J3NJK3194E19DAD33",
          firstName: "Abhijeet",
          lastName: "",
          emailAddress: "abhijeet98923@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559394UEM194EED020D1",
          firstName: "ASDFGHJ",
          lastName: "ASDFGHJ",
          emailAddress: "abhijeetdv@gmail.com",
          bookings: [],
        },
        {
          customerId: "425594H3PXK19492EBB20B",
          firstName: "Jane",
          lastName: "Doe",
          emailAddress: "janedoe5@gmail.com",
          bookings: [
            {
              bookingNumber: "2559501236177110",
              startTime: "2025-01-24T11:45:00+00:00",
              endTime: "2025-01-24T14:15:00+00:00",
              title: "Jane Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-23T06:48:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "99", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501231309676",
              startTime: "2025-01-24T11:45:00+00:00",
              endTime: "2025-01-24T14:15:00+00:00",
              title: "Jane Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-23T06:52:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501233879155",
              startTime: "2025-01-24T11:45:00+00:00",
              endTime: "2025-01-24T14:15:00+00:00",
              title: "Jane Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-23T06:53:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "99", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501237837952",
              startTime: "2025-01-24T09:00:00+00:00",
              endTime: "2025-01-24T11:30:00+00:00",
              title: "Jane Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-23T06:47:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559TJUHTF19492EA04B1",
          firstName: "Jane",
          lastName: "Doe",
          emailAddress: "janedoe2@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559WY76C419493707811",
          firstName: "John",
          lastName: "Doe",
          emailAddress: "johndoe7@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559YATYRW1949370AF88",
          firstName: "John",
          lastName: "Doe",
          emailAddress: "johndoe7@gmail.com",
          bookings: [],
        },
        {
          customerId: "425599FUMY41949370B789",
          firstName: "John",
          lastName: "Doe",
          emailAddress: "johndoe7@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559UXWF7R194EF5AF6ED",
          firstName: "John",
          lastName: "Doe",
          emailAddress: "rrwbnftcoe@gmail.com",
          bookings: [],
        },
        {
          customerId: "425593AXHYE19496861A8F",
          firstName: "John",
          lastName: "Doe",
          emailAddress: "john.doe@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559AN4KCA1949373FAFE",
          firstName: "John",
          lastName: "Doe",
          emailAddress: "johndoe7@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559KEJCKE194985A5029",
          firstName: "John",
          lastName: "Doe",
          emailAddress: "johndoe@test.com",
          bookings: [
            {
              bookingNumber: "2559501249282255",
              startTime: "2025-01-30T09:30:00+00:00",
              endTime: "2025-01-30T13:30:00+00:00",
              title: "John Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T08:31:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501249691495",
              startTime: "2025-01-29T09:30:00+00:00",
              endTime: "2025-01-29T13:30:00+00:00",
              title: "John Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T08:13:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559PKJEAR19492EF9B95",
          firstName: "John",
          lastName: "Doe",
          emailAddress: "johndoe6@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559MYNKP619492F0A14C",
          firstName: "John",
          lastName: "Doe",
          emailAddress: "",
          bookings: [
            {
              bookingNumber: "2559501231173588",
              startTime: "2025-01-25T09:00:00+00:00",
              endTime: "2025-01-25T11:30:00+00:00",
              title: "John Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-23T08:39:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501237072967",
              startTime: "2025-01-24T15:00:00+00:00",
              endTime: "2025-01-24T17:30:00+00:00",
              title: "John Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-23T07:57:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501239915405",
              startTime: "2025-01-24T15:00:00+00:00",
              endTime: "2025-01-24T17:30:00+00:00",
              title: "John Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-23T07:58:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501234044360",
              startTime: "2025-01-24T15:00:00+00:00",
              endTime: "2025-01-24T17:30:00+00:00",
              title: "John Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-23T08:36:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559U73LR719498B6F29E",
          firstName: "User",
          lastName: "Doe",
          emailAddress: "test@test.com",
          bookings: [
            {
              bookingNumber: "2559501248663025",
              startTime: "2025-01-31T10:30:00+00:00",
              endTime: "2025-01-31T14:30:00+00:00",
              title: "User Doe",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T09:29:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "425593NUMKT194F3DF326E",
          firstName: "rishabh",
          lastName: "j",
          emailAddress: "rishabhjambhulkar@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559C7YTFH194AC66E130",
          firstName: "rishabh",
          lastName: "jam",
          emailAddress: "rishabhe@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559LR773E194DAFC00CA",
          firstName: "Rishabh",
          lastName: "Jambhulkar",
          emailAddress: "jambhulkarrishabh@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502077031532",
              startTime: "2025-02-15T13:00:00+00:00",
              endTime: "2025-02-15T17:00:00+00:00",
              title: "Rishabh Jambhulkar",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-07T03:54:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502079453230",
              startTime: "2025-02-15T10:30:00+00:00",
              endTime: "2025-02-15T14:30:00+00:00",
              title: "Rishabh Jambhulkar",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-07T03:35:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502071003106",
              startTime: "2025-02-14T12:00:00+00:00",
              endTime: "2025-02-14T14:30:00+00:00",
              title: "Rishabh Jambhulkar",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-07T02:46:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502063281154",
              startTime: "2025-02-06T14:00:00+00:00",
              endTime: "2025-02-06T16:30:00+00:00",
              title: "Rishabh Jambhulkar",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-06T10:08:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "425594K7TYW194BC5568BF",
          firstName: "Aditya",
          lastName: "Kanfade",
          emailAddress: "adityaakanfade@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502109140397",
              startTime: "2025-02-10T09:00:00+00:00",
              endTime: "2025-02-10T11:30:00+00:00",
              title: "Aditya Kanfade",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-10T05:30:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559EAL3AA194DA0B587A",
          firstName: "Aditya",
          lastName: "Kanfade",
          emailAddress: "aditya@teamlumio.ai",
          bookings: [
            {
              bookingNumber: "2559502101159695",
              startTime: "2025-02-10T12:30:00+00:00",
              endTime: "2025-02-10T15:00:00+00:00",
              title: "Aditya Kanfade",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-10T05:35:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559MNMMHX194F3B603CF",
          firstName: "Aditya",
          lastName: "Kanfade",
          emailAddress: "adikan99@proton.me",
          bookings: [],
        },
        {
          customerId: "42559RRM9XT19498BEC061",
          firstName: "Dawood",
          lastName: "Khatri",
          emailAddress: "dawood@gmail.com",
          bookings: [
            {
              bookingNumber: "2559501289667196",
              startTime: "2025-02-08T10:30:00+00:00",
              endTime: "2025-02-08T13:00:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-28T01:30:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501241636883",
              startTime: "2025-02-07T09:30:00+00:00",
              endTime: "2025-02-07T12:00:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T10:37:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501286279629",
              startTime: "2025-01-30T12:00:00+00:00",
              endTime: "2025-01-30T14:30:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-28T01:55:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501248070318",
              startTime: "2025-01-27T15:30:00+00:00",
              endTime: "2025-01-27T18:00:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T09:40:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559XW79CP1948CD064FE",
          firstName: "Dawood",
          lastName: "Khatri",
          emailAddress: "dawood@teamlumio.ai",
          bookings: [
            {
              bookingNumber: "2559501258121378",
              startTime: "2025-02-11T12:30:00+00:00",
              endTime: "2025-02-11T15:00:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-25T05:52:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501271830566",
              startTime: "2025-02-06T11:30:00+00:00",
              endTime: "2025-02-06T14:00:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-27T01:51:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501258650515",
              startTime: "2025-01-31T13:00:00+00:00",
              endTime: "2025-01-31T15:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-25T02:40:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501242943791",
              startTime: "2025-01-31T09:30:00+00:00",
              endTime: "2025-01-31T12:00:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-24T06:43:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501254359677",
              startTime: "2025-01-31T09:30:00+00:00",
              endTime: "2025-01-31T12:00:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-25T02:47:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501256547040",
              startTime: "2025-01-31T09:00:00+00:00",
              endTime: "2025-01-31T11:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-25T06:11:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501256816649",
              startTime: "2025-01-30T14:00:00+00:00",
              endTime: "2025-01-30T16:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-25T02:43:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501246613726",
              startTime: "2025-01-30T11:00:00+00:00",
              endTime: "2025-01-30T13:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-24T06:12:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501245863485",
              startTime: "2025-01-30T09:30:00+00:00",
              endTime: "2025-01-30T12:00:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-24T06:09:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501245231599",
              startTime: "2025-01-30T09:00:00+00:00",
              endTime: "2025-01-30T09:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-24T02:31:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501258813240",
              startTime: "2025-01-30T09:00:00+00:00",
              endTime: "2025-01-30T09:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-25T05:22:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501248125251",
              startTime: "2025-01-29T09:00:00+00:00",
              endTime: "2025-01-29T11:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-24T06:50:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501243779583",
              startTime: "2025-01-29T09:00:00+00:00",
              endTime: "2025-01-29T11:30:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T08:56:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501247519675",
              startTime: "2025-01-28T09:00:00+00:00",
              endTime: "2025-01-28T11:30:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T08:54:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501242304992",
              startTime: "2025-01-28T09:00:00+00:00",
              endTime: "2025-01-28T13:00:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T09:20:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501244898088",
              startTime: "2025-01-25T15:30:00+00:00",
              endTime: "2025-01-25T18:00:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T06:25:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501242057333",
              startTime: "2025-01-25T13:00:00+00:00",
              endTime: "2025-01-25T17:00:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T09:21:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501254614129",
              startTime: "2025-01-25T13:00:00+00:00",
              endTime: "2025-01-25T17:00:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-25T01:14:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501243651180",
              startTime: "2025-01-25T10:30:00+00:00",
              endTime: "2025-01-25T14:30:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T09:21:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501247580445",
              startTime: "2025-01-25T09:00:00+00:00",
              endTime: "2025-01-25T13:00:00+00:00",
              title: "Dawood Khatri",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T09:18:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501228559592",
              startTime: "2025-01-24T09:00:00+00:00",
              endTime: "2025-01-24T11:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-22T06:50:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501224847529",
              startTime: "2025-01-24T09:00:00+00:00",
              endTime: "2025-01-24T11:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-22T07:03:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501239712782",
              startTime: "2025-01-23T09:00:00+00:00",
              endTime: "2025-01-23T11:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-23T04:59:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501227426120",
              startTime: "2025-01-22T09:00:00+00:00",
              endTime: "2025-01-22T11:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-22T01:58:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501226395290",
              startTime: "2025-01-22T09:00:00+00:00",
              endTime: "2025-01-22T11:30:00+00:00",
              title: "Dawood Khatri",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-22T06:14:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559PHEFAL194BC061360",
          firstName: "Dawood",
          lastName: "Khatri",
          emailAddress: "dawood@team.ai",
          bookings: [],
        },
        {
          customerId: "42559YW9APL1948CF2AD8E",
          firstName: "Sahil",
          lastName: "Lede",
          emailAddress: "sahillede940@gmail.com",
          bookings: [
            {
              bookingNumber: "2559501225312092",
              startTime: "2025-01-22T09:45:00+00:00",
              endTime: "2025-01-22T12:15:00+00:00",
              title: "Sahil Lede",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-22T02:36:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559PK6MAC19498B4F63B",
          firstName: "User",
          lastName: "Name",
          emailAddress: "testuser@temp.com",
          bookings: [],
        },
        {
          customerId: "425596XTM3E194A6BB9812",
          firstName: "Pranit",
          lastName: "Patil",
          emailAddress: "pranittest@gmail.com",
          bookings: [
            {
              bookingNumber: "2559501276467538",
              startTime: "2025-01-28T15:00:00+00:00",
              endTime: "2025-01-28T17:30:00+00:00",
              title: "Pranit Patil",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-27T02:50:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559RFMKX9194CC96FAC5",
          firstName: "Monil",
          lastName: "Pokar",
          emailAddress: "moniltest@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502035533652",
              startTime: "2025-02-20T12:00:00+00:00",
              endTime: "2025-02-20T14:30:00+00:00",
              title: "Monil Pokar",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-03T10:54:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "425597FHC7P194EF86EACA",
          firstName: "DEVENDRA",
          lastName: "R. VISHWAKARMA",
          emailAddress: "drinsu.invest@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559K3NFRJ194E5EEAC8C",
          firstName: "Nutshell",
          lastName: "Test",
          emailAddress: "nutshell.test@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502082073130",
              startTime: "2025-02-28T10:30:00+00:00",
              endTime: "2025-02-28T13:00:00+00:00",
              title: "Nutshell Test",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-08T09:15:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559WNWHY41950367F5F0",
          firstName: "Snuggpro",
          lastName: "Test",
          emailAddress: "snuggpro.test@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502143682185",
              startTime: "2025-02-28T10:30:00+00:00",
              endTime: "2025-02-28T13:00:00+00:00",
              title: "Snuggpro Test",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-14T02:40:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "4255933WRJJ194DF8FDE35",
          firstName: "Webhook",
          lastName: "Test",
          emailAddress: "webhook.test@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502087098586",
              startTime: "2025-02-15T10:00:00+00:00",
              endTime: "2025-02-15T12:30:00+00:00",
              title: "Webhook Test",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-08T00:47:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502083826386",
              startTime: "2025-02-10T10:30:00+00:00",
              endTime: "2025-02-10T13:00:00+00:00",
              title: "Webhook Test",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-08T03:22:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502082958140",
              startTime: "2025-02-10T10:00:00+00:00",
              endTime: "2025-02-10T12:30:00+00:00",
              title: "Webhook Test",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-08T03:06:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502086939383",
              startTime: "2025-02-08T09:00:00+00:00",
              endTime: "2025-02-08T11:30:00+00:00",
              title: "Webhook Test",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-08T01:06:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502072019428",
              startTime: "2025-02-07T13:00:00+00:00",
              endTime: "2025-02-07T15:30:00+00:00",
              title: "Webhook Test",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-07T03:54:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502079482745",
              startTime: "2025-02-07T10:30:00+00:00",
              endTime: "2025-02-07T13:00:00+00:00",
              title: "Webhook Test",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-07T03:37:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559NRXJ7H194DBBE8000",
          firstName: "Lumio",
          lastName: "Tools",
          emailAddress: "lumiotools@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559CX7RNF194CC59FF23",
          firstName: "Test",
          lastName: "User",
          emailAddress: "test321@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502038616448",
              startTime: "2025-02-18T09:00:00+00:00",
              endTime: "2025-02-18T11:30:00+00:00",
              title: "Test User",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-03T10:02:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "425594NAHMR194C251422C",
          firstName: "Test",
          lastName: "User",
          emailAddress: "test@gmailc.om",
          bookings: [
            {
              bookingNumber: "2559502016608559",
              startTime: "2025-02-15T09:00:00+00:00",
              endTime: "2025-02-15T11:30:00+00:00",
              title: "Test User",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-01T11:20:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "425593N97YY194CC69A7BE",
          firstName: "Test",
          lastName: "User",
          emailAddress: "testuser21@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502032183833",
              startTime: "2025-02-24T11:00:00+00:00",
              endTime: "2025-02-24T13:30:00+00:00",
              title: "Test User",
              canceled: true,
              accepted: true,
              creationTime: "2025-02-03T10:15:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559HECHNC194CB8AC7B0",
          firstName: "Test",
          lastName: "User",
          emailAddress: "test123@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502039775946",
              startTime: "2025-02-03T10:00:00+00:00",
              endTime: "2025-02-03T12:30:00+00:00",
              title: "Test User",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-03T06:19:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "425596U6PAE194C24C6824",
          firstName: "Test",
          lastName: "User",
          emailAddress: "test@gmail.com",
          bookings: [],
        },
        {
          customerId: "42559TC4AMP194CC5E34E3",
          firstName: "Test",
          lastName: "User",
          emailAddress: "testuser123@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502033898580",
              startTime: "2025-02-05T09:00:00+00:00",
              endTime: "2025-02-05T11:30:00+00:00",
              title: "Test User",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-03T10:10:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559K6JFCN194C254EF7D",
          firstName: "Test",
          lastName: "User",
          emailAddress: "test2@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502016276151",
              startTime: "2025-02-15T09:30:00+00:00",
              endTime: "2025-02-15T12:00:00+00:00",
              title: "Test User",
              canceled: true,
              accepted: true,
              creationTime: "2025-02-01T11:24:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "425596C7YTU19498BCD431",
          firstName: "Abhijeet ",
          lastName: "Vishwakarma",
          emailAddress: "abhijeetdrv@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502073794572",
              startTime: "2025-02-27T10:00:00+00:00",
              endTime: "2025-02-27T12:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-07T01:58:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502058214674",
              startTime: "2025-02-26T09:00:00+00:00",
              endTime: "2025-02-26T11:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T03:32:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502072664013",
              startTime: "2025-02-21T10:00:00+00:00",
              endTime: "2025-02-21T12:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-07T01:18:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502052768118",
              startTime: "2025-02-21T09:30:00+00:00",
              endTime: "2025-02-21T12:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T03:19:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502054542428",
              startTime: "2025-02-20T10:00:00+00:00",
              endTime: "2025-02-20T12:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T04:04:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502191471019",
              startTime: "2025-02-20T10:00:00+00:00",
              endTime: "2025-02-20T12:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-19T07:02:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502076142215",
              startTime: "2025-02-18T13:00:00+00:00",
              endTime: "2025-02-18T15:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-07T01:45:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502066632306",
              startTime: "2025-02-14T10:00:00+00:00",
              endTime: "2025-02-14T12:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-06T10:54:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502054255748",
              startTime: "2025-02-14T09:30:00+00:00",
              endTime: "2025-02-14T12:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T03:17:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502068456255",
              startTime: "2025-02-12T11:00:00+00:00",
              endTime: "2025-02-12T11:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-06T03:42:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502103635395",
              startTime: "2025-02-10T10:00:00+00:00",
              endTime: "2025-02-10T12:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-10T04:31:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502079336659",
              startTime: "2025-02-07T13:00:00+00:00",
              endTime: "2025-02-07T15:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-07T01:56:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502073361435",
              startTime: "2025-02-07T10:00:00+00:00",
              endTime: "2025-02-07T12:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-07T01:37:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502062592320",
              startTime: "2025-02-06T15:30:00+00:00",
              endTime: "2025-02-06T18:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-06T11:03:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502069721912",
              startTime: "2025-02-06T13:30:00+00:00",
              endTime: "2025-02-06T14:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-06T03:41:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502068797466",
              startTime: "2025-02-06T13:00:00+00:00",
              endTime: "2025-02-06T13:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-06T10:38:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502055891596",
              startTime: "2025-02-06T10:30:00+00:00",
              endTime: "2025-02-06T14:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T04:15:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502051166220",
              startTime: "2025-02-06T10:30:00+00:00",
              endTime: "2025-02-06T14:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T04:37:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502052969347",
              startTime: "2025-02-06T10:00:00+00:00",
              endTime: "2025-02-06T14:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T09:20:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502051106262",
              startTime: "2025-02-05T15:30:00+00:00",
              endTime: "2025-02-05T16:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T04:41:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502051504203",
              startTime: "2025-02-05T13:30:00+00:00",
              endTime: "2025-02-05T14:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T03:43:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502056826246",
              startTime: "2025-02-05T13:30:00+00:00",
              endTime: "2025-02-05T16:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T03:39:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502052452182",
              startTime: "2025-02-05T13:30:00+00:00",
              endTime: "2025-02-05T16:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T04:02:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502051773315",
              startTime: "2025-02-05T13:00:00+00:00",
              endTime: "2025-02-05T17:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T03:44:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502053074841",
              startTime: "2025-02-05T10:00:00+00:00",
              endTime: "2025-02-05T10:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T04:07:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502054987910",
              startTime: "2025-02-05T10:00:00+00:00",
              endTime: "2025-02-05T12:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T02:13:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502051548384",
              startTime: "2025-02-05T10:00:00+00:00",
              endTime: "2025-02-05T12:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T03:15:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502055289345",
              startTime: "2025-02-05T09:30:00+00:00",
              endTime: "2025-02-05T10:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T03:39:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502057467833",
              startTime: "2025-02-05T09:30:00+00:00",
              endTime: "2025-02-05T10:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-05T04:33:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501311577323",
              startTime: "2025-02-01T15:30:00+00:00",
              endTime: "2025-02-01T16:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-31T04:48:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501315213758",
              startTime: "2025-02-01T13:00:00+00:00",
              endTime: "2025-02-01T15:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-31T04:00:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501317917495",
              startTime: "2025-02-01T11:00:00+00:00",
              endTime: "2025-02-01T11:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-31T04:07:00+00:00",
              serviceName: "Borough of Madison $49 Home Energy Audit ",
              serviceId: "425599MFERH1948CA1943F_WEPPUJEH",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501312579012",
              startTime: "2025-02-01T11:00:00+00:00",
              endTime: "2025-02-01T13:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-31T03:11:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501318076011",
              startTime: "2025-02-01T10:00:00+00:00",
              endTime: "2025-02-01T12:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-31T04:05:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501291521405",
              startTime: "2025-01-31T09:00:00+00:00",
              endTime: "2025-01-31T11:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-29T05:56:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501319752196",
              startTime: "2025-01-31T09:00:00+00:00",
              endTime: "2025-01-31T11:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-31T03:16:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501316718680",
              startTime: "2025-01-31T09:00:00+00:00",
              endTime: "2025-01-31T11:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-31T04:54:00+00:00",
              serviceName: "Ciel Power Home Energy Audit",
              serviceId: "425599MFERH1948CA1943F_RFXRFLXP",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501278690053",
              startTime: "2025-01-29T13:00:00+00:00",
              endTime: "2025-01-29T15:30:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: true,
              accepted: true,
              creationTime: "2025-01-27T13:47:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501244741608",
              startTime: "2025-01-28T14:00:00+00:00",
              endTime: "2025-01-28T18:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-24T12:24:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559501259235719",
              startTime: "2025-01-27T09:00:00+00:00",
              endTime: "2025-01-27T13:00:00+00:00",
              title: "Abhijeet  Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-01-25T05:24:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
        {
          customerId: "42559RLMRLR194EF4CF8F6",
          firstName: "Abhijeet",
          lastName: "Vishwakarma",
          emailAddress: "adrv13072002@gmail.com",
          bookings: [
            {
              bookingNumber: "2559502105201941",
              startTime: "2025-02-14T09:30:00+00:00",
              endTime: "2025-02-14T13:30:00+00:00",
              title: "Abhijeet Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-10T05:00:00+00:00",
              serviceName: "Summit Home Energy Insight Program",
              serviceId: "425599MFERH1948CA1943F_FTLNREUK",
              price: {
                totalGross: { amount: "49", currency: "USD" },
                totalNet: { amount: "49", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
            {
              bookingNumber: "2559502107744202",
              startTime: "2025-02-10T13:30:00+00:00",
              endTime: "2025-02-10T16:00:00+00:00",
              title: "Abhijeet Vishwakarma",
              canceled: false,
              accepted: true,
              creationTime: "2025-02-10T04:59:00+00:00",
              serviceName: "Westfield Home Energy Savings Program",
              serviceId: "425599MFERH1948CA1943F_UHFWKLEK",
              price: {
                totalGross: { amount: "99", currency: "USD" },
                totalNet: { amount: "99", currency: "USD" },
                totalTaxes: { amount: "0", currency: "USD" },
                totalPaid: { amount: "0", currency: "USD" },
                taxes: [],
              },
            },
          ],
        },
      ];

      setAllCustomers(customData);
      const allBookings = customData.flatMap((customer) => customer.bookings);
      setFilteredBookings(allBookings);
    } catch (error) {
      console.error("Error loading custom data:", error);
      setError("An error occurred while loading bookings");
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
