"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

export function InsulationOverview() {
  return (
    <div>
      <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-[#E0F7F5] py-4 px-5 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-[#256C68]">Understanding Insulation</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1 space-y-5">
              <div>
                <h3 className="text-lg font-medium text-[#00BFA5] mb-1">What is Insulation?</h3>
                <p className="text-gray-700">
                  Insulation is a material or substance that is used to stop heat or sound from going into or out of
                  something.
                </p>
              </div>
              <blockquote className="border-l-4 border-[#00BFA5] pl-4 py-3 text-gray-700 bg-gray-50 rounded-r-md">
                "Insulation is one of the keys to a comfortable, energy-efficient home. But simply
                having the right amount of insulation is not enough. If insulation is not properly
                installed, a home can have excessive heat gain during the summer and heat loss in
                the winter—forcing the heating and cooling systems to work overtime."
                <footer className="mt-2 text-sm text-[#256C68] italic">— United States EPA</footer>
              </blockquote>
              <div className="flex items-center space-x-3 text-[#256C68] bg-[#E0F7F5] p-3 rounded-md">
                <Info className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium text-sm">
                  Proper insulation can significantly reduce energy costs and improve comfort.
                </span>
              </div>
            </div>
            <div className="w-full md:w-64 h-64 rounded-xl overflow-hidden">
              <img
                src="https://i.postimg.cc/d04hwHy1/Screenshot-2024-11-25-003250.png"
                alt="Insulation inspection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
