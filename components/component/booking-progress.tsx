import { Check } from "lucide-react"

interface Step {
  label: string
  status: "completed" | "current" | "upcoming"
}

export default function BookingProgress({ steps }: { steps: Step[] }) {
  return (
    <div className="flex items-center justify-between w-full mt-4">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.status === "completed"
                  ? "bg-[#5ea502] text-white"
                  : step.status === "current"
                    ? "bg-[#b9dd8b] text-white"
                    : "bg-[#d1d5db] text-[#636561]"
              }`}
            >
              {step.status === "completed" ? (
                <Check className="h-5 w-5" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-current" />
              )}
            </div>
            <span className="text-sm text-[#4d4e4b] mt-2">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`h-[2px] w-32 mx-2 ${step.status === "completed" ? "bg-[#5ea502]" : "bg-[#d1d5db]"}`} />
          )}
        </div>
      ))}
    </div>
  )
}

