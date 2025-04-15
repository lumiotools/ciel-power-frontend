import type { ReactNode } from "react"

interface PortalSectionProps {
  id?: string
  icon: ReactNode
  title: string
  children: ReactNode
}

export default function PortalSection({ id, icon, title, children }: PortalSectionProps) {
  return (
    <div id={id} className="mb-8 bg-[#f9fcf6] rounded-xl border border-[#e0f0d0] p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-xl font-medium text-gray-700">{title}</h2>
      </div>
      {children}
    </div>
  )
}
