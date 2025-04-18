"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface RValueGaugeProps {
  value: number
  minValue?: number
  maxValue?: number
  insulationZone?: string
  showCard?: boolean
  width?: string
  height?: string
}

export default function RValueGauge({
  value,
  minValue = 0,
  maxValue = 60,
  insulationZone = "Wall",
  showCard = true,
  width = "100%",
  height = "auto",
}: RValueGaugeProps) {
  const [displayedValue, setDisplayedValue] = useState(maxValue)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
    const timer = setTimeout(() => {
      setDisplayedValue(value)
    }, 500)
    return () => clearTimeout(timer)
  }, [value])

  const calculateRotation = (value: number): number => {
    // Define the angles for different R-values
    const angles = {
      0: 118.17,    // R0
      7: 90,        // R7
      15: 75,       // R15
      30: 30,       // R30
      60: -55.32    // R60+
    }
    
    // Find the two closest R-values
    const rValues = Object.keys(angles).map(Number)
    const lowerRValue = Math.max(...rValues.filter(r => r <= value))
    const upperRValue = Math.min(...rValues.filter(r => r >= value))
    
    // If value exactly matches a defined R-value, return its angle
    if (lowerRValue === upperRValue) {
      return angles[lowerRValue]
    }
    
    // Interpolate between the two angles
    const lowerAngle = angles[lowerRValue]
    const upperAngle = angles[upperRValue]
    const percentage = (value - lowerRValue) / (upperRValue - lowerRValue)
    
    return lowerAngle - ((lowerAngle - upperAngle) * percentage)
  }

  const pointerRotation = calculateRotation(displayedValue)

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="flex flex-col h-[213px] items-start justify-between relative p-0 w-[431px] bg-transparent">
        <div className="flex flex-col w-[431px] items-start justify-center relative flex-[0_0_auto]">
          <div className="relative w-[391px] h-[209px] -ml-20">
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
                  src="/inverted-ellipse.svg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />

                <motion.img
                  className="absolute w-[206px] h-[103px] top-[124px] left-[124px]"
                  alt="Ellipse"
                  src="/inverted-ellipse-dotted.svg"
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
                              R15
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
                                R30
                              </div>
                            </div>
                          </motion.div>

                          <motion.div 
                            className="absolute w-[389px] h-[391px] top-20 left-[81px]"
                            initial={{ rotate: calculateRotation(maxValue) }}
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
                                {/* R{displayedValue.toFixed(1)} */}
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
                              R7
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.3 }}
                            className="absolute w-[389px] h-[391px] top-20 left-[81px] rotate-[-55.32deg]"
                          >
                            <div className="absolute top-[-21px] left-[177px] font-medium text-foundationsecondaryblackblack-300 text-base text-center tracking-[0] leading-[normal] font-['Poppins',Helvetica]">
                              R60+
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.3 }}
                            className="absolute w-[389px] h-[391px] top-20 left-[81px] rotate-[118.17deg] pt-4"
                          >
                            <div className="absolute top-[-21px] left-[189px] font-medium text-foundationsecondaryblackblack-300 text-base text-center tracking-[0] leading-[normal] font-['Poppins',Helvetica]">
                              R0
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
          className="relative w-[174.41px] mt-[-45.02px] ml-8 font-normal text-foundationsecondaryblackblack-300 text-base text-center tracking-[-0.32px] leading-[normal] font-['Poppins',Helvetica]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="font-medium text-[#031a82] tracking-[-0.05px]">
            Your {insulationZone} R-value
          </span>
          <span className="text-[#545454] tracking-[-0.05px]">
            {" "}
            is{" "}
          </span>
          <span className="font-medium text-[#031a82] tracking-[-0.05px]">
            R{displayedValue.toFixed(1)}
          </span>
        </motion.div>
      </CardContent>
    </Card>
  )
}