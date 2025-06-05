export default function GoalsSection() {
  return (
    <section className="bg-white max-h-fit p-8 w-full" id="intro-goals">
      <div className="w-full mx-auto">
        <h2 className="text-5xl font-bold text-[#818287] mb-10">Goals</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Safety Card */}
          <div className="rounded-lg border border-gray-200 p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <div
                className="w-20 h-20"
                style={{
                  backgroundImage: "url('/image 19.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                role="img"
                aria-label="Safety icon"
              />
            </div>
            <h3 className="text-[#ff6700] text-2xl font-bold mb-4">Safety</h3>
            <p className="text-[#333333] text-lg">
              We tested the ambient air in your home, gas lines, heating
              systems, hot water systems and ventilation systems
            </p>
          </div>

          {/* Comfort Card */}
          <div className="rounded-lg border border-gray-200 p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <div
                className="w-20 h-20"
                style={{
                  backgroundImage: "url('/image 20.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                role="img"
                aria-label="Comfort icon"
              />
            </div>
            <h3 className="text-[#43c0b9] text-2xl font-bold mb-4">Comfort</h3>
            <p className="text-[#333333] text-lg">
              We examined your home&apos;s air flow rates and insulation levels.
              We determined the sources of comfort and conditioning issues
            </p>
          </div>

          {/* Efficiency Card */}
          <div className="rounded-lg border border-gray-200 p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <div
                className="w-20 h-20"
                style={{
                  backgroundImage: "url('/image 21.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                role="img"
                aria-label="Efficiency icon"
              />
            </div>
            <h3 className="text-[#67b502] text-2xl font-bold mb-4">
              Efficiency
            </h3>
            <p className="text-[#333333] text-lg">
              We determined the efficiency of your home&apos;s heating, cooling
              and hot water systems. We analyzed the impact of your home&apos;s
              construction, insulation and air flow rates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
