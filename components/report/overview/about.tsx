import Image from "next/image";

export default function AboutCredentials() {
  return (
    <section
      className="bg-white max-h-fit p-8 w-full"
      id="intro-about"
    >
      <div className="w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#818287] mb-10">
          About Ciel Power
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PSE&G Trade Ally Card */}
          <div className="rounded-lg border border-gray-200 p-8 flex flex-col items-center text-center">
            <div className="h-48 w-48 relative mb-8">
              <Image
                src="/image 22.png"
                alt="PSE&G Trade Ally Award"
                fill
                style={{ objectFit: "contain" }}
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
          <div className="rounded-lg border border-gray-200 p-8 flex flex-col items-center text-center">
            <div className="h-48 w-48 relative mb-8">
              <Image
                src="/image 23.png"
                alt="Building Performance Institute Logo"
                fill
                style={{ objectFit: "contain" }}
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
          <div className="rounded-lg border border-gray-200 p-8 flex flex-col items-center text-center">
            <div className="h-48 w-48 relative mb-8">
              <Image
                src="/image 24.png"
                alt="Better Business Bureau Logo"
                fill
                style={{ objectFit: "contain" }}
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
