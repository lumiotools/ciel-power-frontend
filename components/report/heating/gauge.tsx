"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import type { JSX } from "react"
import { Info } from "lucide-react"

interface ReportHeatingSectionGaugeProps {
  value: number
  minValue?: number
  maxValue?: number
  title?: string
  subtitle?: string
  labelSuffix?: string
  isAdmin?: boolean
  heating?: {
    current_value: number | string
    title?: string
    type?: string
    parameter?: string
    [key: string]: any
  }
}

// Dynamic tooltip data based on heating system type with improved keyword matching
const getTooltipData = (heating?: ReportHeatingSectionGaugeProps["heating"]) => {
  const systemTitle = heating?.title?.toLowerCase() || heating?.type?.toLowerCase() || ""

  // Check for Gas/Oil/Propane Furnace
  if (
    (systemTitle.includes("furnace") &&
      (systemTitle.includes("gas") || systemTitle.includes("oil") || systemTitle.includes("propane"))) ||
    (systemTitle.includes("furnace") && !systemTitle.includes("water"))
  ) {
    return {
      title: "Electrification Opportunity",
      content:
        "Consider a cold-climate heat pump for cleaner, all-in-one heating + cooling and a smaller carbon footprint.",
    }
  }

  // Check for Gas/Oil/Propane Water Heater
  if (
    systemTitle.includes("water heater") ||
    systemTitle.includes("hot water") ||
    (systemTitle.includes("water") &&
      (systemTitle.includes("gas") || systemTitle.includes("oil") || systemTitle.includes("propane")))
  ) {
    return {
      title: "Electrification Opportunity",
      content:
        "Idea: switch to a heat-pump water heater for efficient, low-carbon hot water and reduced on-site combustion.",
    }
  }

  // Check for Boiler + Central AC
  if (
    (systemTitle.includes("boiler") && systemTitle.includes("central")) ||
    (systemTitle.includes("boiler") && systemTitle.includes("ac")) ||
    (systemTitle.includes("boiler") && systemTitle.includes("air conditioning"))
  ) {
    return {
      title: "Electrification Opportunity",
      content:
        "Suggestion: replace your central A/C with a cold-climate heat pump-keep the radiators, cut fossil fuel use most of the year.",
    }
  }

  // Check for standalone Boiler
  if (systemTitle.includes("boiler")) {
    return {
      title: "Electrification Opportunity",
      content:
        "Suggestion: replace your central A/C with a cold-climate heat pump-keep the radiators, cut fossil fuel use most of the year.",
    }
  }

  // Check for any heating system with gas/oil/propane
  if (systemTitle.includes("gas") || systemTitle.includes("oil") || systemTitle.includes("propane")) {
    return {
      title: "Electrification Opportunity",
      content:
        "Consider a cold-climate heat pump for cleaner, all-in-one heating + cooling and a smaller carbon footprint.",
    }
  }

  // Default fallback
  return {
    title: "Electrification Opportunity",
    content:
      "Consider upgrading to more efficient, electric alternatives for reduced carbon footprint and improved performance.",
  }
}

export default function ReportHeatingSectionGauge({
  value,
  minValue = 0,
  maxValue = 100,
  title = "Efficiency Rating",
  subtitle = "",
  labelSuffix = "%",
  isAdmin = false,
  heating,
}: ReportHeatingSectionGaugeProps): JSX.Element {
  const [displayedValue, setDisplayedValue] = useState(value)
  const [showInfoIcon, setShowInfoIcon] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const infoIconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDisplayedValue(value)
  }, [value])

  // Update displayed value when heating data changes
  useEffect(() => {
    if (heating?.current_value) {
      if (typeof heating.current_value === "string" && heating.current_value.includes("%")) {
        const numValue = Number.parseFloat(heating.current_value.replace("%", ""))
        if (!isNaN(numValue)) {
          setDisplayedValue(numValue)
        }
      } else if (typeof heating.current_value === "number") {
        setDisplayedValue(heating.current_value)
      }
    }
  }, [heating?.current_value])

  const handleMouseEnter = () => {
    setIsHovering(true)
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setShowTooltip(false)
  }

  const handleToggleChange = () => {
    setShowInfoIcon(!showInfoIcon)
  }

  // Get dynamic tooltip content - recalculate on every render to ensure real-time updates
  const tooltipData = getTooltipData(heating)

  // Generate dynamic title text based on heating data
  const getSystemName = () => {
    if (heating?.title) {
      // Remove "Your Home's" prefix if present
      return heating.title.replace(/Your Home's\s*/i, "").toLowerCase()
    }
    return "system"
  }

  const getParameterName = () => {
    return heating?.parameter || "AFUE"
  }

  // Generate dynamic tick marks and labels based on min and max values
  const generateTicks = () => {
    const tickCount = 5
    const ticks = []

    for (let i = 0; i < tickCount; i++) {
      const pct = i / (tickCount - 1)
      const value = minValue + pct * (maxValue - minValue)
      const position = i * (180 / (tickCount - 1))

      const range = maxValue - minValue
      let decimals = 0

      if (range < 1) decimals = 2
      else if (range < 10) decimals = 1

      const label = `${value.toFixed(decimals)}${labelSuffix}`

      ticks.push({ value, label, position })
    }

    return ticks
  }

  const ticks = generateTicks()

  const getNeedleAngle = (val: number): number => {
    const boundedVal = Math.min(Math.max(val, minValue), maxValue)
    const pct = (boundedVal - minValue) / (maxValue - minValue)
    return pct * 180 - 90
  }

  const needleAngle = getNeedleAngle(displayedValue)

  const getValuePosition = (val: number) => {
    const bounded = Math.min(Math.max(val, minValue), maxValue)
    const pct = (bounded - minValue) / (maxValue - minValue)
    const angleDeg = (1 - pct) * 180
    const rad = (angleDeg * Math.PI) / 180

    const cx = 250,
      cy = 220,
      R = 160
    return {
      x: cx + R * Math.cos(rad),
      y: cy - R * Math.sin(rad),
    }
  }

  const valuePosition = getValuePosition(displayedValue)

  return (
    <div className="w-full" ref={containerRef}>
      {/* Add CSS for neon flash animation */}
      <style jsx>{`
        @keyframes neonFlash {
          0%, 30% {
            filter: drop-shadow(0 0 4px rgba(230, 126, 34, 0.6)) drop-shadow(0 0 8px rgba(230, 126, 34, 0.4));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(230, 126, 34, 1)) 
                    drop-shadow(0 0 20px rgba(230, 126, 34, 0.8)) 
                    drop-shadow(0 0 30px rgba(230, 126, 34, 0.6))
                    drop-shadow(0 0 40px rgba(255, 165, 0, 0.4));
            transform: scale(1.1);
          }
          70%, 100% {
            filter: drop-shadow(0 0 4px rgba(230, 126, 34, 0.6)) drop-shadow(0 0 8px rgba(230, 126, 34, 0.4));
            transform: scale(1);
          }
        }
      `}</style>

      {/* SVG Gauge */}
      <div className="w-full aspect-[5/3] relative">
        {/* Info icon and tooltip - visibility controlled by admin toggle, shown to all users when enabled */}
        {showInfoIcon && (
          <div className="absolute bottom-[30px] left-[35px] z-[100]" ref={infoIconRef}>
            <div className="relative">
              <Info
                className="h-5 w-5 text-[#e67e22] cursor-help"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(230, 126, 34, 0.6)) drop-shadow(0 0 8px rgba(230, 126, 34, 0.4))",
                  animation: "neonFlash 2s infinite ease-in-out",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <div
                className={`absolute bottom-0 left-full ml-2 w-80 max-w-[90vw] transition-all duration-300 z-[100] ${
                  showTooltip && isHovering
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 pointer-events-none"
                }`}
              >
                <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{tooltipData.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{tooltipData.content}</p>
                  </div>
                  <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <motion.svg
          viewBox="0 0 500 300"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="percentage-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="25%" stopColor="#84cc16" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="75%" stopColor="#e67700" />
              <stop offset="100%" stopColor="#cc2b2b" />
            </linearGradient>

            <linearGradient id="percentage-arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>

            <linearGradient id="percentage-dotted-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#cc2b2b" />
            </linearGradient>
          </defs>

          {/* Main gauge arc */}
          <motion.path
            d="M 90,220 A 160,160 0 0 1 410,220"
            fill="none"
            stroke="url(#percentage-gradient)"
            strokeWidth="40"
            strokeLinecap="butt"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          />

          {/* Dotted semi-circle */}
          <motion.path
            d="M 130,220 A 120,120 0 0 1 370,220"
            fill="none"
            stroke="url(#percentage-dotted-gradient)"
            strokeWidth="1.5"
            strokeDasharray="3,6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />

          {/* Tick marks and labels */}
          {ticks.map((tick, index) => {
            const tickAngle = tick.position
            const tickRadian = (tickAngle * Math.PI) / 180

            const innerX = 250 - 140 * Math.cos(tickRadian)
            const innerY = 220 - 140 * Math.sin(tickRadian)
            const outerX = 250 - 180 * Math.cos(tickRadian)
            const outerY = 220 - 180 * Math.sin(tickRadian)

            const labelX = 250 - 195 * Math.cos(tickRadian)
            const labelY = 220 - 195 * Math.sin(tickRadian)

            const textRotation = tickAngle - 90

            return (
              <motion.g
                key={tick.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
              >
                <line x1={innerX} y1={innerY} x2={outerX} y2={outerY} stroke="white" strokeWidth="2.5" />
                <text
                  x={labelX}
                  y={labelY}
                  fill="#666666"
                  fontSize="16"
                  fontWeight="500"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textRotation}, ${labelX}, ${labelY})`}
                >
                  {tick.label}
                </text>
              </motion.g>
            )
          })}

          {/* Current value marker */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}>
            <circle cx={valuePosition.x} cy={valuePosition.y} r="6" fill="#1e3a8a" stroke="white" strokeWidth="2" />
            <text
              x="250"
              y="160"
              fill="#1e3a8a"
              fontSize="24"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {displayedValue.toFixed(1)}
              {labelSuffix}
            </text>
          </motion.g>

          {/* Arrow/needle */}
          <g
            style={{
              transform: `rotate(${needleAngle}deg)`,
              transformOrigin: "250px 220px",
            }}
          >
            <path
              d="M 250,110 L 260,140 L 255,140 L 255,220 L 245,220 L 245,140 L 240,140 Z"
              fill="url(#percentage-arrow-gradient)"
              stroke="none"
            />
          </g>

          {/* Title display */}
          <motion.text
            x="0"
            y="270"
            fontSize="16"
            textAnchor="middle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <tspan fill="#333333" fontWeight="700" x="80" textAnchor="start">
              {"Your "}
            </tspan>
            <tspan fill="#333333" fontWeight="700" textAnchor="start">
              {getSystemName()}
            </tspan>
            <tspan fill="#333333" fontWeight="700" textAnchor="start">
              {"'s "}
            </tspan>
            <tspan fill="#d47c02" fontWeight="700" textAnchor="start">
              {"current " + getParameterName()}
            </tspan>
            <tspan fill="#333333" fontWeight="700" textAnchor="start">
              {" rating is "}
            </tspan>
            <tspan fill="#d47c02" fontWeight="700" textAnchor="start">
              {typeof heating?.current_value === "string" && heating.current_value.includes("%")
                ? heating.current_value
                : `${displayedValue.toFixed(1)}${labelSuffix}`}
            </tspan>
          </motion.text>
        </motion.svg>
      </div>

      {/* Admin Toggle - Only visible in admin mode, controls tooltip visibility for all users */}
      {isAdmin && (
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-sm text-gray-600">Enable tooltip for all users</span>
          <button
            onClick={handleToggleChange}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#e67e22] focus:ring-offset-2 ${
              showInfoIcon ? "bg-[#e67e22]" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showInfoIcon ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      )}
    </div>
  )
}
