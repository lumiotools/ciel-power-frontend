"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { JSX } from "react";

interface RValueGaugeProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  title?: string;
  subtitle?: string;
}

export default function RValueGauge({
  value,
  minValue = 0,
  maxValue = 60,
  title = "R-Value",
  subtitle = "is",
}: RValueGaugeProps): JSX.Element {
  const [displayedValue, setDisplayedValue] = useState(value);

  useEffect(() => {
    setDisplayedValue(value);
  }, [value]);

  // Define the tick marks and labels
  const ticks = [
    { value: 0, label: "R0", position: 0 }, // Right side (0 degrees)
    { value: 7, label: "R7", position: 45 }, // Between right and top
    { value: 15, label: "R15", position: 90 }, // Top (90 degrees)
    { value: 30, label: "R30", position: 135 }, // Between top and left
    { value: 60, label: "R60+", position: 180 }, // Left side (180 degrees)
  ];

  // Calculate the angle for the needle - independent calculation based on R-value
  const getNeedleAngle = (val: number): number => {
    // clamp to your min/max
    const bounded = Math.min(Math.max(val, minValue), maxValue);
    // normalize 0…1 then scale to 0…180°
    const angle = 360 - ((bounded - minValue) / (maxValue - minValue)) * 180;
    return 180 - angle;
  };

  const needleAngle = getNeedleAngle(displayedValue);

  // Calculate the position for the current value marker - independent calculation
  const getValuePosition = (val: number) => {
    // Ensure value is within bounds
    const boundedVal = Math.min(Math.max(val, minValue), maxValue);

    // Normalize to 0-1 range
    const pct = (boundedVal - minValue) / (maxValue - minValue);

    // Map to angle (0° = right side, 180° = left side)
    const angleDeg = pct * 180;

    // Convert to radians
    const radian = (angleDeg * Math.PI) / 180;

    // Calculate position on the gauge arc
    return {
      x: 250 - 160 * Math.cos(radian),
      y: 220 - 160 * Math.sin(radian),
    };
  };

  const valuePosition = getValuePosition(displayedValue);

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="flex flex-col items-center justify-between relative p-0 bg-transparent">
        <div
          className="w-full aspect-[4/3] relative"
          style={{ minHeight: "120px" }}
        >
          <motion.svg
            viewBox="0 0 500 300"
            className="w-full h-full"
            style={{
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            preserveAspectRatio="xMidYMid meet"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Gradient definitions */}
            <defs>
              {/* Gauge gradient: blue (right/0) to green (left/60+) */}
              <linearGradient
                id="rvalue-gradient"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" /> {/* Blue (R0) */}
                <stop offset="25%" stopColor="#60a5fa" /> {/* Light blue */}
                <stop offset="50%" stopColor="#84cc16" /> {/* Light green */}
                <stop offset="75%" stopColor="#4ade80" /> {/* Green */}
                <stop offset="100%" stopColor="#22c55e" />{" "}
                {/* Dark green (R60+) */}
              </linearGradient>

              {/* Arrow gradient */}
              <linearGradient
                id="rvalue-arrow-gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1e3a8a" /> {/* Dark blue */}
                <stop offset="60%" stopColor="#3b82f6" /> {/* Light blue */}
                <stop offset="100%" stopColor="#93c5fd" /> {/* Lighter blue */}
              </linearGradient>

              {/* Dotted path gradient */}
              <linearGradient
                id="rvalue-dotted-gradient"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" /> {/* Blue (R0) */}
                <stop offset="50%" stopColor="#84cc16" /> {/* Light green */}
                <stop offset="100%" stopColor="#22c55e" />{" "}
                {/* Dark green (R60+) */}
              </linearGradient>
            </defs>

            {/* Main gauge arc - with square edges */}
            <motion.path
              d="M 90,220 A 160,160 0 0 1 410,220"
              fill="none"
              stroke="url(#rvalue-gradient)"
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
              stroke="url(#rvalue-dotted-gradient)"
              strokeWidth="1.5"
              strokeDasharray="3,6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />

            {/* Tick marks and rotated labels */}
            {ticks.map((tick, index) => {
              // Use the pre-defined position for exact placement
              const tickAngle = tick.position;
              // Convert to radians for coordinate calculation
              const tickRadian = (tickAngle * Math.PI) / 180;

              // Coordinates for the tick line
              const innerX = 250 - 140 * Math.cos(tickRadian);
              const innerY = 220 - 140 * Math.sin(tickRadian);
              const outerX = 250 - 180 * Math.cos(tickRadian);
              const outerY = 220 - 180 * Math.sin(tickRadian);

              // Coordinates for the label
              const labelX = 250 - 195 * Math.cos(tickRadian);
              const labelY = 220 - 195 * Math.sin(tickRadian);

              // Rotation angle for the text to follow the curve
              // Makes the text tangent to the circle at that point
              const textRotation = tickAngle - 90;

              return (
                <motion.g
                  key={tick.value}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                >
                  {/* Tick mark */}
                  <line
                    x1={innerX}
                    y1={innerY}
                    x2={outerX}
                    y2={outerY}
                    stroke="white"
                    strokeWidth="2.5"
                  />

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
              );
            })}

            {/* Current value marker */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <circle
                cx={valuePosition.x}
                cy={valuePosition.y}
                r="6"
                fill="#1e3a8a"
                stroke="white"
                strokeWidth="2"
              />

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
                R{displayedValue.toFixed(1)}
              </text>
            </motion.g>

            {/* Arrow/needle pointing to the current value */}
            <g
              style={{
                transform: `rotate(${needleAngle + 90}deg)`,
                transformOrigin: "250px 220px",
              }}
            >
              <path
                d="M 250,110 L 260,140 L 255,140 L 255,220 L 245,220 L 245,140 L 240,140 Z"
                fill="url(#rvalue-arrow-gradient)"
                stroke="none"
              />
            </g>

            {/* Title display - positioned at the bottom center */}
            <motion.text
              x="250"
              y="270"
              fill="#333333"
              fontSize="16"
              fontWeight="500"
              textAnchor="middle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {title} {subtitle && subtitle}
            </motion.text>
          </motion.svg>
        </div>
      </CardContent>
    </Card>
  );
}
