'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [services, setServices] = useState([]);

  const getServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/booking/services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setServices(data?.data?.services);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link href={`dashboard/${service.id}`} key={service.id}>
            <Card className="cursor-pointer hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium line-clamp-1">{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-2">
                  {service.images ? (
                    <img
                      src={service.images[0]?.url}
                      alt={service.name}
                      width={200}
                      height={200}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">No Image</div>
                  )}
                </div>
                <div className="text-2xl font-bold mb-2">
                  {service?.price?.amount ? `$${service.price.amount}` : "Price N/A"}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {service?.description.replace(/<[^>]*>/g, "").slice(0, 100)}...
                </p>
                <Button className="mt-2">Book Now</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
