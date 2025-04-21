"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wind, Snowflake, Home, Thermometer } from "lucide-react";

export function ReportOverviewSectionHouseSystem() {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);

  const systems = [
    {
      id: "ventilation",
      icon: Wind,
      title: "Ventilation",
      description:
        "Proper ventilation is necessary to exhaust moisture & exhaust gasses from the home",
      color: "text-[#824EA0]",
      bgColor: "bg-teal-400",
      position: "top",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ventilation-PA6NMrGZ5x4U0pafNsCIZG7fiN92nn.png",
    },
    {
      id: "cooling",
      icon: Snowflake,
      title: "Air-Conditioning",
      description:
        "Air conditioning systems struggle to cool poorly insulated areas",
      color: "text-[#824EA0]",
      bgColor: "bg-blue-400",
      position: "middle",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Air-Conditioning-iJtZH8EDlLgX3B7fiiHEpp9Yl3eycy.png",
    },
    {
      id: "building-shell",
      icon: Home,
      title: "Building Shell",
      items: [
        "Air Leakage",
        "Foundation",
        "Wall Insulation",
        "Attic Insulation",
        "Buffered Walls",
      ],
      color: "text-[#824EA0]",
      bgColor: "bg-orange-400",
      position: "bottom",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Building%20Shell-jvo6rrtlqmOmoi61jdoLSM6BUPmTPB.png",
    },
    {
      id: "heating",
      icon: Thermometer,
      title: "Heating System",
      description:
        "More energy is consumed in poorly insulated homes as the heating system fires more frequently",
      color: "text-[#824EA0]",
      bgColor: "bg-yellow-400",
      position: "middle",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Heating%20System-wEY5AzBbc9KOMvGptScYLvQ6Y6aDji.png",
    },
  ];

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden"
      id="house-system"
    >
      <div className="p-5" style={{ backgroundColor: "#824EA01A" }}>
        <h2 className="font-medium" style={{ color: "#824EA0" }}>
          Building Science: A &quot;House as a System&quot; Approach
        </h2>
      </div>
      <div className="p-5">
        {/* Wrap the text in its own container with margin-bottom */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-600 text-sm max-w-3xl"
          >
            You understand that your car is made up of interacting components
            and systems– when one component fails, it affects the performance of
            the entire vehicle. Do you know that the same goes for your house?
            If one system has a problem, it impacts the other systems&apos;
            ability to function properly.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mt-8">
          {/* Left side - System List */}
          <div className="flex flex-col gap-3 w-full lg:w-2/5 max-w-md">
            {systems.map((system, index) => (
              <motion.button
                key={system.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  activeSystem === system.id
                    ? "text-[#824EA0]"
                    : "hover:bg-gray-50"
                }`}
                style={
                  activeSystem === system.id
                    ? { backgroundColor: "#824EA01A" }
                    : {}
                }
                onMouseEnter={() => setActiveSystem(system.id)}
                onMouseLeave={() => setActiveSystem(null)}
                whileHover={{ x: 10 }}
                id={`o72mm6_${index}`}
              >
                <system.icon
                  className={`h-6 w-6`}
                  style={{ color: "#824EA0" }}
                  id={`8nopst_${index}`}
                />

                <span className={`text-sm font-medium`} id={`bt9vsg_${index}`}>
                  {system.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right side - House Diagram */}
          <div className="relative w-full lg:w-3/5 aspect-[4/3] max-w-[450px] flex items-center justify-center mt-8 lg:mt-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={
                  activeSystem
                    ? systems.find((s) => s.id === activeSystem)?.image || ""
                    : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Empty%20State-0YuhsvH0fSOuhb0nQzMAOKmViWjHBi.png"
                }
                alt="House System Diagram"
                className="transition-opacity duration-300 object-contain"
              />

              <map name="house-map">
                <area
                  shape="poly"
                  coords="50,50,350,50,350,150,50,150"
                  alt="Ventilation"
                  onMouseEnter={() => setActiveSystem("ventilation")}
                  onMouseLeave={() => setActiveSystem(null)}
                  style={{
                    cursor: "pointer",
                    fill:
                      activeSystem === "ventilation"
                        ? "#67B502"
                        : "transparent",
                    fillOpacity: "0.2",
                  }}
                />

                <area
                  shape="poly"
                  coords="50,150,350,150,350,250,50,250"
                  alt="Cooling"
                  onMouseEnter={() => setActiveSystem("cooling")}
                  onMouseLeave={() => setActiveSystem(null)}
                  style={{
                    cursor: "pointer",
                    fill:
                      activeSystem === "cooling" ? "#67B502" : "transparent",
                    fillOpacity: "0.2",
                  }}
                />

                <area
                  shape="poly"
                  coords="50,250,350,250,350,350,50,350"
                  alt="Building Shell"
                  onMouseEnter={() => setActiveSystem("building-shell")}
                  onMouseLeave={() => setActiveSystem(null)}
                  style={{
                    cursor: "pointer",
                    fill:
                      activeSystem === "building-shell"
                        ? "#67B502"
                        : "transparent",
                    fillOpacity: "0.2",
                  }}
                />
              </map>
            </div>
            {/* System details overlay */}
            {activeSystem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-sm max-w-sm mx-2 border border-gray-100">
                  <h3
                    className="font-medium text-sm mb-3"
                    style={{ color: "#824EA0" }}
                  >
                    {systems.find((s) => s.id === activeSystem)?.title}
                  </h3>
                  {systems.find((s) => s.id === activeSystem)?.items ? (
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                      {systems
                        .find((s) => s.id === activeSystem)
                        ?.items?.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">
                      {systems.find((s) => s.id === activeSystem)?.description}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
