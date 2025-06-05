import { Camera, Ruler, Bug } from "lucide-react";

export default function InsulationTechnical() {
  return (
    <div className="w-full mx-auto px-2" id="technical-aspects">
      <div className="grid grid-cols-1 gap-4">
        {/* Technical Aspects Column */}
        <div>
          <h2 className="text-3xl font-bold text-[#308883] mb-4">
            Technical Aspects
          </h2>

          <div className="border border-gray-200 rounded-lg p-4 mb-2">
            <div className="flex items-start">
              <div className="mr-4 text-[#308883] mt-1">
                <Ruler size={28} className="transform rotate-45" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#308883] mb-2">
                  R-Value
                </h3>
                <p className="text-xl text-gray-700">
                  A measure of resistance to the flow of heat through a given
                  thickness of material (as insulation) with higher numbers
                  indicating better insulating properties.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 mb-2">
            <div className="flex items-start">
              <div className="mr-4 text-[#308883] mt-1">
                <Camera size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#308883] mb-2">
                  Thermal Imaging
                </h3>
                <p className="text-xl text-gray-700">
                  When possible our Building Performance Technicians use
                  infrared cameras to examine existing insulation performance.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="mr-4 text-[#308883] mt-1">
                <Bug size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-[#308883] mb-2">
                  {
                    "Did you know? Cellulose insulation treated with borate will naturally repel rodents, critters, and insects"
                  }
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
