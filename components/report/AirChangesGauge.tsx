"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface AirChangesGaugeProps {
  value: number
  minValue?: number
  maxValue?: number
  title?: string
  subtitle?: string
  showCard?: boolean
  width?: string
  height?: string
}

export default function AirChangesGauge({
  value,
  minValue = 0,
  maxValue = 2.0,
  title = "Your Air Changes",
  subtitle = "per Hour (ACH)",
  showCard = true,
  width = "100%",
  height = "auto",
}: AirChangesGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animatedValue, setAnimatedValue] = useState(0)

  // Animate the value when it changes
  useEffect(() => {
    const startValue = animatedValue
    const endValue = Math.min(Math.max(value, minValue), maxValue)
    const startTime = performance.now()
    const duration = 1000 // 1 second animation

    const animateValue = (timestamp: number) => {
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Easing function for smoother animation
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      const currentValue = startValue + (endValue - startValue) * easeProgress
      setAnimatedValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animateValue)
      }
    }

    requestAnimationFrame(animateValue)
  }, [value, minValue, maxValue])

  // Draw the gauge
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Adjust centerY to move the gauge downward
    const centerX = rect.width / 2;
    const centerY = rect.height * 0.6; // Move the gauge further down
    const radius = Math.min(rect.width / 2, rect.height * 0.6) * 0.9;

    // Draw gauge background
    drawGauge(ctx, centerX, centerY, radius, minValue, maxValue, animatedValue);
  }, [animatedValue, minValue, maxValue]);

  // Function to draw the gauge
  const drawGauge = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    minValue: number,
    maxValue: number,
    currentValue: number,
  ) => {
    // Set angles for a top semi-circle from right to left
    const startAngle = Math.PI // 180 degrees (left side)
    const endAngle = 2 * Math.PI // 360/0 degrees (right side)
    const totalAngle = endAngle - startAngle

    // Create gradient for gauge background
    const gradient = ctx.createConicGradient(0, centerX, centerY)

    // Calculate color stop positions based on value ranges
    // For a top semi-circle from 180° to 360°:
    // - 0 value is at 360° (right side)
    // - 2.0 value is at 180° (left side)

    // Convert value ranges to normalized positions (0-1)
    const greenEnd = 0.35 / maxValue // 0.35 / 2.0 = 0.175
    const yellowEnd = 1.0 / maxValue // 1.0 / 2.0 = 0.5

    // Convert normalized positions to angle positions (0.5-1.0 for top semi-circle)
    // 0.5 corresponds to 180° (left), 1.0 corresponds to 360° (right)
    const greenEndPos = 1.0 - greenEnd * 0.5 // Map to 0.5-1.0 range
    const yellowEndPos = 1.0 - yellowEnd * 0.5 // Map to 0.5-1.0 range

    // Create a smoother gradient
    // Red range (high values - left side)
    gradient.addColorStop(0.5, "#dc2626") // Red (left side - high value)
    gradient.addColorStop(yellowEndPos - 0.05, "#dc2626") // Red
    gradient.addColorStop(yellowEndPos, "#ea580c") // Orange

    // Yellow/Orange range (middle values)
    gradient.addColorStop(yellowEndPos + 0.05, "#f97316") // Light orange
    gradient.addColorStop((yellowEndPos + greenEndPos) / 2, "#f7c500") // Yellow

    // Green range (low values - right side)
    gradient.addColorStop(greenEndPos - 0.05, "#84cc16") // Light green
    gradient.addColorStop(greenEndPos, "#00b050") // Green
    gradient.addColorStop(1.0, "#00b050") // Green (right side - low value)

    // Draw gauge background - use top half
    ctx.beginPath()
    ctx.lineWidth = radius * 0.2
    ctx.strokeStyle = gradient
    ctx.arc(centerX, centerY, radius * 0.9, startAngle, endAngle, false)
    ctx.stroke()

    // Draw tick marks and labels
    drawTickMarks(ctx, centerX, centerY, radius, minValue, maxValue)

    // Calculate needle position
    // Map value directly to angle (0 -> 0/360 deg, 2.0 -> 180 deg)
    const valueRatio = 1 - (currentValue - minValue) / (maxValue - minValue)
    const needleAngle = startAngle + totalAngle * valueRatio

    // Draw needle
    drawNeedle(ctx, centerX, centerY, radius, needleAngle)

    // Draw inner dotted circle
    // drawDottedCircle(ctx, centerX, centerY, radius * 0.7)
  }

  // Function to draw tick marks and labels
  const drawTickMarks = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    minValue: number,
    maxValue: number,
  ) => {
    const startAngle = Math.PI
    const endAngle = 2 * Math.PI
    const totalAngle = endAngle - startAngle

    // Define major tick values
    const majorTicks = [0, 0.25, 0.5, 0.95, 1.0, 2.0]

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#000"
    ctx.font = `${radius * 0.08}px Arial`

    majorTicks.forEach((tick) => {
      if (tick >= minValue && tick <= maxValue) {
        // Invert the value ratio for tick positions
        const valueRatio = 1 - (tick - minValue) / (maxValue - minValue)
        const tickAngle = startAngle + totalAngle * valueRatio

        // Calculate tick position - ensure they're on the top half
        const outerX = centerX + Math.cos(tickAngle) * (radius * 1.05)
        const outerY = centerY + Math.sin(tickAngle) * (radius * 1.05)
        const innerX = centerX + Math.cos(tickAngle) * (radius * 0.8)
        const innerY = centerY + Math.sin(tickAngle) * (radius * 0.8)

        // Draw tick line
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = "#fff"
        ctx.moveTo(innerX, innerY)
        ctx.lineTo(outerX, outerY)
        ctx.stroke()

        // Draw tick label
        const labelX = centerX + Math.cos(tickAngle) * (radius * 1.2)
        const labelY = centerY + Math.sin(tickAngle) * (radius * 1.2)

        // Format the tick label
        let tickLabel = tick.toString()
        if (tick === 2.0) {
          tickLabel = "2.0+"
        }

        ctx.fillText(tickLabel, labelX, labelY)
      }
    })
  }

  // Function to draw the needle
  const drawNeedle = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    angle: number,
  ) => {
    // Draw needle
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(angle)

    // Create gradient for needle
    const needleGradient = ctx.createLinearGradient(0, 0, radius, 0)
    needleGradient.addColorStop(0, "#1a56db") // Dark blue at base
    needleGradient.addColorStop(1, "#3b82f6") // Lighter blue at tip

    // Draw needle triangle
    ctx.beginPath()
    ctx.moveTo(0, -radius * 0.05)
    ctx.lineTo(radius * 0.9, 0)
    ctx.lineTo(0, radius * 0.05)
    ctx.fillStyle = needleGradient
    ctx.fill()

    // Draw needle base circle
    ctx.beginPath()
    ctx.arc(0, 0, radius * 0.08, 0, Math.PI * 2)
    ctx.fillStyle = "#1a56db"
    ctx.fill()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.restore()
  }

  const canvasContent = (
    <div className="relative aspect-[2/1.2]" style={{ width, height }}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ touchAction: "none" }} />
    </div>
  )

  if (showCard) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">{canvasContent}</CardContent>
      </Card>
    )
  }

  return canvasContent
}
