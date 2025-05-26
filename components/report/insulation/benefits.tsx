import { Home, TrendingUp, DollarSign, Shield } from "lucide-react";

export default function InsulationBenefits() {
  return (
    <div className="w-full mx-auto px-4 py-2">
      <h2 className="text-3xl font-bold text-[#308883] mb-8">
        Benefits of Properly Installed Insulation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enhanced Comfort */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start mb-4">
            <div className="mr-4 text-[#308883]">
              <Home size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#308883]">
              Enhanced Comfort
            </h3>
          </div>
          <p className="text-gray-700 font-semibold">
            Properly installed insulation minimizes temperature variability
            indoors and helps keep rooms warmer in the winter and cooler in the
            summer.
          </p>
        </div>

        {/* Better Resale Position */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start mb-4">
            <div className="mr-4 text-[#308883]">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#308883]">
              Better Resale Position
            </h3>
          </div>
          <p className="text-gray-700 font-bold">
            The improved comfort, lower utility bills, and improved durability
            of a properly installed insulation barrier can translate into higher
            resale value compared to less efficient homes.
          </p>
        </div>

        {/* Lower Utility Bills */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start mb-4">
            <div className="mr-4 text-[#308883]">
              <DollarSign size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#308883]">
              Lower Utility Bills
            </h3>
          </div>
          <p className="text-gray-700 font-semibold">
            As much as half of the energy used in your home goes to heating and
            cooling. By preventing heat loss in the winter and heat gain in the
            summer.
          </p>
        </div>

        {/* Improved Durability */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start mb-4">
            <div className="mr-4 text-[#308883]">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#308883]">
              Improved Durability
            </h3>
          </div>
          <p className="text-gray-700 font-semibold">
            When insulation is properly installed, the potential for
            condensation that can lead to the decay of building materials is
            reduced, helping to improve the durability of your home.
          </p>
        </div>
      </div>
    </div>
  );
}
