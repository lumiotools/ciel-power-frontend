"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { JSX, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";

interface ServiceImage {
  url: string;
  description?: string;
}

interface ServicePrice {
  amount: string;
  currency: string;
}

interface ServiceDuration {
  days: number;
  hours: number;
  minutes: number;
}

interface FieldValue {
  id: string;
  name: string;
  description: string;
}

interface ServiceField {
  id: string;
  name: string;
  description: string;
  type: "dropdown" | "checkbox" | "text";
  required?: boolean;
  values?: FieldValue[];
  defaultState?: boolean;
}

interface TimeSlot {
  eventId: string;
  startTime: string;
  endTime: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  images?: ServiceImage[];
  price?: ServicePrice;
  duration?: ServiceDuration;
  fields: ServiceField[];
}

interface FormData {
  [key: string]: string | boolean;
}

export default function ServiceDetailsPage(): JSX.Element {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [progress, setProgress] = useState<number>(25);

  const totalSteps = 4;

  const getServiceDetails = async (): Promise<void> => {
    if (!id || typeof id !== "string") return;

    try {
      const response = await fetch(
        `/api/booking/services/${id}`
      );
      const data = await response.json();
      setService(data?.data);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  useEffect(() => {
    if (id) getServiceDetails();
  }, [id]);

  const getSlots = async (date?: Date): Promise<void> => {
    if (!id || typeof id !== "string" || !date) return;

    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(
        `/api/booking/slots?productId=${id}&date=${formattedDate}`
      );
      const data = await response.json();
      setSlots(data?.data || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      getSlots(selectedDate);
    }
  }, [selectedDate, id]);

  const formatTime = (timeString: string): string => {
    return timeString ? timeString.split("T")[1].slice(0, 5) : "";
  };

  const handleDateSelect = (date?: Date): void => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleFieldChange = (
    fieldId: string,
    value: string | boolean
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleNext = (): void => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      setProgress((prev) => prev + 25);
    }
  };

  const handleBack = (): void => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setProgress((prev) => prev - 25);
    }
  };

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Loading service details...
        </p>
      </div>
    );
  }

  const renderStep = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              {service.duration && (
                <span className="text-sm text-gray-500">
                  {`${service.duration.hours}h ${service.duration.minutes}m`}
                </span>
              )}
            </CardHeader>
            <CardContent>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
              <div className="mt-4">
                <p className="text-lg font-semibold text-green-600">
                  {service?.price?.amount
                    ? `$${service.price.amount}`
                    : "Price N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Select Date and Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />

                {selectedDate && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">
                      Available Slots
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map((slot) => (
                        <Button
                          key={slot.eventId}
                          variant={
                            selectedSlot?.eventId === slot.eventId
                              ? "default"
                              : "outline"
                          }
                          className="text-xs"
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {formatTime(slot.startTime)} -{" "}
                          {formatTime(slot.endTime)}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {service.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label>{field.name}</Label>
                    {field.type === "dropdown" && field.values ? (
                      <Select
                        onValueChange={(value) =>
                          handleFieldChange(field.id, value)
                        }
                        value={formData[field.id] as string}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.values.map((value) => (
                            <SelectItem key={value.id} value={value.name}>
                              {value.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "checkbox" ? (
                      <div className="flex space-x-2">
                        <Checkbox
                          checked={(formData[field.id] as boolean) || false}
                          onCheckedChange={(checked) =>
                            handleFieldChange(field.id, checked)
                          }
                        />
                        <Label className="text-sm">
                          {field.description.replace(/<[^>]*>/g, "")}
                        </Label>
                      </div>
                    ) : (
                      <Input
                        placeholder={field.description || "Enter details"}
                        required={field.required}
                        value={(formData[field.id] as string) || ""}
                        onChange={(e) =>
                          handleFieldChange(field.id, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review and Confirm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Selected Date & Time</h3>
                  <p>{selectedDate && format(selectedDate, "MMMM d, yyyy")}</p>
                  <p>
                    {selectedSlot &&
                      `${formatTime(selectedSlot.startTime)} - ${formatTime(
                        selectedSlot.endTime
                      )}`}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Your Information</h3>
                  {Object.entries(formData).map(([key, value]) => {
                    const field = service.fields.find((f) => f.id === key);
                    return (
                      <div key={key} className="mt-2">
                        <span className="text-gray-600">{field?.name}: </span>
                        <span>{value.toString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return <></>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Service Details</span>
          <span>Date & Time</span>
          <span>Questions</span>
          <span>Review</span>
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
        )}
        {currentStep < totalSteps ? (
          <Button onClick={handleNext} className="ml-auto">
            Next
          </Button>
        ) : (
          <Button
            onClick={() => console.log("Submit booking")}
            className="ml-auto"
          >
            Confirm Booking
          </Button>
        )}
      </div>
    </div>
  );
}
