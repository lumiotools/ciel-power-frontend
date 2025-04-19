import { FileText, DollarSign, Award } from "lucide-react"
import PortalSection from "./portal-section"

export default function WhatsInPortalSection() {
  return (
    <PortalSection icon={<FileText className="text-[#8bc34a]" size={24} />} title="What's in Your Portal">
      <ul className="space-y-3">
        <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e0f0d0]">
          <FileText className="text-[#8bc34a] flex-shrink-0" size={20} />
          <span className="font-medium">Project Documents</span>
          <span className="text-sm text-gray-600">- Audit reports, proposals, and project specifications</span>
        </li>

        <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e0f0d0]">
          <DollarSign className="text-[#8bc34a] flex-shrink-0" size={20} />
          <span className="font-medium">Financial & Program Documents</span>
          <span className="text-sm text-gray-600">
            - Rebate forms, financing applications, and utility program paperwork
          </span>
        </li>

        <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e0f0d0]">
          <Award className="text-[#8bc34a] flex-shrink-0" size={20} />
          <span className="font-medium">Final Paperwork & Certification</span>
          <span className="text-sm text-gray-600">
            - Completion certificates, warranty information, and Pearl Certification
          </span>
        </li>
      </ul>
    </PortalSection>
  )
}
