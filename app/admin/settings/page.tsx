"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Consultant {
  id: string;
  name: string;
  followUpBookingUrl: string;
}

interface Settings {
  googleDriveServiceAccountEmail: string;
  googleDriveSharedFolderUrl: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [loadingConsultants, setLoadingConsultants] = useState(true);
  const [savingDriveFolder, setSavingDriveFolder] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    googleDriveServiceAccountEmail: "",
    googleDriveSharedFolderUrl: "",
  });
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [newConsultant, setNewConsultant] = useState<{
    name: string;
    followUpBookingUrl: string;
  }>({
    name: "",
    followUpBookingUrl: "",
  });
  const [addingConsultant, setAddingConsultant] = useState(false);

  useEffect(() => {
    fetchSettings();
    fetchConsultants();
  }, []);

  const fetchSettings = async () => {
    setLoadingSettings(true);
    try {
      const response = await fetch("/api/admin/settings");

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch settings");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setSettings(data.data);
      } else {
        toast.error(data.message || "Failed to fetch settings");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("An error occurred while fetching settings");
    } finally {
      setLoadingSettings(false);
    }
  };

  const fetchConsultants = async () => {
    setLoadingConsultants(true);
    try {
      const response = await fetch("/api/admin/consultants");

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch consultants");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setConsultants(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch consultants");
      }
    } catch (error) {
      console.error("Error fetching consultants:", error);
      toast.error("An error occurred while fetching consultants");
    } finally {
      setLoadingConsultants(false);
    }
  };

  const updateDriveFolder = async () => {
    setSavingDriveFolder(true);
    try {
      const response = await fetch(
        `/api/admin/settings/driveSharedFolderUrl?folder_url=${encodeURIComponent(settings.googleDriveSharedFolderUrl)}`,
        {
          method: "PUT",
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Google Drive folder updated successfully");
        setSettings(data.data);
      } else {
        toast.error(data.message || "Failed to update Google Drive folder");
      }
    } catch (error) {
      console.error("Error updating Google Drive folder:", error);
      toast.error("An error occurred while updating Google Drive folder");
    } finally {
      setSavingDriveFolder(false);
    }
  };

  const addConsultant = async () => {
    if (
      !newConsultant.name.trim() ||
      !newConsultant.followUpBookingUrl.trim()
    ) {
      toast.error("Consultant name and booking URL are required");
      return;
    }

    setAddingConsultant(true);
    try {
      const response = await fetch("/api/admin/consultants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newConsultant),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Consultant added successfully");
        setConsultants([...consultants, data.data]);
        setNewConsultant({ name: "", followUpBookingUrl: "" });
      } else {
        toast.error(data.message || "Failed to add consultant");
      }
    } catch (error) {
      console.error("Error adding consultant:", error);
      toast.error("An error occurred while adding consultant");
    } finally {
      setAddingConsultant(false);
    }
  };

  const updateConsultant = async (
    id: string,
    updatedData: { name: string; followUpBookingUrl: string },
  ) => {
    if (!updatedData.name.trim() || !updatedData.followUpBookingUrl.trim()) {
      toast.error("Consultant name and booking URL are required");
      return;
    }

    try {
      const response = await fetch(`/api/admin/consultants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Consultant updated successfully");
        setConsultants(consultants.map((c) => (c.id === id ? data.data : c)));
      } else {
        toast.error(data.message || "Failed to update consultant");
      }
    } catch (error) {
      console.error("Error updating consultant:", error);
      toast.error("An error occurred while updating consultant");
    }
  };

  const deleteConsultant = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/consultants/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Consultant deleted successfully");
        setConsultants(consultants.filter((c) => c.id !== id));
      } else {
        toast.error(data.message || "Failed to delete consultant");
      }
    } catch (error) {
      console.error("Error deleting consultant:", error);
      toast.error("An error occurred while deleting consultant");
    }
  };

  const handleConsultantChange = (
    id: string,
    field: "name" | "followUpBookingUrl",
    value: string,
  ) => {
    setConsultants((prev) =>
      prev.map((consultant) =>
        consultant.id === id ? { ...consultant, [field]: value } : consultant,
      ),
    );
  };

  const handleNewConsultantChange = (
    field: "name" | "followUpBookingUrl",
    value: string,
  ) => {
    setNewConsultant((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f5f9f0]">
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin")}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Admin Settings</h1>
        </div>

        {/* Google Drive Integration Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Google Drive Integration</CardTitle>
            <CardDescription>
              Configure the Google Drive folder where customer files will be
              stored
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingSettings ? (
              <div className="flex justify-center items-center h-24">
                <Loader2 className="h-8 w-8 animate-spin text-[#5cb85c]" />
              </div>
            ) : (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Important:</strong> Please give edit access to the
                    service email address below for your Google Drive folder.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceEmail">Service Email</Label>
                  <Input
                    id="serviceEmail"
                    value={settings.googleDriveServiceAccountEmail}
                    readOnly
                    className="bg-gray-50 h-10"
                  />
                  <p className="text-xs text-gray-500">
                    This email needs edit access to your Google Drive folder
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googleDriveFolder">
                    Google Drive Folder URL
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="googleDriveFolder"
                      value={settings.googleDriveSharedFolderUrl}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          googleDriveSharedFolderUrl: e.target.value,
                        })
                      }
                      placeholder="Enter Google Drive folder URL"
                      className="flex-1 h-10"
                    />
                    <Button
                      onClick={updateDriveFolder}
                      disabled={
                        savingDriveFolder ||
                        !settings.googleDriveSharedFolderUrl.trim()
                      }
                      className="bg-[#5cb85c] hover:bg-[#4a9d4a] h-10"
                    >
                      {savingDriveFolder ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Enter the URL of the Google Drive folder where customer
                    files will be stored
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Consultants Management Section */}
        <Card>
          <CardHeader>
            <CardTitle>Consultants Management</CardTitle>
            <CardDescription>
              Manage your consultants and their booking URLs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingConsultants ? (
              <div className="flex justify-center items-center h-24">
                <Loader2 className="h-8 w-8 animate-spin text-[#5cb85c]" />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Existing Consultants */}
                {consultants.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium mb-4">
                      Existing Consultants
                    </h3>
                    {consultants.map((consultant, index) => (
                      <div
                        key={consultant.id}
                        className="grid grid-cols-12 gap-4 items-start border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="col-span-5">
                          {index === 0 && (
                            <Label
                              htmlFor={`consultant-name-${consultant.id}`}
                              className="mb-2 block"
                            >
                              Consultant Name
                            </Label>
                          )}
                          <div className="h-10">
                            <Input
                              id={`consultant-name-${consultant.id}`}
                              value={consultant.name}
                              onChange={(e) =>
                                handleConsultantChange(
                                  consultant.id,
                                  "name",
                                  e.target.value,
                                )
                              }
                              placeholder="Consultant name"
                              className="h-full"
                            />
                          </div>
                        </div>
                        <div className="col-span-5">
                          {index === 0 && (
                            <Label
                              htmlFor={`consultant-url-${consultant.id}`}
                              className="mb-2 block"
                            >
                              Booking URL
                            </Label>
                          )}
                          <div className="h-10">
                            <Input
                              id={`consultant-url-${consultant.id}`}
                              value={consultant.followUpBookingUrl}
                              onChange={(e) =>
                                handleConsultantChange(
                                  consultant.id,
                                  "followUpBookingUrl",
                                  e.target.value,
                                )
                              }
                              placeholder="https://example.com/booking"
                              className="h-full"
                            />
                          </div>
                        </div>
                        <div className="col-span-2">
                          {index === 0 && (
                            <div
                              className="mb-0.5 block h-5"
                              aria-hidden="true"
                            />
                          )}
                          <div className="flex justify-end gap-2 h-10">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                updateConsultant(consultant.id, {
                                  name: consultant.name,
                                  followUpBookingUrl:
                                    consultant.followUpBookingUrl,
                                })
                              }
                              className="h-full text-[#5cb85c] border-[#5cb85c] hover:bg-[#5cb85c]/10"
                            >
                              <Save className="h-4 w-4" />
                              <span className="sr-only">Save consultant</span>
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => deleteConsultant(consultant.id)}
                              className="h-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete consultant</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-500">
                      No consultants found. Add your first consultant below.
                    </p>
                  </div>
                )}

                {/* Add New Consultant */}
                <div className="pt-6 border-t">
                  <h3 className="text-sm font-medium mb-4">
                    Add New Consultant
                  </h3>
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-5">
                      <Label
                        htmlFor="new-consultant-name"
                        className="mb-2 block"
                      >
                        Consultant Name
                      </Label>
                      <div className="h-10">
                        <Input
                          id="new-consultant-name"
                          value={newConsultant.name}
                          onChange={(e) =>
                            handleNewConsultantChange("name", e.target.value)
                          }
                          placeholder="Enter consultant name"
                          className="h-full"
                          disabled={addingConsultant}
                        />
                      </div>
                    </div>
                    <div className="col-span-5">
                      <Label
                        htmlFor="new-consultant-url"
                        className="mb-2 block"
                      >
                        Booking URL
                      </Label>
                      <div className="h-10">
                        <Input
                          id="new-consultant-url"
                          value={newConsultant.followUpBookingUrl}
                          onChange={(e) =>
                            handleNewConsultantChange(
                              "followUpBookingUrl",
                              e.target.value,
                            )
                          }
                          placeholder="https://nut.sh/ell/schedule-booking/..."
                          className="h-full"
                          disabled={addingConsultant}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="mb-0.5 block h-5" aria-hidden="true" />
                      <Button
                        type="button"
                        onClick={addConsultant}
                        className="bg-[#5cb85c] hover:bg-[#4a9d4a] w-full h-10"
                        disabled={
                          addingConsultant ||
                          !newConsultant.name.trim() ||
                          !newConsultant.followUpBookingUrl.trim()
                        }
                      >
                        {addingConsultant ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
