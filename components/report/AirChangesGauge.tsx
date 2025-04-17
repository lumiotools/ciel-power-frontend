import React, { useState, useEffect, JSX } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface AirChangeGaugeProps {
  value: number;
}

export const AirChangesGauge = ({ value }: AirChangeGaugeProps): JSX.Element => {
  const [displayedValue, setDisplayedValue] = useState(2);
  const [showContent, setShowContent] = useState(false);
  const achValue = value;

  useEffect(() => {
    setShowContent(true);
    const timer = setTimeout(() => {
      setDisplayedValue(achValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [achValue]);

  const calculateRotation = (value: number): number => {
    const minValue = 0;
    const maxValue = 2;
    const startAngle = 118.17;
    const endAngle = -55.32;
    
    const clampedValue = Math.max(minValue, Math.min(value, maxValue));
    
    const angleRange = startAngle - endAngle;
    const valuePercentage = clampedValue / maxValue;
    const rotation = startAngle - (angleRange * valuePercentage);
    
    return rotation;
  };

  const pointerRotation = calculateRotation(displayedValue);

  return (
    <Card className="border-none shadow-none">
      <CardContent className="flex flex-col h-[213px] items-center justify-between relative p-0 w-[431px]">
        <div className="flex flex-col w-[431px] items-center justify-center relative flex-[0_0_auto]">
          <div className="relative w-[391px] h-[209px]">
            <div className="relative w-[454px] h-[453px] top-[-18px] -left-8">
              <motion.div 
                className="relative pt-8 overflow-hidden"
                style={{ height: '240px' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.img
                  className="absolute w-[389px] h-[194px] top-8 left-[33px]"
                  alt="Ellipse stroke"
                  src="/ellipse-52--stroke-.svg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />

                <motion.img
                  className="absolute w-[206px] h-[103px] top-[124px] left-[124px]"
                  alt="Ellipse"
                  src="/ellipse-55.svg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />

                <div className="absolute w-[333px] h-[332px] top-[61px] left-[61px] rotate-[-30deg]">
                  <div className="relative w-[551px] h-[551px] top-[-109px] left-[-109px]">
                    <AnimatePresence>
                      {showContent && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="absolute w-[389px] h-[391px] top-20 left-[81px] rotate-[75deg]"
                          >
                            <img
                              className="absolute w-[275px] h-[275px] top-[58px] left-[57px] -rotate-45"
                              alt="Vector"
                              src="/vector-46-3.svg"
                            />
                            <div className="top-[-21px] left-[182px] absolute font-medium text-foundationsecondaryblackblack-300 text-base text-center tracking-[0] leading-[normal] font-['Poppins',Helvetica]">
                              0.5
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.3 }}
                            className="absolute w-[389px] h-[391px] top-20 left-[81px] rotate-[30deg]"
                          >
                            <div className="relative h-[411px] top-[-21px]">
                              <img
                                className="absolute w-[389px] h-[389px] top-[22px] left-0"
                                alt="Vector"
                                src="/vector-46-2.svg"
                              />
                              <div className="top-0 left-[184px] absolute font-medium text-foundationsecondaryblackblack-300 text-base text-center tracking-[0] leading-[normal] font-['Poppins',Helvetica]">
                                1.0
                              </div>
                            </div>
                          </motion.div>

                          <motion.div 
                            className="absolute w-[389px] h-[391px] top-20 left-[81px]"
                            initial={{ rotate: calculateRotation(2) }}
                            animate={{ rotate: pointerRotation }}
                            transition={{ delay: 0.6, duration: 1.5, ease: "easeInOut" }}
                          >
                            <div className="relative w-[466px] h-[466px] top-[-37px] left-[-38px]">
                              <div className="absolute w-[466px] h-[466px] top-0 left-0">
                                <img
                                  className="absolute w-[371px] h-[371px] top-[47px] left-[47px] rotate-[-17.55deg]"
                                  alt="Vector"
                                  src="/vector-46.svg"
                                />
                                <img
                                  className="absolute w-[318px] h-[318px] top-[102px] left-[74px] rotate-[-17.55deg]"
                                  alt="Vector"
                                  src="/vector-47.svg"
                                />
                              </div>
                              <motion.div 
                                className="top-4 left-[215px] absolute font-medium text-foundationsecondaryblackblack-300 text-base text-center tracking-[0] leading-[normal] font-['Poppins',Helvetica]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 0.3 }}
                              >
                                {/* {displayedValue.toFixed(2)} */}
                              </motion.div>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.3 }}
                            className="absolute w-[389px] h-[391px] top-20 left-[81px] rotate-90"
                          >
                            <img
                              className="absolute w-[337px] h-[337px] top-[27px] left-[26px] rotate-[-60deg]"
                              alt="Vector"
                              src="/vector-46-1.svg"
                            />
                            <div className="absolute top-[-21px] left-[177px] font-medium text-foundationsecondaryblackblack-300 text-base text-center tracking-[0] leading-[normal] font-['Poppins',Helvetica]">
                              0.35
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.3 }}
                            className="absolute w-[389px] h-[391px] top-20 left-[81px] rotate-[-55.32deg]"
                          >
                            <div className="absolute top-[-21px] left-[177px] font-medium text-foundationsecondaryblackblack-300 text-base text-center tracking-[0] leading-[normal] font-['Poppins',Helvetica]">
                              2.0+
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.3 }}
                            className="absolute w-[389px] h-[391px] top-20 left-[81px] rotate-[118.17deg] pt-4"
                          >
                            <div className="absolute top-[-21px] left-[189px] font-medium text-foundationsecondaryblackblack-300 text-base text-center tracking-[0] leading-[normal] font-['Poppins',Helvetica]">
                              0
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div 
          className="relative w-[174.41px] mt-[-45.02px] font-normal text-foundationsecondaryblackblack-300 text-base text-center tracking-[-0.32px] leading-[normal] font-['Poppins',Helvetica]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="font-medium text-[#031a82] tracking-[-0.05px]">
            Your Air Changes
          </span>
          <span className="text-[#545454] tracking-[-0.05px]">
            {" "}
            per Hour (ACH) is{" "}
          </span>
          <span className="font-medium text-[#031a82] tracking-[-0.05px]">
            {displayedValue.toFixed(2)}
          </span>
        </motion.div>
      </CardContent>
    </Card>
  );
};