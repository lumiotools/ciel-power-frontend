"use client";

import type React from "react";
import { motion } from "framer-motion";

const FailedPayment: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 mx-auto mb-4"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-red-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M19 5L5 19M5.00001 5L19 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-2xl font-semibold text-gray-800 mb-2"
          >
            Payment Failed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-gray-600 mb-6"
          >
            re sorry, but there was an issue processing your payment. Please try
            again or contact support.
          </motion.p>
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            <Link href="/checkout">
              <motion.span
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.span>
            </Link>
            <div>
              <Link href="/support">
                <motion.span
                  className="inline-block text-blue-500 hover:text-blue-600 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Support
                </motion.span>
              </Link>
            </div>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};

export default FailedPayment;
