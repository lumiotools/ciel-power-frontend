'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export default function ServiceDetailsPage() {
  const params = useParams();
  const { id } = params;
  const [service, setService] = useState(null);

  const getServiceDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/booking/services/${id}`);
      const data = await response.json();
      setService(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getServiceDetails();
    }
  }, [id]);

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading service details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Service Image */}
      <Card>
        <CardHeader>
          <CardTitle>{service.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {service.images && (
            <img
              src={service.images[0]?.url}
              alt={service.name}
              className="w-[200px] h-auto rounded-md object-cover shadow-md"
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
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: service.description }}></div>
          <Separator className="my-4" />
          <p className="text-lg font-semibold text-green-600">
            {service?.price?.amount ? `$${service.price.amount}` : 'Price N/A'}
          </p>
        </CardContent>
      </Card>

      {/* Booking Limits */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Booking Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {Array.isArray(service.bookingLimits) && service.bookingLimits.map((limit, index) => (
              <li key={index}>
                Min: {limit.min}, Max: {limit.max}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card> */}

      {/* Duration */}
      <Card>
        <CardHeader>
          <CardTitle>Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{`${service.duration.hours} hours, ${service.duration.minutes} minutes`}</p>
        </CardContent>
      </Card>

      {/* Fields */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.isArray(service.fields) && service.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label>{field.name}</Label>
                {field.type === 'dropdown' ? (
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(field.values) && field.values.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox defaultChecked={field.defaultState} />
                    <Label>{field.description}</Label>
                  </div>
                ) : (
                  <Input placeholder={field.description || 'Enter details'} required={field.required} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Call to Action */}
      <Card>
        <CardFooter className="flex justify-center">
          <Button size="lg" className="w-full">
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
