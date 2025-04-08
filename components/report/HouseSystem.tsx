"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Wind, Thermometer, Snowflake } from "lucide-react";

export function HouseSystem() {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);

  const systems = [
    {
      id: "ventilation",
      icon: Wind,
      title: "Ventilation",
      description:
        "Proper ventilation is necessary to exhaust moisture & exhaust gasses from the home",
      color: "text-teal-500",
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
      color: "text-blue-500",
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

      color: "text-orange-500",
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
      color: "text-yellow-500",
      bgColor: "bg-yellow-400",
      position: "middle",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Heating%20System-wEY5AzBbc9KOMvGptScYLvQ6Y6aDji.png",
    },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-50 dark:bg-lime-500/50 pb-6">
        <CardTitle className="text-2xl text-black dark:text-green-200">
          Building Science: A &quot;House as a System&quot; Approach
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-300 mb-4 w-full"
        >
          You understand that your car is made up of interacting components and
          systems– when one component fails, it affects the performance of the
          entire vehicle. Do you know that the same goes for your house? If one
          system has a problem, it impacts the other systems&apos; ability to
          function properly.
        </motion.p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Left side - System List */}
          <div className="flex flex-col gap-3 w-full lg:w-1/3 max-w-md">
            {systems.map((system, index) => (
              <motion.button
                key={system.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  activeSystem === system.id
                    ? "bg-green-50 text-lime-500 dark:bg-lime-500/50 dark:text-lime-400"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onMouseEnter={() => setActiveSystem(system.id)}
                onMouseLeave={() => setActiveSystem(null)}
                whileHover={{ x: 10 }}
                id={`o72mm6_${index}`}
              >
                <system.icon
                  className={`h-6 w-6 ${
                    activeSystem === system.id
                      ? "text-lime-500"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  id={`8nopst_${index}`}
                />

                <span
                  className={`text-base font-medium`}
                  id={`bt9vsg_${index}`}
                >
                  {system.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right side - House Diagram */}
          <div className="relative w-full lg:w-2/3 aspect-[4/3] max-w-[500px] flex items-center justify-center">
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
                <div className="bg-green-50/95 dark:bg-lime-500/95 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-sm mx-2">
                  <h3 className="font-semibold text-base mb-3 text-lime-500 dark:text-lime-200">
                    {systems.find((s) => s.id === activeSystem)?.title}
                  </h3>
                  {systems.find((s) => s.id === activeSystem)?.items ? (
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      {systems
                        .find((s) => s.id === activeSystem)
                        ?.items?.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  ) : (
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {systems.find((s) => s.id === activeSystem)?.description}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
