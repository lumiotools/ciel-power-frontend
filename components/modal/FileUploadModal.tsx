import React, { useState } from "react";
import { XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "../ui/input";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingNumber: string;
  reload: () => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  bookingNumber,
  reload,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const MAX_SIZE_MB = 10; // Maximum file size in MB
  if (!isOpen) return null;

  const handleFileSelect = () => {
    document.getElementById("file-input")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);
    const filteredFiles = selectedFiles.filter((file) => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(
          `"${file.name}" exceeds the ${MAX_SIZE_MB}MB size limit and will not be uploaded.`
        );
        return false;
      }
      return true;
    });

    setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
  };

  const handleFileRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const renderPreview = (file: File) => {
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="h-20 w-20 object-cover rounded"
        />
      );
    }

    if (fileType === "application/pdf") {
      return (
        <div className="flex items-center justify-center w-20 h-20 bg-gray-100 border rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
            />
          </svg>
        </div>
      );
    }

    return null;
  };

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(
        `/api/user/bookings/${bookingNumber}/utility-bills`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success("Files uploaded successfully!");
        setFiles([]);
        reload();
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.success("Failed to upload files!");
    } finally {
      setUploading(false);
    }

    // Simulate upload delay for demo
    // setTimeout(() => {
    //   setUploading(false);
    //   //   alert("Files uploaded successfully!");
    //   toast.success("Files uploaded successfully!");
    //   setFiles([]);
    //   onClose(); // Close modal after successful upload
    // }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <Card className="rounded-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Upload Utility Bills
              </CardTitle>
              <Button
                onClick={onClose} size={'icon'} variant="outline"
                className="text-gray-500 hover:text-gray-700 bg-transparent"
              >
                <XCircle className="w-6 h-6" />
                
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-200 bg-gray-50"
              onDrop={(e) => {
                e.preventDefault();
                const droppedFiles = Array.from(e.dataTransfer.files);
                setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {!uploading ? (
                <>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <p className="text-sm text-gray-600">
                      Drag and drop your utilities bill here, or click to select
                      file
                    </p>
                    <Input
                      type="file"
                      id="file-input"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleFileSelect}
                    >
                      Choose File
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Supported formats: PDF, JPG, PNG (max {MAX_SIZE_MB}MB)
                  </p>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-6 w-6 animate-spin text-lime-500" />
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              )}
            </div>

            {/* File Previews */}
            {files.length > 0 && (
              <div className="mt-4 space-y-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {renderPreview(file)}
                      <p className="text-sm text-gray-800 truncate">
                        {file.name}
                      </p>
                    </div>
                    <Button
                    size={'icon'} variant="outline"
                      onClick={() => handleFileRemove(index)}
                      className="text-red-500 hover:text-red-600 bg-transparent "
                    >
                      <XCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            {files.length > 0 && !uploading && (
              <div className="mt-4">
                <Button onClick={handleUpload} className="rounded-full bg-lime-500">
                  Upload Files
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FileUploadModal;
