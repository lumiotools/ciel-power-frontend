import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Upload, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import FileUploadModal from "../modal/FileUploadModal";
import { toast } from "sonner";

interface FileDetails {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink: string;
}

const UtilityBills = ({
  bookingNumber,
  bookingCancelled,
}: {
  bookingNumber: string;
  bookingCancelled: boolean;
}) => {
  const [uploadeModal, setUploadModal] = useState(false);
  const [files, setFiles] = useState<FileDetails[]>([]);

  const filesList = async () => {
    try {
      const response = await fetch(
        `/api/user/bookings/${bookingNumber}/utility-bills`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      setFiles(Array.isArray(data?.data?.files) ? data.data.files : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filesList();
  }, [bookingNumber]);

  const handleDeleteImage = async (id: string) => {
    try {
      const response = await fetch(
        `/api/user/bookings/${bookingNumber}/utility-bills/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setFiles((files) => files.filter((file) => file.id !== id));
        toast.success("File Deleted Successfully");
      }
    } catch (error) {
      toast.error("Something wents wrong!!");
      console.log(error);
    }
  };

  return (
    <>
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader className="space-y-3">
          <div className="justify-between flex items-center">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <Upload className="w-5 h-5 text-gray-400 mr-2" />
              Upload Utility Bills
            </h3>
            {!bookingCancelled && (
              <Button onClick={() => setUploadModal(true)} className="bg-[#96C93D]">Upload</Button>
            )}
          </div>

          <Separator />
        </CardHeader>
        <CardContent>
          {files.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex relative flex-col items-center bg-gray-100 p-3 rounded-lg space-y-2"
                >
                  <Button
                    onClick={() => handleDeleteImage(file.id)}
                    variant="outline"
                    size={"icon"}
                    className="text-red-500 hover:text-red-600 absolute top-2 right-2 bg-transparent outline-none border-none"
                  >
                    <XCircle className="w-6 h-6 " />
                  </Button>
                  <img
                    src={file.thumbnailLink}
                    alt={file.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <p className="text-sm text-gray-800 truncate line-clamp-1 text-ellipsis max-w-20">
                    {file.name}
                  </p>
                  <a
                    href={`/api/user/bookings/${bookingNumber}/utility-bills/${file.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm">View</Button>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-sm text-gray-500">
              <p>No Files Uploaded Yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {uploadeModal && (
        <FileUploadModal
          isOpen={uploadeModal}
          reload={filesList}
          bookingNumber={bookingNumber}
          onClose={() => setUploadModal(false)}
        />
      )}
    </>
  );
};

export default UtilityBills;
