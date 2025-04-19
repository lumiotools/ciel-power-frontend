import { driveImages } from "@/utils/image-utils";
import { Edit2 } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

export const ImageUpload = ({
  image,
  onImageChange,
  driveImages,
}: {
  image: string;
  onImageChange: (newImage: string) => void;
  driveImages?: driveImages[] | undefined;
}) => {
  const imageFromDB = driveImages?.find(
    (img) => img.id == image,
  )?.thumbnailLink;

  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      onImageChange(imageUrl);
      setIsModalOpen(false);
    }
  };

  const [imageSelected, setImageSelected] = useState<driveImages>();
  const handleImageSelect = (image: driveImages) => {
    setImageSelected(image);
  };

  const handleSave = () => {
    if (imageSelected) {
      onImageChange(imageSelected?.id);
      setIsModalOpen(false); // Close the modal after saving
    }
  };

  console.log("imageSelected", imageFromDB);

  return (
    <div className="relative">
      <Image
        src={
          imageSelected?.thumbnailLink ??
          (!!driveImages && imageFromDB) ??
          "/placeholder.jpg"
        }
        alt="alternate image"
        className="w-full h-64 object-cover rounded-lg mt-4"
        width={400}
        height={256}
        onError={(e) => {
          e.currentTarget.src = "/placeholder.jpg"; // Fallback to placeholder image
        }}
      />

      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-6 right-2 bg-white p-2 rounded-full shadow-lg"
      >
        <Edit2 className="w-4 h-4" />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-blend-saturation bg-opacity-50 flex items-center justify-center z-50">
          <div className=" max-h-[80vh] max-w-[70vw] overflow-y-auto bg-white">
            <div>
              {driveImages && (
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 rounded-lg">
                  {driveImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-full h-32 bg-gray-200 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img?.thumbnailLink ?? "/placeholder.jpg"}
                        alt={`Drive Image ${index + 1}`}
                        width={60}
                        height={60}
                        className={`w-full h-full object-cover ${
                          imageSelected?.id === img?.id
                            ? "ring-2 ring-blue-500 border-2 border-red-400"
                            : ""
                        }`}
                        onClick={() => handleImageSelect(img)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white p-4 rounded">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Choose New Image
              </button>
            </div>
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded border hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>

          <IoMdClose
            size={24}
            className=" absolute top-3 right-3"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
