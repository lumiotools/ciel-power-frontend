import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Booking } from "@/types/admin"
import { STAGE_LABELS } from "@/constants/booking-stages"
import { formatDate } from "@/utils/booking-utils"

interface BookingsTableProps {
  bookings: Booking[]
  reportStatuses: Record<string, boolean>
  onToggleReportStatus: (bookingNumber: string) => void
  onViewDetails: (booking: Booking) => void
  isLoading: boolean
}

export function BookingsTable({ 
  bookings, 
  reportStatuses, 
  onToggleReportStatus, 
  onViewDetails,
  isLoading 
}: BookingsTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5cb85c]"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking Number</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Current Stage</TableHead>
            <TableHead>Report Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.bookingNumber} className="cursor-pointer hover:bg-gray-50">
              <TableCell className="font-medium">{booking.bookingNumber}</TableCell>
              <TableCell>{booking.title}</TableCell>
              <TableCell>{booking.serviceName}</TableCell>
              <TableCell>{formatDate(booking.startTime)}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {STAGE_LABELS[booking.currentStage]}
                </span>
              </TableCell>
              <TableCell>
                <Switch
                  checked={reportStatuses[booking.bookingNumber]}
                  onCheckedChange={() => onToggleReportStatus(booking.bookingNumber)}
                  className="data-[state=checked]:bg-[#5cb85c]"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(booking)}
                  className="text-[#5cb85c] hover:text-[#4a9d4a] hover:bg-green-50"
                >
                  View Details <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
