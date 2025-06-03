"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Zap } from "lucide-react";

export function PSEGProgram() {
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
            PSE&G Whole Home Energy Solutions Program
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
            Delivered in partnership with Ciel Power LLC, an approved
            participating contractor
          </p>

          {/* Program Overview */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Program Overview
            </h4>
            <p className="text-gray-700 mb-4">
              The PSE&G Whole Home Energy Solutions Program helps New Jersey
              homeowners reduce energy use, improve comfort, and lower utility
              bills through a customized, whole-house approach.
            </p>

            <p className="text-gray-700 mb-4">
              As a PSE&G customer, you may qualify for:
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
                  0% interest On-Bill Repayment up to $25,000 to finance
                  upgrades
                </span>
              </div>
            </div>

            <p className="text-gray-700">
              When you work with Ciel Power LLC, a participating contractor in
              the program, we guide you from start to finish. Our team uses
              industry-standard testing and energy modeling to identify the most
              impactful upgrades—and helps you take advantage of all available
              incentives.
            </p>
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
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-700">
                <strong>Official Program Links:</strong> See PSE&G&apos;s Whole
                Home Energy Solutions page for program details. PSE&G also
                provides a Program FAQ and phone support for questions
                (1-855-846-2895).
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h6 className="font-semibold text-gray-700 mb-2">
                Additional Programs – Income-Qualified:
              </h6>
              <p className="text-gray-700">
                PSE&G offers a Home Weatherization program for income-qualified
                customers. This provides a free energy assessment and no-cost
                efficiency upgrades for eligible households.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
