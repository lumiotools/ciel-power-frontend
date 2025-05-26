import Image from "next/image";

export default function AchievementsSection() {
  return (
    <section className="w-full mt-4 pb-4 px-4">
      <div className="w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#818287] mb-10">
          Achievements & Accolades
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Awards Card */}
          <div className="rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-80 h-80 relative flex-shrink-0">
                <Image
                  src="/image 25.png"
                  alt="Energy Star Award"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div className="space-y-6 text-center border border-gray-200 py-4 px-2 rounded-lg mr-4">
                <p className="text-[#2fabe2] text-xl md:text-xl font-semibold">
                  Home Performance with ENERGY STAR
                  <br />
                  Contractor of the Year
                  <br />
                  2019, 2020, 2021, & 2023
                </p>
                <br />
                <p className="text-[#2fabe2] text-xl md:text-xl font-semibold">
                  Home Performance with ENERGY STAR
                  <br />
                  Contractor of the Year
                  <br />
                  Sustained Excellence
                </p>
              </div>
            </div>
          </div>

          {/* Media Recognition Card */}
          <div className="rounded-lg border border-gray-200 p-3 md:p-2">
            <p className="text-center text-xl md:text-2xl font-semibold mb-8">
              Ciel Power has been widely reported in
              <br />
              media outlets such as
            </p>

            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="space-y-6 flex flex-row items-center justify-center gap-x-5 -mt-20">
                <div className="h-64 w-64 relative">
                  <Image
                    src="/image 26.png"
                    alt="ABC World News Tonight"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>

                <div className="h-64 w-64 relative">
                  <Image
                    src="/image 27.png"
                    alt="ABC Good Morning America"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>

              <div>
                <div className="w-[700px] h-[100px] relative -mt-20">
                  <Image
                    src="/image 28.png"
                    alt="The New York Times"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
