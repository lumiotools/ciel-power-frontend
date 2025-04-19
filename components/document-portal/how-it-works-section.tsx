import { FileSignature } from "lucide-react"
import PortalSection from "./portal-section"

export default function HowItWorksSection() {
  return (
    <PortalSection icon={<FileSignature className="text-[#8bc34a]" size={24} />} title="How It Works">
      <ol className="space-y-4">
        <li className="flex p-3 bg-white rounded-lg border border-[#e0f0d0]">
          <div className="bg-[#8bc34a] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
            1
          </div>
          <div>When a document is ready for you, you'll be notified in the portal and by email</div>
        </li>
        <li className="flex p-3 bg-white rounded-lg border border-[#e0f0d0]">
          <div className="bg-[#8bc34a] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
            2
          </div>
          <div>You can sign securely via PandaDoc, right from your browser — no account required</div>
        </li>
        <li className="flex p-3 bg-white rounded-lg border border-[#e0f0d0]">
          <div className="bg-[#8bc34a] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
            3
          </div>
          <div>Once signed, your copy is automatically stored and accessible here</div>
        </li>
        <li className="flex p-3 bg-white rounded-lg border border-[#e0f0d0]">
          <div className="bg-[#8bc34a] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
            4
          </div>
          <div>We'll take it from there — coordinating utility submission, approvals, and next steps</div>
        </li>
      </ol>
    </PortalSection>
  )
}
