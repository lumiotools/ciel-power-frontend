"use client";
import ReportOverviewSectionAboutUs from "./about";
import ReportOverviewSectionGoals from "./goals";
import NotesSection from "@/components/admin/notes-section";
import IntroSection from "./intro";
import ContentsSection from "./content";
import AchievementsSection from "./achievements";
import SustainabilitySection from "./sustainability";
import EnergySolutionsSection from "./energy-solutions";
import BuildingScienceSection from "./houseSystem";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ReportOverviewSection = () => {
  const [isUser, setIsUser] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("/dashboard/report")) {
      setIsUser(true);
    }
  }, [pathname]);
  return (
    <div className="container mx-auto">
      <NotesSection />
      <IntroSection />
      <ContentsSection />
      <hr
        className={`border-gray-200 ${isUser ? "w-full hidden" : "w-[97vw]"} border my-4`}
      />
      <ReportOverviewSectionGoals />
      <hr
        className={`border-gray-200 ${isUser ? "w-full" : "w-[97vw]"} border my-4`}
      />
      <ReportOverviewSectionAboutUs />
      <hr
        className={`border-gray-200 ${isUser ? "w-full" : "w-[97vw]"} border my-4`}
      />
      <AchievementsSection />
      {/* <ReportOverviewSectionProgram /> */}
      <hr
        className={`border-gray-200 ${isUser ? "w-full" : "w-[97vw]"} border my-4`}
      />
      <SustainabilitySection />
      <hr
        className={`border-gray-200 ${isUser ? "w-full" : "w-[97vw]"} border my-4`}
      />
      <EnergySolutionsSection />
      <hr
        className={`border-gray-200 ${isUser ? "w-full" : "w-[97vw]"} border my-4`}
      />
      <BuildingScienceSection />
    </div>
  );
};

export default ReportOverviewSection;
