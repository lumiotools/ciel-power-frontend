"use client";

import { Clock, CheckCircle, FileText, X, PenLine } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import PortalSection from "./portal-section";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Contract {
  id: string;
  name: string;
  signed: boolean;
  downloadLink: string | null;
}

interface ContractsResponse {
  success: boolean;
  message: string;
  data: {
    allowSigning: boolean;
    contracts: Contract[];
  };
}

interface ProposalsSectionProps {
  bookingNumber: string;
}

export default function ProposalsSection({
  bookingNumber,
}: ProposalsSectionProps) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [allowSigning, setAllowSigning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Dialog state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Fetch contracts
  useEffect(() => {
    fetchContracts();
  }, [bookingNumber]);

  // Function to fetch contracts
  const fetchContracts = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/user/bookings/${bookingNumber}/contracts`
      );
      const result: ContractsResponse = await response.json();

      if (result.success) {
        setContracts(result.data.contracts || []);
        setAllowSigning(result.data.allowSigning);
      } else {
        setError(result.message || "Failed to fetch contracts");
      }
    } catch (err) {
      setError("An error occurred while fetching contracts");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle contract signing
  const handleSignContract = (contract: Contract) => {
    setSelectedContract(contract);
    setIsIframeLoading(true);
    setIsModalOpen(true);
  };

  // Function to handle contract download
  const handleDownloadContract = (downloadLink: string) => {
    // Open the download link in a new tab
    window.open(downloadLink, "_blank");
  };

  return (
    <>
      <PortalSection
        id="review-plans"
        icon={<Clock className="text-[#68BEB9]" size={24} />}
        title="Your Proposals"
      >
        <h3 className="text-lg font-semibold text-gray-500 mb-4 ml-9">
          Review Plans & Say Go
        </h3>

        <p className="text-gray-700 mb-4">
          Review plans, and find what works for you! Once you have signed off on
          the contract, we'll go ahead and line everything up. Keeping you
          informed at every step of the journey.
        </p>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <p className="mb-4">
            {allowSigning
              ? "The following contracts are available for your review and signature."
              : "The following contracts are available for your review. Signing is currently not available."}
          </p>

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8bc34a]"></div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && contracts.length === 0 && (
            <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <FileText size={32} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                No contracts available at this time.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Check back later for updates.
              </p>
            </div>
          )}

          {/* Contracts list */}
          {!isLoading && contracts.length > 0 && (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Document</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract) => (
                    <tr key={contract.id} className="border-b border-gray-200">
                      <td className="py-3 px-4">{contract.name}</td>
                      <td className="py-3 px-4 flex items-center">
                        {contract.signed ? (
                          <>
                            <CheckCircle
                              size={16}
                              className="text-green-500 mr-2"
                            />
                            Signed
                          </>
                        ) : (
                          <>
                            <X size={16} className="text-orange-500 mr-2" />
                            Not signed yet
                          </>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {contract.signed && contract.downloadLink ? (
                          <button
                            className="text-[#68BEB9] font-medium hover:underline flex items-center"
                            onClick={() =>
                              handleDownloadContract(contract.downloadLink!)
                            }
                          >
                            Download <span className="ml-1">›</span>
                          </button>
                        ) : !contract.signed && allowSigning ? (
                          <button
                            className="bg-[#68BEB9] text-white px-3 py-1 rounded-md hover:bg-[#7cb342]"
                            onClick={() => handleSignContract(contract)}
                          >
                            Sign Now
                          </button>
                        ) : (
                          <span className="text-gray-400">
                            {contract.signed
                              ? "Download unavailable"
                              : "Signing unavailable"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-4">
            All signed documents are stored securely and can be downloaded
            anytime.
          </p>
        </div>
      </PortalSection>

      {/* Contract Signing Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedContract?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 bg-gray-50 rounded-md overflow-hidden relative">
            {isIframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-[#8bc34a] animate-spin"></div>
                  <p className="mt-4 text-sm text-gray-500">
                    Loading document...
                  </p>
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
            <p className="text-sm text-gray-500">
              Please review the contract carefully before signing
            </p>
            {selectedContract && (
              <Link
                href={`/document-portal/sign-contract/${selectedContract.id}`}
                className="flex items-center gap-2 bg-[#8bc34a] text-white hover:bg-[#7cb342] py-2 px-6 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <PenLine className="h-4 w-4" />
                Sign Contract
              </Link>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
