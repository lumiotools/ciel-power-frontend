import React from "react";

import Image from "next/image";
const page = () => {
  return (
    <div className="flex-1 overflow-auto p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Knowledge Base</h1>
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">Services by Categories</h2>
        <div className="mb-10">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Boost Comfort
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  alt="Attic Insulation"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="w-full h-full object-cover"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AtticInsultation-M777EtgxKH9vbEcojvRRm4Ry1DGpMY.png"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[#8bc34a] font-medium">
                    Attic Insulation
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Keeps your home warmer in winter and cooler in summer
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  alt="Exterior Wall Insulation"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="w-full h-full object-cover"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AtticInsultation-M777EtgxKH9vbEcojvRRm4Ry1DGpMY.png"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[#8bc34a] font-medium">
                    Exterior Wall Insulation
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Reduce heat loss in winter and heat gain in summer
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  alt="Rim Joist Insulation"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="w-full h-full object-cover"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AtticInsultation-M777EtgxKH9vbEcojvRRm4Ry1DGpMY.png"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[#8bc34a] font-medium">
                    Rim Joist Insulation
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Seals the gaps where your foundation meets the frame
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  alt="Crawl Space Encapsulation"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="w-full h-full object-cover"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AtticInsultation-M777EtgxKH9vbEcojvRRm4Ry1DGpMY.png"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[#8bc34a] font-medium">
                    Crawl Space Encapsulation
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Encapsulation offers numerous benefits, including improved air
                  quality
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h3 className="mb-4 text-xl font-medium text-gray-700">
            Efficient Heating Solutions
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Professional Audit */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="h-40 overflow-hidden">
                <Image
                  alt="Professional Audit"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="object-cover w-full h-full"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ProfessionalAudit-ZIzxlcePCZaSCQIf1M1Eu93x4U1avu.png"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#8bc34a]">
                    Professional Audit
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2" // Correct attribute name is strokeWidth in JSX for SVG
                    strokeLinecap="round" // Correct attribute name is strokeLinecap
                    strokeLinejoin="round" // Correct attribute name is strokeLinejoin
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Cut energy costs with a professional audit
                </p>
              </div>
            </div>

            {/* Card 2: Solar Panels */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="h-40 overflow-hidden">
                <img
                  alt="Solar Panels Electrification"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1" // Note: data-nimg is specific to Next.js Image Optimization
                  className="object-cover w-full h-full"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SolarPanel-IuB0nWX6GZpUSMuOo4318uLWi9VFzN.png"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#8bc34a]">
                    Solar Panels Electrification
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Electrifying home is a smart way to lower household energy
                  consumption
                </p>
              </div>
            </div>

            {/* Card 3: Heat Pump */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="h-40 overflow-hidden">
                <img
                  alt="Heat Pump Installations"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="object-cover w-full h-full"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ProfessionalAudit-ZIzxlcePCZaSCQIf1M1Eu93x4U1avu.png" // Note: Same image as Card 1?
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#8bc34a]">
                    Heat Pump Installations
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Upgrade traditional steam systems with the latest technology
                </p>
              </div>
            </div>

            {/* Card 4: AC Installation */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="h-40 overflow-hidden">
                <img
                  alt="AC Installation and Setup"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="object-cover w-full h-full"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ACInstallation-u5VzIpWJ0B0bA9HZ9IBYDETsnbROrn.png"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font- Rmedium text-[#8bc34a]">
                    AC Installation and Setup
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Experience the best in cooling with our top-notch AC
                  installation services
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="mb-10">
          <h3 className="mb-4 text-xl font-medium text-gray-700">
            Efficient Heating Solutions
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Professional Audit */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="h-40 overflow-hidden">
                <Image
                  alt="Professional Audit"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="object-cover w-full h-full"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ProfessionalAudit-ZIzxlcePCZaSCQIf1M1Eu93x4U1avu.png"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#8bc34a]">
                    Professional Audit
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2" // Correct attribute name is strokeWidth in JSX for SVG
                    strokeLinecap="round" // Correct attribute name is strokeLinecap
                    strokeLinejoin="round" // Correct attribute name is strokeLinejoin
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Cut energy costs with a professional audit
                </p>
              </div>
            </div>

            {/* Card 2: Solar Panels */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="h-40 overflow-hidden">
                <img
                  alt="Solar Panels Electrification"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1" // Note: data-nimg is specific to Next.js Image Optimization
                  className="object-cover w-full h-full"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SolarPanel-IuB0nWX6GZpUSMuOo4318uLWi9VFzN.png"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#8bc34a]">
                    Solar Panels Electrification
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Electrifying home is a smart way to lower household energy
                  consumption
                </p>
              </div>
            </div>

            {/* Card 3: Heat Pump */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="h-40 overflow-hidden">
                <img
                  alt="Heat Pump Installations"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="object-cover w-full h-full"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ProfessionalAudit-ZIzxlcePCZaSCQIf1M1Eu93x4U1avu.png" // Note: Same image as Card 1?
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#8bc34a]">
                    Heat Pump Installations
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Upgrade traditional steam systems with the latest technology
                </p>
              </div>
            </div>

            {/* Card 4: AC Installation */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="h-40 overflow-hidden">
                <img
                  alt="AC Installation and Setup"
                  loading="lazy"
                  width="300"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="object-cover w-full h-full"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ACInstallation-u5VzIpWJ0B0bA9HZ9IBYDETsnbROrn.png"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font- Rmedium text-[#8bc34a]">
                    AC Installation and Setup
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right text-[#8bc34a]"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Experience the best in cooling with our top-notch AC
                  installation services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
