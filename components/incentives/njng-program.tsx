"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Zap } from "lucide-react";

export function NJNGProgram() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <Zap size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            New Jersey Natural Gas (NJNG) SAVEGREEN Whole Home Energy Solutions
            Program
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp size={24} className="text-gray-500" />
        ) : (
          <ChevronDown size={24} className="text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="px-6 pb-6">
          <p className="text-gray-700 mb-4 font-medium">
            Administered through the SAVEGREEN® Project
          </p>

          {/* Program Overview */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Program Overview
            </h4>
            <p className="text-gray-700 mb-4">
              The NJNG Whole Home Energy Solutions Program, offered under the
              SAVEGREEN® umbrella, is designed to help natural gas customers
              improve home efficiency through a holistic, building-science-based
              approach.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <CheckCircle size={16} className="text-[#68BEB9] mt-0.5" />
                <span className="text-gray-700">
                  Up to $6,000 in performance-based rebates
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <CheckCircle size={16} className="text-[#68BEB9] mt-0.5" />
                <span className="text-gray-700">
                  0% interest financing up to $25,000, with monthly payments
                  added to your NJNG gas bill
                </span>
              </div>
            </div>
          </div>

          {/* Rebate Table */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Rebate Structure
            </h4>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-[#68BEB9] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">
                      Modeled Energy Savings
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Rebate Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-700">5%</td>
                    <td className="px-4 py-3 text-gray-700">$2,000</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-700">10%</td>
                    <td className="px-4 py-3 text-gray-700">$3,000</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-700">15%</td>
                    <td className="px-4 py-3 text-gray-700">$4,000</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-700">20%</td>
                    <td className="px-4 py-3 text-gray-700">$5,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">25%+</td>
                    <td className="px-4 py-3 text-gray-700">$6,000 (max)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h6 className="font-semibold text-gray-700 mb-2">
                Additional NJNG Programs:
              </h6>
              <p className="text-gray-700">
                NJNG has robust offerings for customers of different income
                levels. For moderate-income households, NJNG offers a Home
                Weatherization Program with free efficiency upgrades for
                qualified customers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
