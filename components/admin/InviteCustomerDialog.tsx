"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Booking, NutshellLead } from "@/types/admin";
import { STAGE_LABELS } from "@/constants/booking-stages";
import { formatDate } from "@/utils/booking-utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface InviteCustomerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  bookeoNumber: string;
  onBookeoNumberChange: (value: string) => void;
  searchedBooking: Booking | null;
  isSearchingBooking: boolean;
  onSearchBooking: () => void;
  nutshellLeadFound: boolean | null;
  nutshellLeadName: string;
  onNutshellLeadNameChange: (value: string) => void;
  isSearchingLead: boolean;
  onSearchLead: () => void;
  foundLeads: NutshellLead[];
  selectedLead: NutshellLead | null;
  onSelectLead: (lead: NutshellLead) => void;
  onInviteCustomer: () => void;
  onReset: () => void;
  bookingError: string | null;
  leadError: string | null;
  hasSearchedLead: boolean;
  isInviting: boolean;
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
  foundLeads,
  selectedLead,
  onSelectLead,
  onInviteCustomer,
  onReset,
  bookingError,
  leadError,
  hasSearchedLead,
  isInviting,
}: InviteCustomerDialogProps) {
  const canInvite = searchedBooking && (nutshellLeadFound || selectedLead);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onReset();
        onOpenChange(open);
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
                  disabled={isSearchingBooking || isInviting}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !isSearchingBooking &&
                      bookeoNumber.trim()
                    ) {
                      e.preventDefault();
                      onSearchBooking();
                    }
                  }}
                  className="h-9 py-1" // Adjusted height to match button
                />
                <Button
                  onClick={onSearchBooking}
                  disabled={
                    !bookeoNumber.trim() || isSearchingBooking || isInviting
                  }
                  className="bg-[#5cb85c] hover:bg-[#4a9d4a]"
                  size="sm"
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
                <p className="text-xs text-green-600 mt-1">
                  {formatDate(searchedBooking.startTime)}
                </p>
                {searchedBooking.currentStage && (
                  <p className="text-xs text-green-600 mt-1">
                    Stage: {STAGE_LABELS[searchedBooking.currentStage]}
                  </p>
                )}
                {searchedBooking.auditor && (
                  <p className="text-xs text-green-600 mt-1">
                    Auditor: {searchedBooking.auditor}
                  </p>
                )}
              </div>
            ) : bookingError ? (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">{bookingError}</p>
              </div>
            ) : null}

            {searchedBooking && nutshellLeadFound !== null && (
              <div className="pt-2">
                <p className="text-sm font-medium mb-2">
                  Nutshell Lead Status:
                </p>
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
                      <p className="text-sm text-amber-700">
                        No Nutshell lead found for this booking.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="leadName">Nutshell Lead Full Name</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="leadName"
                          value={nutshellLeadName}
                          onChange={(e) =>
                            onNutshellLeadNameChange(e.target.value)
                          }
                          placeholder="Enter lead name"
                          disabled={isSearchingLead || isInviting}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Enter" &&
                              !isSearchingLead &&
                              nutshellLeadName.trim()
                            ) {
                              e.preventDefault();
                              onSearchLead();
                            }
                          }}
                          className="h-9 py-1" // Adjusted height to match button
                        />
                        <Button
                          onClick={onSearchLead}
                          disabled={
                            !nutshellLeadName.trim() ||
                            isSearchingLead ||
                            isInviting
                          }
                          className="bg-[#5cb85c] hover:bg-[#4a9d4a]"
                          size="sm"
                        >
                          {isSearchingLead ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                          ) : (
                            "Search"
                          )}
                        </Button>
                      </div>
                    </div>

                    {foundLeads.length > 0 && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-700 mb-2">
                          <Check className="inline-block h-4 w-4 mr-1" />
                          {foundLeads.length} lead
                          {foundLeads.length !== 1 ? "s" : ""} found. Please
                          select one:
                        </p>

                        <div className="max-h-40 overflow-y-auto pr-2">
                          <RadioGroup
                            value={selectedLead?.id.toString()}
                            onValueChange={(value) => {
                              const lead = foundLeads.find(
                                (l) => l.id.toString() === value,
                              );
                              if (lead) onSelectLead(lead);
                            }}
                            disabled={isInviting}
                          >
                            {foundLeads.map((lead) => (
                              <div
                                key={lead.id}
                                className="flex items-center space-x-2 py-1"
                              >
                                <RadioGroupItem
                                  value={lead.id.toString()}
                                  id={`lead-${lead.id}`}
                                  disabled={isInviting}
                                />
                                <Label
                                  htmlFor={`lead-${lead.id}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {lead.name}{" "}
                                  <span className="text-xs text-gray-500">
                                    ({formatDate(lead.createdTime)})
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    )}

                    {hasSearchedLead && leadError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-700">{leadError}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isInviting}
            >
              Cancel
            </Button>
            {canInvite && (
              <Button
                onClick={onInviteCustomer}
                className="bg-[#5cb85c] hover:bg-[#4a9d4a]"
                disabled={isInviting}
              >
                {isInviting ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-white"></div>
                    Inviting...
                  </>
                ) : (
                  "Invite Customer to Portal"
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
