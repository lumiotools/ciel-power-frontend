"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import type { JSX } from "react";
import { Info } from "lucide-react";

interface ReportHeatingSectionGaugeProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  title?: string;
  subtitle?: string;
  labelSuffix?: string;
  isAdmin?: boolean;
  heating?: {
    current_value: number | string;
    title?: string;
    type?: string;
    parameter?: string;
    [key: string]: any;
  };
}

// Check if title contains valid keywords for tooltip
const hasValidKeywords = (title?: string) => {
  if (!title) return false;

  const titleLower = title.toLowerCase();

  // Check for specific keywords
  const validKeywords = ["furnace", "water heater", "hot water", "boiler"];

  return validKeywords.some((keyword) => titleLower.includes(keyword));
};

// Dynamic tooltip data based on heating system type with exact keyword matching
const getTooltipData = (
  heating?: ReportHeatingSectionGaugeProps["heating"]
) => {
  const systemTitle =
    heating?.title?.toLowerCase() || heating?.type?.toLowerCase() || "";

  // Check for Furnace
  if (systemTitle.includes("furnace")) {
    return {
      title: "Electrification Opportunity",
      content:
        "Consider a cold-climate heat pump for cleaner, all-in-one heating + cooling and a smaller carbon footprint.",
    };
  }

  // Check for Water Heater
  if (
    systemTitle.includes("water heater") ||
    systemTitle.includes("hot water")
  ) {
    return {
      title: "Electrification Opportunity",
      content:
        "Idea: switch to a heat-pump water heater for efficient, low-carbon hot water and reduced on-site combustion.",
    };
  }

  // Check for Boiler
  if (systemTitle.includes("boiler")) {
    return {
      title: "Electrification Opportunity",
      content:
        "Suggestion: replace your central A/C with a cold-climate heat pump-keep the radiators, cut fossil fuel use most of the year.",
    };
  }

  // Default fallback (should not be reached if hasValidKeywords works correctly)
  return {
    title: "Electrification Opportunity",
    content:
      "Consider upgrading to more efficient, electric alternatives for reduced carbon footprint and improved performance.",
  };
};

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
  const [displayedValue, setDisplayedValue] = useState(value);
  const [showInfoIcon, setShowInfoIcon] = useState(() => {
    // Only show info icon if the title has valid keywords and is not default
    return heating?.title
      ? !heating.title.includes("Your Home's Heating") &&
          hasValidKeywords(heating.title)
      : false;
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const infoIconRef = useRef<HTMLDivElement>(null);
  const tooltipData = getTooltipData(heating);

  // Function to check if mouse is over the icon
  const isMouseOverIcon = useCallback((event: MouseEvent) => {
    if (!infoIconRef.current) return false;

    const iconRect = infoIconRef.current.getBoundingClientRect();
    const { clientX, clientY } = event;

    return (
      clientX >= iconRect.left &&
      clientX <= iconRect.right &&
      clientY >= iconRect.top &&
      clientY <= iconRect.bottom
    );
  }, []);

  // Function to hide tooltip
  const hideTooltip = useCallback(() => {
    setShowTooltip(false);
  }, []);

  // Global mouse move handler
  const handleGlobalMouseMove = useCallback(
    (event: MouseEvent) => {
      if (showTooltip && !isMouseOverIcon(event)) {
        hideTooltip();
      }
    },
    [showTooltip, isMouseOverIcon, hideTooltip]
  );

  // Global scroll handler - immediate hide
  const handleGlobalScroll = useCallback(() => {
    if (showTooltip) {
      hideTooltip();
    }
  }, [showTooltip, hideTooltip]);

  // Global mouse down handler (for drag detection)
  const handleGlobalMouseDown = useCallback(() => {
    if (showTooltip) {
      hideTooltip();
    }
  }, [showTooltip, hideTooltip]);

  // Global key handler (for keyboard navigation)
  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (showTooltip && (event.key === "Escape" || event.key === "Tab")) {
        hideTooltip();
      }
    },
    [showTooltip, hideTooltip]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Add/remove global event listeners based on tooltip visibility
  useEffect(() => {
    if (showTooltip) {
      // Add multiple event listeners for accurate detection
      document.addEventListener("mousemove", handleGlobalMouseMove, {
        passive: true,
      });
      document.addEventListener("scroll", handleGlobalScroll, {
        passive: true,
        capture: true,
      });
      document.addEventListener("wheel", handleGlobalScroll, { passive: true });
      document.addEventListener("mousedown", handleGlobalMouseDown, {
        passive: true,
      });
      document.addEventListener("keydown", handleGlobalKeyDown, {
        passive: true,
      });
      window.addEventListener("blur", hideTooltip, { passive: true });
      window.addEventListener("resize", hideTooltip, { passive: true });
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("scroll", handleGlobalScroll, true);
      document.removeEventListener("wheel", handleGlobalScroll);
      document.removeEventListener("mousedown", handleGlobalMouseDown);
      document.removeEventListener("keydown", handleGlobalKeyDown);
      window.removeEventListener("blur", hideTooltip);
      window.removeEventListener("resize", hideTooltip);
    };
  }, [
    showTooltip,
    handleGlobalMouseMove,
    handleGlobalScroll,
    handleGlobalMouseDown,
    handleGlobalKeyDown,
    hideTooltip,
  ]);

  useEffect(() => {
    setDisplayedValue(value);
  }, [value]);

  // Update displayed value when heating data changes
  useEffect(() => {
    if (heating?.current_value) {
      if (
        typeof heating.current_value === "string" &&
        heating.current_value.includes("%")
      ) {
        const numValue = Number.parseFloat(
          heating.current_value.replace("%", "")
        );
        if (!isNaN(numValue)) {
          setDisplayedValue(numValue);
        }
      } else if (typeof heating.current_value === "number") {
        setDisplayedValue(heating.current_value);
      }
    }
  }, [heating?.current_value]);

  // Update showInfoIcon when title changes
  useEffect(() => {
    if (heating?.title) {
      // Only show info icon if:
      // 1. Title is not default "Your Home's Heating X"
      // 2. Title contains valid keywords (furnace, water heater, boiler)
      const isNotDefault = !heating.title.includes("Your Home's Heating");
      const hasKeywords = hasValidKeywords(heating.title);
      setShowInfoIcon(isNotDefault && hasKeywords);
    } else {
      setShowInfoIcon(false);
    }
  }, [heating?.title]);

  const calculateTooltipPosition = useCallback(() => {
    if (!infoIconRef.current) return;

    const iconRect = infoIconRef.current.getBoundingClientRect();
    const tooltipWidth = 320; // 80 * 4 (w-80)
    const tooltipHeight = 120; // Approximate height
    const margin = 16;

    // Calculate left position - ensure tooltip doesn't go off screen
    let left = iconRect.left + iconRect.width / 2 - tooltipWidth / 2;

    // Adjust if tooltip would go off the left edge
    if (left < margin) {
      left = margin;
    }

    // Adjust if tooltip would go off the right edge
    if (left + tooltipWidth > window.innerWidth - margin) {
      left = window.innerWidth - tooltipWidth - margin;
    }

    // Position above the icon
    const top = iconRect.top - tooltipHeight - 12;

    setTooltipPosition({ top, left });
  }, []);

  const handleMouseEnter = () => {
    calculateTooltipPosition();
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    // Double-check with a small timeout to ensure mouse really left
    setTimeout(() => {
      if (infoIconRef.current) {
        const iconRect = infoIconRef.current.getBoundingClientRect();
        const isStillOver =
          document.elementFromPoint(
            iconRect.left + iconRect.width / 2,
            iconRect.top + iconRect.height / 2
          ) === infoIconRef.current.querySelector("svg");

        if (!isStillOver) {
          setShowTooltip(false);
        }
      }
    }, 10);
  };

  const getSystemName = () => {
    if (heating?.title) {
      // Remove "Your Home's" prefix if present
      return heating.title.replace(/Your Home's\s*/i, "").toLowerCase();
    }
    return "system";
  };

  const getParameterName = () => {
    return heating?.parameter || "AFUE";
  };

  // Generate dynamic tick marks and labels based on min and max values
  const generateTicks = () => {
    const tickCount = 5;
    const ticks = [];

    for (let i = 0; i < tickCount; i++) {
      const pct = i / (tickCount - 1);
      const value = minValue + pct * (maxValue - minValue);
      const position = i * (180 / (tickCount - 1));

      const range = maxValue - minValue;
      let decimals = 0;

      if (range < 1) decimals = 2;
      else if (range < 10) decimals = 1;

      const label = `${value.toFixed(decimals)}${labelSuffix}`;

      ticks.push({ value, label, position });
    }

    return ticks;
  };

  const ticks = generateTicks();

  const getNeedleAngle = (val: number): number => {
    const boundedVal = Math.min(Math.max(val, minValue), maxValue);
    const pct = (boundedVal - minValue) / (maxValue - minValue);
    return pct * 180 - 90;
  };

  const needleAngle = getNeedleAngle(displayedValue);

  const getValuePosition = (val: number) => {
    const bounded = Math.min(Math.max(val, minValue), maxValue);
    const pct = (bounded - minValue) / (maxValue - minValue);
    const angleDeg = (1 - pct) * 180;
    const rad = (angleDeg * Math.PI) / 180;

    const cx = 250,
      cy = 220,
      R = 160;
    return {
      x: cx + R * Math.cos(rad),
      y: cy - R * Math.sin(rad),
    };
  };

  const valuePosition = getValuePosition(displayedValue);

  // Calculate arrow position relative to tooltip
  const getArrowPosition = () => {
    if (!infoIconRef.current) return { left: "50%" };

    const iconRect = infoIconRef.current.getBoundingClientRect();
    const iconCenter = iconRect.left + iconRect.width / 2;
    const tooltipLeft = tooltipPosition.left;
    const arrowLeft = iconCenter - tooltipLeft;

    return { left: `${Math.max(20, Math.min(300, arrowLeft))}px` };
  };

  const renderTooltip = () => {
    if (!isMounted || !showTooltip) return null;

    return createPortal(
      <div
        className="fixed w-80 max-w-[90vw] transition-opacity duration-150 opacity-100 pointer-events-none"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          zIndex: 99999,
        }}
      >
        <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              {tooltipData.title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {tooltipData.content}
            </p>
          </div>
          <div
            className="absolute top-full transform -translate-y-1/2"
            style={getArrowPosition()}
          >
            <div className="w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  const handleToggleChange = () => {
    setShowInfoIcon((prev) => !prev);
  };

  // Check if we should show the admin toggle
  const shouldShowAdminToggle = () => {
    if (!isAdmin) return false;
    if (!heating?.title) return false;

    // Don't show toggle for default titles
    if (heating.title.includes("Your Home's Heating")) return false;

    // Only show toggle if title has valid keywords
    return hasValidKeywords(heating.title);
  };

  return (
    <div className="w-full" ref={containerRef}>
      {/* Add CSS for neon flash animation */}
      <style jsx>{`
        @keyframes neonFlash {
          0%,
          30% {
            filter: drop-shadow(0 0 4px rgba(230, 126, 34, 0.6))
              drop-shadow(0 0 8px rgba(230, 126, 34, 0.4));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(230, 126, 34, 1))
              drop-shadow(0 0 20px rgba(230, 126, 34, 0.8))
              drop-shadow(0 0 30px rgba(230, 126, 34, 0.6))
              drop-shadow(0 0 40px rgba(255, 165, 0, 0.4));
            transform: scale(1.1);
          }
          70%,
          100% {
            filter: drop-shadow(0 0 4px rgba(230, 126, 34, 0.6))
              drop-shadow(0 0 8px rgba(230, 126, 34, 0.4));
            transform: scale(1);
          }
        }
      `}</style>

      {/* SVG Gauge */}
      <div className="w-full aspect-[5/3] relative">
        {/* Info icon - only visible when title has valid keywords and is not default */}
        {showInfoIcon && (
          <div
            className="absolute bottom-[30px] left-[35px] z-[999]"
            ref={infoIconRef}
          >
            <div
              className="h-6 w-6 flex items-center justify-center cursor-help"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Info
                className="h-5 w-5 text-[#e67e22]"
                style={{
                  filter:
                    "drop-shadow(0 0 4px rgba(230, 126, 34, 0.6)) drop-shadow(0 0 8px rgba(230, 126, 34, 0.4))",
                  animation: "neonFlash 2s infinite ease-in-out",
                }}
              />
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
            <linearGradient
              id="percentage-gradient"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="25%" stopColor="#84cc16" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="75%" stopColor="#e67700" />
              <stop offset="100%" stopColor="#cc2b2b" />
            </linearGradient>

            <linearGradient
              id="percentage-arrow-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>

            <linearGradient
              id="percentage-dotted-gradient"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
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
            const tickAngle = tick.position;
            const tickRadian = (tickAngle * Math.PI) / 180;

            const innerX = 250 - 140 * Math.cos(tickRadian);
            const innerY = 220 - 140 * Math.sin(tickRadian);
            const outerX = 250 - 180 * Math.cos(tickRadian);
            const outerY = 220 - 180 * Math.sin(tickRadian);

            const labelX = 250 - 195 * Math.cos(tickRadian);
            const labelY = 220 - 195 * Math.sin(tickRadian);

            const textRotation = tickAngle - 90;

            return (
              <motion.g
                key={tick.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
              >
                <line
                  x1={innerX}
                  y1={innerY}
                  x2={outerX}
                  y2={outerY}
                  stroke="white"
                  strokeWidth="2.5"
                />
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
              {typeof heating?.current_value === "string" &&
              heating.current_value.includes("%")
                ? heating.current_value
                : `${displayedValue.toFixed(1)}${labelSuffix}`}
            </tspan>
          </motion.text>
        </motion.svg>
      </div>

      {/* Render tooltip using portal */}
      {renderTooltip()}

      {/* Admin Toggle - Only visible when conditions are met */}
      {shouldShowAdminToggle() && (
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-sm text-gray-600">
            Enable tooltip for all users
          </span>
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
  );
}
