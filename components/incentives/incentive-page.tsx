"use client";

import { useContext } from "react";
import { BOOKING_CONTEXT, BookingDetails } from "@/providers/booking";
import { shouldShowUtilityProgram } from "@/lib/zip-utility-data";
import { PSEGProgram } from "./pseg-program";
import { JCPLProgram } from "./jcpl-program";
import { ACEProgram } from "./ace-program";
import { RECOProgram } from "./reco-program";
import { NJNGProgram } from "./njng-program";
import { SJGProgram } from "./sjg-program";
import { IntroductionSection } from "./introduction-section";
import { QualificationSection } from "./qualification-section";
import { QuestionsSection } from "./questions-section";
import { SupportSection } from "./support-section";
import { CostSection } from "./cost-section";
import { ETGProgram } from "./etg-program";

export default function IncentivePage() {
  const { bookingDetails } = useContext(BOOKING_CONTEXT) as {
    bookingDetails: BookingDetails;
  };

  // Get the postal code from booking details
  const postalCode = bookingDetails?.bookingDetails?.address?.postalCode;

  // Determine which utility programs to show based on postal code
  const showPSEG = postalCode
    ? shouldShowUtilityProgram(postalCode, "pseg")
    : true;
  const showJCPL = postalCode
    ? shouldShowUtilityProgram(postalCode, "jcpl")
    : true;
  const showACE = postalCode
    ? shouldShowUtilityProgram(postalCode, "ace")
    : true;
  const showRECO = postalCode
    ? shouldShowUtilityProgram(postalCode, "reco")
    : true;
  const showNJNG = postalCode
    ? shouldShowUtilityProgram(postalCode, "njng")
    : true;
  const showSJG = postalCode
    ? shouldShowUtilityProgram(postalCode, "sjg")
    : true;
  const showETG = postalCode
    ? shouldShowUtilityProgram(postalCode, "etg")
    : true;

  return (
    <div className="flex h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 bg-white">
        <h1 className="text-2xl font-bold mb-6">Incentives & Savings</h1>
        <p className="text-gray-600 mb-6">
          Making your upgrades more affordable — and your investment go further.
        </p>

        {/* Show location-specific message if postal code is available */}
        {/* {postalCode && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-700">
              <strong>Your Location:</strong> Based on your postal code (
              {postalCode}), we&apos;re showing you the utility programs
              available in your area.
            </p>
          </div>
        )} */}

        {/* Introduction Section */}
        <IntroductionSection />

        {/* What You May Qualify For Section */}
        <QualificationSection />

        {/* Keeping Out-of-Pocket Costs Low Section */}
        <CostSection />

        {/* How We Support You Section */}
        <SupportSection />

        {/* Utility Programs - Only show relevant ones based on postal code */}
        {showPSEG && <PSEGProgram />}
        {showJCPL && <JCPLProgram />}
        {showACE && <ACEProgram />}
        {showRECO && <RECOProgram />}
        {showNJNG && <NJNGProgram />}
        {showSJG && <SJGProgram />}
        {showETG && <ETGProgram />}

        {/* Still Have Questions Section */}
        <QuestionsSection />
      </div>
    </div>
  );
}
