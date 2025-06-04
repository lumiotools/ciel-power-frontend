export default function AboutCredentials() {
  return (
    <section className="bg-white max-h-fit p-8 w-full" id="intro-about">
      <div className="w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#818287] mb-10">
          About Ciel Power
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PSE&G Trade Ally Card */}
          <div className="rounded-lg border border-gray-200 p-6 flex flex-col items-center text-center min-h-[400px]">
            <div className="h-56 w-full mb-6 flex items-center justify-center">
              <div
                className="w-full h-full max-w-[200px]"
                style={{
                  backgroundImage: "url('/image 22.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                role="img"
                aria-label="PSE&G Trade Ally Award"
              />
            </div>
            <p className="text-[#333333] text-lg">
              We are a 2025 Top 10 Award Winning{" "}
              <span className="text-[#2fabe2] font-semibold">
                PSE&G Trade Ally
              </span>
              .
            </p>
          </div>

          {/* BPI Goldstar Card */}
          <div className="rounded-lg border border-gray-200 p-6 flex flex-col items-center text-center min-h-[400px]">
            <div className="h-56 w-full mb-6 flex items-center justify-center">
              <div
                className="w-full h-full max-w-[200px]"
                style={{
                  backgroundImage: "url('/image 23.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                role="img"
                aria-label="Building Performance Institute Logo"
              />
            </div>
            <p className="text-[#333333] text-lg">
              We are a{" "}
              <span className="text-[#fec127] font-semibold">
                Building Performance Institute Goldstar
              </span>{" "}
              Contractor
            </p>
          </div>

          {/* BBB Card */}
          <div className="rounded-lg border border-gray-200 p-6 flex flex-col items-center text-center min-h-[400px]">
            <div className="h-56 w-full mb-6 flex items-center justify-center">
              <div
                className="w-full h-full max-w-[200px]"
                style={{
                  backgroundImage: "url('/image 24.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                role="img"
                aria-label="Better Business Bureau Logo"
              />
            </div>
            <p className="text-[#333333] text-lg">
              We are a{" "}
              <span className="text-[#0a3d78] font-semibold">
                Better Business Bureau
              </span>{" "}
              accredited company
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
