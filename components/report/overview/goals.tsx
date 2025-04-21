import { Shield, Target, Thermometer } from "lucide-react";
import React from "react";

const ReportOverviewSectionGoals = () => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden"
      id="goals-of-the-audit"
    >
      <div className="p-5" style={{ backgroundColor: "#F0F8E699" }}>
        <h2 className="font-medium" style={{ color: "#67B502" }}>
          Goals of the Audit
        </h2>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Safety */}
          <div
            className="bg-orange-50 rounded-lg p-6 flex flex-col items-center border"
            style={{ border: "0.5px solid #FF670099" }}
          >
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <div className="text-orange-500">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-orange-500 font-medium mb-2">Safety</h3>
            <p className="text-gray-600 text-sm text-center">
              We tested the ambient air in your home, gas lines, heating
              systems, hot water systems and ventilation systems
            </p>
          </div>

          {/* Comfort */}
          <div
            className="bg-cyan-50 rounded-lg p-6 flex flex-col items-center border"
            style={{ border: "0.5px solid #43C0B9B2" }}
          >
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <div className="text-cyan-500">
                <Thermometer className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-cyan-500 font-medium mb-2">Comfort</h3>
            <p className="text-gray-600 text-sm text-center">
              We examined your home's air flow rates and insulation levels. We
              determined the sources of comfort and conditioning issues
            </p>
          </div>

          {/* Efficiency */}
          <div
            className="rounded-lg p-6 flex flex-col items-center border"
            style={{
              backgroundColor: "#F0F8E699",
              border: "0.5px solid #67B502CC",
            }}
          >
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <div style={{ color: "#67B502" }}>
                <Target className="h-6 w-6" />
              </div>
            </div>
            <h3 className="font-medium mb-2" style={{ color: "#67B502" }}>
              Efficiency
            </h3>
            <p className="text-gray-600 text-sm text-center">
              We determined the efficiency of your home's heating, cooling and
              hot water systems. We analyzed the impact of your home's
              construction, insulation and air flow rates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportOverviewSectionGoals;
