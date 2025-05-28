"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, AlertTriangle, FileText } from "lucide-react";
import { usePathname } from "next/navigation";

interface ContentItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

export default function ContentsSection() {
  const [isUser, setIsUser] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("/dashboard/report")) {
      setIsUser(true);
    }
  }, [pathname]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const contentItems: ContentItem[] = [
    {
      id: "introduction",
      title: "Introduction & Goals",
      icon: <ChevronRight className="w-9 h-9 text-white" />,
      color: "bg-[#818287]",
    },
    {
      id: "nj-home-performance",
      title: "NJ Home Performance",
      icon: (
        <div className="flex items-center justify-center">
          <img src="/image 10.png" alt="nj" className="scale-125" />
        </div>
      ),
      color: "",
    },
    {
      id: "building-science",
      title: "Building Science",
      icon: <img src="/image 11.png" alt="science" className="scale-125" />,
      color: "",
    },
    {
      id: "air-flow",
      title: "Air Flow Rates in Your Home",
      icon: (
        <img
          src="/image 12.png"
          alt="air-flow"
          className={`${isUser ? "scale-125 ml-1" : "scale-125"}`}
        />
      ),
      color: "",
    },
    {
      id: "insulation",
      title: "Insulation in Your Home",
      icon: <img src="/image 13.png" alt="insulation" className="scale-125" />,
      color: "",
    },
    {
      id: "mechanical-systems",
      title: "Mechanical Systems in Your Home",
      icon: <img src="/image 14.png" alt="mech" className="scale-125" />,
      color: "",
    },
    {
      id: "concerns",
      title: "Concerns",
      icon: <AlertTriangle className="w-8 h-8 text-white" />,
      color: "bg-[#ff6700]",
    },
    {
      id: "solutions",
      title: "Solutions & Impact",
      icon: <img src="/image 16.png" alt="file" className="scale-125" />,
      color: "",
    },
  ];

  return (
    <section
      className="w-full border-b border-gray-200 -ml-10"
      id="intro-header"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {/* Left side - House image */}
        <div
          className={`${isUser ? "relative top-0 left-0 w-full h-[700px] overflow-hidden" : "relative w-full h-[400px] md:h-auto overflow-hidden"}`}
        >
          <Image
            src="/image 15.png"
            alt="House exterior"
            fill
            className="object-contain rounded-xl"
            priority
          />
        </div>

        {/* Right side - Contents */}
        <div className={`${isUser ? "p-8 md:p-4" : "p-8 md:p-12"}`}>
          <h2 className="text-4xl font-bold text-[#818287] mb-8">Contents</h2>

          <nav className="space-y-6">
            {contentItems.map((item) => (
              <div key={item.id} className="flex items-center gap-6 group">
                <div
                  className={`${item.color} w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-xl font-medium ${
                    activeSection === item.id ? "text-black" : "text-[#545454]"
                  } group-hover:text-black transition-colors`}
                >
                  {item.title === "Mechanical Systems in Your Home" ? (
                    <span className="-mr-32">{item.title}</span>
                  ) : (
                    item.title
                  )}
                </span>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
