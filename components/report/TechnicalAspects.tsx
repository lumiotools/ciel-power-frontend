"use client";

import React from "react";
import { RulerIcon, CameraIcon, BugIcon } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TechnicalAspects() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="bg-green-50 dark:bg-green-900/50">
          <CardTitle className="text-2xl text-green-800 dark:text-green-200">
            Technical Aspects
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <RulerIcon className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
                  R-Value
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A measure of resistance to the flow of heat through a given
                thickness of material (as insulation) with higher numbers indicating
                better insulating properties.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Insulation Effectiveness</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">R-49</span>
                </div>
                <Progress value={75} className="h-2 bg-green-200 dark:bg-green-700" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <CameraIcon className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
                  Thermal Imaging
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                When possible our Building Performance Technicians use infra-red
                cameras to examine existing insulation performance.
              </p>
            </div>

            <Card className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700">
              <CardContent className="p-4 flex items-center gap-2 text-green-600 dark:text-green-400">
                <BugIcon className="h-5 w-5 shrink-0" />
                <p className="text-sm">
                  Did you know? Cellulose insulation treated with borate will
                  naturally repel rodents, critters, and insects
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
