import { Home, Heart, Trophy, Award, Lightbulb, Newspaper, History } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 overflow-auto p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">About Ciel Power</h1>
      <p className="text-gray-600 mb-6">
        Partnering with you to make homes healthier, more comfortable, and
        better for the planet.
      </p>

      {/* Introduction Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Home size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">Our Mission</h3>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            At Ciel Power, we believe your home should support the way you live
            — every season, every day. Since 2010, we've worked alongside New
            Jersey homeowners to deliver thoughtful, high-impact improvements
            that make homes more comfortable, more efficient, and more resilient
            for the long term.
          </p>

          <p className="text-gray-700">
            We're not here to push products. We're here to listen, assess, and
            help you take smart steps toward a better-performing home — and
            we're honored to be part of your journey.
          </p>
        </div>
      </div>

      {/* Why We Do This Work Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Heart size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            Why We Do This Work
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            Every home has room to perform better. Whether it's a drafty
            hallway, high utility bills, or an aging HVAC system, most homes are
            doing more work than they need to — and costing more in the process.
          </p>

          <p className="text-gray-700 font-medium">We exist to change that.</p>

          <p className="text-gray-700">
            Our team is trained to look beneath the surface — to uncover what's
            really going on in your home's energy systems and help you
            prioritize improvements that make a meaningful difference. The
            result? A home that works better, feels better, and costs less to
            operate.
          </p>
        </div>
      </div>

      {/* Where We've Been Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <History size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            Where We've Been
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            Since opening our doors in 2010, we've grown into one of New
            Jersey's leading residential energy efficiency providers, proudly
            delivering home energy audits and performance upgrades across dozens
            of communities.
          </p>

          <p className="text-gray-700">
            Along the way, we've built strong relationships with homeowners,
            utility providers, and municipalities — and we've stayed focused on
            one thing: helping people live better in the homes they already
            have.
          </p>
        </div>
      </div>

      {/* Milestones We're Proud Of Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Trophy size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            Milestones We're Proud Of
          </h3>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#68BEB9]">
                <Award size={20} />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  ENERGY STAR® Sustained Excellence Award
                </p>
                <p className="text-gray-600 mt-1">
                  The ENERGY STAR Partner of the Year – Sustained Excellence
                  Award is the highest honor within the ENERGY STAR program,
                  recognizing organizations that have consistently demonstrated
                  superior leadership, innovation, and commitment to
                  environmental protection through energy efficiency, and have
                  already received ENERGY STAR Partner of the Year recognition
                  for a minimum of two consecutive years.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#68BEB9]">
                <Award size={20} />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  ENERGY STAR® Contractor of the Year (2019, 2020, 2021, &
                  2023)
                </p>
                <p className="text-gray-600 mt-1">
                  Honored by the U.S. EPA and Department of Energy for
                  excellence in home performance and energy savings.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#68BEB9]">
                <Award size={20} />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Top 10 Contractor in PSE&G's Energy Efficiency Program (2023)
                </p>
                <p className="text-gray-600 mt-1">
                  Recognized for completing hundreds of successful home energy
                  projects with measurable savings.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 mb-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#68BEB9]">
                <Award size={20} />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Municipal Partnerships Across NJ
                </p>
                <p className="text-gray-600 mt-1">
                  Collaborated with cities like Princeton, Milburn, Summit and
                  Madison to bring energy audits and efficiency education
                  directly to local communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability in Action Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            Sustainability in Action
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            Ciel Power is proud to be a member of the New Jersey Sustainable
            Business Registry and the New Jersey Sustainable Business Council.
            We don't just talk about environmental responsibility — we live it,
            every day.
          </p>

          <p className="text-gray-700">
            From the materials we recommend to the systems we install, our goal
            is always to help your home do more with less — lowering energy use
            while improving comfort and indoor air quality.
          </p>
        </div>
      </div>

      {/* Press & Recognition Section */}
      <div className="mt-8 mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Newspaper size={24} className="text-[#68BEB9]" />
          <h3 className="text-xl font-semibold text-gray-700">
            Press & Recognition
          </h3>
        </div>

        <p className="text-gray-700 mb-4">We've been featured by:</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-5 border border-gray-200 flex items-center justify-center">
            <p className="text-gray-700 font-medium">New York Times</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200 flex items-center justify-center">
            <p className="text-gray-700 font-medium">ABC World News</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200 flex items-center justify-center">
            <p className="text-gray-700 font-medium">Good Morning America</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
