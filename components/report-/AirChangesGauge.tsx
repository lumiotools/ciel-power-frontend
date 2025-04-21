import type { JSX } from "react";

interface AirChangeGaugeProps {
  value: number;
  minValue?: number;
  maxValue?: number;
}

export const AirChangesGauge = ({
  value = 0.3,
  minValue = 0,
  maxValue = 2.0,
}: AirChangeGaugeProps): JSX.Element => {
  const achValue = value;

  // Define the tick marks and labels
  // The scale goes from 0 (left/better) to 2.0+ (right/worse)
  const ticks = [
    { value: 0, label: "0", position: 180 }, // Left side (180 degrees)
    { value: 0.35, label: "0.35", position: 148.5 }, // 180 - 31.5
    { value: 0.5, label: "0.5", position: 135 }, // 180 - 45
    { value: 0.95, label: "0.95", position: 94.5 }, // 180 - 85.5
    { value: 1.0, label: "1.0", position: 90 }, // Middle (90 degrees)
    { value: 2.0, label: "2.0+", position: 0 }, // Right side (0 degrees)
  ];

  // Calculate the angle for the needle
  // Updated to match the percentage gauge logic but reversed
  const getNeedleAngle = (val: number): number => {
    // Ensure value is within bounds
    const boundedVal = Math.min(Math.max(val, minValue), maxValue);
    // Normalize to 0-1 range
    const pct = (boundedVal - minValue) / (maxValue - minValue);
    // Map [0→1] to [90°→-90°] (left to right)
    // 0 ACH = 90° (left), 1.0 ACH = 0° (up), 2.0 ACH = -90° (right)
    return 90 - pct * 180;
  };

  const needleAngle = getNeedleAngle(achValue);

  // Calculate the position for the current value marker
  const getValuePosition = (val: number) => {
    // 1. clamp into [minValue, maxValue]
    const bounded = Math.min(Math.max(val, minValue), maxValue);

    // 2. normalize 0→1
    const pct = (bounded - minValue) / (maxValue - minValue);

    // 3. map to 0°→180° (0° = right, 180° = left)
    const angleDeg = pct * 180;
    const rad = (angleDeg * Math.PI) / 180;

    // 4. project from center (cx, cy) with radius R **using +cos to put 0 at right**
    const cx = 250,
      cy = 220,
      R = 160;
    return {
      x: cx + R * Math.cos(rad), // 0%→right, 1.0→center, 2.0→left
      y: cy - R * Math.sin(rad),
    };
  };

  const valuePosition = getValuePosition(achValue);

  return (
    <div
      className="w-full aspect-[4/3] relative"
      style={{ minHeight: "300px" }}
    >
      <svg
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
      >
        {/* Gradient definitions */}
        <defs>
          {/* Gauge gradient: green (left/0) to red (right/2.0+) */}
          <linearGradient id="gauge-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" /> {/* Green (0) */}
            <stop offset="25%" stopColor="#84cc16" /> {/* Light green */}
            <stop offset="50%" stopColor="#eab308" /> {/* Yellow */}
            <stop offset="75%" stopColor="#e67700" /> {/* Orange */}
            <stop offset="100%" stopColor="#cc2b2b" /> {/* Darker red (2.0+) */}
          </linearGradient>

          {/* Arrow gradient */}
          <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" /> {/* Dark blue */}
            <stop offset="60%" stopColor="#3b82f6" /> {/* Light blue */}
            <stop offset="100%" stopColor="#93c5fd" /> {/* Lighter blue */}
          </linearGradient>

          {/* Dotted path gradient */}
          <linearGradient
            id="dotted-gradient"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#22c55e" /> {/* Green (0) */}
            <stop offset="50%" stopColor="#eab308" /> {/* Yellow */}
            <stop offset="100%" stopColor="#cc2b2b" /> {/* Red (2.0+) */}
          </linearGradient>
        </defs>

        {/* Main gauge arc - changed to square edges */}
        <path
          d="M 90,220 A 160,160 0 0 1 410,220"
          fill="none"
          stroke="url(#gauge-gradient)"
          strokeWidth="40"
          strokeLinecap="butt"
        />

        {/* Dotted semi-circle */}
        <path
          d="M 130,220 A 120,120 0 0 1 370,220"
          fill="none"
          stroke="url(#dotted-gradient)"
          strokeWidth="1.5"
          strokeDasharray="3,6"
        />

        {/* Red indicator line at 0.35 */}
        {(() => {
          const indicatorValue = 0.35;
          const indicatorAngle = getValuePosition(indicatorValue);
          const x1 = indicatorAngle.x - (indicatorAngle.x - 250) * 0.125;
          const y1 = indicatorAngle.y - (indicatorAngle.y - 220) * 0.125;
          const x2 = indicatorAngle.x + (indicatorAngle.x - 250) * 0.125;
          const y2 = indicatorAngle.y + (indicatorAngle.y - 220) * 0.125;

          return (
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#ff0000"
              strokeWidth="3"
            />
          );
        })()}

        {/* Tick marks and rotated labels */}
        {ticks.map((tick) => {
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
            <g key={tick.value}>
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
            </g>
          );
        })}

        {/* Current value marker */}
        <g>
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
            {achValue.toFixed(2)}
          </text>
        </g>

        {/* Arrow/needle pointing to the current value */}
        <g
          style={{
            transform: `rotate(${needleAngle}deg)`,
            transformOrigin: "250px 220px",
          }}
        >
          <path
            d="M 250,110 L 260,140 L 255,140 L 255,220 L 245,220 L 245,140 L 240,140 Z"
            fill="url(#arrow-gradient)"
            stroke="none"
          />
        </g>

        {/* Value display - positioned at the bottom center */}
        <text
          x="250"
          y="270"
          fill="#333333"
          fontSize="16"
          fontWeight="500"
          textAnchor="middle"
        >
          Air Changes per Hour (ACH)
        </text>
      </svg>
    </div>
  );
};
