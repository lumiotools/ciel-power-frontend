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
      <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-receipt text-[#8bc34a]"
          >
            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path>
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
            <path d="M12 17.5v-11"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">
            Federal Tax Credits for Energy Efficiency
          </h3>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            When you make energy-efficient improvements to your home, you may be
            eligible to claim a federal tax credit — reducing what you owe at
            tax time and helping to offset the cost of your upgrades.
          </p>
          <p className="text-gray-700">
            These credits were expanded as part of the Inflation Reduction Act
            of 2022 and are available through at least 2032.
          </p>
        </div>
      </div>
      <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-percent text-[#8bc34a]"
          >
            <line x1="19" x2="5" y1="5" y2="19"></line>
            <circle cx="6.5" cy="6.5" r="2.5"></circle>
            <circle cx="17.5" cy="17.5" r="2.5"></circle>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">
            What You Can Claim
          </h3>
        </div>
        <p className="text-gray-700 mb-4">
          If you&apos;ve made qualifying upgrades to your home&apos;s heating,
          cooling, water heating, insulation, air sealing, or electrical
          systems, you may be eligible to claim 30% of the project costs — up to
          certain annual limits.
        </p>
      </div>
      <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-home text-[#8bc34a]"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">
            Commonly Eligible Upgrades
          </h3>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-thermometer-sun text-[#8bc34a] mr-2"
              >
                <path d="M12 9a4 4 0 0 0-2 7.5"></path>
                <path d="M12 3v2"></path>
                <path d="m6.6 18.4-1.4 1.4"></path>
                <path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
                <path d="M4 13H2"></path>
                <path d="M6.34 7.34 4.93 5.93"></path>
              </svg>
              Heating, Cooling &amp; Water Heating
            </h4>
            <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#8bc34a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-zap"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Heat pumps</span> (including
                    air conditioning and heat pump water heaters): Up to
                    $2,000/year
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#8bc34a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-flame"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">
                      Biomass stoves or boilers:
                    </span>{" "}
                    Up to $2,000/year
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#8bc34a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-droplet"
                  >
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">
                      Efficient HVAC and water heating systems:
                    </span>{" "}
                    Up to $600/year
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-wind text-[#8bc34a] mr-2"
              >
                <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
              </svg>
              Insulation &amp; Air Sealing
            </h4>
            <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#8bc34a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-shield"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">
                      Home insulation and air sealing:
                    </span>{" "}
                    Up to $1,200/year
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-home text-[#8bc34a] mr-2"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Building Envelope Improvements
            </h4>
            <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#8bc34a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-app-window"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M10 4v4"></path>
                    <path d="M2 8h20"></path>
                    <path d="M6 4v4"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">
                      Energy-efficient windows:
                    </span>{" "}
                    Up to $600/year
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#8bc34a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-home"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Exterior doors:</span> Up to
                    $250 per door (max $500/year)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-zap text-[#8bc34a] mr-2"
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
              </svg>
              Other Eligible Improvements
            </h4>
            <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#8bc34a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-zap"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">
                      Electrical panel upgrades
                    </span>{" "}
                    (if supporting new energy systems): Up to $600/year
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#8bc34a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-file-text"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Home energy audits:</span> Up
                    to $150/year
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-clock text-[#8bc34a]"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">
            Credit Limits &amp; Timing
          </h3>
        </div>
        <div className="space-y-3 mb-4">
          <div className="flex items-start p-3 bg-white rounded-md border border-[#e0f0d0]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8bc34a] text-white flex items-center justify-center font-medium mr-3">
              1
            </div>
            <div className="flex-1">
              <p className="text-gray-700">
                Credits are capped per category and are claimed annually when
                you file your federal income taxes.
              </p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-white rounded-md border border-[#e0f0d0]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8bc34a] text-white flex items-center justify-center font-medium mr-3">
              2
            </div>
            <div className="flex-1">
              <p className="text-gray-700">
                The credit does not carry over to future years — only the amount
                that fits within that year&apos;s caps can be claimed.
              </p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-white rounded-md border border-[#e0f0d0]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8bc34a] text-white flex items-center justify-center font-medium mr-3">
              3
            </div>
            <div className="flex-1">
              <p className="text-gray-700">
                Upgrades must meet ENERGY STAR® or IRS-approved performance
                standards to qualify.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-file-spreadsheet text-[#8bc34a]"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            <path d="M8 13h2"></path>
            <path d="M14 13h2"></path>
            <path d="M8 17h2"></path>
            <path d="M14 17h2"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">
            What You&apos;ll Need to Claim the Credit
          </h3>
        </div>
        <p className="text-gray-700 mb-4">
          To claim your credit, keep the following:
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex items-start p-3 bg-white rounded-md border border-[#e0f0d0]">
            <div className="mt-1 text-[#8bc34a]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-file-text"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-gray-700">
                A copy of your contractor invoice showing itemized work and
                costs
              </p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-white rounded-md border border-[#e0f0d0]">
            <div className="mt-1 text-[#8bc34a]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-award"
              >
                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                <circle cx="12" cy="8" r="6"></circle>
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-gray-700">
                Manufacturer certification statements for qualifying equipment
              </p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-white rounded-md border border-[#e0f0d0]">
            <div className="mt-1 text-[#8bc34a]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-home"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-gray-700">
                A record of the installation date and property address
              </p>
            </div>
          </div>
        </div>
        <p className="text-gray-700 mt-4">
          Your Ciel Home Performance Consultant or project manager can help
          provide documentation upon request.
        </p>
      </div>
      <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-circle-help text-[#8bc34a]"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <path d="M12 17h.01"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">Need Help?</h3>
        </div>
        <p className="text-gray-700 mb-4">
          While Ciel can help identify which upgrades typically qualify, we
          recommend speaking with your tax professional about your personal
          situation and eligibility.
        </p>
      </div>
      <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-triangle-alert text-[#8bc34a]"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">Disclaimer</h3>
        </div>
        <p className="text-gray-700 italic">
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
