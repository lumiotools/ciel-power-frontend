"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface PercentageGaugeProps {
  value: number
  minValue?: number
  maxValue?: number
  title?: string
  subtitle?: string
  showCard?: boolean
  width?: string
  height?: string
}

export default function PercentageGauge({
  value,
  minValue = 0,
  maxValue = 100,
  title = "Efficiency Rating",
  subtitle = "",
  showCard = true,
  width = "100%",
  height = "auto",
}: PercentageGaugeProps) {
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
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    const centerX = rect.width / 2
    const centerY = rect.height * 0.7 // Position center in the lower part to show top semi-circle
    const radius = Math.min(rect.width / 2, rect.height * 0.6) * 0.9

    // Draw gauge background
    drawGauge(ctx, centerX, centerY, radius, minValue, maxValue, animatedValue)

    // Draw value text
    drawValueText(ctx, centerX, centerY, radius, animatedValue)
  }, [animatedValue, minValue, maxValue])

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

    // Create a smoother gradient from red to green
    // For percentage efficiency, higher is better
    gradient.addColorStop(0.5, "#65a30d") // Green (left side - high value)
    gradient.addColorStop(0.6, "#84cc16") // Light green
    gradient.addColorStop(0.7, "#ca8a04") // Yellow
    gradient.addColorStop(0.8, "#f59e0b") // Amber
    gradient.addColorStop(0.9, "#ea580c") // Orange
    gradient.addColorStop(1.0, "#dc2626") // Red (right side - low value)

    // Draw gauge background - use top half
    ctx.beginPath()
    ctx.lineWidth = radius * 0.2
    ctx.strokeStyle = gradient
    ctx.arc(centerX, centerY, radius * 0.9, startAngle, endAngle, false)
    ctx.stroke()

    // Draw tick marks and labels
    drawTickMarks(ctx, centerX, centerY, radius, minValue, maxValue)

    // Calculate needle position
    // Map value directly to angle (0 -> 0/360 deg, maxValue -> 180 deg)
    // For percentage, higher is better, so we invert the ratio
    const valueRatio = currentValue / maxValue
    const needleAngle = startAngle + totalAngle * (1 - valueRatio)

    // Draw needle
    drawNeedle(ctx, centerX, centerY, radius, needleAngle)
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

    // Define major tick values for percentage (0-100)
    const majorTicks = [0, 25, 50, 75, 100]

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#000"
    ctx.font = `${radius * 0.08}px Arial`

    majorTicks.forEach((tick) => {
      if (tick >= minValue && tick <= maxValue) {
        // For percentage, higher is better, so we invert the ratio
        const valueRatio = tick / maxValue
        const tickAngle = startAngle + totalAngle * (1 - valueRatio)

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
        const tickLabel = `${tick}%`

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
    needleGradient.addColorStop(0, "#b45309") // Dark amber at base
    needleGradient.addColorStop(1, "#d97706") // Lighter amber at tip

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
    ctx.fillStyle = "#b45309"
    ctx.fill()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.restore()
  }

  // Function to draw value text
  const drawValueText = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    value: number,
  ) => {
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Position text above the gauge in the top half
    const textY = centerY - radius * 0.5

    // Draw title
    ctx.font = `bold ${centerX * 0.1}px Arial`
    ctx.fillStyle = "#b45309"
    ctx.fillText(title, centerX, textY)

    // Draw subtitle if provided
    if (subtitle) {
      ctx.font = `${centerX * 0.08}px Arial`
      ctx.fillStyle = "#000"
      ctx.fillText(subtitle, centerX, textY + centerX * 0.12)
    }

    // Draw value
    ctx.font = `bold ${centerX * 0.18}px Arial`
    ctx.fillStyle = "#b45309"
    ctx.fillText(`${Math.round(value)}%`, centerX, textY + centerX * 0.28)
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
