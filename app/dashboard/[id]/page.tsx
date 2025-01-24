"use client";

import type React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { AUTH_CONTEXT } from "@/providers/auth";

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
  preField: ServiceField;
}

interface PhoneNumber {
  number: string;
  type: "mobile" | "work" | "home" | "fax";
}

interface StreetAddress {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
}

interface UserDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  emailAddress: string;
  phoneNumbers: PhoneNumber[];
  streetAddress: StreetAddress;
}

interface FormData {
  [key: string]: string | boolean;
}

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const [service, setService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const authContext = useContext(AUTH_CONTEXT).userDetails;
  const [isBookingConfirming, setIsBookingConfirming] = useState(false);

  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumbers: [
      {
        number: "",
        type: "mobile", // Default type, can be updated later
      },
    ],
    streetAddress: {
      address1: "",
      address2: "", // Optional, can be omitted if not needed
      city: "",
      state: "",
      postcode: "",
    },
  });
  useEffect(() => {
    if (authContext) {
      console.log("auth context", authContext);
      setUserDetails((prev) => ({
        firstName: authContext.firstName || "",
        lastName: authContext.lastName || "",
        emailAddress: authContext.emailAddress || "",
        phoneNumbers: authContext.phoneNumbers?.length
          ? authContext.phoneNumbers
          : prev.phoneNumbers, // Use provided phoneNumbers or default
        streetAddress: {
          address1: authContext.streetAddress?.line1 || "",
          address2: authContext.streetAddress?.line2 || "",
          city: authContext.streetAddress?.city || "",
          state: authContext.streetAddress?.province || "", // Map `province` to `state`
          postcode: authContext.streetAddress?.postalCode || "",
        },
      }));
    }
  }, [authContext]);
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
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/services/${id}`
      );
      const data = await response.json();
      setService(data?.data);

      // Initialize formData with default values
      const initialFormData: FormData = {};

      // Set preField (county) value
      if (
        data?.data.preField &&
        data?.data.preField.values &&
        data?.data.preField.values.length > 0
      ) {
        initialFormData[data.data.preField.id] =
          data.data.preField.values[0].id;
      }

      // Set other fields
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getServiceDetails();
    }
  }, [id]);

  const getSlots = async (date?: Date): Promise<void> => {
    if (!id || typeof id !== "string" || !date || !service) return;
    setIsFetchingSlots(true);

    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const preFieldId = service?.preField?.id;

      const selectedCountyId = service ? formData[service.preField.id] : "";
      const selectedCountyName = service?.preField.values?.find(
        (v) => v.id === selectedCountyId
      )?.name;

      if (!selectedCountyId || !selectedCountyName) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/slots?productId=${id}&date=${formattedDate}&preAnswerId=${preFieldId}&preAnswerValue=${selectedCountyName}`
      );
      const data = await response.json();
      setSlots(data?.data || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast.error("Failed to load available slots");
    } finally {
      setIsFetchingSlots(false);
    }
  };

  useEffect(() => {
    if (selectedDate && service) {
      getSlots(selectedDate);
    }
  }, [selectedDate, service, id]);

  const formatTime = (timeString: string): string => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split("T")[1].slice(0, 5).split(":");
    const hour = Number.parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const handleSubmitBooking = async () => {
    setIsBookingConfirming(true);

    try {
      // Format the date and time for eventId
      console.log("selected date", selectedDate);
      console.log("selected slot", selectedSlot);

      // Format date in UTC to avoid timezone issues
      const formattedDate = selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : "";

      // Convert the time slot to proper format (assuming it's in ISO or HH:mm format)
      let formattedStartTime = selectedSlot?.startTime;

      // If time includes timezone info, clean it to get just HH:mm
      if (formattedStartTime?.includes("T")) {
        formattedStartTime = formattedStartTime.split("T")[1].substring(0, 5);
      }

      const eventId = `FT_${formattedDate}_${formattedStartTime}`;
      console.log("Generated eventId:", eventId);

      // Transform the additional information into the required fields array format
      // Get the selected county name from preField
      const preFieldId = service?.preField?.id;
      const selectedCountyId = service ? formData[service.preField.id] : "";
      const selectedCountyName = service?.preField.values?.find(
        (v) => v.id === selectedCountyId
      )?.name;

      // Transform fields and add preField
      const fields = Object.entries(formData)
        .map(([id, value]) => {
          // Skip the preField ID as we'll add it separately
          if (id === preFieldId) {
            return null;
          }

          // Find the field configuration from service
          const fieldConfig = service?.fields?.find((field) => field.id === id);

          if (fieldConfig?.values) {
            // If field has predefined values, find the selected value's name
            const selectedValue = fieldConfig.values.find(
              (v) => v.id === value
            );
            return {
              id,
              value: selectedValue?.name || value.toString(),
            };
          } else {
            // For boolean or text fields, use the value directly
            return {
              id,
              value: value.toString(),
            };
          }
        })
        .filter((field) => field !== null); // Remove the null entry from preField skip

      // Add preField at the beginning of the array
      fields.unshift({
        id: preFieldId || "",
        value: selectedCountyName || "",
      });
      // Prepare the request payload
      const requestData = {
        productId: id, // Assuming 'id' is your serviceId/productId
        eventId,
        fields,
        userDetails: {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          phoneNumbers: userDetails.phoneNumbers,
          streetAddress: {
            line1: userDetails.streetAddress.address1,
            line2: userDetails.streetAddress.address2,
            city: userDetails.streetAddress.city,
            province: userDetails.streetAddress.state,
            postalCode: userDetails.streetAddress.postcode,
          },
        },
      };

      // Make the API call
      const response = await fetch(`/api/booking/create-new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const result = await response.json();
      console.log("booking result", result);
      toast.success("Booking submitted successfully!");
      router.push(`/dashboard/bookings/${result.data.bookingNumber}`);

      // Optional: Log the successful booking details
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

      // You might want to redirect or perform additional actions after successful booking
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error(`Failed to submit ${(error as Error).message}.`);
    } finally {
      setIsBookingConfirming(false);
    }
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
    if (!service || !service.preField) return null;

    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label htmlFor={service.preField.id}>{service.preField.name}</Label>
            <Select
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  [service.preField.id]: value,
                }));
                if (selectedDate) {
                  getSlots(selectedDate);
                }
              }}
              value={formData[service.preField.id] as string}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a county" />
              </SelectTrigger>
              <SelectContent>
                {service.preField.values?.map((value) => (
                  <SelectItem key={value.id} value={value.id}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="w-full"
              onClick={() => {
                if (formData[service.preField.id]) {
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
              {isFetchingSlots ? (
                <p>Fetching available slots...</p>
              ) : slots.length > 0 ? (
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
              ) : (
                <p className="text-red-500">
                  No Slots Available for this Selection
                </p>
              )}
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
        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={userDetails.firstName}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={userDetails.lastName}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="emailAddress">Email Address</Label>
            <Input
              id="emailAddress"
              type="email"
              value={userDetails.emailAddress}
              className="mt-1"
              disabled
            />
          </div>

          {/* Phone Numbers Section */}
          <div className="space-y-2">
            <Label>Phone Numbers</Label>
            {userDetails.phoneNumbers.map((phone, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <Input
                    value={phone.number}
                    onChange={(e) => {
                      const newPhoneNumbers = [...userDetails.phoneNumbers];
                      newPhoneNumbers[index] = {
                        ...newPhoneNumbers[index],
                        number: e.target.value,
                      };
                      setUserDetails((prev) => ({
                        ...prev,
                        phoneNumbers: newPhoneNumbers,
                      }));
                    }}
                    placeholder="Enter phone number"
                    className="mt-1"
                  />
                </div>
                <div className="w-[150px]">
                  <Select
                    value={phone.type}
                    onValueChange={(
                      value: "mobile" | "work" | "home" | "fax"
                    ) => {
                      const newPhoneNumbers = [...userDetails.phoneNumbers];
                      newPhoneNumbers[index] = {
                        ...newPhoneNumbers[index],
                        type: value,
                      };
                      setUserDetails((prev) => ({
                        ...prev,
                        phoneNumbers: newPhoneNumbers,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="fax">Fax</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {userDetails.phoneNumbers.length > 1 && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      const newPhoneNumbers = userDetails.phoneNumbers.filter(
                        (_, i) => i !== index
                      );
                      setUserDetails((prev) => ({
                        ...prev,
                        phoneNumbers: newPhoneNumbers,
                      }));
                    }}
                    className="mt-1"
                  >
                    x
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setUserDetails((prev) => ({
                  ...prev,
                  phoneNumbers: [
                    ...prev.phoneNumbers,
                    { number: "", type: "mobile" },
                  ],
                }));
              }}
            >
              Add Phone Number
            </Button>
          </div>

          {/* Street Address Section */}
          <div className="space-y-4">
            <Label>Street Address</Label>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address1">Address Line 1</Label>
                <Input
                  id="address1"
                  value={userDetails.streetAddress.address1}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      streetAddress: {
                        ...prev.streetAddress,
                        address1: e.target.value,
                      },
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                <Input
                  id="address2"
                  value={userDetails.streetAddress.address2}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      streetAddress: {
                        ...prev.streetAddress,
                        address2: e.target.value,
                      },
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={userDetails.streetAddress.city}
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        streetAddress: {
                          ...prev.streetAddress,
                          city: e.target.value,
                        },
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={userDetails.streetAddress.state}
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        streetAddress: {
                          ...prev.streetAddress,
                          state: e.target.value,
                        },
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postcode">Postal Code</Label>
                  <Input
                    id="postcode"
                    value={userDetails.streetAddress.postcode}
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        streetAddress: {
                          ...prev.streetAddress,
                          postcode: e.target.value,
                        },
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

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
          {service?.fields.map((field) => (
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
            <p className="text-lg">{service?.name}</p>
            <p className="text-green-600 font-medium text-lg">
              ${service?.price?.amount}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Selected County</h3>
            <p className="text-lg">
              {
                service?.preField.values?.find(
                  (v) => v.id === formData[service.preField.id]
                )?.name
              }
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Date & Time</h3>
            <p className="text-lg">
              {selectedDate && format(selectedDate, "MMMM d, yyyy")}
            </p>
            <p className="text-lg">
              {selectedSlot &&
                `${formatTime(selectedSlot.startTime)} - ${formatTime(
                  selectedSlot.endTime
                )}`}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Contact Information</h3>
            <div className="grid gap-4">
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="text-lg">
                  {[
                    userDetails.firstName,
                    userDetails.middleName,
                    userDetails.lastName,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="text-lg">{userDetails.emailAddress}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Numbers:</p>
                <div className="space-y-1">
                  {userDetails.phoneNumbers.map((phone, index) => (
                    <p key={index} className="text-lg capitalize">
                      {phone.type}: {phone.number}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Additional Information</h3>
            <div className="space-y-2">
              {service?.fields.map((field) => (
                <div key={field.id}>
                  <p className="text-gray-600">{field.name}:</p>
                  <p className="text-lg">
                    {field.type === "dropdown"
                      ? field.values?.find((v) => v.id === formData[field.id])
                          ?.name
                      : field.type === "checkbox"
                      ? formData[field.id]
                        ? "Yes"
                        : "No"
                      : formData[field.id]}
                  </p>
                </div>
              ))}
            </div>
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
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.emailAddress ||
      userDetails.phoneNumbers.length === 0 ||
      !userDetails.streetAddress.address1 ||
      !userDetails.streetAddress.city ||
      !userDetails.streetAddress.state ||
      !userDetails.streetAddress.postcode
    ) {
      toast.error("Please fill in all required contact information");
      return false;
    }
    if (!userDetails.emailAddress.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (userDetails.phoneNumbers.some((phone) => !phone.number)) {
      toast.error("Please enter all phone numbers");
      return false;
    }
    return true;
  };

  const validateAdditionalInfo = (): boolean => {
    const requiredFields = service?.fields.filter((field) => field.required);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

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
            service?.preField.values?.find(
              (v) => v.id === formData[service?.preField.id || ""]
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
            userDetails.emailAddress
              ? `${userDetails.emailAddress} • ${userDetails.phoneNumbers[0]?.number}`
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
            disabled={isBookingConfirming}
          >
            {isBookingConfirming ? "Creating Booking..." : "Confirm Booking"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
