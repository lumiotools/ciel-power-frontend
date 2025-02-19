"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SeasonalPerformance() {
  return (
    <div className="space-y-8">
      <Card className="h-full flex flex-col"> {/* Adjusted height to match Technical Aspects */}
        <CardHeader className="bg-green-50 dark:bg-green-900/50">
          <CardTitle className="text-2xl text-lime-500 dark:text-green-200">
            Seasonal Performance
          </CardTitle>
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
  );
}
