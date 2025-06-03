"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Zap } from "lucide-react";

export function ETGProgram() {
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
            Elizabethtown Gas – Whole Home Energy Solutions Program
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
            Delivered in partnership with Ciel Power LLC
          </p>

          {/* Program Overview */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Program Overview
            </h4>
            <p className="text-gray-700 mb-4">
              The Elizabethtown Gas Whole Home Energy Solutions Program offers
              generous incentives and affordable 0% financing to help homeowners
              reduce their energy use, increase comfort, and modernize aging
              home systems. This program is part of New Jersey&apos;s larger
              Whole Home Energy Savings initiative, and it mirrors similar
              offerings across the state.
            </p>

            <p className="text-gray-700 mb-4">
              Now that you&apos;ve scheduled your Ciel Home Energy Audit,
              you&apos;re already on the path to unlocking up to $6,000 in
              performance-based rebates and up to $25,000 worth of 0% On-Bill
              Repayment (OBRP) financing through ETG.
            </p>

            <p className="text-gray-700 mb-4">
              To qualify for rebates, your project must achieve a minimum of 5%
              modeled energy savings, and include at least insulation and air
              sealing measures. Additional upgrades—such as high-efficiency
              heating equipment, water heaters, and smart thermostats—can be
              included to boost savings.
            </p>

            {/* ETG Rebate Table */}
            <div className="mb-4">
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

            <p className="text-gray-700 mb-4">
              The remaining balance can be financed at 0% interest for up to 10
              years. Loan terms include:
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <CheckCircle size={16} className="text-[#68BEB9] mt-0.5" />
                <span className="text-gray-700">
                  Up to $10,000: 7-year repayment (84 months)
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <CheckCircle size={16} className="text-[#68BEB9] mt-0.5" />
                <span className="text-gray-700">
                  Over $10,000 or income-qualified: 10-year repayment (120
                  months)
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <CheckCircle size={16} className="text-[#68BEB9] mt-0.5" />
                <span className="text-gray-700">
                  Payments appear on your Elizabethtown Gas bill
                </span>
              </div>
            </div>
          </div>

          {/* How to Participate - Step-by-Step */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              How to Participate – Step-by-Step
            </h4>

            {/* Step 1 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium">
                  1
                </div>
                <h5 className="text-md font-semibold text-gray-700">
                  Your Home Energy Assessment – Already Scheduled with Ciel
                </h5>
              </div>
              <p className="text-gray-700 mb-3 ml-11">
                Your Home Energy Audit with Ciel Power LLC has already been
                scheduled, so here&apos;s what to expect:
              </p>
              <div className="ml-11 space-y-1">
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    A BPI-certified energy professional will evaluate your
                    insulation levels, check air leakage using blower door
                    diagnostics, and inspect your furnace, boiler, water heater,
                    and ductwork
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    We&apos;ll also perform combustion safety testing to ensure
                    everything operates safely
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    Based on diagnostic results, we&apos;ll create a detailed
                    energy model to simulate your home&apos;s energy use and
                    identify which upgrades will deliver the highest return
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium">
                  2
                </div>
                <h5 className="text-md font-semibold text-gray-700">
                  Review Your Report & Choose Your Upgrades
                </h5>
              </div>
              <p className="text-gray-700 mb-3 ml-11">
                Following your assessment, you&apos;ll receive a customized
                energy audit report outlining:
              </p>
              <div className="ml-11 space-y-1 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    Recommended efficiency upgrades
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    Modeled energy savings and rebate eligibility
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">A proposed project cost</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    Monthly payment estimates if you finance through ETG&apos;s
                    On-Bill Repayment Program
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-3 ml-11">
                To qualify for incentives, your project must include both air
                sealing and insulation. You can add optional upgrades such as:
              </p>
              <div className="ml-11 space-y-1 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    High-efficiency gas furnaces, boilers, or water heaters
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    Duct sealing or ventilation improvements
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    ENERGY STAR central AC or heat pump systems
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    Building envelope enhancements
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-4 ml-11">
                Ciel Power will help you select the bundle of improvements that
                fits your goals, meets program requirements, and earns the
                maximum rebate.
              </p>

              <div className="ml-11 p-3 bg-blue-50 rounded-md border border-blue-200">
                <p className="text-gray-700 font-medium mb-1">Example:</p>
                <p className="text-gray-700">
                  Say your home has poor attic insulation and a 70% AFUE
                  furnace. Ciel recommends air sealing, insulating to R-49, and
                  upgrading to a 95% AFUE furnace. The project costs $10,000 and
                  achieves 25% modeled savings, earning you a $5,000 rebate. You
                  finance the remaining $5,000 at 0% interest—paid on your gas
                  bill.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium">
                  3
                </div>
                <h5 className="text-md font-semibold text-gray-700">
                  Approve Your Scope & Begin Installation
                </h5>
              </div>
              <p className="text-gray-700 mb-3 ml-11">
                Once you approve your proposal:
              </p>
              <div className="ml-11 space-y-1 mb-3">
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    Your project is pre-approved for rebates and financing
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    Ciel schedules installation and completes all work to ETG
                    program specifications
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    A post-installation inspection may be conducted by the
                    program administrator to verify performance and quality
                  </span>
                </div>
              </div>
              <p className="text-gray-700 ml-11">
                Ciel will coordinate directly with ETG to handle rebate
                documentation and loan setup.
              </p>
            </div>

            {/* Step 4 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68BEB9] text-white flex items-center justify-center font-medium">
                  4
                </div>
                <h5 className="text-md font-semibold text-gray-700">
                  Rebates & 0% Financing
                </h5>
              </div>
              <p className="text-gray-700 mb-3 ml-11">
                Once your project is complete and verified:
              </p>
              <div className="ml-11 space-y-1 mb-3">
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    ETG will issue your rebate (either as a check or deducted
                    from your invoice if pre-applied)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    Your 0% interest loan will be activated—repayable through
                    your Elizabethtown Gas bill
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#68BEB9]">•</span>
                  <span className="text-gray-700">
                    The loan is unsecured, with no fees, and you can prepay
                    anytime without penalty
                  </span>
                </div>
              </div>
              <p className="text-gray-700 ml-11">
                Loan eligibility includes a review of your billing history or
                credit, and you must be the property owner and account holder.
                If the property is sold or your gas service ends, the loan
                becomes due at that time.
              </p>
            </div>
          </div>

          {/* Program Status & Next Steps */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Program Status & Next Steps
            </h4>
            <p className="text-gray-700 mb-4">
              The Elizabethtown Gas Whole Home Energy Solutions Program is
              currently open and active, and with your audit already scheduled,
              you&apos;re well on your way. If you&apos;re a residential ETG
              customer who owns and lives in a 1–4 unit home heated with natural
              gas, you&apos;re eligible to receive up to $6,000 in rebates and
              0% financing up to $25,000.
            </p>
            <p className="text-gray-700 mb-4">
              Once your audit is complete, Ciel Power will guide you through
              your custom report, finalize your project scope, and help you
              access all available incentives and financing options. To learn
              more, visit the ETG Whole Home Energy Solutions website, or
              contact the Elizabethtown Gas Energy Efficiency team at
              1-201-690-7896. Financing applications are submitted through the
              Elizabethtown Gas EFS Application Portal. As your trusted
              participating contractor, Ciel Power is here to ensure a smooth,
              energy-smart upgrade experience—start to finish.
            </p>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h6 className="font-semibold text-gray-700 mb-2">
                Income-Qualified Programs:
              </h6>
              <p className="text-gray-700 mb-3">
                Elizabethtown Gas, like the other utilities, provides a Free
                Weatherization program for income-qualified customers. If your
                household income is within the specified moderate range (or you
                meet alternate criteria such as being in a designated
                moderate-income census tract), you can receive an energy audit
                and up to around $14,000 in free energy efficiency upgrades
                through ETG&apos;s Income-Qualified Weatherization offering
                (administered by CLEAResult on behalf of ETG).
              </p>
              <p className="text-gray-700 mb-3">
                These upgrades include insulation, air sealing, and possibly
                heating system improvements, all at no cost to you. The ETG
                Marketplace site specifically mentions this &quot;FREE Home
                Weatherization for Income-Qualified Customers&quot; program as a
                key offering. Customers should contact ETG (or visit the
                ETGSaveEnergy portal) to verify eligibility and apply.
              </p>
              <p className="text-gray-700 mb-3">
                For customers with lower incomes (generally those eligible for
                NJ&apos;s income assistance programs), Elizabethtown Gas also
                participates in Comfort Partners. Comfort Partners is
                implemented in ETG&apos;s territory to provide free installation
                of insulation, efficient lighting, refrigerators, and other
                measures that can dramatically lower energy bills for those who
                qualify. To access Comfort Partners, ETG customers can call
                866-657-6278 or visit the NJ Clean Energy website to fill out an
                application.
              </p>
              <p className="text-gray-700">
                Bottom line: ETG has multiple layers of support – from big
                rebates and 0% loans for standard customers to completely free
                upgrades for moderate- and low-income customers – ensuring all
                its customers can improve their homes&apos; energy efficiency
                and comfort.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
