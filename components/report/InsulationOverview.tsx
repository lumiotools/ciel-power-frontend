"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export function InsulationOverview() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="text-2xl text-teal-600 dark:text-teal-300">
            Understanding Insulation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
                  What is Insulation?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Insulation is a material or substance that is used to stop
                  heat or sound from going into or out of something.
                </p>
              </div>
              <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-600 dark:text-gray-300">
                &quot;Insulation is one of the keys to a comfortable,
                energy-efficient home. But simply having the right amount of
                insulation is not enough. If insulation is not properly
                installed, a home can have excessive heat gain during the summer
                and heat loss in the winter—forcing the heating and cooling
                systems to work overtime.&quot;
                <footer className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  — United States EPA
                </footer>
              </blockquote>
              <div className="flex items-center space-x-2 text-teal-500 dark:text-teal-400">
                <Info className="h-5 w-5" />
                <span className="font-medium">
                  Proper insulation can significantly reduce energy costs and
                  improve comfort.
                </span>
              </div>
            </div>
            <div className="w-full md:w-72 h-72 rounded-lg overflow-hidden">
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
  );
}
