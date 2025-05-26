import {
  CheckCircle,
  CreditCard,
  DollarSign,
  HelpCircle,
  Mail,
  Phone,
  PiggyBank,
  Zap,
} from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 overflow-auto p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Incentives & Savings</h1>
      <p className="text-gray-600 mb-6">
        Making your upgrades more affordable — and your investment go further.
      </p>

      {/* Introduction Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            Making Home Upgrades Affordable
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            Upgrading your home is about more than just saving energy. It's
            about creating a more comfortable, healthier space — and knowing
            you're making a smart, lasting investment. The good news? You don't
            have to take it on alone.
          </p>

          <p className="text-gray-700">
            Thanks to New Jersey's regional utility programs, you may be
            eligible for generous rebates and low- or no-interest financing that
            help reduce the cost of your improvements. We're here to help you
            access those benefits — without the guesswork.
          </p>
        </div>
      </div>

      {/* What You May Qualify For Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <PiggyBank size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            What You May Qualify For
          </h3>
        </div>

        <p className="text-gray-700 mb-4">
          Eligibility depends on your utility provider, the work being
          performed, and the energy performance of your home — but most Ciel
          customers qualify for:
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
            <div className="mt-1 text-[#68BEB9]">
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

      {/* Keeping Out-of-Pocket Costs Low Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            Keeping Out-of-Pocket Costs Low
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            One of the most important benefits of these programs is their
            ability to significantly reduce or eliminate your out-of-pocket
            costs.
          </p>

          <p className="text-gray-700">
            In fact, most of our customers complete their upgrades without
            paying anything upfront. With rebates applied directly and financing
            options structured to keep monthly costs manageable, energy
            improvements have never been more accessible.
          </p>

          <p className="text-gray-700">
            We'll help you understand your options and choose a path that fits
            your comfort and your budget.
          </p>
        </div>
      </div>

      {/* How We Support You Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Zap size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            How We Support You
          </h3>
        </div>

        <p className="text-gray-700 mb-4">
          You won't need to track down forms, dig through program rules, or
          figure this out on your own. We handle the process — and keep you
          informed along the way.
        </p>

        <p className="text-gray-700 mb-4">Here's what to expect:</p>

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
          If there are any decisions you need to make, we'll walk you through
          them clearly and without pressure.
        </p>
      </div>

      {/* Still Have Questions Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            Still Have Questions?
          </h3>
        </div>

        <p className="text-gray-700 mb-4">
          Whether you're wondering what's available to you, want help
          understanding your options, or just want reassurance that things are
          on track — we're here.
        </p>

        <p className="text-gray-700 mb-4">Contact your Ciel team anytime:</p>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-[#68BEB9]" />
            <span className="text-[#68BEB9] font-medium">
              info@cielpower.com
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-[#68BEB9]" />
            <span className="text-[#68BEB9] font-medium">201-632-3463</span>
          </div>
        </div>

        <p className="text-gray-700 mt-4">
          You've already made a smart investment in your home. We're here to
          help you make the most of it — with as little financial stress as
          possible.
        </p>
      </div>
    </div>
  );
};

export default page;
