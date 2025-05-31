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
import { motion } from "framer-motion";

const ReportOverviewSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container bg-[#eaeaea]"
      id="intro-header"
    >
      <div className="min-h-screen flex flex-col items-center justify-center">
        <NotesSection />
        <IntroSection />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <ContentsSection />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <ReportOverviewSectionGoals />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ReportOverviewSectionAboutUs />
        <AchievementsSection />
        <SustainabilitySection />
      </div>
      <div className="min-h-screen flex items-center justify-center mt-52">
        <EnergySolutionsSection />
      </div>
      <div className="min-h-screen flex items-center justify-center mt-52">
        <BuildingScienceSection />
      </div>
    </motion.div>
  );
};

export default ReportOverviewSection;
