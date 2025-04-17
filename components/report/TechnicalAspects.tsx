"use client"
import { RulerIcon, CameraIcon, BugIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TechnicalAspects() {
  return (
    <div>
      <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden h-[450px] flex flex-col">
        <CardHeader className="bg-[#E0F7F5] py-4 px-5 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-[#256C68]">Technical Aspects</CardTitle>
        </CardHeader>
        <CardContent className="p-5 flex-grow">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <RulerIcon className="h-5 w-5 text-[#00BFA5]" />
                <h3 className="text-lg font-medium text-[#00BFA5]">R-Value</h3>
              </div>
              <p className="text-gray-700 mb-3">
                A measure of resistance to the flow of heat through a given thickness of material (as insulation) with higher numbers
                indicating better insulating properties.
              </p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Insulation Effectiveness</span>
                  <span className="text-[#256C68] font-medium">R-49</span>
                </div>
                <Progress value={100} className="h-2 bg-[#44BFB83D]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <CameraIcon className="h-5 w-5 text-[#00BFA5]" />
                <h3 className="text-lg font-medium text-[#00BFA5]">Thermal Imaging</h3>
              </div>
              <p className="text-gray-700">
                When possible our Building Performance Technicians use infra-red cameras to examine existing insulation
                performance.
              </p>
            </div>

            <div className="bg-[#E6F7F5] rounded-md p-4">
              <div className="flex items-start gap-3">
                <BugIcon className="h-5 w-5 text-[#00BFA5] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Did you know? Cellulose insulation treated with borate will naturally repel rodents, critters, and
                  insects
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
