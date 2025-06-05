"use client";

import {
  LogOut,
  FileText,
  Award,
  LayoutDashboard,
  DollarSign,
  Leaf,
  Zap,
  Home,
  Percent,
  FileCheck,
  Share2,
  ArrowRight,
  CheckCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AffiliateProgram() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#a6d66b] flex flex-col">
        <div className="p-6">
          <div className="flex items-center">
            <Image
              src="/ciel-power-logo.png"
              alt="Ciel Power Logo"
              width={130}
              height={50}
              className="mt-2"
            />
          </div>
        </div>

        {/* Sidebar buttons */}
        <div className="flex-1 flex flex-col gap-4 px-4 mt-4">
          <Link href="/dashboard">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </button>
          </Link>

          <Link href="/report">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <FileText size={20} />
              <span className="font-medium">Your Report</span>
            </button>
          </Link>

          <Link href="/pearl-certification">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <Award size={20} />
              <span className="font-medium">Pearl Certification</span>
            </button>
          </Link>

          <Link href="/incentives">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <DollarSign size={20} />
              <span className="font-medium">Incentives</span>
            </button>
          </Link>

          <Link href="/tax-credits">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <Percent size={20} />
              <span className="font-medium">Tax Credits</span>
            </button>
          </Link>

          <Link href="/document-portal">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <FileCheck size={20} />
              <span className="font-medium">Document Portal</span>
            </button>
          </Link>

          <Link href="/knowledge-base">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <Zap size={20} />
              <span className="font-medium">Knowledge Base</span>
            </button>
          </Link>

          <Link href="/about-us">
            <button className="w-full flex items-center gap-3 text-white p-3 pl-6 text-left">
              <Home size={20} />
              <span className="font-medium">About Us</span>
            </button>
          </Link>

          {/* <Link href="/affiliate-program">
            <button className="w-full flex items-center gap-3 bg-[#8bc34a] text-white rounded-full p-3 pl-6 text-left">
              <Leaf size={20} />
              <span className="font-medium">Affiliate Program</span>
            </button>
          </Link> */}
        </div>

        <div className="p-6 mt-auto">
          <button className="flex items-center gap-2 text-white">
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 bg-white">
        <h1 className="text-2xl font-bold mb-6">Share the Comfort</h1>
        <p className="text-gray-600 mb-6">
          Refer a friend. Help them feel better at home — and get rewarded when
          they do.
        </p>

        {/* Introduction Section */}
        <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Share2 size={24} className="text-[#8bc34a]" />
            <h3 className="text-xl font-medium text-gray-700">
              Our Affiliate Program
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">
              If you&apos;ve had a great experience with Ciel, we&apos;d love
              for you to share it.
            </p>

            <p className="text-gray-700">
              Our affiliate program is a simple way to pay your experience
              forward to friends, neighbors, and family members — and get
              something back in return when they move forward on their own home
              energy journey.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <ArrowRight size={24} className="text-[#8bc34a]" />
            <h3 className="text-xl font-medium text-gray-700">
              Here&apos;s How It Works
            </h3>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-start p-3 bg-white rounded-md border border-[#e0f0d0]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8bc34a] text-white flex items-center justify-center font-medium mr-3">
                1
              </div>
              <div className="flex-1">
                <p className="text-gray-700 font-medium">Invite a Friend</p>
                <p className="text-gray-600 mt-1">
                  Send them your personal referral link or have them mention
                  your name when booking a free home energy audit.
                </p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-white rounded-md border border-[#e0f0d0]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8bc34a] text-white flex items-center justify-center font-medium mr-3">
                2
              </div>
              <div className="flex-1">
                <p className="text-gray-700 font-medium">
                  They Schedule an Audit
                </p>
                <p className="text-gray-600 mt-1">
                  They&apos;ll receive the same care, professionalism, and
                  insights you experienced — all at no cost to them.
                </p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-white rounded-md border border-[#e0f0d0]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8bc34a] text-white flex items-center justify-center font-medium mr-3">
                3
              </div>
              <div className="flex-1">
                <p className="text-gray-700 font-medium">You Get Rewarded</p>
                <p className="text-gray-600 mt-1">
                  If your referral moves forward with a project, you&apos;ll
                  receive $250 as a thank you. It&apos;s our way of showing
                  appreciation for your trust — and for helping others make
                  their homes more comfortable and efficient.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why It Matters Section */}
        <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Users size={24} className="text-[#8bc34a]" />
            <h3 className="text-xl font-medium text-gray-700">
              Why It Matters
            </h3>
          </div>

          <p className="text-gray-700 mb-4">Your referral helps more people:</p>

          <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#8bc34a]">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Feel better in their homes
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#8bc34a]">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Lower their energy bills
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#8bc34a]">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Take advantage of utility rebates and financing
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 mb-4 border border-[#e0f0d0]">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#8bc34a]">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Live more sustainably — and comfortably
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ready to Refer Section */}
        <div className="mt-8 mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Leaf size={24} className="text-[#8bc34a]" />
            <h3 className="text-xl font-medium text-gray-700">
              Ready to Refer Someone?
            </h3>
          </div>

          <div className="flex flex-col items-center justify-center py-6">
            <button className="bg-[#8bc34a] hover:bg-[#7cb342] text-white font-medium py-3 px-6 rounded-lg transition-colors mb-4">
              Share Your Referral Link
            </button>
            <p className="text-gray-700 text-center">
              Or have your friend mention your name when they schedule their
              audit.
              <br />
              We&apos;ll take care of the rest — and we&apos;ll let you know
              when they&apos;re on their way to a better home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
