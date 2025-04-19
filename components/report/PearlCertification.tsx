import React from "react";
import { Award, Home, BarChart } from "lucide-react";

export const PearlCertification: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Pearl Certification
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-700">
            Why homeowners choose Pearl Certification
          </h3>
          <p className="text-gray-600">
            Pearl Certification is the standard for homes that go above and
            beyond to keep you comfortable, healthy, and saving energy.
          </p>
          <div className="flex items-center gap-2 text-green-700">
            <Award className="w-5 h-5" />
            <span className="font-semibold">
              Homes with Pearl Certification sell for 5% MORE on average.
            </span>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            How it Works
          </h3>
          <p className="text-gray-600">
            Pearl Certification documents the steps you have taken towards
            making your home more energy-efficient. This certification can
            increase the overall value of your home for refinancing or sale.
          </p>
          <p className="text-gray-600 mt-4">
            With Pearl Certification, improving your home's performance means
            improving its value. A high-performing home is valuable to you – but
            appraisers and future buyers can't "see" the value without the right
            documentation. We give you the tools to maximize your home's
            appraisal or price when the time comes to refinance or sell.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Home className="w-6 h-6 text-green-700" />
            <h3 className="text-lg font-semibold text-green-700">
              Pearl Offers Multiple Certification Levels
            </h3>
          </div>
          <p className="text-gray-600">
            The total number of points your home earns determines which level of
            Pearl Certification it achieves. Your home can earn Pearl
            Certification no matter when it was built if you have made the right
            improvements to it.
          </p>
        </div>

        <div className="border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart className="w-6 h-6 text-green-700" />
            <h3 className="text-lg font-semibold text-green-700">
              Green Door App
            </h3>
          </div>
          <p className="text-gray-600">
            This is your one-stop shop to improve your home's performance. See
            all the details about your current Pearl score, get recommendations
            for upgrades, find Pearl professionals for new projects and keep
            track of your home's maintenance.
          </p>
        </div>
      </div>
    </div>
  );
};
