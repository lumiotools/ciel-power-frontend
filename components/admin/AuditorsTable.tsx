// "use client";

// import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Auditor } from "@/types/admin";
import { toast } from "sonner";

interface AuditorsTableProps {
  auditors: Auditor[];
  isLoading: boolean;
  onOpenImageModal: (auditorId: string, currentFileId?: string) => void;
}

// export function AuditorsTable({
//   auditors,
//   isLoading,
//   onOpenImageModal,
// }: AuditorsTableProps) {
//   // Map auditor ID → description
//   const [descriptions, setDescriptions] = useState<Record<string, string>>({});
//   const [savingStatus, setSavingStatus] = useState<Record<string, boolean>>({});

//   // Sync descriptions when auditors prop changes
//   useEffect(() => {
//     const initialDescriptions: Record<string, string> = {};
//     auditors.forEach((auditor) => {
//       initialDescriptions[auditor.id] = auditor.description || "";
//     });
//     setDescriptions(initialDescriptions);
//   }, [auditors]);

//   const saveDescription = async (auditorId: string) => {
//     const newDescription = descriptions[auditorId];
//     if (newDescription === undefined) return;

//     setSavingStatus((prev) => ({ ...prev, [auditorId]: true }));

//     try {
//       const response = await fetch(`/api/admin/auditors/${auditorId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ description: newDescription }),
//       });
//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to update description");
//       }

//       toast.success("Description updated");
//     } catch (error) {
//       console.error("Failed to update description:", error);
//       toast.error("Failed to update description");
//     } finally {
//       setSavingStatus((prev) => ({ ...prev, [auditorId]: false }));
//     }
//   };

//   const handleDescriptionChange = (id: string, value: string) => {
//     setDescriptions((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleAddImage = (auditorId: string) => {
//     onOpenImageModal(auditorId);
//   };

//   const handlePreviewImage = (fileId: string) => {
//     const url = `https://drive.google.com/uc?export=view&id=${fileId}`;
//     window.open(url, "_blank");
//   };

//   const handleDeleteImage = async (auditorId: string) => {
//     // Confirm delete action
//     if (!confirm("Are you sure you want to delete the image?")) return;

//     try {
//       const response = await fetch(`/api/admin/auditors/${auditorId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ file_id: null }),
//       });
//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to delete image");
//       }

//       toast.success("Image deleted");
//     } catch (error) {
//       console.error("Failed to delete image:", error);
//       toast.error("Failed to delete image");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-48">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5cb85c]" />
//       </div>
//     );
//   }

//   if (auditors.length === 0) {
//     return (
//       <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
//         No auditors found.
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-lg overflow-hidden border border-gray-200">
//       <Table>
//         <TableHeader className="bg-gray-50">
//           <TableRow>
//             <TableHead className="font-semibold">Auditor Name</TableHead>
//             <TableHead className="font-semibold">Auditor Image</TableHead>
//             <TableHead className="font-semibold">Description</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {auditors.map((auditor) => (
//             <TableRow key={auditor.id} className="hover:bg-gray-50">
//               <TableCell className="font-medium">{auditor.name}</TableCell>

//               <TableCell>
//                 {!auditor.file_id ? (
//                   <Button
//                     className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
//                     onClick={() => handleAddImage(auditor.id)}
//                     aria-label={`Add image for ${auditor.name}`}
//                   >
//                     Add image
//                   </Button>
//                 ) : (
//                   <div className="flex gap-2">
//                     <Button
//                       className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
//                       onClick={() => handlePreviewImage(auditor.file_id!)}
//                       aria-label={`Preview image for ${auditor.name}`}
//                     >
//                       Preview image
//                     </Button>
//                     <Button
//                       className="bg-white text-black hover:bg-red-500 hover:text-white border border-gray-300"
//                       onClick={() => handleDeleteImage(auditor.id)}
//                       aria-label={`Delete image for ${auditor.name}`}
//                     >
//                       Delete image
//                     </Button>
//                   </div>
//                 )}
//               </TableCell>

//               <TableCell className="flex gap-2 items-center">
//                 <input
//                   type="text"
//                   value={descriptions[auditor.id] || ""}
//                   onChange={(e) =>
//                     handleDescriptionChange(auditor.id, e.target.value)
//                   }
//                   className="flex-grow border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5cb85c]"
//                   aria-label={`Description for ${auditor.name}`}
//                 />
//                 <Button
//                   size="sm"
//                   disabled={savingStatus[auditor.id]}
//                   className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
//                   onClick={() => saveDescription(auditor.id)}
//                 >
//                   {savingStatus[auditor.id] ? "Saving..." : "Save"}
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export function AuditorsTable({
  auditors,
  isLoading,
  onOpenImageModal,
}: AuditorsTableProps) {
  // Local state copy of auditors to update UI immediately on delete
  const [localAuditors, setLocalAuditors] = useState<Auditor[]>([]);

  // Sync localAuditors when auditors prop changes
  useEffect(() => {
    setLocalAuditors(auditors);
  }, [auditors]);

  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [savingStatus, setSavingStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialDescriptions: Record<string, string> = {};
    localAuditors.forEach((auditor) => {
      initialDescriptions[auditor.id] = auditor.description || "";
    });
    setDescriptions(initialDescriptions);
  }, [localAuditors]);

  const saveDescription = async (auditorId: string) => {
    const newDescription = descriptions[auditorId];
    if (newDescription === undefined) return;

    // Optional validation example: disallow empty description
    // if (newDescription.trim() === "") {
    //   toast.error("Description cannot be empty");
    //   return;
    // }

    setSavingStatus((prev) => ({ ...prev, [auditorId]: true }));

    try {
      const response = await fetch(`/api/admin/auditors/${auditorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newDescription }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update description");
      }

      toast.success("Description updated");

      // Update localAuditors state with new description
      setLocalAuditors((prev) =>
        prev.map((auditor) =>
          auditor.id === auditorId
            ? { ...auditor, description: newDescription }
            : auditor
        )
      );
    } catch (error) {
      console.error("Failed to update description:", error);
      toast.error("Failed to update description");
    } finally {
      setSavingStatus((prev) => ({ ...prev, [auditorId]: false }));
    }
  };

  const handleDescriptionChange = (id: string, value: string) => {
    setDescriptions((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDeleteImage = async (auditorId: string) => {
    if (!confirm("Are you sure you want to delete the image?")) return;

    try {
      const response = await fetch(`/api/admin/auditors/${auditorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_id: "" }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete image");
      }

      toast.success("Image deleted");

      // Update localAuditors state: clear file_id for this auditor
      setLocalAuditors((prev) =>
        prev.map((auditor) =>
          auditor.id === auditorId ? { ...auditor, file_id: "" } : auditor
        )
      );
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("Failed to delete image");
    }
  };

  // Render localAuditors instead of auditors
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5cb85c]" />
      </div>
    );
  }

  if (localAuditors.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
        No auditors found.
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold">Auditor Name</TableHead>
            <TableHead className="font-semibold">Auditor Image</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localAuditors.map((auditor) => (
            <TableRow key={auditor.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{auditor.name}</TableCell>

              <TableCell>
                {!auditor.file_id ? (
                  <Button
                    className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
                    onClick={() => onOpenImageModal(auditor.id)}
                    aria-label={`Add image for ${auditor.name}`}
                  >
                    Add image
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
                      onClick={() =>
                        window.open(
                          `https://drive.google.com/uc?export=view&id=${auditor.file_id}`,
                          "_blank"
                        )
                      }
                      aria-label={`Preview image for ${auditor.name}`}
                    >
                      Preview image
                    </Button>
                    <Button
                      className="bg-white text-black hover:bg-red-500 hover:text-white border border-gray-300"
                      onClick={() => handleDeleteImage(auditor.id)}
                      aria-label={`Delete image for ${auditor.name}`}
                    >
                      Delete image
                    </Button>
                  </div>
                )}
              </TableCell>

              <TableCell className="flex gap-2 items-center">
                <input
                  type="text"
                  value={descriptions[auditor.id] || ""}
                  onChange={(e) =>
                    handleDescriptionChange(auditor.id, e.target.value)
                  }
                  className="flex-grow border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5cb85c]"
                  aria-label={`Description for ${auditor.name}`}
                />
                <Button
                  size="sm"
                  disabled={savingStatus[auditor.id]}
                  className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
                  onClick={() => saveDescription(auditor.id)}
                >
                  {savingStatus[auditor.id] ? "Saving..." : "Save"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
