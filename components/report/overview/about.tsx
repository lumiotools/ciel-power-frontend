import { CheckCircle2, HelpCircle, Info } from "lucide-react";
import React from "react";

const ReportOverviewSectionAboutUs = () => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden"
      id="about-ciel-power"
    >
      <div className="p-5" style={{ backgroundColor: "#F0F8E699" }}>
        <h2 className="font-medium" style={{ color: "#67B502" }}>
          About Ciel Power
        </h2>
      </div>
      <div className="p-5">
        <p className="text-gray-600 mb-3 text-sm">
          We are a participating contractor in the New Jersey Home Performance
          with Energy Star Program and a Building Performance Institute Goldstar
          Contractor.
        </p>

        <p className="text-gray-600 mb-3 text-sm">
          Today's new home buyers expect energy efficiency to be part of the
          package. What if your home was built before today's energy-efficiency
          standards?
        </p>

        <p className="text-gray-600 mb-3 text-sm">
          From insulation to high-efficiency air-conditioning, heating, and hot
          water systems, our products and services deliver today's
          energy-efficiency solutions to yesterday's homes for a more
          comfortable and affordable homeownership experience.
        </p>

        {/* How it Works */}
        <h2 className="font-medium mt-8 mb-4" style={{ color: "#67B502" }}>
          How it Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Initial Assessment */}
          <div
            className="rounded-lg p-6 flex flex-col items-center border"
            style={{
              backgroundColor: "#F0F8E699",
              border: "0.5px solid #B7E2C7",
            }}
          >
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <div style={{ color: "#67B502" }}>
                <Info className="h-6 w-6" />
              </div>
            </div>
            <h3 className="font-medium mb-2" style={{ color: "#67B502" }}>
              Initial Assessment
            </h3>
            <p className="text-gray-600 text-sm text-center">
              We perform a comprehensive energy audit of your home
            </p>
          </div>

          {/* Analysis */}
          <div
            className="rounded-lg p-6 flex flex-col items-center border"
            style={{
              backgroundColor: "#F0F8E699",
              border: "0.5px solid #B7E2C7",
            }}
          >
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <div style={{ color: "#67B502" }}>
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
            <h3 className="font-medium mb-2" style={{ color: "#67B502" }}>
              Analysis
            </h3>
            <p className="text-gray-600 text-sm text-center">
              We analyze the data and identify improvement opportunities
            </p>
          </div>

          {/* Implementation */}
          <div
            className="rounded-lg p-6 flex flex-col items-center border"
            style={{
              backgroundColor: "#F0F8E699",
              border: "0.5px solid #B7E2C7",
            }}
          >
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <div style={{ color: "#67B502" }}>
                <HelpCircle className="h-6 w-6" />
              </div>
            </div>
            <h3 className="font-medium mb-2" style={{ color: "#67B502" }}>
              Implementation
            </h3>
            <p className="text-gray-600 text-sm text-center">
              We implement the recommended energy-saving solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportOverviewSectionAboutUs;
