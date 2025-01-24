"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);

  const getServiceDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/booking/services/${id}`
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

  

  const getSlots = async (selectedDate) => {
    if (!selectedDate || !id) return;

    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      console.log(formattedDate);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/booking/slots?productId=${id}&date=${formattedDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data?.data);
      setSlots(data?.data || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const formatTime = (timeString) => {
    return timeString ? timeString.split('T')[1].slice(0, 5) : '';
  };

  useEffect(() => {
    if (selectedDate) {
      getSlots(selectedDate);
    }
  }, [selectedDate, id]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Service Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{service.name}</CardTitle>
            {service.duration && (
              <span className="text-sm text-gray-500">
                {`${service.duration.hours}h ${service.duration.minutes}m`}
              </span>
            )}
          </div>
          {service.images?.[0]?.description && (
            <p className="text-sm text-gray-400 mt-1">
              {service.images[0].description}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {service.images?.[0]?.url && (
            <img
              src={service.images[0].url}
              alt={service.name}
              className="w-[100px] max-w-md h-auto rounded-md object-cover shadow-md"
            />
          )}
        </CardContent>
      </Card>

      {/* Service Details */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
          <Separator className="my-4" />
          <p className="text-lg font-semibold text-green-600">
            {service?.price?.amount ? `$${service.price.amount}` : "Price N/A"}
          </p>
        </CardContent>
      </Card>

      {/* Additional Fields */}
      {Array.isArray(service.fields) && service.fields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {service.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label>{field.name}</Label>
                  {field.type === "dropdown" ? (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.values.map((value, index) => (
                          <SelectItem key={index} value={value.name}>
                            {value.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "checkbox" ? (
                    <div className="flex space-x-2">
                      <Checkbox defaultChecked={field.defaultState} />
                      <Label className="text-sm">
                        {field.description.replace(/<[^>]*>/g, "")}
                      </Label>
                    </div>
                  ) : (
                    <Input
                      placeholder={field.description || "Enter details"}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* {Calendar UI} */}
 
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </CardContent>
        </Card>

        {selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle>Available Slots</CardTitle>
            </CardHeader>
            <CardContent>
              {slots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot) => (
                    <Button 
                      key={slot.eventId} 
                      variant="outline"
                      className="text-xs"
                    >
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No available slots on this date.</p>
              )}
            </CardContent>
          </Card>
        )}

     

      {/* Call to Action */}
      <Card>
        <CardFooter className="flex justify-center">
          <Button size="lg" className="w-full mt-4">
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
