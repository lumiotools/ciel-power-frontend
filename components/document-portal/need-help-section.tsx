import { HelpCircle } from "lucide-react"
import PortalSection from "./portal-section"

export default function NeedHelpSection() {
  return (
    <PortalSection
      icon={<HelpCircle className="text-[#68BEB9]" size={24} />}
      title="Need Help?"
    >
      <p className="text-gray-700 mb-4">
        Have a question about a document or need help signing? We're here to
        help.
      </p>

      <h3 className="font-bold mb-3 text-gray-500">Contact Your Ciel Team:</h3>
      <div className="flex flex-col space-y-4">
        <a
          href="mailto:info@cielpower.com"
          className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-[#68BEB9] mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <span className="text-[#68BEB9] text-lg">info@cielpower.com</span>
        </a>

        <a
          href="tel:2016323463"
          className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-[#68BEB9] mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-phone"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <span className="text-[#68BEB9] text-lg">201-632-3463</span>
        </a>
      </div>
    </PortalSection>
  );
}
