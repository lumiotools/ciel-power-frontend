import { Check, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Booking } from "@/types/admin"
import { BOOKING_STAGES, STAGE_LABELS } from "@/constants/booking-stages"
import { formatDate, isStageCompleted, calculateProgressPercentage } from "@/utils/booking-utils"

interface BookingDetailsDialogProps {
  booking: Booking | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  reportUrl: string
  onReportUrlChange: (url: string) => void
  reportStatus: boolean
  onToggleReportStatus: () => void
}

export function BookingDetailsDialog({
  booking,
  isOpen,
  onOpenChange,
  reportUrl,
  onReportUrlChange,
  reportStatus,
  onToggleReportStatus
}: BookingDetailsDialogProps) {
  if (!booking) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Client Name</h3>
              <p className="mt-1 text-lg font-medium">{booking.title}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Booking Number</h3>
              <p className="mt-1 text-lg font-medium">{booking.bookingNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Service</h3>
              <p className="mt-1">{booking.serviceName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Current Stage</h3>
              <p className="mt-1">{STAGE_LABELS[booking.currentStage]}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Start Time</h3>
              <p className="mt-1">{formatDate(booking.startTime)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">End Time</h3>
              <p className="mt-1">{formatDate(booking.endTime)}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Booking Progress</h3>
            <div className="relative">
              <div className="flex items-center justify-between w-full">
                {BOOKING_STAGES.map((stage) => (
                  <div key={stage} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full ${
                        isStageCompleted(booking, stage) 
                          ? "bg-[#5cb85c]" 
                          : "bg-gray-200"
                      } flex items-center justify-center text-white`}
                    >
                      {isStageCompleted(booking, stage) ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-xs mt-1 text-center">{STAGE_LABELS[stage]}</span>
                  </div>
                ))}
              </div>
              
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
                <div
                  className="h-full bg-[#5cb85c]"
                  style={{
                    width: `${calculateProgressPercentage(booking)}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Report Management</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="reportUrl">Report URL</Label>
                <Input
                  id="reportUrl"
                  value={reportUrl}
                  onChange={(e) => onReportUrlChange(e.target.value)}
                  placeholder="Enter report URL"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="reportStatus">Report Display Status</Label>
                <Switch
                  id="reportStatus"
                  checked={reportStatus}
                  onCheckedChange={onToggleReportStatus}
                  className="data-[state=checked]:bg-[#5cb85c]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-[#5cb85c] hover:bg-[#4a9d4a]">Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
