"use client";

import Image from "next/image";
import { ImagePlus, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageData } from "@/app/admin/[bookingNumber]/report/page";
import { useContext } from "react";
import { AUTH_CONTEXT } from "@/providers/auth";
import { useParams } from "next/navigation";
import ReportEditableInput from "./editableInput";
import { cn } from "@/lib/utils";

interface ImageViewerProps {
  allowSelection?: boolean;
  buttonClassName?: string;
  selectedImage?: ImageData;
  onOpenPicker: () => void;
  onDescriptionChange: (description: string) => void;
}

export function ReportImageViewer({
  allowSelection,
  buttonClassName,
  selectedImage,
  onOpenPicker,
  onDescriptionChange,
}: ImageViewerProps) {
  let bookingNumber;

  const { userDetails } = useContext(AUTH_CONTEXT);
  if (userDetails?.admin) {
    const { bookingNumber: adminBookingNumber } = useParams();
    bookingNumber = adminBookingNumber;
  } else {
    bookingNumber = userDetails?.bookingNumber;
  }

  if (!selectedImage) {
    return (
      <div className="w-full aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
        <ImagePlus className="h-12 w-12 text-gray-400 mb-2" />

        {allowSelection ? (
          <>
            <p className="text-gray-500 mb-1">No images selected</p>
            <p className="text-xs text-gray-400 mb-4">Select an image</p>
            <Button onClick={onOpenPicker} className={buttonClassName}>
              Select Images
            </Button>
          </>
        ) : (
          <>
            <p className="text-gray-500 mb-1">No images available</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full aspect-video relative">
      <img
        className="w-full h-full object-cover rounded-md"
        src={`/api/${userDetails?.admin ? "admin" : "user"}/bookings/${bookingNumber}/pictures/${selectedImage?.id}`}
      />
      <div className="p-5 absolute right-0 bottom-0 left-0 top-0 flex flex-col justify-between text-white bg-gradient-to-t from-black/30 to-transparent rounded-md">
        <div className="flex justify-end">
          {allowSelection && (
            <button
              className={cn(
                "size-10 p-1 rounded-full flex justify-center items-center",
                buttonClassName
              )}
              onClick={onOpenPicker}
            >
              <Pencil className="!size-5" />
            </button>
          )}
        </div>
        {allowSelection ? (
          <ReportEditableInput
            className="w-full"
            value={selectedImage?.description ?? "Image Description"}
            onChange={(description) => {
              onDescriptionChange(description as string);
            }}
          />
        ) : (
          selectedImage?.description
        )}
      </div>
    </div>
  );
}
