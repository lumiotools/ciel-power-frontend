"use client";

import { CreditCard } from "lucide-react";

export function CostSection() {
  return (
    <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <CreditCard size={24} className="text-[#68BEB9]" />
        <h3 className="text-xl font-semibold text-gray-700">
          Keeping Out-of-Pocket Costs Low
        </h3>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          One of the most important benefits of these programs is their ability
          to significantly reduce or eliminate your out-of-pocket costs.
        </p>

        <p className="text-gray-700">
          In fact, most of our customers complete their upgrades without paying
          anything upfront. With rebates applied directly and financing options
          structured to keep monthly costs manageable, energy improvements have
          never been more accessible.
        </p>

        <p className="text-gray-700">
          We&apos;ll help you understand your options and choose a path that
          fits your comfort and your budget.
        </p>
      </div>
    </div>
  );
}
