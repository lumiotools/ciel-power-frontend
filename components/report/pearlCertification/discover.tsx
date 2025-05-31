import {
  Binoculars,
  Home,
  Snowflake,
  Sun,
  Settings,
  Heart,
  Award,
} from "lucide-react";

export default function Discover() {
  return (
    <div className="bg-white max-h-fit p-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Binoculars className="w-8 h-8 text-[#67b502]" />
          <h1 className="text-3xl font-bold text-[#67b502]">
            Discover the Value of Your Home with Pearl Certification
          </h1>
        </div>

        {/* Main Content Card */}
        <div className="border-2 border-gray-200 rounded-2xl p-8 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-14">
              <p className="text-[#444444] text-xl leading-relaxed">
                When you work with Ciel Power, your home improvements don't just
                make your space more comfortable and efficient — they also gain
                lasting, certified value. Through our partnership with{" "}
                <span className="text-[#67b502] font-semibold">
                  Pearl Certification
                </span>
                , we're proud to offer our customers a nationally recognized way
                to document their home's performance and energy-efficient
                features.
              </p>

              <p className="text-[#444444] text-xl leading-relaxed">
                Your home is one of your most important investments. Pearl
                Certification helps ensure that the improvements you've made are
                recognized, protected, and valued — not just by you, but by
                future buyers, appraisers, and real estate professionals.
              </p>
            </div>

            {/* Right Dashboard Mockup */}
            <div className="relative">
              <img
                src="/image 90.png"
                alt="Pearl Certification Dashboard"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
