import { Award, BadgeCheck, DollarSign, Home, Leaf, Percent, Target } from "lucide-react";
import React from "react";

const ReportOverviewSectionProgram = () => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden"
      id="about-new-whole-home-energy-solutions-program"
    >
      <div className="p-5" style={{ backgroundColor: "#2FABE21F" }}>
        <h2 className="font-medium" style={{ color: "#2FABE2" }}>
          About New Whole Home Energy Solutions Program
        </h2>
      </div>
      <div className="p-5">
        <p className="text-gray-600 mb-3 text-sm">
          Home Performance with ENERGY STAR is a national program from the U.S.
          Department of Energy and U.S. Environmental Protection Agency that
          helps homeowners save money on energy bills while increasing their
          home's comfort.
        </p>

        <p className="text-gray-600 mb-6 text-sm">
          The program connects homeowners with qualified contractors who conduct
          comprehensive home energy assessments and make recommended
          improvements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Home Assessment */}
          <div
            className="border rounded-lg p-4 flex flex-col items-center"
            style={{ backgroundColor: "#2FABE21F", borderColor: "#2FABE280" }}
          >
            <div style={{ color: "#2FABE2" }} className="mb-2">
              <Home className="h-6 w-6" />
            </div>
            <h3
              className="font-medium mb-1 text-sm"
              style={{ color: "#2FABE2" }}
            >
              Home Assessment
            </h3>
            <p className="text-gray-600 text-xs text-center">
              Comprehensive energy
              <br />
              evaluation
            </p>
          </div>

          {/* Energy Efficiency */}
          <div
            className="border rounded-lg p-4 flex flex-col items-center"
            style={{ backgroundColor: "#2FABE21F", borderColor: "#2FABE280" }}
          >
            <div style={{ color: "#2FABE2" }} className="mb-2">
              <Percent className="h-6 w-6" />
            </div>
            <h3
              className="font-medium mb-1 text-sm"
              style={{ color: "#2FABE2" }}
            >
              Energy Efficiency
            </h3>
            <p className="text-gray-600 text-xs text-center">
              Improved home performance
            </p>
          </div>

          {/* Cost Savings */}
          <div
            className="border rounded-lg p-4 flex flex-col items-center"
            style={{ backgroundColor: "#2FABE21F", borderColor: "#2FABE280" }}
          >
            <div style={{ color: "#2FABE2" }} className="mb-2">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3
              className="font-medium mb-1 text-sm"
              style={{ color: "#2FABE2" }}
            >
              Cost Savings
            </h3>
            <p className="text-gray-600 text-xs text-center">
              Reduced energy bills
            </p>
          </div>

          {/* Environmental Impact */}
          <div
            className="border rounded-lg p-4 flex flex-col items-center"
            style={{ backgroundColor: "#2FABE21F", borderColor: "#2FABE280" }}
          >
            <div style={{ color: "#2FABE2" }} className="mb-2">
              <Leaf className="h-6 w-6" />
            </div>
            <h3
              className="font-medium mb-1 text-sm"
              style={{ color: "#2FABE2" }}
            >
              Environmental Impact
            </h3>
            <p className="text-gray-600 text-xs text-center">
              Reduced carbon footprint
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="border border-gray-100 rounded-lg p-6"
            style={{ backgroundColor: "#2FABE205", borderColor: "#2FABE280" }}
          >
            <div className="flex items-center mb-3">
              <Award className="h-5 w-5 mr-2" style={{ color: "#2FABE2" }} />
              <h3 className="font-medium text-sm" style={{ color: "#2FABE2" }}>
                Program Benefits
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Access to certified contractors, quality assurance, and potential
              rebates
            </p>

            <div className="flex items-center mb-3 mt-4">
              <BadgeCheck
                className="h-5 w-5 mr-2"
                style={{ color: "#2FABE2" }}
              />
              <h3 className="font-medium text-sm" style={{ color: "#2FABE2" }}>
                Certification
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Work performed by Building Performance Institute (BPI) certified
              professionals
            </p>

            <div className="flex items-center mb-3 mt-4">
              <Target className="h-5 w-5 mr-2" style={{ color: "#2FABE2" }} />
              <h3 className="font-medium text-sm" style={{ color: "#2FABE2" }}>
                Results
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Average energy savings of 20-30% after recommended improvements
            </p>
          </div>

          <div
            className="border p-6 rounded-lg"
            style={{ backgroundColor: "#2FABE205", borderColor: "#2FABE280" }}
          >
            <h3
              className="font-medium mb-3 text-sm"
              style={{ color: "#2FABE2" }}
            >
              Financial Incentives
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              The program offers various financial incentives including:
            </p>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Up to $4,000 in rebates for eligible improvements</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Special financing options with low interest rates</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Additional local utility incentives</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Federal tax credits for energy efficiency improvements
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportOverviewSectionProgram;
