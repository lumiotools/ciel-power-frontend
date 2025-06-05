"use client";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const ReportAirLeakageSectionAirFlowRate = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      {...fadeInUp}
      id="air-flow-rates"
      className="bg-white max-h-fit p-8 border-t border-gray-200"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#031a82" }}>
        Understanding Air Flow Rates
      </h1>

      {/* Content Container */}
      <div className="bg-[#ffffff] rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="max-w-[70%] pr-8">
            <p className="text-gray-900 leading-relaxed text-base mb-6">
              35% of the air in your home should exhaust each hour to maintain
              healthy ventilation. <br />
              Airflow rates above these levels create excessive strain on
              heating & cooling systems.
            </p>
            <div className="flex items-center">
              <div className="w-48 h-3 bg-gray-200 rounded-md overflow-hidden mr-4">
                <Progress
                  className="h-full bg-[#031A821A] [&>div]:bg-[#031A82]"
                  value={35}
                />
              </div>
              <span className="text-[#031A82] font-semibold text-base">
                Recommended: 35%
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4 mt-4 md:mt-0">
            <svg
              width="144"
              height="115"
              viewBox="0 0 121 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M63.4165 85.3334C64.2616 85.9672 65.2452 86.3911 66.2862 86.5702C67.3273 86.7493 68.396 86.6784 69.4043 86.3635C70.4126 86.0485 71.3316 85.4984 72.0856 84.7586C72.8396 84.0188 73.407 83.1104 73.7411 82.1082C74.0751 81.1061 74.1662 80.0389 74.0069 78.9947C73.8476 77.9504 73.4424 76.9589 72.8248 76.102C72.2071 75.245 71.3947 74.5471 70.4544 74.0658C69.5141 73.5844 68.4729 73.3334 67.4165 73.3334H27.4165"
                stroke="#031a82"
                strokeOpacity="1"
                strokeWidth="6.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M79.0832 46.6667C79.9355 45.5303 81.0641 44.6307 82.3618 44.0532C83.6596 43.4757 85.0835 43.2395 86.4982 43.367C87.9129 43.4946 89.2716 43.9817 90.4451 44.782C91.6187 45.5824 92.5681 46.6694 93.2034 47.9399C93.8387 49.2104 94.1386 50.6222 94.0747 52.0413C94.0109 53.4603 93.5854 54.8395 92.8386 56.0478C92.0918 57.2561 91.0485 58.2535 89.8079 58.9452C88.5672 59.6369 87.1703 60 85.7498 60H27.4165"
                stroke="#031a82"
                strokeOpacity="1"
                strokeWidth="6.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M53.4165 34.6667C54.2616 34.0329 55.2452 33.609 56.2862 33.4299C57.3273 33.2508 58.396 33.3216 59.4043 33.6366C60.4126 33.9516 61.3316 34.5016 62.0856 35.2415C62.8396 35.9813 63.407 36.8897 63.7411 37.8919C64.0751 38.894 64.1662 39.9612 64.0069 41.0054C63.8476 42.0497 63.4424 43.0412 62.8248 43.8981C62.2071 44.7551 61.3947 45.453 60.4544 45.9343C59.5141 46.4157 58.4729 46.6667 57.4165 46.6667H27.4165"
                stroke="#031a82"
                strokeOpacity="1"
                strokeWidth="6.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportAirLeakageSectionAirFlowRate;
