import Image from "next/image";

export default function SustainabilitySection() {
  const energyPrograms = [
    {
      name: "Borough of Madison Home Energy Assessment",
      logo: "/image 30.png",
    },
    {
      name: "Energy Smart Rock Homes",
      logo: "/image 31.png",
    },
    {
      name: "Pascack Valley Home Energy Challenge",
      logo: "/image 32.png",
    },
    {
      name: "Westfield Home Energy Savings Program",
      logo: "/image 33.png",
    },
    {
      name: "Summit Home Energy Insight Program",
      logo: "/image 34.png",
    },
  ];

  return (
    <section className="w-full mt-4 pb-4 px-4" id="intro-sustainability">
      <div className="w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#818287] mb-10">
          Sustainability
        </h2>

        {/* Main Programs Card */}
        <div className="rounded-lg border border-gray-200 p-5 mb-6">
          <p className="text-xl md:text-2xl text-[#333333] mb-8">
            We are proud to be{" "}
            <span className="text-[#67b502] font-semibold">
              the official Home Energy Assessment Provider
            </span>{" "}
            of the following Home Energy Assessment campaigns. We plant a tree
            for every audit we perform...{" "}
            <span className="text-[#67b502] font-semibold">
              2500+ trees and counting!
            </span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            {energyPrograms.map((program, index) => (
              <div key={index} className="h-32 relative">
                <Image
                  src={program.logo || "/placeholder.svg"}
                  alt={program.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NJ Sustainable Business Registry Card */}
          <div className="rounded-lg border border-gray-200 p-3 flex flex-col items-center text-center">
            <div className="h-40 w-96 relative mb-6">
              <Image
                src="/image 35.png"
                alt="NJ Sustainable Business Registry"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-3xl text-[#333333]">
              We are proud to be a part of the NJ
              <br />
              Sustainable Business Registry
            </p>
          </div>

          {/* TreeEra Card */}
          <div className="rounded-lg border border-gray-200 p-3 flex flex-col items-center text-center">
            <div className="h-40 w-96 relative mb-6">
              <Image
                src="/image 36.png"
                alt="TreeEra"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-3xl text-[#333333]">
              We plant a tree for every audit we perform...
              <br />
              <span className="text-[#67b502] font-semibold">
                2500+ trees and counting!
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
