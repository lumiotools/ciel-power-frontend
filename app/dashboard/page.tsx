'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ServiceCard from '../../components/component/ServiceCard'; // Import the ServiceCard component

interface Service {
  id: string;
  name: string;
  images?: { url: string }[];
  price?: { amount: number };
  description: string;
}

export default function DashboardPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getServices = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/booking/services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setServices(data?.data?.services || []);
    } catch (error) {
      console.log(error);
      toast.error('No Services Found');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < services.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Slide left if scrolling left, slide right if scrolling right
    if (e.deltaY > 0) {
      handleNext(); // Scroll down -> Move cards to the right
    } else {
      handlePrev(); // Scroll up -> Move cards to the left
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5"> {/* Increased space for better section separation */}
      {/* Suggested Services Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Suggested Services</h2>
      </div>

      <div className="relative overflow-hidden">
        {/* Parent container that holds both the cards and the flexbox */}
        <div
          className="flex relative overflow-x-auto"
          onWheel={handleWheel} // Enable mouse scrolling to slide the cards
          style={{ cursor: 'pointer' }}
        >
          {/* Cards container */}
          <div
          className="flex transition-all ease-in-out duration-300 gap-6" // Added gap-6 to increase the space between the cards
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {services.map((service) => (
            <ServiceCard service={service} key={service.id} />
          ))}
        </div>


          {/* Right-most flexbox container with transparent gradient */}
          <div
              onClick={handleNext}
              className="absolute top-0 right-0 h-full w-24 flex items-center justify-center cursor-pointer z-10"
              style={{
                background: 'linear-gradient(270deg, #636561 -18.5%, rgba(99, 101, 97, 0.7) 58.92%, rgba(99, 101, 97, 0.2) 139.5%)'
              }}
            >
              <svg width="13" height="35" viewBox="0 0 13 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.979004" width="20.4583" height="1.16905" transform="rotate(56.8778 0.979004 0)" fill="#D9D9D9"/>
                <rect width="20.4583" height="1.16905" transform="matrix(0.546427 -0.837507 -0.837507 -0.546427 0.979004 34.5779)" fill="#D9D9D9"/>
              </svg>
            </div>

        </div>
      </div>

      {/* Your Bookings Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Your Bookings</h3>
        <p className="text-sm text-muted-foreground">No Current Bookings</p>

        {/* Button to Book your first service */}
        <div className="flex justify-center mt-4">
          <Button className="w-full max-w-xs">Book your first service</Button>
        </div>
      </div>
    </div>
  );
}











// 'use client';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// interface Service {
//   id: string;
//   name: string;
//   images?: { url: string }[];
//   price?: { amount: number };
//   description: string;
// }

// export default function DashboardPage() {
//   const [services, setServices] = useState<Service[]>([]);
//    const [loading, setLoading] = useState<boolean>(true);

//   const getServices = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/booking/services`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       setServices(data?.data?.services || []);
//     } catch (error) {
//       console.log(error);
//       toast.error('No Services Found');
//     }finally{
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getServices();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {services.map((service) => (
//           <Link href={`dashboard/${service.id}`} key={service.id}>
//             <Card className="cursor-pointer hover:shadow-lg">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-md font-medium line-clamp-1">{service.name}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="aspect-video relative mb-2">
//                   {service.images ? (
//                     <img
//                       src={service.images[0]?.url}
//                       alt={service.name}
//                       width={200}
//                       height={200}
//                       loading="lazy"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">No Image</div>
//                   )}
//                 </div>
//                 <div className="text-2xl font-bold mb-2">
//                   {service?.price?.amount ? `$${service.price.amount}` : "Price N/A"}
//                 </div>
//                 <p className="text-sm text-muted-foreground line-clamp-2">
//                   {service?.description.replace(/<[^>]*>/g, "").slice(0, 100)}...
//                 </p>
//                 <Button className="mt-2">Book Now</Button>
//               </CardContent>
//             </Card>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
