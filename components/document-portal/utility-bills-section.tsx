"use client"

import type React from "react"

import { FileText, Upload, Trash2, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import PortalSection from "./portal-section"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface UtilityBill {
  id: string
  name: string
  mimeType: string
  thumbnailLink: string
  size: string
  createdTime: string
  modifiedTime: string
}

interface UtilityBillsSectionProps {
  bookingNumber: string
}

export default function UtilityBillsSection({ bookingNumber }: UtilityBillsSectionProps) {
  // Utility bills state
  const [bills, setBills] = useState<UtilityBill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Delete confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [billToDelete, setBillToDelete] = useState<UtilityBill | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch utility bills
  useEffect(() => {
    fetchUtilityBills()
  }, [bookingNumber])

  // Function to fetch utility bills
  const fetchUtilityBills = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/user/bookings/${bookingNumber}/utility-bills`)
      const result = await response.json()

      if (result.success) {
        setBills(result.data.files || [])
      } else {
        setError(result.message || "Failed to fetch utility bills")
      }
    } catch (err) {
      setError("An error occurred while fetching utility bills")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsLoading(true)
    setError("")

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }

    try {
      const response = await fetch(`/api/user/bookings/${bookingNumber}/utility-bills`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        // Refresh the bills list
        fetchUtilityBills()
      } else {
        setError(result.message || "Failed to upload files")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An error occurred while uploading files")
      console.error(err)
      setIsLoading(false)
    }
  }

  // Function to handle file download
  const handleDownload = (fileId: string, fileName: string) => {
    window.open(`/api/user/bookings/${bookingNumber}/utility-bills/${fileId}`, "_blank")
  }

  // Function to open delete confirmation dialog
  const openDeleteDialog = (bill: UtilityBill) => {
    setBillToDelete(bill)
    setIsDeleteDialogOpen(true)
  }

  // Function to handle file deletion
  const handleDelete = async () => {
    if (!billToDelete) return

    setIsDeleting(true)
    setError("")

    try {
      const response = await fetch(`/api/user/bookings/${bookingNumber}/utility-bills/${billToDelete.id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        // Remove the deleted file from the state
        setBills(bills.filter((bill) => bill.id !== billToDelete.id))
        setIsDeleteDialogOpen(false)
        setBillToDelete(null)
      } else {
        setError(result.message || "Failed to delete file")
      }
    } catch (err) {
      setError("An error occurred while deleting the file")
      console.error(err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <PortalSection
        id="upload-utility-bills"
        icon={<Upload className="text-[#8bc34a]" size={24} />}
        title="Upload Utility Bills"
      >
        <p className="text-gray-700 mb-4">
          Upload your utility bills here for our auditors to assess. Sharing your utility bills helps us analyze your
          energy usage patterns and identify potential savings.
        </p>

        <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-700">Your Uploaded Bills</p>
              <label
                htmlFor="file-upload"
                className="bg-[#8bc34a] text-white px-4 py-2 rounded-md hover:bg-[#7cb342] flex items-center cursor-pointer"
              >
                <Upload size={18} className="mr-2" />
                Upload Bills
                <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8bc34a]"></div>
              </div>
            )}

            {/* Error state */}
            {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}

            {/* Empty state */}
            {!isLoading && !error && bills.length === 0 && (
              <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <FileText size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No utility bills uploaded yet.</p>
                <p className="text-sm text-gray-500 mt-1">Upload your first bill to get started.</p>
              </div>
            )}

            {/* Bills list */}
            {!isLoading && bills.length > 0 && (
              <div className="mt-4 space-y-3">
                {bills.map((bill) => (
                  <div
                    key={bill.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center">
                      <FileText size={20} className="text-[#8bc34a] mr-3" />
                      <div>
                        <p className="font-medium">{bill.name}</p>
                        <p className="text-xs text-gray-500">
                          Uploaded on {new Date(bill.createdTime).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        title="Download"
                        onClick={() => handleDownload(bill.id, bill.name)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Delete"
                        onClick={() => openDeleteDialog(bill)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Accepted formats: PDF, JPG, PNG. Max size: 10MB</p>
      </PortalSection>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {billToDelete && (
            <div className="p-4 bg-gray-50 rounded-md my-2">
              <div className="flex items-center">
                <FileText size={20} className="text-[#8bc34a] mr-3 flex-shrink-0" />
                <div className="overflow-hidden">
                  <p className="font-medium truncate">{billToDelete.name}</p>
                  <p className="text-xs text-gray-500">
                    Uploaded on {new Date(billToDelete.createdTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">{error}</div>}

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete File
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
