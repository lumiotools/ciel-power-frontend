"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, DollarSign, Zap, ShoppingCart, Droplet } from "lucide-react"

interface SolutionItem {
  title: string
  icon: React.ReactNode
  description: string
}

interface FutureSolutionsProps {
  data?: {
    title?: string
    solutions?: SolutionItem[]
  }
}

export function FutureSolutions({ data }: FutureSolutionsProps) {
  // Default solutions if none are provided
  const [solutions] = useState<SolutionItem[]>(
    data?.solutions || [
      {
        title: "Inflation Reduction Act",
        icon: <DollarSign className="h-5 w-5" />,
        description:
          "Thanks to the Inflation Reduction Act, homeowners may be eligible for renewable tax credits each year through 2032 for purchasing energy-efficient items such as windows, doors, renewable energy systems, and more. These tax credits renew each year and can offset the cost of upgrading your home to be more energy-efficient.",
      },
      {
        title: "Heat Pumps",
        icon: <Zap className="h-5 w-5" />,
        description:
          "Most of New Jersey's utility providers are offering valuable incentives for upgrading to high-efficiency heat pumps as part of the transition to cleaner energy. These programs support both full and partial equipment replacements, with financing options available to help cover costs not included in the incentives. Upgrading to heat pump technology through these programs can reduce your carbon footprint, improve energy efficiency, and enhance home comfort.",
      },
      {
        title: "Appliances",
        icon: <ShoppingCart className="h-5 w-5" />,
        description:
          "We recommend ENERGY STAR®-rated appliances for their energy efficiency and performance. Not only do they use less energy, but they also perform better and last longer. Keep in mind that appliances were not a part of the energy audit we conducted at your home, but we always recommend considering energy efficiency when it comes to appliances. In particular, if you're thinking about upgrading your kitchen appliances, consider making the switch to an ENERGY STAR®-rated electric induction cooktop.",
      },
      {
        title: "Other Suggestions",
        icon: <Droplet className="h-5 w-5" />,
        description:
          "While we didn't specifically check out the lighting or faucets in your home during our evaluation, we have some recommendations for you. We suggest using ENERGY STAR® and WaterSense-rated fixtures and bulbs to help save on water and energy costs. And, if you have outdoor fixtures or other areas where it makes sense, installing timers or motion sensors can be a great way to save even more. Plus, good news! You can find these energy-efficient products at a discounted rate in the PSE&G, NJNG, and JCP&L Marketplace. Give it a try!",
      },
    ],
  )

  // Consistent card style matching Overview component
  const cardStyle = "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden"

  return (
    <div className={cardStyle}>
      <div className="py-3 px-5" style={{ backgroundColor: "#67B5021A" }}>
        <h2 
          className="flex items-center gap-2 font-medium" 
          style={{ color: "#67B502" }}
        >
          <Clock className="h-5 w-5" style={{ color: "#67B502" }} />
          Other Future Solutions
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {solutions.map((solution, index) => (
            <motion.div
              key={`solution-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="p-5 rounded-lg"
              style={{ backgroundColor: "#67B5020A" }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                  style={{ backgroundColor: "#67B5021A" }}
                >
                  <span style={{ color: "#67B502" }}>{solution.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-2" style={{ color: "#67B502" }}>{solution.title}</div>
                  <div className="text-gray-700 text-sm">{solution.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}