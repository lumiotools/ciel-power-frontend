"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { JSX } from "react"

interface ReportHeatingSectionGaugeProps {
  value: number
  minValue?: number
  maxValue?: number
  title?: string
  subtitle?: string
  labelSuffix?: string
  heating?: {
    current_value: number
    [key: string]: any
  }
}

export default function ReportHeatingSectionGauge({
  value,
  minValue = 0,
  maxValue = 100,
  title = "Efficiency Rating",
  subtitle = "",
  labelSuffix = "%",
  heating,
}: ReportHeatingSectionGaugeProps): JSX.Element {
  const [displayedValue, setDisplayedValue] = useState(value)

  useEffect(() => {
    setDisplayedValue(value)
  }, [value])

  // Generate dynamic tick marks and labels based on min and max values
  const generateTicks = () => {
    // Define the number of ticks we want (5 ticks: 0%, 25%, 50%, 75%, 100% of the range)
    const tickCount = 5
    const ticks = []

    for (let i = 0; i < tickCount; i++) {
      // Calculate the value at this tick (distribute evenly between min and max)
      const pct = i / (tickCount - 1)
      const value = minValue + pct * (maxValue - minValue)

      // Calculate position (0 = right side, 180 = left side)
      const position = i * (180 / (tickCount - 1))

      // Format the label with appropriate precision
      // Use more decimal places for small ranges
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

  // Calculate the angle for the needle - FIXED: correct calculation
  const getNeedleAngle = (val: number): number => {
    const boundedVal = Math.min(Math.max(val, minValue), maxValue)
    const pct = (boundedVal - minValue) / (maxValue - minValue)
    // map [0→1] to [0°→180°], then shift so 0% = –90° (right), 50% = 0° (up), 100% = +90° (left)
    return pct * 180 - 90
  }

  const needleAngle = getNeedleAngle(displayedValue)

  // Calculate the position for the current value marker
  const getValuePosition = (val: number) => {
    // 1. clamp into [minValue, maxValue]
    const bounded = Math.min(Math.max(val, minValue), maxValue)

    // 2. normalize 0→1
    const pct = (bounded - minValue) / (maxValue - minValue)

    // 3. REVERSE the mapping: 0→180°, 1→0°
    const angleDeg = (1 - pct) * 180

    // 4. to radians
    const rad = (angleDeg * Math.PI) / 180

    // 5. project from center (cx, cy) with radius R
    const cx = 250,
      cy = 220,
      R = 160
    return {
      x: cx + R * Math.cos(rad), // cos(180°)=–1 puts 0% at left, cos(0°)=+1 puts 100% at right
      y: cy - R * Math.sin(rad),
    }
  }

  const valuePosition = getValuePosition(displayedValue)

  return (
    <div className="w-full aspect-[5/3] relative p-0 m-0 block" style={{ minHeight: "120px" }}>
      <motion.svg
        viewBox="0 0 500 300"
        className="w-full h-full p-0 m-0 block"
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          padding: 0,
          margin: 0,
        }}
        preserveAspectRatio="xMidYMid meet"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Gradient definitions */}
        <defs>
          {/* Gauge gradient: green (low values) to red (high values) */}
          <linearGradient id="percentage-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" /> {/* Green (low values) */}
            <stop offset="25%" stopColor="#84cc16" /> {/* Light green */}
            <stop offset="50%" stopColor="#eab308" /> {/* Yellow */}
            <stop offset="75%" stopColor="#e67700" /> {/* Orange */}
            <stop offset="100%" stopColor="#cc2b2b" /> {/* Darker red (high values) */}
          </linearGradient>

          {/* Arrow gradient */}
          <linearGradient id="percentage-arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" /> {/* Dark blue */}
            <stop offset="60%" stopColor="#3b82f6" /> {/* Light blue */}
            <stop offset="100%" stopColor="#93c5fd" /> {/* Lighter blue */}
          </linearGradient>

          {/* Dotted path gradient */}
          <linearGradient id="percentage-dotted-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" /> {/* Green (low values) */}
            <stop offset="50%" stopColor="#eab308" /> {/* Yellow */}
            <stop offset="100%" stopColor="#cc2b2b" /> {/* Red (high values) */}
          </linearGradient>
        </defs>

        {/* Main gauge arc - with square edges */}
        <motion.path
          d="M 90,220 A 160,160 0 0 1 410,220"
          fill="none"
          stroke="url(#percentage-gradient)"
          strokeWidth="40"
          strokeLinecap="butt"
          style={{ margin: 0, padding: 0 }}
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
          style={{ margin: 0, padding: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />

        {/* Tick marks and rotated labels */}
        {ticks.map((tick, index) => {
          // Use the pre-defined position for exact placement
          const tickAngle = tick.position
          // Convert to radians for coordinate calculation
          const tickRadian = (tickAngle * Math.PI) / 180

          // Coordinates for the tick line
          const innerX = 250 - 140 * Math.cos(tickRadian)
          const innerY = 220 - 140 * Math.sin(tickRadian)
          const outerX = 250 - 180 * Math.cos(tickRadian)
          const outerY = 220 - 180 * Math.sin(tickRadian)

          // Coordinates for the label
          const labelX = 250 - 195 * Math.cos(tickRadian)
          const labelY = 220 - 195 * Math.sin(tickRadian)

          // Rotation angle for the text to follow the curve
          // Makes the text tangent to the circle at that point
          const textRotation = tickAngle - 90

          return (
            <motion.g
              key={tick.value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
            >
              {/* Tick mark */}
              <line x1={innerX} y1={innerY} x2={outerX} y2={outerY} stroke="white" strokeWidth="2.5" />

              {/* Rotated label */}
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

          {/* Current value text */}
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

        {/* Arrow/needle pointing to the current value - No animation, fixed at the middle */}
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

        {/* Title display - positioned at the bottom center with custom formatting */}
        <motion.text
          x="250"
          y="270"
          fontSize="16"
          textAnchor="middle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <tspan fill="#333333" fontWeight="700">
            {"Your furnace's "}
          </tspan>
          <tspan fill="#d47c02" fontWeight="700">
            {"current AFUE"}
          </tspan>
          <tspan fill="#333333" fontWeight="700">
            {" rating is "}
          </tspan>
          <tspan fill="#d47c02" fontWeight="700">
            {heating?.current_value || displayedValue}
            {labelSuffix}
          </tspan>
        </motion.text>
      </motion.svg>
    </div>
  )
}
