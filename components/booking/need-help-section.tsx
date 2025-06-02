import { HelpCircle } from "lucide-react";

export default function NeedHelpSection() {
  return (
    <>
      <h3 className="font-bold mb-3 text-black">Contact Your Ciel Team:</h3>
      <p className="mb-3">
        Need help? We’re here for you — just reach out if you’re unsure what to
        send.
      </p>
      <div className="flex flex-col space-y-4">
        <a
          href="mailto:info@cielpower.com"
          className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-[#8bc34a] mr-3">
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
          <span className="text-[#8bc34a] text-lg">info@cielpower.com</span>
        </a>

        <a
          href="tel:2016323463"
          className="flex items-center p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-[#8bc34a] mr-3">
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
          <span className="text-[#8bc34a] text-lg">201-632-3463</span>
        </a>
      </div>
    </>
  );
}
