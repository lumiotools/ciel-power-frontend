import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ImageFile {
  id: string;
  name: string;
  thumbnailLink?: string;
  createdTime?: string;
}

interface Props {
  auditorId: string;
  currentFileId?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (fileId: string) => void;
}

export function AuditorImageModal({
  auditorId,
  currentFileId,
  isOpen,
  onOpenChange,
  onSave,
}: Props) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState(currentFileId || "");
  const [uploading, setUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) fetchImages();
  }, [isOpen]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auditors/images");
      const data = await res.json();
      if (data.success) {
        setImages(data.data.files);
      } else {
        alert("Failed to fetch images");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching images");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFileId(fileId);
  };

  const handleFileUpload = async () => {
    if (!uploadFiles || uploadFiles.length === 0) return;

    const formData = new FormData();
    for (const file of Array.from(uploadFiles)) {
      formData.append("files", file);
    }

    setUploading(true);
    try {
      const res = await fetch("/api/admin/auditors/images/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Upload successful");
        setUploadFiles(null);
        await fetchImages();
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading files");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (!selectedFileId) {
      alert("Please select an image before saving");
      return;
    }
    onSave(selectedFileId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Auditor Image</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div>Loading images...</div>
        ) : (
          <div className="flex-1 overflow-y-auto px-2 py-4">
            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className={`relative border rounded-md overflow-hidden cursor-pointer transition-all ${
                      selectedFileId === img.id
                        ? "ring-2 ring-[#256C68]"
                        : "hover:opacity-90"
                    }`}
                    onClick={() => handleFileSelect(img.id)}
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={img.thumbnailLink || "/placeholder.svg"}
                        alt={img.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <p className="text-sm font-medium truncate">{img.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {img.createdTime
                          ? new Date(img.createdTime).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                    {selectedFileId === img.id && (
                      <div className="absolute top-2 right-2 bg-[#256C68] text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex items-center justify-center gap-44">
          <div>
            <input
              type="file"
              multiple
              onChange={(e) => setUploadFiles(e.target.files)}
              disabled={uploading}
            />
            <button
              className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white px-4 py-1 rounded ml-2 disabled:opacity-50"
              onClick={handleFileUpload}
              disabled={uploading || !uploadFiles}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
            >
              Save Image
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
