"use client";

import { HelpCircle, Mail, Phone } from "lucide-react";

export function QuestionsSection() {
  return (
    <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <HelpCircle size={24} className="text-[#68BEB9]" />
        <h3 className="text-xl font-semibold text-gray-700">
          Still Have Questions?
        </h3>
      </div>

      <p className="text-gray-700 mb-4">
        Whether you&apos;re wondering what&apos;s available to you, want help
        understanding your options, or just want reassurance that things are on
        track — we&apos;re here.
      </p>

      <p className="text-gray-700 mb-4">Contact your Ciel team anytime:</p>

      <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <Mail size={20} className="text-[#68BEB9]" />
          <span className="text-[#68BEB9] font-medium">info@cielpower.com</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <Phone size={20} className="text-[#68BEB9]" />
          <span className="text-[#68BEB9] font-medium">201-632-3463</span>
        </div>
      </div>

      <p className="text-gray-700 mt-4">
        You&apos;ve already made a smart investment in your home. We&apos;re
        here to help you make the most of it — with as little financial stress
        as possible.
      </p>
    </div>
  );
}
