import React from "react";

const page = () => {
  return (
    <div className="flex-1 overflow-auto p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">About Ciel Power</h1>
      <p className="text-gray-600 mb-6">
        Partnering with you to make homes healthier, more comfortable, and
        better for the planet.
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
            className="lucide lucide-home text-[#8bc34a]"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">Our Mission</h3>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            At Ciel Power, we believe your home should support the way you live
            — every season, every day. Since 2010, we&apos;ve worked alongside
            New Jersey homeowners to deliver thoughtful, high-impact
            improvements that make homes more comfortable, more efficient, and
            more resilient for the long term.
          </p>
          <p className="text-gray-700">
            We&apos;re not here to push products. We&apos;re here to listen,
            assess, and help you take smart steps toward a better-performing
            home — and we&apos;re honored to be part of your journey.
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
            className="lucide lucide-heart text-[#8bc34a]"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">
            Why We Do This Work
          </h3>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            Every home has room to perform better. Whether it&apos;s a drafty
            hallway, high utility bills, or an aging HVAC system, most homes are
            doing more work than they need to — and costing more in the process.
          </p>
          <p className="text-gray-700 font-medium">We exist to change that.</p>
          <p className="text-gray-700">
            Our team is trained to look beneath the surface — to uncover
            what&apos;s really going on in your home&apos;s energy systems and
            help you prioritize improvements that make a meaningful difference.
            The result? A home that works better, feels better, and costs less
            to operate.
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
            className="lucide lucide-history text-[#8bc34a]"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <path d="M12 7v5l4 2"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">
            Where We&apos;ve Been
          </h3>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            Since opening our doors in 2010, we&apos;ve grown into one of New
            Jersey&apos;s leading residential energy efficiency providers,
            proudly delivering home energy audits and performance upgrades
            across dozens of communities.
          </p>
          <p className="text-gray-700">
            Along the way, we&apos;ve built strong relationships with
            homeowners, utility providers, and municipalities — and we&apos;ve
            stayed focused on one thing: helping people live better in the homes
            they already have.
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
            className="lucide lucide-trophy text-[#8bc34a]"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">
            Milestones We&apos;re Proud Of
          </h3>
        </div>
        <div className="space-y-4">
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
                  className="lucide lucide-award"
                >
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                  <circle cx="12" cy="8" r="6"></circle>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  ENERGY STAR® Sustained Excellence Award
                </p>
                <p className="text-gray-600 mt-1">
                  The ENERGY STAR Partner of the Year – Sustained Excellence
                  Award is the highest honor within the ENERGY STAR program,
                  recognizing organizations that have consistently demonstrated
                  superior leadership, innovation, and commitment to
                  environmental protection through energy efficiency, and have
                  already received ENERGY STAR Partner of the Year recognition
                  for a minimum of two consecutive years.
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
                  className="lucide lucide-award"
                >
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                  <circle cx="12" cy="8" r="6"></circle>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  ENERGY STAR® Contractor of the Year (2019, 2020, 2021, &amp;
                  2023)
                </p>
                <p className="text-gray-600 mt-1">
                  Honored by the U.S. EPA and Department of Energy for
                  excellence in home performance and energy savings.
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
                  className="lucide lucide-award"
                >
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                  <circle cx="12" cy="8" r="6"></circle>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Top 10 Contractor in PSE&amp;G&apos;s Energy Efficiency
                  Program (2023)
                </p>
                <p className="text-gray-600 mt-1">
                  Recognized for completing hundreds of successful home energy
                  projects with measurable savings.
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
                  className="lucide lucide-award"
                >
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                  <circle cx="12" cy="8" r="6"></circle>
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Municipal Partnerships Across NJ
                </p>
                <p className="text-gray-600 mt-1">
                  Collaborated with cities like Princeton, Milburn, Summit and
                  Madison to bring energy audits and efficiency education
                  directly to local communities.
                </p>
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
            className="lucide lucide-lightbulb text-[#8bc34a]"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">
            Sustainability in Action
          </h3>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            Ciel Power is proud to be a member of the New Jersey Sustainable
            Business Registry and the New Jersey Sustainable Business Council.
            We don&apos;t just talk about environmental responsibility — we live
            it, every day.
          </p>
          <p className="text-gray-700">
            From the materials we recommend to the systems we install, our goal
            is always to help your home do more with less — lowering energy use
            while improving comfort and indoor air quality.
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
            className="lucide lucide-newspaper text-[#8bc34a]"
          >
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
            <path d="M18 14h-8"></path>
            <path d="M15 18h-5"></path>
            <path d="M10 6h8v4h-8V6Z"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-700">
            Press &amp; Recognition
          </h3>
        </div>
        <p className="text-gray-700 mb-4">We&apos;ve been featured by:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-5 border border-[#e0f0d0] flex items-center justify-center">
            <p className="text-gray-700 font-medium">New York Times</p>
          </div>
          <div className="bg-white rounded-lg p-5 border border-[#e0f0d0] flex items-center justify-center">
            <p className="text-gray-700 font-medium">ABC World News</p>
          </div>
          <div className="bg-white rounded-lg p-5 border border-[#e0f0d0] flex items-center justify-center">
            <p className="text-gray-700 font-medium">Good Morning America</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
