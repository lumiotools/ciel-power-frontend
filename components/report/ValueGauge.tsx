"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface ValueGaugeProps {
  value: number
  minValue?: number
  maxValue?: number
  title?: string
  subtitle?: string
  showCard?: boolean
  width?: string
  height?: string
  unit?: string
}

export default function ValueGauge({
  value,
  minValue = 0,
  maxValue = 100,
  title = "Efficiency Rating",
  subtitle = "",
  showCard = true,
  width = "100%",
  height = "auto",
  unit = "",
}: ValueGaugeProps) {
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
    // Calculate tick values based on min and max
    const range = maxValue - minValue
    const tickStep = range / 4
    const angles = {
      [minValue]: 118.17,                    // Minimum value
      [minValue + tickStep]: 90,             // 25% of range
      [minValue + tickStep * 2]: 75,         // 50% of range
      [minValue + tickStep * 3]: 30,         // 75% of range
      [maxValue]: -55.32                     // Maximum value
    }
    
    // Find the two closest values
    const values = Object.keys(angles).map(Number)
    const lowerValue = Math.max(...values.filter(v => v <= value))
    const upperValue = Math.min(...values.filter(v => v >= value))
    
    // If value exactly matches a defined value, return its angle
    if (lowerValue === upperValue) {
      return angles[lowerValue]
    }
    
    // Interpolate between the two angles
    const lowerAngle = angles[lowerValue]
    const upperAngle = angles[upperValue]
    const percentage = (value - lowerValue) / (upperValue - lowerValue)
    
    return lowerAngle - ((lowerAngle - upperAngle) * percentage)
  }

  const pointerRotation = calculateRotation(displayedValue)

  // Format tick labels based on the value range
  const formatTickLabel = (value: number) => {
    if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(1)}k${unit}`
    }
    return `${value}${unit}`
  }

  // Calculate tick values
  const range = maxValue - minValue
  const tickStep = range / 4
  const ticks = [
    minValue,
    minValue + tickStep,
    minValue + tickStep * 2,
    minValue + tickStep * 3,
    maxValue
  ]

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="flex flex-col h-[213px] items-center justify-between relative p-0 w-[431px] bg-transparent">
        <div className="flex flex-col w-[431px] items-start justify-center relative flex-[0_0_auto]">
          <div className="relative w-[391px] h-[209px] ml-8">
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
                              {formatTickLabel(minValue + tickStep * 2)}
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
                                {formatTickLabel(minValue + tickStep * 3)}
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
                                {formatTickLabel(displayedValue)}
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
                              {formatTickLabel(minValue + tickStep)}
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.3 }}
                            className="absolute w-[389px] h-[391px] top-20 left-[81px] rotate-[-55.32deg]"
                          >
                            <div className="absolute top-[-21px] left-[177px] font-medium text-foundationsecondaryblackblack-300 text-base text-center tracking-[0] leading-[normal] font-['Poppins',Helvetica]">
                              {formatTickLabel(maxValue)}
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.3 }}
                            className="absolute w-[389px] h-[391px] top-20 left-[81px] rotate-[118.17deg] pt-4"
                          >
                            <div className="absolute top-[-21px] left-[189px] font-medium text-foundationsecondaryblackblack-300 text-base text-center tracking-[0] leading-[normal] font-['Poppins',Helvetica]">
                              {formatTickLabel(minValue)}
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
            {title}
          </span>
          {subtitle && (
            <span className="text-[#545454] tracking-[-0.05px]">
              {" "}
              {subtitle}{" "}
            </span>
          )}
          <span className="font-medium text-[#031a82] tracking-[-0.05px]">
            {formatTickLabel(displayedValue)}
          </span>
        </motion.div>
      </CardContent>
    </Card>
  )
}