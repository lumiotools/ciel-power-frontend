import Image from "next/image";
import { Info } from "lucide-react";

export default function InsulationInfo() {
  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#308883] mb-6">
        Understanding Insulation
      </h1>

      <div className="border-2 border-gray-200 rounded-2xl p-6 mb-4">
        <h2 className="text-2xl font-semibold text-[#308883] mb-2">
          What is Insulation?
        </h2>
        <p className="text-gray-700 text-lg">
          Insulation is a material or substance that is used to stop heat or
          sound from going into or out of something.
        </p>
      </div>

      <div className="flex flex-row items-center justify-center gap-4">
        <div className="flex-col flex items-start justify-center ">
          <div className="w-full h-[37vh] gap-2 border-2 border-gray-200 border-l-8 border-l-[#308883] bg-gray-50 p-6 rounded-2xl">
            <blockquote className="text-gray-700">
              <p className="">
                "Insulation is one of the keys to a comfortable,
                energy-efficient home. But simply having the right amount of
                insulation is not enough. If insulation is not properly
                installed, a home can have excessive heat gain during the summer
                and heat loss in the winter—forcing the heating and cooling
                systems to work overtime."
              </p>
              <footer className="font-medium italic">
                — United States EPA
              </footer>
            </blockquote>
          </div>
          <div className="w-full border border-gray-200 rounded-lg p-4 mt-4 flex items-center">
            <div className="mr-4 text-[#308883]">
              <Info size={24} />
            </div>
            <p className="text-[#308883] font-medium">
              Proper insulation can significantly reduce energy costs and
              improve comfort.
            </p>
          </div>
        </div>
        <div className="border-2 border-gray-200 rounded-lg w-full h-full">
          <Image
            src="/image 82.png"
            alt="Thermal imaging of a house showing heat loss"
            width={500}
            height={500}
            className="rounded-lg w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
