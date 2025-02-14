"use client";

import React from "react";
import { HomeIcon, ShieldIcon, DollarSignIcon, TrendingUpIcon } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Benefits() {
  return (
    <Card className="w-full">
      <CardHeader className="bg-green-50 dark:bg-green-900/50">
        <CardTitle className="text-2xl text-green-800 dark:text-green-200">
          Benefits of Properly Installed Insulation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="h-[200px]">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <HomeIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
                    Enhanced Comfort
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  Properly installed insulation minimizes temperature variability
                  indoors and helps keep rooms warmer in the winter and cooler in
                  the summer.
                </p>
              </CardContent>
            </Card>

            <Card className="h-[250px]">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <ShieldIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
                    Improved Durability
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  When insulation is properly installed, the potential for
                  condensation that can lead to the decay of building materials is
                  reduced, helping to improve the durability of your home.
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Efficiency Impact</span>
                      <span className="text-green-600 dark:text-green-400">35%</span>
                    </div>
                    <Progress value={35} className="h-2 bg-green-100 dark:bg-green-700" />
                  </div>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="h-[250px]">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSignIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
                    Lower Utility Bills
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  As much as half of the energy used in your home goes to heating
                  and cooling. By preventing heat loss in the winter and heat gain
                  in the summer.
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Efficiency Impact</span>
                      <span className="text-green-600 dark:text-green-400">50%</span>
                    </div>
                    <Progress value={50} className="h-2 bg-green-100 dark:bg-green-700" />
                  </div>
                </p>
              </CardContent>
            </Card>

            <Card className="h-[200px]">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUpIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
                    Better Resale Position
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  The improved comfort, lower utility bills, and improved durability
                  of a properly installed insulation barrier can translate into
                  higher resale value compared to less efficient homes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
