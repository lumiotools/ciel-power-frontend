"use client";

import { useState } from "react";
import Image from "next/image";

export default function EnergySolutionsSection() {
  const [activeTab, setActiveTab] = useState("nj");

  const includedServices = [
    {
      name: "Insulation Upgrades",
      icon: <img src="/image 69.png" alt="" className="w-16 h-16" />,
    },
    {
      name: "Heating Systems",
      icon: <img src="/image 68.png" alt="" className="w-16 h-16" />,
    },
    {
      name: "Oil-to-Gas Conversions",
      icon: <img src="/image 67.png" alt="" className="w-16 h-16" />,
    },
    {
      name: "Air Conditioning Systems",
      icon: <img src="/image 66.png" alt="" className="w-16 h-16" />,
    },
    {
      name: "Air Sealing",
      icon: <img src="/image 65.png" alt="" className="w-16 h-16" />,
    },
    {
      name: "Hot water Systems",
      icon: <img src="/image 64.png" alt="" className="w-16 h-16" />,
    },
    {
      name: "Crawlspace Encapsulation",
      icon: <img src="/image 63.png" alt="" className="w-16 h-16" />,
    },
    {
      name: "Health & safety Concerns",
      icon: <img src="/image 62.png" alt="" className="w-16 h-16" />,
    },
  ];

  return (
    <section className="w-full mt-4 pb-4 px-4">
      <div className="w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2fabe2] mb-10">
          Whole Home Energy Solutions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Program Details Card */}
          <div className="rounded-lg border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-[#333333] mb-4">
              The 2025 Whole Home Energy Solutions program is offering:
            </h3>

            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li className="text-lg">
                up to <span className="font-bold">$6,000</span> worth of{" "}
                <span className="font-bold">cash-back incentives</span>
              </li>
              <li className="text-lg">
                up to <span className="font-bold">$25,000</span> worth of{" "}
                <span className="font-bold">zero-interest financing*</span>
              </li>
            </ul>

            <div className="text-center mb-4">
              <h4 className="text-2xl font-semibold text-[#2fabe2] mb-2">
                Save Money on Monthly
              </h4>
              <h4 className="text-2xl font-semibold text-[#2fabe2] mb-6">
                Utility Costs
              </h4>
              <p className="text-gray-500 mb-4">Monthly Cost Sample</p>
            </div>

            <div className="h-64 relative">
              <Image
                src="/image 59.png"
                alt="Monthly utility cost comparison"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Incentives Card */}
          <div className="rounded-lg border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-36 h-36 relative flex-shrink-0">
                <Image
                  src="/image 55.png"
                  alt="New Jersey"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-[#2fabe2]">
                  New Jersey Incentives
                </h3>
                <p className="text-[#333333] text-xl">
                  New Jersey's regional utility companies are offering cash-back
                  and financing incentives to New Jersey homeowners to install
                  upgrades!
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Cash-Back Incentives */}
              <div className="flex gap-4">
                <div className="w-36 h-36 relative flex-shrink-0">
                  <Image
                    src="/image 56.png"
                    alt="image 56"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <h4 className="text-3xl font-semibold text-[#2fabe2] mb-1">
                    Cash-Back Incentives
                  </h4>
                  <p className="text-[#333333] text-xl">
                    5% or greater projected energy savings: $2,000 plus $200 for
                    each additional percentage point up to 25% or $6,000
                  </p>
                  <p className="text-md text-gray-600 italic">
                    Cash-back rebate can not exceed 50% of the project's cost
                  </p>
                </div>
              </div>

              {/* Financing Incentives */}
              <div className="flex gap-4">
                <div className="w-36 h-36 relative flex-shrink-0">
                  <Image
                    src="/image 57.png"
                    alt="Financing Incentives"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <h4 className="text-3xl font-semibold text-[#2fabe2] mb-1">
                    Financing Incentives
                  </h4>
                  <p className="text-[#333333] text-xl">
                    Over 5% or greater projected savings:
                  </p>
                  <p className="text-[#333333] text-xl">
                    Up to $10,000 0% Interest (7 yr term)
                  </p>
                  <p className="text-[#333333] text-xl">
                    Up to $25,000 0% Interest (10 yr term)
                  </p>
                  <p className="text-md text-gray-600 italic mt-2">
                    *available to qualified borrowers (7 or 10 year term)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="rounded-lg border border-gray-200 p-6 md:p-8 mb-8">
          <h3 className="text-3xl font-semibold text-[#2fabe2] text-center mb-8">
            What's Included?
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
            {includedServices.map((service, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-lg py-10 px-8 flex flex-col items-center text-center"
              >
                <div className="mb-4">{service.icon}</div>
                <h4 className="text-2xl font-medium text-[#333333]">
                  {service.name}
                </h4>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-3xl font-semibold text-[#2fabe2] text-center mb-4">
              Benefits of Participation
            </h3>
            <p className="text-xl text-center">
              <span className="text-black font-medium">Comfort</span> •{" "}
              <span className="text-black font-medium">Durability</span> •{" "}
              <span className="text-black font-medium">Safety</span> •{" "}
              <span className="text-black font-medium">Efficiency</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
