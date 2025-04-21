import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSignIcon, HomeIcon, ShieldIcon, TrendingUpIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const ReportInsulationSectionBenefits = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
      <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-[#E0F7F5] py-4 px-5 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-[#256C68]">
            Benefits of Properly Installed Insulation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enhanced Comfort */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E0F7F5] flex items-center justify-center flex-shrink-0">
                  <HomeIcon className="h-4 w-4 text-[#00BFA5]" />
                </div>
                <h3 className="text-base font-medium text-[#00BFA5]">
                  Enhanced Comfort
                </h3>
              </div>
              <p className="text-gray-700 text-sm">
                Properly installed insulation minimizes temperature variability
                indoors and helps keep rooms warmer in the winter and cooler in
                the summer.
              </p>
            </div>

            {/* Better Resale Position */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E0F7F5] flex items-center justify-center flex-shrink-0">
                  <TrendingUpIcon className="h-4 w-4 text-[#00BFA5]" />
                </div>
                <h3 className="text-base font-medium text-[#00BFA5]">
                  Better Resale Position
                </h3>
              </div>
              <p className="text-gray-700 text-sm">
                The improved comfort, lower utility bills, and improved
                durability of a properly installed insulation barrier can
                translate into higher resale value compared to less efficient
                homes.
              </p>
            </div>

            {/* Lower Utility Bills */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E0F7F5] flex items-center justify-center flex-shrink-0">
                  <DollarSignIcon className="h-4 w-4 text-[#00BFA5]" />
                </div>
                <h3 className="text-base font-medium text-[#00BFA5]">
                  Lower Utility Bills
                </h3>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                As much as half of the energy used in your home goes to heating
                and cooling. By preventing heat loss in the winter and heat gain
                in the summer.
              </p>
              <div className="mt-auto">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Efficiency Impact</span>
                  <span className="text-[#256C68]">50%</span>
                </div>
                <Progress value={50} className="bg-[#44BFB83D] [&>div]:bg-[#44BFB8]" />
              </div>
            </div>

            {/* Improved Durability */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E0F7F5] flex items-center justify-center flex-shrink-0">
                  <ShieldIcon className="h-4 w-4 text-[#00BFA5]" />
                </div>
                <h3 className="text-base font-medium text-[#00BFA5]">
                  Improved Durability
                </h3>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                When insulation is properly installed, the potential for
                condensation that can lead to the decay of building materials is
                reduced, helping to improve the durability of your home.
              </p>
              <div className="mt-auto">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Efficiency Impact</span>
                  <span className="text-[#256C68]">35%</span>
                </div>
                <Progress value={35} className="bg-[#44BFB83D] [&>div]:bg-[#44BFB8]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReportInsulationSectionBenefits;
