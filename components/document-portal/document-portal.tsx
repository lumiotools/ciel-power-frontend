"use client"

import { Sidebar } from "@/components/common/sidebar"
import WhatsInPortalSection from "./whats-in-portal-section"
import ProposalsSection from "./proposals-section"
import UtilityBillsSection from "./utility-bills-section"
import HowItWorksSection from "./how-it-works-section"
import NeedHelpSection from "./need-help-section"
import { useHighlightAnimation } from "./animation-utils"

export default function DocumentPortal() {
  // Use the animation hook
  useHighlightAnimation()

  // Booking number to be used across components
  const bookingNumber = "11503047066726"

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Your Documents</h1>
          <p className="text-gray-600 mb-8">
            Secure access to everything you've signed — and everything still in progress.
          </p>
          <p className="text-gray-600 mb-8">
            This is your central place to review, sign, and download any documents related to your energy upgrade
            project. From your audit report and project proposal to your participation forms and final certification,
            you'll find it all here. Documents are automatically updated as your project moves forward — and anything
            that requires your signature or action will be clearly marked.
          </p>

          {/* What's in Your Portal */}
          <WhatsInPortalSection />

          {/* What's Next */}
          <ProposalsSection bookingNumber={bookingNumber} />

          {/* Upload Utility Bills */}
          <UtilityBillsSection bookingNumber={bookingNumber} />

          {/* How It Works */}
          <HowItWorksSection />

          {/* Need Help */}
          <NeedHelpSection />

          {/* Disclaimer */}
          <div className="text-sm text-gray-500 mt-8 p-4 border-t border-gray-200">
            <p>
              All documents are managed securely through PandaDoc and stored in accordance with industry-standard
              encryption and privacy practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
