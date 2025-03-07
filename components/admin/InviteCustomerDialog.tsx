import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Booking } from "@/types/admin"
import { STAGE_LABELS } from "@/constants/booking-stages"
import { formatDate } from "@/utils/booking-utils"

interface InviteCustomerDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  bookeoNumber: string
  onBookeoNumberChange: (value: string) => void
  searchedBooking: Booking | null
  isSearchingBooking: boolean
  onSearchBooking: () => void
  nutshellLeadFound: boolean | null
  nutshellLeadName: string
  onNutshellLeadNameChange: (value: string) => void
  isSearchingLead: boolean
  onSearchLead: () => void
  leadFound: boolean
  onInviteCustomer: () => void
  onReset: () => void
}

export function InviteCustomerDialog({
  isOpen,
  onOpenChange,
  bookeoNumber,
  onBookeoNumberChange,
  searchedBooking,
  isSearchingBooking,
  onSearchBooking,
  nutshellLeadFound,
  nutshellLeadName,
  onNutshellLeadNameChange,
  isSearchingLead,
  onSearchLead,
  leadFound,
  onInviteCustomer,
  onReset
}: InviteCustomerDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onReset()
        onOpenChange(open)
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Customer to Portal</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bookeoNumber">Bookeo Booking Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="bookeoNumber"
                  value={bookeoNumber}
                  onChange={(e) => onBookeoNumberChange(e.target.value)}
                  placeholder="Enter booking number"
                  disabled={isSearchingBooking}
                />
                <Button
                  onClick={onSearchBooking}
                  disabled={!bookeoNumber.trim() || isSearchingBooking}
                  className="bg-[#5cb85c] hover:bg-[#4a9d4a]"
                >
                  {isSearchingBooking ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </div>

            {searchedBooking ? (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="font-medium text-green-800">Booking Found:</p>
                <p className="text-sm text-green-700">
                  {searchedBooking.title} - {searchedBooking.serviceName}
                </p>
                <p className="text-xs text-green-600 mt-1">{formatDate(searchedBooking.startTime)}</p>
                <p className="text-xs text-green-600 mt-1">
                  Stage: {STAGE_LABELS[searchedBooking.currentStage]}
                </p>
              </div>
            ) : bookeoNumber && !isSearchingBooking ? (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">No booking found with this number.</p>
              </div>
            ) : null}

            {searchedBooking && nutshellLeadFound !== null && (
              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Nutshell Lead Status:</p>
                {nutshellLeadFound ? (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-700">
                      <Check className="inline-block h-4 w-4 mr-1" />
                      Nutshell lead found
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <p className="text-sm text-amber-700">No Nutshell lead found for this booking.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="leadName">Nutshell Lead Full Name</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="leadName"
                          value={nutshellLeadName}
                          onChange={(e) => onNutshellLeadNameChange(e.target.value)}
                          placeholder="Enter lead name"
                          disabled={isSearchingLead}
                        />
                        <Button
                          onClick={onSearchLead}
                          disabled={!nutshellLeadName.trim() || isSearchingLead}
                          className="bg-[#5cb85c] hover:bg-[#4a9d4a]"
                        >
                          {isSearchingLead ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                          ) : (
                            "Search"
                          )}
                        </Button>
                      </div>
                    </div>

                    {nutshellLeadName && !isSearchingLead && (
                      <div
                        className={`p-3 ${leadFound ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"} rounded-md`}
                      >
                        <p className={`text-sm ${leadFound ? "text-green-700" : "text-red-700"}`}>
                          {leadFound ? (
                            <>
                              <Check className="inline-block h-4 w-4 mr-1" />
                              Lead found: {nutshellLeadName}
                            </>
                          ) : (
                            "No lead found with this name."
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {((searchedBooking && nutshellLeadFound) || (searchedBooking && leadFound)) && (
              <Button onClick={onInviteCustomer} className="bg-[#5cb85c] hover:bg-[#4a9d4a]">
                Invite Customer to Portal
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
