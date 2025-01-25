"use client"

import type React from "react"
import { motion } from "framer-motion"

const SuccessPayment: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 rounded-full bg-green-500 mx-auto mb-4 flex items-center justify-center"
          >
            <motion.svg
              className="w-16 h-16 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </motion.svg>
          </motion.div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been processed successfully.</p>
        </div>
      </div>
    </div>
  )
}

export default SuccessPayment

