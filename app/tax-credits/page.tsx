import {
  Receipt,
  Percent,
  ThermometerSun,
  Zap,
  Flame,
  Droplet,
  Wind,
  Shield,
  Home,
  FileText,
  Clock,
  FileSpreadsheet,
  Award,
  HelpCircle,
  AlertTriangle,
  AppWindowIcon as WindowIcon,
} from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 overflow-auto p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">
        Residential Energy Efficiency Tax Credits
      </h1>
      <p className="text-gray-600 mb-6">
        Claim tax benefits for the upgrades that make your home more efficient
        and comfortable.
      </p>

      {/* Introduction Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Receipt size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-bold text-gray-700">
            Federal Tax Credits for Energy Efficiency
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-black">
            When you make energy-efficient improvements to your home, you may be
            eligible to claim a federal tax credit — reducing what you owe at
            tax time and helping to offset the cost of your upgrades.
          </p>

          <p className="text-black">
            These credits were expanded as part of Inflation Reduction Act of
            2022 and are available through at least 2032.
          </p>
        </div>
      </div>

      {/* What You Can Claim Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Percent size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-bold text-gray-700">
            What You Can Claim
          </h3>
        </div>

        <p className="text-black mb-4">
          If you've made qualifying upgrades to your home's heating, cooling,
          water heating, insulation, air sealing, or electrical systems, you may
          be eligible to claim 30% of the project costs — up to certain annual
          limits.
        </p>
      </div>

      {/* Commonly Eligible Upgrades Title */}
      <h2 className="text-2xl font-bold mb-6 mt-10">
        Commonly Eligible Upgrades
      </h2>

      {/* Heating, Cooling & Water Heating Section */}
      <div className="mt-6 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <ThermometerSun size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-bold text-gray-700">
            Heating, Cooling & Water Heating
          </h3>
        </div>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-[#68BEB9]">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-black">
                <span className="font-semibold">Heat pumps</span> (including air
                conditioning and heat pump water heaters): Up to $2,000/year
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-[#68BEB9]">
              <Flame size={20} />
            </div>
            <div>
              <p className="text-black">
                <span className="font-semibold">
                  Biomass stoves or boilers:
                </span>{" "}
                Up to $2,000/year
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-[#68BEB9]">
              <Droplet size={20} />
            </div>
            <div>
              <p className="text-black">
                <span className="font-semibold">
                  Efficient HVAC and water heating systems:
                </span>{" "}
                Up to $600/year
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insulation & Air Sealing Section */}
      <div className="mt-6 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Wind size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-bold text-gray-700">
            Insulation & Air Sealing
          </h3>
        </div>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-[#68BEB9]">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-black">
                <span className="font-semibold">
                  Home insulation and air sealing:
                </span>{" "}
                Up to $1,200/year
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Building Envelope Improvements Section */}
      <div className="mt-6 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Home size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-bold text-gray-700">
            Building Envelope Improvements
          </h3>
        </div>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-[#68BEB9]">
              <WindowIcon size={20} />
            </div>
            <div>
              <p className="text-black">
                <span className="font-semibold">Energy-efficient windows:</span>{" "}
                Up to $600/year
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-[#68BEB9]">
              <Home size={20} />
            </div>
            <div>
              <p className="text-black">
                <span className="font-semibold">Exterior doors:</span> Up to
                $250 per door (max $500/year)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Eligible Improvements Section */}
      <div className="mt-6 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Zap size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-bold text-gray-700">
            Other Eligible Improvements
          </h3>
        </div>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-[#68BEB9]">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-black">
                <span className="font-semibold">Electrical panel upgrades</span>{" "}
                (if supporting new energy systems): Up to $600/year
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-[#68BEB9]">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-black">
                <span className="font-semibold">Home energy audits:</span> Up to
                $150/year
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Limits & Timing Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Clock size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-bold text-gray-700">
            Credit Limits & Timing
          </h3>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start p-3 bg-white rounded-md border border-gray-200">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium mr-3">
              1
            </div>
            <div className="flex-1">
              <p className="text-black">
                Credits are capped per category and are claimed annually when
                you file your federal income taxes.
              </p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-white rounded-md border border-gray-200">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium mr-3">
              2
            </div>
            <div className="flex-1">
              <p className="text-black">
                The credit does not carry over to future years — only the amount
                that fits within that year's caps can be claimed.
              </p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-white rounded-md border border-gray-200">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium mr-3">
              3
            </div>
            <div className="flex-1">
              <p className="text-black">
                Upgrades must meet ENERGY STAR® or IRS-approved performance
                standards to qualify.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Need to Claim the Credit Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <FileSpreadsheet size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-bold text-gray-700">
            What You'll Need to Claim the Credit
          </h3>
        </div>

        <p className="text-black mb-4">
          To claim your credit, keep the following:
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-start p-3 bg-white rounded-md border border-gray-200">
            <div className="mt-1 text-[#68BEB9]">
              <FileText size={20} />
            </div>
            <div className="ml-3">
              <p className="text-black">
                A copy of your contractor invoice showing itemized work and
                costs
              </p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-white rounded-md border border-gray-200">
            <div className="mt-1 text-[#68BEB9]">
              <Award size={20} />
            </div>
            <div className="ml-3">
              <p className="text-black">
                Manufacturer certification statements for qualifying equipment
              </p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-white rounded-md border border-gray-200">
            <div className="mt-1 text-[#68BEB9]">
              <Home size={20} />
            </div>
            <div className="ml-3">
              <p className="text-black">
                A record of the installation date and property address
              </p>
            </div>
          </div>
        </div>

        <p className="text-black mt-4">
          Your Ciel Home Performance Consultant or project manager can help
          provide documentation upon request.
        </p>
      </div>

      {/* Need Help Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-bold text-gray-700">Need Help?</h3>
        </div>

        <p className="text-black mb-4">
          While Ciel can help identify which upgrades typically qualify, we
          recommend speaking with your tax professional about your personal
          situation and eligibility.
        </p>
      </div>

      {/* Disclaimer Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-bold text-gray-700">Disclaimer</h3>
        </div>

        <p className="text-black italic">
          The information on this page is provided as a general summary and is
          not intended as tax advice. Eligibility for tax credits may vary based
          on your specific tax situation, the products installed, and IRS
          guidelines. Please consult with a qualified tax advisor or visit
          IRS.gov for the most up-to-date information.
        </p>
      </div>
    </div>
  );
};

export default page;
