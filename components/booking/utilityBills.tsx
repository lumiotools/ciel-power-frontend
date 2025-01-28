import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import FileUploadModal from "../modal/FileUploadModal";

interface FileDetails {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink: string;
}

const UtilityBills = ({ bookingNumber }: { bookingNumber: string }) => {
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



  return (
    <>
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader className="space-y-3">
          <div className="justify-between flex items-center">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <Upload className="w-5 h-5 text-gray-400 mr-3" />
              Upload Utility Bills
            </h3>
            <Button onClick={() => setUploadModal(true)}>Upload</Button>
          </div>

          <Separator />
        </CardHeader>
        <CardContent>
          {files.length > 0 ? (
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <div className="flex flex-1 items-center space-x-3">
                    <img
                      src={file.thumbnailLink}
                      alt={file.thumbnailLink}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <p className="flex-1 text-sm text-gray-800 truncate line-clamp-1">
                      {file.name}
                    </p>
                    <a href={file.thumbnailLink} target="_blank">
                        <Button>View</Button>
                    </a>
                  </div>
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
          bookingNumber={bookingNumber}
          onClose={() => setUploadModal(false)}
        />
      )}
    </>
  );
};

export default UtilityBills;
