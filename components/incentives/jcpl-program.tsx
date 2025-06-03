"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Zap } from "lucide-react";

export function JCPLProgram() {
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
            JCP&L Whole Home Energy Solutions Program
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
            Offered in partnership with Ciel Power LLC
          </p>

          {/* Program Overview */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Program Overview
            </h4>
            <p className="text-gray-700 mb-4">
              The JCP&L Whole Home Energy Solutions Program offers a
              comprehensive, building science–based approach to improving
              comfort, reducing energy waste, and lowering utility bills—all
              while making homes safer and more sustainable.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <CheckCircle size={16} className="text-[#68BEB9] mt-0.5" />
                <span className="text-gray-700">
                  Performance-based rebates up to $6,000
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <CheckCircle size={16} className="text-[#68BEB9] mt-0.5" />
                <span className="text-gray-700">
                  0% interest financing repaid on your monthly JCP&L electric
                  bill
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
                      Modeled Savings
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
                    <td className="px-4 py-3 text-gray-700">6%</td>
                    <td className="px-4 py-3 text-gray-700">$2,200</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-700">10%</td>
                    <td className="px-4 py-3 text-gray-700">$3,000</td>
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
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-700">
                <strong>Program Resources:</strong> Visit JCP&L&apos;s Whole
                Home Energy Solutions program page on EnergySaveNJ.com or call
                855-449-3090.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h6 className="font-semibold text-gray-700 mb-2">
                Additional Residential Programs:
              </h6>
              <p className="text-gray-700">
                JCP&L offers a Home Weatherization for Income-Qualified
                Customers program that provides free energy efficiency upgrades
                for moderate-income households.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
