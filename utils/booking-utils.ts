import type { Booking } from "@/types/admin"
import { BOOKING_STAGES, STAGE_LABELS } from "@/constants/booking-stages"
import { format } from "date-fns"

// Helper function to get stage index
export const getStageIndex = (stage: string) => {
  return BOOKING_STAGES.indexOf(stage)
}

// Helper function to check if a stage is completed
export const isStageCompleted = (booking: Booking, stageKey: string) => {
  const currentStageIndex = getStageIndex(booking.currentStage)
  const checkStageIndex = getStageIndex(stageKey)
  return checkStageIndex <= currentStageIndex
}

// Helper function to calculate progress percentage
export const calculateProgressPercentage = (booking: Booking) => {
  const currentStageIndex = getStageIndex(booking.currentStage)
  const totalStages = BOOKING_STAGES.length - 1 // -1 because we're calculating percentage between stages
  return currentStageIndex === 0 ? 0 : (currentStageIndex / totalStages) * 100
}

// Format date helper
export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "MMM dd, yyyy h:mm a")
}

// Get step status for booking progress
export const getStepStatus = (currentStage: string) => {
  return BOOKING_STAGES.map((stage) => {
    const currentStageIndex = BOOKING_STAGES.indexOf(currentStage)
    const stageIndex = BOOKING_STAGES.indexOf(stage)

    let status: "completed" | "current" | "upcoming" | "cancelled" = "upcoming"

    if (stageIndex < currentStageIndex) {
      status = "completed"
    } else if (stageIndex === currentStageIndex) {
      status = "current"
    }

    return {
      label: STAGE_LABELS[stage],
      status,
    }
  })
}

