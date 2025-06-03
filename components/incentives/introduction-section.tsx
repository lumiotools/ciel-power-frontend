"use client";

import { DollarSign } from "lucide-react";

export function IntroductionSection() {
  return (
    <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <DollarSign size={24} className="text-[#68BEB9]" />
        <h3 className="text-xl font-semibold text-gray-700">
          Making Home Upgrades Affordable
        </h3>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          Upgrading your home is about more than just saving energy. It&apos;s
          about creating a more comfortable, healthier space — and knowing
          you&apos;re making a smart, lasting investment. The good news? You
          don&apos;t have to take it on alone.
        </p>

        <p className="text-gray-700">
          Thanks to New Jersey&apos;s regional utility programs, you may be
          eligible for generous rebates and low- or no-interest financing that
          help reduce the cost of your improvements. We&apos;re here to help you
          access those benefits — without the guesswork.
        </p>
      </div>
    </div>
  );
}
