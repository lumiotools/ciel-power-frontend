"use client";

import { useState, useEffect } from "react";
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
  onOpenImageModal: (
    auditorId: string,
    currentFileId?: string,
    onUploadComplete?: (fileId: string) => void
  ) => void;
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
  onAuditorAdded: () => void; // Callback to refresh data
}

export function AuditorsTable({
  auditors,
  isLoading,
  onOpenImageModal,
  isAdding,
  setIsAdding,
  onAuditorAdded,
}: AuditorsTableProps) {
  // Local state copy of auditors to update UI immediately on delete
  const [localAuditors, setLocalAuditors] = useState<Auditor[]>([]);
  // const [isAdding, setIsAdding] = useState(false); // This state is now managed by the parent
  const [newAuditor, setNewAuditor] = useState({
    name: "",
    description: "",
    file_id: "",
  });
  const [adding, setAdding] = useState(false);

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

  if (localAuditors.length === 0 && !isAdding) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
        No auditors found.
      </div>
    );
  }

  return (
    <>
      {/* BUTTON HAS BEEN REMOVED FROM HERE */}
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
            {isAdding && (
              <TableRow className="bg-yellow-50">
                <TableCell>
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={newAuditor.name}
                    onChange={(e) =>
                      setNewAuditor((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter name"
                  />
                </TableCell>

                <TableCell>
                  <Button
                    className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
                    onClick={() =>
                      onOpenImageModal(
                        "new",
                        undefined,
                        (uploadedFileId: string) => {
                          setNewAuditor((prev) => ({
                            ...prev,
                            file_id: uploadedFileId,
                          }));
                        }
                      )
                    }
                  >
                    Add image
                  </Button>
                </TableCell>

                <TableCell className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="flex-grow border border-gray-300 rounded px-2 py-1"
                    value={newAuditor.description}
                    onChange={(e) =>
                      setNewAuditor((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter description"
                  />
                  <Button
                    disabled={adding}
                    onClick={async () => {
                      if (!newAuditor.name.trim()) {
                        toast.error("Name is required");
                        return;
                      }
                      try {
                        setAdding(true);
                        const response = await fetch(
                          "/api/admin/auditors/add",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(newAuditor),
                          }
                        );
                        const data = await response.json();

                        if (!response.ok || !data.success) {
                          throw new Error(
                            data.message || "Failed to add auditor"
                          );
                        }

                        toast.success("Auditor added");
                        onAuditorAdded(); // Refresh the auditor list in the parent
                        setIsAdding(false); // Close the add row
                        setNewAuditor({
                          name: "",
                          description: "",
                          file_id: "",
                        });
                      } catch (err) {
                        console.error(err);
                        toast.error("Failed to add auditor");
                      } finally {
                        setAdding(false);
                      }
                    }}
                    className="bg-[#5cb85c] hover:bg-[#4a9d4a] text-white"
                  >
                    {adding ? "Adding..." : "Save"}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAdding(false);
                      setNewAuditor({ name: "", description: "", file_id: "" });
                    }}
                    className="bg-white text-black hover:bg-red-500 border hover:text-white"
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
