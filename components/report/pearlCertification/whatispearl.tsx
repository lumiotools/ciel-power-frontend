export default function WhatIsPearl() {
  return (
    <div className="bg-white max-h-fit p-8" id="pearl-what-is-content">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: "url('/image 93.png')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              role="img"
              aria-label="House pearl icon"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#67b502]">
            What is Pearl Certification?
          </h1>
        </div>

        {/* Main Content Card */}
        <div className="border-2 border-gray-200 rounded-2xl p-8 bg-white shadow-sm">
          <div className="grid lg:grid-cols-3 gap-12 items-between justify-center">
            {/* Left Content */}
            <div className="space-y-6 col-span-2">
              <p className="text-[#444444] text-xl leading-relaxed">
                {
                  "Pearl Certification is an independent, third-party certification system that verifies your home's high-performing features — such as insulation, air sealing, HVAC upgrades, and other energy-efficient enhancements — and translates them into clear value. It is the only residential certification firm approved by the "
                }
                <span className="text-[#67b502] font-semibold">
                  {
                    "U.S. Department of Energy's Home Performance with ENERGY STAR® program"
                  }
                </span>{" "}
                {
                  "and recognized by real estate and appraisal organizations across the country."
                }
              </p>

              <p className="text-[#444444] text-lg leading-relaxed">
                {
                  "Through a detailed review of your completed upgrades, Pearl creates a certification package that you can use to track your home's performance and demonstrate its increased value at resale."
                }
              </p>
            </div>

            {/* Right Certification Materials Mockup - Using background image div instead of img */}
            <div className="relative h-[400px] md:h-[300px]">
              <div
                className="w-full h-full rounded-lg shadow-lg"
                style={{
                  backgroundImage: "url('/image 91.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                role="img"
                aria-label="Pearl Certification Materials"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
