import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Enhanced Type Definitions
interface TimeSlot {
  eventId: string;
  startTime: string;
  endTime: string;
}

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (startTime: string, endTime: string) => void;
  bookingNumber: string;
  initialDate: Date;
  bookedSlot: TimeSlot | null;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  onClose,
  onReschedule,
  bookingNumber,
  initialDate,
  bookedSlot,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(initialDate); // Reset to initial scheduled date on modal open
    }
  }, [isOpen, initialDate]);

  const handleReschedule = async () => {
    setIsLoading(true);
    try {
      if (selectedDate && selectedSlot) {
        const response = await fetch(
          `/api/user/bookings/${bookingNumber}/reschedule`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              eventId: selectedSlot?.eventId,
            }),
          }
        );

        const data = await response.json();
        if (data.success) {
          onClose();
          toast.success("Booking Rescheduled Successfully");
          router.refresh();
          onReschedule(selectedSlot?.startTime, selectedSlot?.endTime);
        } else {
          toast.error(`${data.detail}`);
        }
      } else {
        toast.error("Please select a date and time slot");
      }
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSlots = async (date?: Date): Promise<void> => {
    if (!date) return;

    setIsFetchingSlots(true);

    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const url = `/api/user/bookings/${bookingNumber}/reschedule-slots?date=${formattedDate}`;

      console.log("Fetching URL:", url);

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Parsed Data:", data?.data?.slots);

      setSlots(data?.data?.slots || []);
    } catch (error) {
      console.error("Detailed error fetching slots:", error);
      toast.error(`Unable to load slots: ${(error as Error).message}`);
    } finally {
      setIsFetchingSlots(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      getSlots(selectedDate);
    }
  }, [selectedDate]);

  const formatTime = (timeString: string): string => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split("T")[1].slice(0, 5).split(":");
    const hour = Number.parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Reschedule Booking {bookingNumber}</DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                  getSlots(date);
                }}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
                month={selectedDate}
              />

              {selectedDate && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Available Slots</h3>
                  {isFetchingSlots ? (
                    <p>Fetching available slots...</p>
                  ) : slots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {slots.map((slot) => {
                        const isBookedSlot = Boolean(
                          bookedSlot &&
                          slot.startTime === bookedSlot.startTime &&
                          slot.endTime === bookedSlot.endTime
                        );

                        return (
                          <Button
                            key={slot.eventId}
                            variant={
                              selectedSlot?.eventId === slot.eventId
                                ? "default"
                                : "outline"
                            }
                            className="text-xs"
                           
                            onClick={() => setSelectedSlot(slot)}
                            disabled={isBookedSlot} 
                          >
                            {formatTime(slot.startTime)} -{" "}
                            {formatTime(slot.endTime)}
                          </Button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-red-500">
                      No Slots Available for this Selection
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleReschedule}
            disabled={
              !selectedDate ||
              !selectedSlot ||
              isLoading ||
              isToday(selectedDate)
            }
            className="bg-lime-500"
          >
            {isLoading ? "Rescheduling..." : "Confirm Reschedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
