import Image from "next/image";
import { Home, Thermometer, Snowflake, Wind, Atom } from "lucide-react";

export default function BuildingScienceSection() {
  const homeSystems = [
    {
      name: "Building Shell",
      icon: <Home className="w-6 h-6 text-white" />,
      color: "bg-[#ff6700]",
      textColor: "text-[#ff6700]",
    },
    {
      name: "Heating System",
      icon: <Thermometer className="w-6 h-6 text-white" />,
      color: "bg-[#fec127]",
      textColor: "text-[#fec127]",
    },
    {
      name: "Air-Conditioning",
      icon: <Snowflake className="w-6 h-6 text-white" />,
      color: "bg-[#2fabe2]",
      textColor: "text-[#2fabe2]",
    },
    {
      name: "Ventilation",
      icon: <Wind className="w-6 h-6 text-white" />,
      color: "bg-[#43c0b9]",
      textColor: "text-[#43c0b9]",
    },
  ];

  return (
    <section className="w-full mt-4 pb-4 px-4">
      <div className="w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#824ea0] mb-10">
          Building Science
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* House as a System Card */}
          <div className="rounded-lg border border-gray-200 p-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#824ea0] mb-6">
              A "House of a System" Approach
            </h3>

            <blockquote className="text-gray-700 italic mb-8 leading-relaxed">
              "You understand that your car is made up of interacting components
              and systems – when one component fails, it affects the performance
              of the entire vehicle. Do you know that the same goes for your
              house? If one system has a problem, it impacts the other systems'
              ability to function properly."
              <footer className="text-gray-600 mt-2 italic text-right font-semibold">
                —Building Performance Institute
              </footer>
            </blockquote>

            <div className="space-y-4 mt-20">
              {homeSystems.map((system, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`${system.color} w-12 h-12 rounded-full flex items-center justify-center`}
                  >
                    {system.icon}
                  </div>
                  <span
                    className={`${system.textColor} text-lg md:text-3xl font-semibold`}
                  >
                    {system.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Systems of your Home Card */}
          <div className="rounded-lg border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#824ea0] rounded-full flex items-center justify-center">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#824ea0]">
                The Systems of your Home
              </h3>
            </div>

            <p className="text-gray-700 text-lg mb-8">
              Exploring how different systems in your home effect comfort,
              safety, and efficiency
            </p>

            <div className="flex justify-center">
              <div className="relative w-full h-64 md:h-96">
                <Image
                  src="/image 70.png"
                  alt="Home systems diagram"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
