"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { HouseImage } from "../insulation/card";

interface ImagePickerProps {
  buttonClassName?: string;
  images: HouseImage[];
  selectedImage?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage: (imageId: string) => void;
}

export function ReportImagePicker({
  buttonClassName,
  images,
  selectedImage,
  isOpen,
  onOpenChange,
  onSelectImage,
}: ImagePickerProps) {
  const [currentSelected, setCurrentSelected] = useState<string | undefined>(
    selectedImage
  );

  const handleDone = () => {
    if (currentSelected) {
      onSelectImage(currentSelected);
    }
    onOpenChange(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Select Image</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-2 py-4">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {images.map((image) => {
                return (
                  <div
                    key={image.id}
                    className={`
                    relative border rounded-md overflow-hidden cursor-pointer transition-all
                    ${image.id === currentSelected ? "ring-2 ring-[#256C68]" : "hover:opacity-90"}
                  `}
                    onClick={() => setCurrentSelected(image.id)}
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={image.thumbnailLink || "/placeholder.svg"}
                        alt={image.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <p className="text-sm font-medium truncate">
                        {image.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {new Date(image.createdTime).toLocaleDateString()}
                      </p>
                    </div>
                    {image.id === currentSelected && (
                      <div className="absolute top-2 right-2 bg-[#256C68] text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleDone}
            className={buttonClassName}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
