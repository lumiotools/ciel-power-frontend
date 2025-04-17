"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

export function EnergyAuditAccordion() {
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [isSecondOpen, setIsSecondOpen] = useState(true);
  const [isThirdOpen, setIsThirdOpen] = useState(true);
  const [isFourthOpen, setIsFourthOpen] = useState(true);
  const [openFaqItem, setOpenFaqItem] = useState(1);

  const faqItems = [
    {
      id: 1,
      question: "How long does the audit take?",
      answer:
        "Most audits take 1.5–3 hours, depending on your home's size and complexity. Smaller homes (e.g., 1–2 bedrooms) may finish closer to 1 hour, while larger properties (3,000+ sq ft) could take up to 4 hours.",
    },
    {
      id: 2,
      question: "What happens if safety issues are found during the audit?",
      answer:
        "If safety issues are discovered, our auditor will document them in detail and explain the severity. For critical issues like gas leaks or carbon monoxide, we'll advise immediate action. All safety concerns will be included in your report with recommended next steps and potential solutions.",
    },
    {
      id: 3,
      question: "Can I stay at home while the audit is being conducted?",
      answer:
        "Yes, you're welcome to stay at home during the audit. In fact, we encourage it so you can ask questions and learn about your home's energy systems. The auditor will need access to all areas of your home but will respect your privacy and space.",
    },
    {
      id: 4,
      question: "Can I work from home during the audit?",
      answer:
        "Yes, you can work from home during the audit. However, be aware that some parts of the process, like the blower door test, require all exterior doors and windows to be closed, and may create some noise. The auditor may also need brief access to all rooms. If you need a quiet space, we recommend setting up in a room that can be assessed early in the process.",
    },
    {
      id: 5,
      question: "Can I share this service with others?",
      answer:
        "Energy audits are specific to individual properties, so each home requires its own assessment. However, you can certainly refer friends, family, or neighbors who might benefit from an energy audit. Many utility companies offer community or group discount programs, so it's worth asking if there are any special rates for multiple homes in the same neighborhood.",
    },
  ];

  const toggleFaqItem = (id: number) => {
    setOpenFaqItem(openFaqItem === id ? 0 : id);
  };

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      {/* First Accordion */}
      <div className="border rounded-lg overflow-hidden bg-white font-sans">
        <div
          className="flex items-start p-4 cursor-pointer bg-[#f8fcf8] border-b"
          onClick={() => setIsFirstOpen(!isFirstOpen)}
        >
          <div className="flex-shrink-0 mr-4 mt-1">
            <div className="w-8 h-8 bg-[#8bc34a] rounded-md flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                <line x1="9" y1="9" x2="10" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
            </div>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-medium text-[#4caf50]">
              What You&apos;ll Gain from Your Audit
            </h2>
            <p className="text-gray-600 text-sm">
              Comfort, savings, and peace of mind — your audit is the first step
              toward a better home.
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <ChevronUp
              className={`h-6 w-6 text-[#4caf50] transform transition-transform ${isFirstOpen ? "" : "rotate-180"}`}
            />
          </div>
        </div>

        {isFirstOpen && (
          <div className="p-6 text-[#555]">
            <div className="bg-[#f8f8f8] rounded-full py-1 px-4 text-center w-fit mx-auto mb-8">
              <p className="text-sm text-[#4caf50]">
                Thanks for booking Energy Audit!
              </p>
            </div>

            <h1 className="text-[32px] font-semibold text-center mb-2 text-[#333]">
              What to Expect During Your Home Energy Audit
            </h1>
            <p className="text-center text-[#666] mb-8 text-[15px]">
              Discover the Power of Energy Efficiency with a Ciel Home Energy
              Audit.
            </p>

            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="text-[#4caf50] text-[15px] italic mb-2 text-center">
                  <span className="text-2xl font-serif">&quot;</span> The first
                  step to accessing NJ&apos;s utility programs for
                  energy-efficient home upgrades.{" "}
                  <span className="text-2xl font-serif">&quot;</span>
                </div>
              </div>
            </div>

            <div className="relative w-full aspect-video mb-10">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/FH0hdanGxkM"
                title="Discover the Power of Energy Efficiency with a Ciel Home Energy Audit"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

            <div className="mb-8">
              <h2 className="text-[18px] font-medium mb-4 text-[#333]">
                What You&apos;ll Gain from Your Audit Comfort, savings, and
                peace of mind — your audit is the first step toward a better
                home.
              </h2>
              <p className="text-[#555] mb-4 leading-relaxed text-[15px]">
                A Home Energy Audit is about more than energy use — it&apos;s
                about how your home supports your everyday life. We take a
                deeper look at the things that can affect your comfort, your
                health, and your monthly expenses. It&apos;s not just about
                finding problems. It&apos;s about finding solutions that work
                for you.
              </p>
              <p className="text-[#555] mb-4 leading-relaxed text-[15px]">
                We understand that your home is more than just walls and systems
                — it&apos;s where you and your family rest, breathe, and
                recharge. Through the audit, we uncover opportunities to help
                your home feel better, function better, and cost less to run.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-[18px] font-medium mb-4 text-[#333]">
                Generous Incentives and Financing
              </h2>
              <p className="text-[#555] mb-4 leading-relaxed text-[15px]">
                Thanks to support from New Jersey&apos;s Clean Energy Program
                and the federal government, many homeowners are eligible for
                substantial financial benefits, including:
              </p>
              <ul className="mb-4 space-y-1 text-[#555] text-[15px]">
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>Up to $6,000 in cash-back incentives</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>
                    Up to $25,000 in zero-interest financing for up to 10 years
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>Federal tax credits</span>
                </li>
              </ul>
              <p className="text-[#555] mb-4 leading-relaxed text-[15px]">
                These benefits help reduce the cost of improvements such as:
              </p>
              <ul className="mb-4 space-y-1 text-[#555] text-[15px]">
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>Insulation and air sealing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>Heating and cooling system upgrades</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>High-efficiency water heaters</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>Ventilation systems</span>
                </li>
              </ul>
              <p className="text-[#555] mb-4 leading-relaxed text-[15px]">
                We&apos;ll help you understand what you qualify for — and how to
                take full advantage of these programs.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-[18px] font-medium mb-4 text-[#333]">
                A Healthier, More Comfortable Living Space
              </h2>
              <p className="text-[#555] mb-4 leading-relaxed text-[15px]">
                Your audit isn&apos;t just about improving efficiency —
                it&apos;s also a step toward improving how you feel at home. We
                assess how well your home manages airflow, temperature, and
                moisture, which are all connected to your daily comfort and
                long-term health.
              </p>
              <p className="text-[#555] mb-4 leading-relaxed text-[15px]">
                With the right upgrades, you may experience:
              </p>
              <ul className="mb-4 space-y-1 text-[#555] text-[15px]">
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>
                    Fewer allergens and pollutants circulating through your air
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>
                    More stable and comfortable temperatures, season to season
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>Lower risk of mold and moisture buildup</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#555]">•</span>
                  <span>A quieter, calmer home environment</span>
                </li>
              </ul>
              <p className="text-[#555] mb-4 leading-relaxed text-[15px]">
                We understand that even small changes can make a big difference.
                Whether it&apos;s helping you sleep more soundly or making your
                home feel more balanced and breathable, we&apos;re here to guide
                you toward solutions that fit your lifestyle.
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-[18px] font-medium mb-4 text-[#333]">
                Personalized, Practical Recommendations
              </h2>
              <p className="text-[#555] mb-4 leading-relaxed text-[15px]">
                After your home visit, your personalized results will be added
                to your customer portal. You&apos;ll be able to log in anytime
                to explore insights about your home&apos;s energy use, review
                suggested improvements, and track available incentives.
                Everything is organized in one place — clear, simple, and
                tailored to your home. No dense reports, just useful information
                you can act on when you&apos;re ready.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Second Accordion */}
      <div className="border rounded-lg overflow-hidden bg-white font-sans">
        <div
          className="flex items-start p-4 cursor-pointer bg-[#f8fcf8] border-b"
          onClick={() => setIsSecondOpen(!isSecondOpen)}
        >
          <div className="flex-shrink-0 mr-4 mt-1">
            <div className="w-8 h-8 bg-[#8bc34a] rounded-md flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-medium text-[#4caf50]">
              What Happens During the Audit
            </h2>
            <p className="text-gray-600 text-sm">
              We&apos;re here to help, not to disrupt — here&apos;s how
              we&apos;ll move through your home and what we&apos;ll be looking
              for.
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <ChevronUp
              className={`h-6 w-6 text-[#4caf50] transform transition-transform ${isSecondOpen ? "" : "rotate-180"}`}
            />
          </div>
        </div>

        {isSecondOpen && (
          <div className="p-6 text-[#555]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* On-Site Application */}
              <div className="border rounded-lg p-6 bg-white">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-[#f8fcf8] rounded-md flex items-center justify-center text-[#4caf50]">
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
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-medium text-[#333]">
                      On-Site Application
                    </h3>
                    <p className="text-[#555] text-[15px]">
                      BPI auditor will evaluate home energy performance.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-6 h-6 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#4caf50]"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#555] text-[15px]">
                        <span className="font-medium text-[#333]">
                          Gather details
                        </span>{" "}
                        on insulation, construction specifications, and heating,
                        cooling, & hot water systems.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-6 h-6 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#4caf50]"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#555] text-[15px]">
                        <span className="font-medium text-[#333]">
                          Perform a
                        </span>{" "}
                        <span className="font-medium text-[#333]">
                          blower door test
                        </span>{" "}
                        to assess air tightness and use infrared cameras to
                        locate air leaks.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-6 h-6 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#4caf50]"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#555] text-[15px]">
                        <span className="font-medium text-[#333]">Conduct</span>{" "}
                        <span className="font-medium text-[#333]">
                          safety inspections
                        </span>{" "}
                        to identify hazards such as gas leaks, carbon monoxide,
                        mold, and asbestos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engineering Analysis */}
              <div className="border rounded-lg p-6 bg-white">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-[#f8fcf8] rounded-md flex items-center justify-center text-[#4caf50]">
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
                      >
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-medium text-[#333]">
                      Engineering Analysis
                    </h3>
                    <p className="text-[#555] text-[15px]">
                      After the inspection, the data collected will be used to
                      create a virtual model of your home.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-6 h-6 rounded-full bg-[#fff9c4] flex items-center justify-center text-[#fbc02d]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="5" />
                          <line x1="12" y1="1" x2="12" y2="3" />
                          <line x1="12" y1="21" x2="12" y2="23" />
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                          <line x1="1" y1="12" x2="3" y2="12" />
                          <line x1="21" y1="12" x2="23" y2="12" />
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#555] text-[15px]">
                        Projects{" "}
                        <span className="font-medium text-[#333]">
                          energy savings
                        </span>{" "}
                        from recommended improvements
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-6 h-6 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#4caf50]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#555] text-[15px]">
                        Identifies{" "}
                        <span className="font-medium text-[#333]">
                          utility incentives
                        </span>{" "}
                        and{" "}
                        <span className="font-medium text-[#333]">
                          tax credits
                        </span>{" "}
                        available to you (up to 30% of costs)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Final Report */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <Image
                    src="/report.jpeg"
                    alt="Energy audit report"
                    width={300}
                    height={300}
                    className="rounded-full border-4 border-[#8bc34a]"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-medium text-[#333] mb-2">
                    Your Final Report
                  </h3>
                  <p className="text-[#555] text-[15px] mb-4">
                    Within a few days of the visit, you will receive a detailed
                    report including:
                  </p>

                  <p className="text-[#555] text-[15px] mb-4">
                    A certified auditor, accredited by the Building Performance
                    Institute (BPI), will visit your home to assess its energy
                    performance.
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="mr-2 text-[#555]">•</span>
                      <span className="text-[#555] text-[15px]">
                        <span className="font-medium text-[#333]">
                          Gathering information
                        </span>{" "}
                        about insulation, construction details, and your
                        heating, cooling, and hot water systems
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#555]">•</span>
                      <span className="text-[#555] text-[15px]">
                        Performing a{" "}
                        <span className="font-medium text-[#333]">
                          blower door test
                        </span>{" "}
                        to measure air tightness and using infrared cameras to
                        identify areas where air may be leaking
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#555]">•</span>
                      <span className="text-[#555] text-[15px]">
                        Conducting{" "}
                        <span className="font-medium text-[#333]">
                          safety checks
                        </span>{" "}
                        for issues such as gas leaks, carbon monoxide, mold, and
                        asbestos
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Third Accordion */}
      <div className="border rounded-lg overflow-hidden bg-white font-sans">
        <div
          className="flex items-start p-4 cursor-pointer bg-[#f8fcf8] border-b"
          onClick={() => setIsThirdOpen(!isThirdOpen)}
        >
          <div className="flex-shrink-0 mr-4 mt-1">
            <div className="w-8 h-8 bg-[#8bc34a] rounded-md flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-medium text-[#4caf50]">
              How To Prepare
            </h2>
            <p className="text-gray-600 text-sm">
              We&apos;ll come prepared — this is simply to keep you in the loop
              and avoid surprises.
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <ChevronUp
              className={`h-6 w-6 text-[#4caf50] transform transition-transform ${isThirdOpen ? "" : "rotate-180"}`}
            />
          </div>
        </div>

        {isThirdOpen && (
          <div className="p-6 text-[#555]">
            {/* Provide Home access */}
            <div className="mb-8">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-[#f8fcf8] rounded-md flex items-center justify-center text-[#4caf50]">
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
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-[18px] font-medium text-[#333]">
                    Provide Home access
                  </h3>
                  <p className="text-[#555] text-[15px]">
                    Ensure key areas of your home are accessible for inspection:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/mechanical-room.jpeg"
                    alt="Mechanical Room"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <p className="text-lg font-medium">Mechanical Rooms</p>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/basement.png"
                    alt="Basement"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <p className="text-lg font-medium">Basement</p>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/crawlspace.jpeg"
                    alt="Crawlspace"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <p className="text-lg font-medium">Crawlspace</p>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/attic.jpeg"
                    alt="Attic"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <p className="text-lg font-medium">Attic</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Utility Information and Secure Pets + Plan for someone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Utility Information */}
              <div className="border rounded-lg p-6 bg-white">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-[#f8fcf8] rounded-md flex items-center justify-center text-[#4caf50]">
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
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-medium text-[#333]">
                      Utility Information
                    </h3>
                    <p className="text-[#555] text-[15px]">
                      Upload recent utility bills before audit.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex">
                    <div className="w-1 bg-[#4caf50] rounded mr-4"></div>
                    <div>
                      <h4 className="text-[16px] font-medium text-[#333] mb-1">
                        Upload Bills Before Audit
                      </h4>
                      <p className="text-[#555] text-[15px]">
                        Upload your most recent gas and electric utility bills
                        through the portal before your audit.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-1 bg-[#4caf50] rounded mr-4"></div>
                    <div>
                      <h4 className="text-[16px] font-medium text-[#333] mb-1">
                        Accurate Audit Report
                      </h4>
                      <p className="text-[#555] text-[15px]">
                        Ensures precise report generation by verifying energy
                        usage and system performance.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-1 bg-[#4caf50] rounded mr-4"></div>
                    <div>
                      <h4 className="text-[16px] font-medium text-[#333] mb-1">
                        Incentives & Savings
                      </h4>
                      <p className="text-[#555] text-[15px]">
                        Identifies eligible incentives and cost-saving
                        opportunities to optimize energy efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Secure Pets and Plan for someone */}
              <div className="flex flex-col gap-6">
                {/* Secure Pets */}
                <div className="border rounded-lg p-6 bg-white">
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-[#f8fcf8] rounded-md flex items-center justify-center text-[#4caf50]">
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
                        >
                          <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
                          <path d="M14.5 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5" />
                          <path d="M8 14v.5" />
                          <path d="M16 14v.5" />
                          <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
                          <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-medium text-[#333]">
                        Secure Pets
                      </h3>
                      <p className="text-[#555] text-[15px]">
                        Keeping Pets Safe & Ensuring a Smooth Audit
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-1 bg-[#4caf50] rounded mr-4"></div>
                    <div>
                      <h4 className="text-[16px] font-medium text-[#333] mb-1">
                        Pet Safety During Audit
                      </h4>
                      <p className="text-[#555] text-[15px]">
                        If you have pets, consider keeping them in a safe space
                        to ensure the technician can work without interruptions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Plan for someone to be home */}
                <div className="border rounded-lg p-6 bg-white">
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-[#f8fcf8] rounded-md flex items-center justify-center text-[#4caf50]">
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
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-medium text-[#333]">
                        Plan for someone to be home
                      </h3>
                      <p className="text-[#555] text-[15px]">
                        Ensure Access & Discuss Concerns
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-1 bg-[#4caf50] rounded mr-4"></div>
                    <div>
                      <h4 className="text-[16px] font-medium text-[#333] mb-1">
                        Upload Bills Before Audit
                      </h4>
                      <p className="text-[#555] text-[15px]">
                        It&apos;s helpful for someone to be present to provide
                        access and discuss any concerns or observations about
                        your home.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fourth Accordion - FAQ */}
      <div className="border rounded-lg overflow-hidden bg-white font-sans">
        <div
          className="flex items-start p-4 cursor-pointer bg-[#f8fcf8] border-b"
          onClick={() => setIsFourthOpen(!isFourthOpen)}
        >
          <div className="flex-shrink-0 mr-4 mt-1">
            <div className="w-8 h-8 bg-[#8bc34a] rounded-md flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-medium text-[#4caf50]">
              Frequently Asked Questions(FAQ)
            </h2>
            <p className="text-gray-600 text-sm">
              Have questions? You&apos;re not alone — here are answers to the
              things most homeowners want to know.
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <ChevronUp
              className={`h-6 w-6 text-[#4caf50] transform transition-transform ${isFourthOpen ? "" : "rotate-180"}`}
            />
          </div>
        </div>

        {isFourthOpen && (
          <div className="p-6 text-[#555]">
            <div className="border rounded-lg overflow-hidden">
              {faqItems.map((item) => (
                <div key={item.id} className="border-b last:border-b-0">
                  <div
                    className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleFaqItem(item.id)}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#4caf50] mr-4">
                      <span className="font-medium">{item.id}</span>
                    </div>
                    <h3 className="text-[17px] font-medium text-[#333] flex-grow">
                      {item.question}
                    </h3>
                    {openFaqItem === item.id ? (
                      <ChevronDown className="h-5 w-5 text-[#4caf50]" />
                    ) : (
                      <ChevronUp className="h-5 w-5 text-[#4caf50]" />
                    )}
                  </div>
                  {openFaqItem === item.id && (
                    <div className="px-16 pb-6 pt-2 text-[15px] leading-relaxed text-[#555]">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EnergyAuditAccordions() {
  return <EnergyAuditAccordion />;
}
