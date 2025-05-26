import { FileText, DollarSign, Award } from "lucide-react";
import PortalSection from "./portal-section";

export default function WhatsInPortalSection() {
  return (
    <PortalSection
      icon={<FileText className="text-[#68BEB9]" size={24} />}
      title="What's in Your Portal"
    >
      <ul className="space-y-3">
        <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
          <FileText className="text-[#68BEB9] flex-shrink-0" size={20} />
          <span className="font-medium text-gray-500">Project Documents</span>
          <span className="text-sm">
            - Audit reports, proposals, and project specifications
          </span>
        </li>

        <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
          <DollarSign className="text-[#68BEB9] flex-shrink-0" size={20} />
          <span className="font-medium text-gray-500">
            Financial & Program Documents
          </span>
          <span className="text-sm">
            - Rebate forms, financing applications, and utility program
            paperwork
          </span>
        </li>

        <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
          <Award className="text-[#68BEB9] flex-shrink-0" size={20} />
          <span className="font-medium text-gray-500">
            Final Paperwork & Certification
          </span>
          <span className="text-sm">
            - Completion certificates, warranty information, and Pearl
            Certification
          </span>
        </li>
      </ul>
    </PortalSection>
  );
}
