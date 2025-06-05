"use client";

import { Zap } from "lucide-react";

export function SupportSection() {
  return (
    <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Zap size={24} className="text-[#68BEB9]" />
        <h3 className="text-xl font-semibold text-gray-700">
          How We Support You
        </h3>
      </div>

      <p className="text-gray-700 mb-4">
        You won&apos;t need to track down forms, dig through program rules, or
        figure this out on your own. We handle the process — and keep you
        informed along the way.
      </p>

      <p className="text-gray-700 mb-4">Here&apos;s what to expect:</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-start p-3 bg-white rounded-md border border-gray-200">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium mr-3">
            1
          </div>
          <div className="flex-1">
            <p className="text-gray-700">
              We confirm your eligibility and explain your options
            </p>
          </div>
        </div>

        <div className="flex items-start p-3 bg-white rounded-md border border-gray-200">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium mr-3">
            2
          </div>
          <div className="flex-1">
            <p className="text-gray-700">
              We prepare and submit your paperwork
            </p>
          </div>
        </div>

        <div className="flex items-start p-3 bg-white rounded-md border border-gray-200">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium mr-3">
            3
          </div>
          <div className="flex-1">
            <p className="text-gray-700">
              We keep you posted if anything is needed from you
            </p>
          </div>
        </div>

        <div className="flex items-start p-3 bg-white rounded-md border border-gray-200">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium mr-3">
            4
          </div>
          <div className="flex-1">
            <p className="text-gray-700">
              We coordinate disbursement once your project is approved
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mt-4">
        If there are any decisions you need to make, we&apos;ll walk you through
        them clearly and without pressure.
      </p>
    </div>
  );
}
