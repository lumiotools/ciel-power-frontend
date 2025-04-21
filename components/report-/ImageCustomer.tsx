import Image from "next/image";
import React from "react";

export const ImageCustomer = ({
  image,
  driveImages,
}: {
  image: string;
  driveImages?: { id: string; thumbnailLink: string }[] | undefined;
}) => {
  const imageFromDB = driveImages?.find(
    (img) => img.id === image
  )?.thumbnailLink;
  // console.log("Image id:", image);
  // console.log("Drive Images:", driveImages);

  return (
    <div className="relative">
      <Image
        src={imageFromDB ?? "/placeholder.jpg"}
        alt="Customer Image"
        className="w-full h-64 object-cover rounded-lg mt-4"
        width={400}
        height={256}
        onError={(e) => {
          e.currentTarget.src = "/placeholder.jpg"; // Fallback to placeholder image
        }}
      />
    </div>
  );
};

export default ImageCustomer;
