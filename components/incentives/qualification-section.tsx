"use client";

import { PiggyBank, CheckCircle } from "lucide-react";

export function QualificationSection() {
  return (
    <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <PiggyBank size={24} className="text-[#68BEB9]" />
        <h3 className="text-xl font-semibold text-gray-700">
          What You May Qualify For
        </h3>
      </div>

      <p className="text-gray-700 mb-4">
        Eligibility depends on your utility provider, the work being performed,
        and the energy performance of your home — but most Ciel customers
        qualify for:
      </p>

      <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-[#68BEB9]">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-gray-700 font-medium">
              Up to $6,000 in cash-back incentives
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-[-68BEB9]">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-gray-700 font-medium">
              Up to $25,000 in zero-interest financing for qualifying upgrades
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-[#68BEB9]">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-gray-700 font-medium">
              Additional utility-based program benefits specific to your
              provider
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mt-4">
        These programs are designed to reward energy-saving improvements like
        insulation, air sealing, high-efficiency heating and cooling systems,
        and more.
      </p>
    </div>
  );
}
