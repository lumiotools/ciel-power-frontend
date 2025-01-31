import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './CardComponent'; // Adjust import path as necessary
import Link from 'next/link';



const ServiceCard = ({ service }) => (
  <Card className="w-full flex flex-col">
    {/* Image Section */}
    <div className="h-[50%] w-full relative">
      {service.images ? (
        <img
          src={service.images[0]?.url}
          alt={service.name}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
      )}
    </div>

    <CardContent className="flex flex-col relative flex-grow" style={{ backgroundColor: "#F0F8E6" }}>
      {/* Reduced height for content section */}
      <CardTitle className="mt-4">{service.name}</CardTitle>
      <CardDescription className="mt-4">{service.description}</CardDescription>

      {/* Right Arrow Button */}
      <Link href={`dashboard/${service.id}`} key={service.id}>
      <div className="absolute right-4 bottom-4 cursor-pointer z-10">
        <img src="/rightArrowGrey.svg" alt="Right Arrow" className="w-6 h-6" />
      </div>
      </Link>
    </CardContent>
  </Card>
);

export default ServiceCard;
