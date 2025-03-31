"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SeasonalPerformance() {
  return (
    <div className="space-y-8">
      <Card className="h-full flex flex-col">
        {" "}
        {/* Adjusted height to match Technical Aspects */}
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="text-2xl text-teal-600 dark:text-teal-300">Seasonal Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex-grow flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="https://i.postimg.cc/ZYG3nQCs/Screenshot-2024-11-25-003635.png"
              alt="House insulation diagram showing seasonal performance"
              className="w-10/12 mx-auto object-contain rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

