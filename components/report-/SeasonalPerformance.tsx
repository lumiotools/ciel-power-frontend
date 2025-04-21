"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SeasonalPerformance() {
  return (
    <div>
      <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden h-[450px] flex flex-col">
        <CardHeader className="bg-[#E0F7F5] py-4 px-5 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-[#256C68]">Seasonal Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-5 flex-grow flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <img
              src="https://i.postimg.cc/ZYG3nQCs/Screenshot-2024-11-25-003635.png"
              alt="House insulation diagram showing seasonal performance"
              className="w-full max-w-md mx-auto object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
