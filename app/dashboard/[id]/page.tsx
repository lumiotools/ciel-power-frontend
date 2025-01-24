"use client";

import type React from "react";
import { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";

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

interface UserDetails {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface FormData {
  [key: string]: string | boolean;
}

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [visitedSections, setVisitedSections] = useState({
    county: false,
    dateTime: false,
    contact: false,
    additional: false,
  });

  const [completedSections, setCompletedSections] = useState({
    county: false,
    dateTime: false,
    contact: false,
    additional: false,
  });

  const [openSection, setOpenSection] = useState<string>("county");
  const [isInitialFlow, setIsInitialFlow] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const getServiceDetails = async (): Promise<void> => {
    if (!id || typeof id !== "string") return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/services/${id}`
      );
      const data = await response.json();
      setService(data?.data);

      // Initialize formData with default values
      const initialFormData: FormData = {};
      data?.data.fields.forEach((field: ServiceField) => {
        if (field.type === "checkbox") {
          initialFormData[field.id] = field.defaultState || false;
        } else if (
          field.type === "dropdown" &&
          field.values &&
          field.values.length > 0
        ) {
          initialFormData[field.id] = field.values[0].id;
        } else {
          initialFormData[field.id] = "";
        }
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error fetching service details:", error);
      toast.error("Failed to load service details");
    }
  };

  useEffect(() => {
    if (id) {
      getServiceDetails();
    }
  }, [id]);

  const getSlots = async (date?: Date): Promise<void> => {
    if (!id || typeof id !== "string" || !date) return;

    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const countyField = service?.fields.find(
        (field) => field.name === "Please select your County"
      );
      const selectedCountyId = countyField ? formData[countyField.id] : null;
      const selectedCountyName = countyField?.values?.find(
        (v) => v.id === selectedCountyId
      )?.name;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/slots?productId=${id}&date=${formattedDate}&preAnswerId=${selectedCountyId}&preAnswerValue=${selectedCountyName}`
      );
      const data = await response.json();
      setSlots(data?.data || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast.error("Failed to load available slots");
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

  const handleSubmitBooking = () => {
    const bookingData = {
      serviceId: id,
      userDetails,
      formData,
      selectedDate,
      selectedSlot,
    };

    console.log("Booking Details:", {
      service: {
        name: service?.name,
        price: service?.price,
        duration: service?.duration,
      },
      date: selectedDate ? format(selectedDate, "MMMM d, yyyy") : null,
      timeSlot: selectedSlot
        ? {
            start: formatTime(selectedSlot.startTime),
            end: formatTime(selectedSlot.endTime),
          }
        : null,
      userDetails,
      additionalInformation: formData,
    });

    toast.success("Booking submitted successfully!");
  };

  const handleSectionComplete = (section: string) => {
    setCompletedSections((prev) => ({
      ...prev,
      [section]: true,
    }));
    setVisitedSections((prev) => ({
      ...prev,
      [section]: true,
    }));
    setEditingSection(null);

    if (isInitialFlow) {
      switch (section) {
        case "county":
          setOpenSection("dateTime");
          break;
        case "dateTime":
          setOpenSection("contact");
          break;
        case "contact":
          setOpenSection("additional");
          break;
        case "additional":
          setOpenSection("review");
          break;
      }
    } else {
      setOpenSection("");
    }
  };

  const toggleSection = (section: string) => {
    if (
      isInitialFlow &&
      !visitedSections[section as keyof typeof visitedSections]
    ) {
      return;
    }
    if (openSection === section) {
      setOpenSection("");
      setEditingSection(null);
    } else {
      setOpenSection(section);
      setEditingSection(null);
    }
  };

  const handleEdit = (section: string) => {
    setOpenSection(section);
    setEditingSection(section);
  };

  const renderSectionHeader = (
    title: string,
    section: string,
    isCompleted: boolean,
    summary?: string,
    canOpen = true
  ) => (
    <div
      className={`flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg 
        ${canOpen ? "cursor-pointer hover:bg-gray-100" : "opacity-50"}`}
      onClick={() => canOpen && toggleSection(section)}
    >
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {isCompleted && summary && (
          <p className="text-sm text-gray-600 mt-1">{summary}</p>
        )}
      </div>
      {canOpen && (
        <div className="flex items-center gap-2">
          {isCompleted && (
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(section);
              }}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
          {openSection === section ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      )}
    </div>
  );

  const renderCountySelection = () => {
    const countyField = service?.fields.find(
      (field) => field.name === "Please select your County"
    );
    if (!countyField) return null;

    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label htmlFor={countyField.id}>{countyField.name}</Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, [countyField.id]: value }))
              }
              value={formData[countyField.id] as string}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a county" />
              </SelectTrigger>
              <SelectContent>
                {countyField.values?.map((value) => (
                  <SelectItem key={value.id} value={value.id}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="w-full"
              onClick={() => {
                if (formData[countyField.id]) {
                  handleSectionComplete("county");
                } else {
                  toast.error("Please select a county");
                }
              }}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderDateAndTime = () => (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedSlot(null);
            }}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />

          {selectedDate && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Available Slots</h3>
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
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <Button
            className="w-full"
            onClick={() => {
              if (validateDateTime()) {
                handleSectionComplete("dateTime");
              }
            }}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderUserDetails = () => (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {Object.entries(userDetails).map(([key, value]) => (
            <div key={key} className="flex-grow">
              <Label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Label>
              <Input
                id={key}
                type={
                  key === "email" ? "email" : key === "phone" ? "tel" : "text"
                }
                value={value}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
          ))}
          <Button
            className="w-full"
            onClick={() => {
              if (validateContactInfo()) {
                handleSectionComplete("contact");
              }
            }}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderAdditionalInfo = () => (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {service?.fields
            .filter((field) => field.name !== "Please select your County")
            .map((field) => (
              <div key={field.id} className="flex-grow">
                <div className="flex-grow space-y-2">
                  <Label htmlFor={field.id}>
                    {field.name}
                    {field.description && (
                      <p
                        className="text-sm text-gray-500 mt-1"
                        dangerouslySetInnerHTML={{ __html: field.description }}
                      />
                    )}
                  </Label>
                  {field.type === "dropdown" && field.values ? (
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, [field.id]: value }))
                      }
                      value={formData[field.id] as string}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.values.map((value) => (
                          <SelectItem key={value.id} value={value.id}>
                            {value.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "checkbox" ? (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.id}
                        checked={formData[field.id] as boolean}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            [field.id]: checked,
                          }))
                        }
                      />
                      <Label htmlFor={field.id} className="text-sm">
                        {field.name}
                      </Label>
                    </div>
                  ) : (
                    <Input
                      id={field.id}
                      placeholder={field.description}
                      required={field.required}
                      value={formData[field.id] as string}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.id]: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          <Button
            className="w-full"
            onClick={() => {
              if (validateAdditionalInfo()) {
                handleSectionComplete("additional");
              }
            }}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderReview = () => (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-2">Selected Service</h3>
            <p>{service?.name}</p>
            <p className="text-green-600 font-medium">
              ${service?.price?.amount}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Selected County</h3>
            <p>
              {
                service?.fields
                  .find((field) => field.name === "Please select your County")
                  ?.values?.find(
                    (v) =>
                      v.id ===
                      formData[
                        service.fields.find(
                          (field) => field.name === "Please select your County"
                        )?.id || ""
                      ]
                  )?.name
              }
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Date & Time</h3>
            <p>{selectedDate && format(selectedDate, "MMMM d, yyyy")}</p>
            <p>
              {selectedSlot &&
                `${formatTime(selectedSlot.startTime)} - ${formatTime(
                  selectedSlot.endTime
                )}`}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Email:</p>
                <p>{userDetails.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p>{userDetails.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Address:</p>
                <p>{userDetails.address}</p>
                <p>{`${userDetails.city}, ${userDetails.state} ${userDetails.zipCode}`}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Additional Information</h3>
            {service?.fields
              .filter((field) => field.name !== "Please select your County")
              .map((field) => (
                <div key={field.id} className="mb-2">
                  <span className="text-gray-600">{field.name}: </span>
                  <span>
                    {field.type === "dropdown"
                      ? field.values?.find((v) => v.id === formData[field.id])
                          ?.name
                      : field.type === "checkbox"
                      ? formData[field.id]
                        ? "Yes"
                        : "No"
                      : formData[field.id]}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const validateDateTime = (): boolean => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please select both date and time slot");
      return false;
    }
    return true;
  };

  const validateContactInfo = (): boolean => {
    if (
      !userDetails.email ||
      !userDetails.phone ||
      !userDetails.address ||
      !userDetails.city ||
      !userDetails.state ||
      !userDetails.zipCode
    ) {
      toast.error("Please fill in all contact information");
      return false;
    }
    if (!userDetails.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateAdditionalInfo = (): boolean => {
    const requiredFields = service?.fields.filter(
      (field) => field.required && field.name !== "Please select your County"
    );
    const missingFields = requiredFields?.filter(
      (field) => !formData[field.id]
    );
    if (missingFields && missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields
          .map((f) => f.name)
          .join(", ")}`
      );
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        {/* Service Details - Always visible */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>
                {service?.name}
                {service?.duration && (
                  <span className="text-sm text-gray-500 block">
                    {`${service.duration.hours}h ${service.duration.minutes}m`}
                  </span>
                )}
              </div>
              <div className="text-lg font-semibold text-green-600">
                {service?.price?.amount
                  ? `$${service.price.amount}`
                  : "Price N/A"}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: service?.description || "" }}
            ></p>
          </CardContent>
        </Card>

        {/* County Selection Section */}
        <div className="border rounded-lg bg-white">
          {renderSectionHeader(
            "County Selection",
            "county",
            completedSections.county,
            service?.fields
              .find((field) => field.name === "Please select your County")
              ?.values?.find(
                (v) =>
                  v.id ===
                  formData[
                    service.fields.find(
                      (field) => field.name === "Please select your County"
                    )?.id || ""
                  ]
              )?.name,
            true
          )}
          {(openSection === "county" || editingSection === "county") &&
            renderCountySelection()}
        </div>

        {/* Date & Time Section */}
        <div className="border rounded-lg bg-white">
          {renderSectionHeader(
            "Date & Time",
            "dateTime",
            completedSections.dateTime,
            selectedDate && selectedSlot
              ? `${format(selectedDate, "MMMM d, yyyy")} at ${formatTime(
                  selectedSlot.startTime
                )}`
              : undefined,
            true
          )}
          {(openSection === "dateTime" || editingSection === "dateTime") &&
            renderDateAndTime()}
        </div>

        {/* Contact Information Section */}
        <div className="border rounded-lg bg-white">
          {renderSectionHeader(
            "Contact Information",
            "contact",
            completedSections.contact,
            userDetails.email
              ? `${userDetails.email} • ${userDetails.phone}`
              : undefined,
            true
          )}
          {(openSection === "contact" || editingSection === "contact") &&
            renderUserDetails()}
        </div>

        {/* Additional Information Section */}
        <div className="border rounded-lg bg-white">
          {renderSectionHeader(
            "Additional Information",
            "additional",
            completedSections.additional,
            "All information provided",
            true
          )}
          {(openSection === "additional" || editingSection === "additional") &&
            renderAdditionalInfo()}
        </div>

        {/* Review Section */}
        <div className="border rounded-lg bg-white">
          {renderSectionHeader(
            "Review & Confirm",
            "review",
            false,
            undefined,
            true
          )}
          {openSection === "review" && renderReview()}
        </div>

        {/* Confirm Button - Only show on review section */}
        {openSection === "review" && (
          <Button
            onClick={() => {
              handleSubmitBooking();
              setIsInitialFlow(false);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Confirm Booking
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
