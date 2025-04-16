"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface RValueGaugeProps {
  value: number
  minValue?: number
  maxValue?: number
  title?: string
  subtitle?: string
  showCard?: boolean
  width?: string
  height?: string
}

export default function RValueGauge({
  value,
  minValue = 0,
  maxValue = 60,
  title = "Current R-Value",
  subtitle = "",
  showCard = true,
  width = "100%",
  height = "auto",
}: RValueGaugeProps) {
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

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, rect.width, rect.height)

    const centerX = rect.width / 2
    const centerY = rect.height * 0.9 // Adjusted for taller gauge
    const radius = Math.min(rect.width / 2, rect.height * 0.7) * 0.85 // Reduced to leave margin

    drawGauge(ctx, centerX, centerY, radius, minValue, maxValue, animatedValue)
  }, [animatedValue, minValue, maxValue])

  const drawGauge = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    minValue: number,
    maxValue: number,
    currentValue: number,
  ) => {
    const startAngle = Math.PI
    const endAngle = 2 * Math.PI
    const totalAngle = endAngle - startAngle

    const gradient = ctx.createConicGradient(0, centerX, centerY)
    gradient.addColorStop(0.5, "#14b8a6")
    gradient.addColorStop(0.6, "#2dd4bf")
    gradient.addColorStop(0.7, "#eab308")
    gradient.addColorStop(0.8, "#f97316")
    gradient.addColorStop(0.9, "#ef4444")
    gradient.addColorStop(1.0, "#dc2626")

    ctx.beginPath()
    ctx.lineWidth = radius * 0.2
    ctx.strokeStyle = gradient
    ctx.arc(centerX, centerY, radius * 0.9, startAngle, endAngle, false)
    ctx.stroke()

    drawTickMarks(ctx, centerX, centerY, radius, minValue, maxValue)

    const valueRatio = currentValue / maxValue
    const needleAngle = startAngle + totalAngle * (1 - valueRatio)

    drawNeedle(ctx, centerX, centerY, radius, needleAngle)
  }

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

    let majorTicks: number[] = []

    if (maxValue <= 15) {
      majorTicks = [0, 3, 7, 10, 13]
    } else {
      majorTicks = [0, 15, 30, 45, 60]
    }

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#000"
    ctx.font = `${radius * 0.08}px Arial`

    majorTicks.forEach((tick) => {
      if (tick >= minValue && tick <= maxValue) {
        const valueRatio = tick / maxValue
        const tickAngle = startAngle + totalAngle * (1 - valueRatio)

        const outerX = centerX + Math.cos(tickAngle) * (radius * 1.05)
        const outerY = centerY + Math.sin(tickAngle) * (radius * 1.05)
        const innerX = centerX + Math.cos(tickAngle) * (radius * 0.8)
        const innerY = centerY + Math.sin(tickAngle) * (radius * 0.8)

        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = "#fff"
        ctx.moveTo(innerX, innerY)
        ctx.lineTo(outerX, outerY)
        ctx.stroke()

        const labelX = centerX + Math.cos(tickAngle) * (radius * 1.2)
        const labelY = centerY + Math.sin(tickAngle) * (radius * 1.2)

        const tickLabel = `R${tick}`

        ctx.fillText(tickLabel, labelX, labelY)
      }
    })
  }

  const drawNeedle = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    angle: number,
  ) => {
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(angle)

    const needleGradient = ctx.createLinearGradient(0, 0, radius, 0)
    needleGradient.addColorStop(0, "#0d9488")
    needleGradient.addColorStop(1, "#14b8a6")

    ctx.beginPath()
    ctx.moveTo(0, -radius * 0.05)
    ctx.lineTo(radius * 0.9, 0)
    ctx.lineTo(0, radius * 0.05)
    ctx.fillStyle = needleGradient
    ctx.fill()

    ctx.beginPath()
    ctx.arc(0, 0, radius * 0.08, 0, Math.PI * 2)
    ctx.fillStyle = "#0d9488"
    ctx.fill()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.restore()
  }

  const canvasContent = (
    <div
      className="relative aspect-[4/3]" // Increased aspect ratio for larger height and width
      style={{ width: "100%", height: "auto" }} // Ensures full width and dynamic height
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ touchAction: "none" }} />
    </div>
  )

  if (showCard) {
    return (
      <Card className="w-full max-w-full mx-auto"> {/* Set max width to full */}
        <CardContent className="p-16">{canvasContent}</CardContent> {/* Increased padding */}
      </Card>
    )
  }

  return canvasContent
}