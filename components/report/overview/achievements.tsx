export default function AchievementsSection() {
  return (
    <section className="bg-white max-h-fit p-8 w-full" id="intro-achievements">
      <div className="w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#818287] mb-10">
          Achievements & Accolades
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Awards Card */}
          <div className="rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-80 h-80 flex-shrink-0">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('/image 25.png')",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  role="img"
                  aria-label="Energy Star Award"
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
                <div className="h-64 w-64">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: "url('/image 26.png')",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    role="img"
                    aria-label="ABC World News Tonight"
                  />
                </div>

                <div className="h-64 w-64">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: "url('/image 27.png')",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    role="img"
                    aria-label="ABC Good Morning America"
                  />
                </div>
              </div>

              <div>
                <div className="w-[700px] h-[100px] -mt-20">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: "url('/image 28.png')",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    role="img"
                    aria-label="The New York Times"
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
