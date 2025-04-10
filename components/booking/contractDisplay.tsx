"use client"

import { useState } from "react"
import { FileText, ExternalLink, File, PenLine } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import Link from "next/link"
import React from "react"

interface ContractData {
  id: string
  name: string
}

interface ContractDisplayProps {
  bookingNumber: string
  offeredContracts: ContractData[]
}

const ContractDisplay = ({ bookingNumber, offeredContracts }: ContractDisplayProps) => {
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isIframeLoading, setIsIframeLoading] = useState(true)

  // Reset loading state when modal opens
  React.useEffect(() => {
    if (isModalOpen) {
      setIsIframeLoading(true)
    }
  }, [isModalOpen])

  const handleViewContract = (contract: ContractData) => {
    setSelectedContract(contract)
    setIsModalOpen(true)
  }

  return (
    <div className="mt-6">
      <h4 className="text-lg font-bold mb-4">Offered Contracts</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offeredContracts.map((contract) => (
          <div
            key={contract.id}
            className="group relative flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300"
          >
            <div className="flex-shrink-0 mr-4 p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
              <FileText className="h-8 w-8 text-gray-700" />
            </div>
            <div className="flex-grow min-w-0">
              <h5 className="font-medium text-gray-900 truncate mb-1">{contract.name}</h5>
              <p className="text-xs text-gray-500">Contract ID: {contract.id.substring(0, 8)}...</p>
            </div>
            <button
              onClick={() => handleViewContract(contract)}
              className="ml-4 flex items-center gap-1.5 bg-[#96C93D] text-white hover:bg-[#85b234] py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View</span>
            </button>
          </div>
        ))}
      </div>

      {offeredContracts.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <File className="h-12 w-12 text-gray-400 mb-3" />
          <p className="text-gray-500 text-center">No contracts available for this booking</p>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{selectedContract?.name}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 bg-gray-50 rounded-md overflow-hidden relative">
            {isIframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-[#96C93D] animate-spin"></div>
                  <p className="mt-4 text-sm text-gray-500">Loading document...</p>
                </div>
              </div>
            )}
            {selectedContract && (
              <iframe
                src={`/api/user/bookings/${bookingNumber}/contract/${selectedContract.id}/view`}
                className="w-full h-full border-0"
                title={`Contract: ${selectedContract.name}`}
                onLoad={() => setIsIframeLoading(false)}
              />
            )}
          </div>

          <DialogFooter className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">Please review the contract carefully before signing</p>
            {selectedContract && (
              <Link
                href={`/dashboard/bookings/${bookingNumber}/contract/${selectedContract.id}`}
                className="flex items-center gap-2 bg-[#96C93D] text-white hover:bg-[#85b234] py-2 px-6 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <PenLine className="h-4 w-4" />
                Sign Contract
              </Link>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ContractDisplay
