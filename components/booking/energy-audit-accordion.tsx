"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, FileText } from "lucide-react";
import Image from "next/image";

export function EnergyAuditAccordion() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  const faqItems = [
    {
      id: 1,
      question: "What exactly is a home energy audit?",
      answer:
        "A home energy audit is a detailed assessment of how your home uses — and loses — energy. We use advanced tools like blower doors and infrared cameras to uncover inefficiencies, then provide a custom report with upgrade recommendations, projected savings, and available incentives.",
    },
    {
      id: 2,
      question: "Can we be home during the audit?",
      answer:
        "Yes, absolutely. You’re welcome to be home while we conduct the audit. Many homeowners enjoy seeing the process and learning about their home’s performance as we go.",
    },
    {
      id: 3,
      question: "How disruptive will the audit be for my household?",
      answer:
        "We keep disruptions to a minimum. Most of the work is quiet and low-impact. The blower door test, which creates controlled airflow to identify air leaks, is the most noticeable part — and often the most fascinating to watch. We’ll let you know when that happens so you’re not caught off guard.",
    },
    {
      id: 4,
      question:
        "Can the technician work independently, or do I need to be with them the entire time?",
      answer:
        "You don’t need to accompany the technician the entire time. After a brief walkthrough and conversation at the start, they can work independently while you go about your day. If any questions come up, they’ll check in with you.",
    },
    {
      id: 5,
      question: "Do I have to move forward with the upgrades after the audit?",
      answer:
        "Not at all. The information is yours to keep, with no obligation. If you choose to move forward, we’ll guide you through the next steps at your pace and within your budget — but the decision is always yours.",
    },
    {
      id: 6,
      question: "How long does the audit take?",
      answer:
        "Most audits take 3 hours, depending on the size and layout of your home. Our technicians are thorough, but they work efficiently and with respect for your time.",
    },
    {
      id: 7,
      question: "Will the technician need to move through the entire house?",
      answer:
        "Yes — to fully understand your home’s performance, we’ll need access to all areas, including the attic, basement, utility rooms, and any crawlspaces. This allows us to gather accurate data and provide meaningful recommendations.",
    },
    {
      id: 8,
      question: "Is the blower door test safe for my home?",
      answer:
        "Absolutely. It’s a standard diagnostic test that helps us measure air leakage. It doesn’t cause damage and is a vital part of understanding your home’s energy efficiency.",
    },
    {
      id: 9,
      question: "Will the audit affect my utility service?",
      answer:
        "In most cases, no — the audit is non-invasive and won’t interrupt your electric, gas, or water service. However, if our technician detects a gas leak during safety testing, we are required to notify your natural gas provider immediately. In that case, the utility company may shut off your gas service temporarily until the issue is resolved. While this is rare, your safety is our top priority, and we’ll keep you informed every step of the way.",
    },
    {
      id: 10,
      question:
        "What kinds of incentives are available if I do decide to make improvements?",
      answer:
        "New Jersey’s energy efficiency programs offer cash rebates, low-interest financing.  There are also  federal tax credits that you may qualify for. Your custom report will outline which incentives apply to your home and how to claim them.",
    },
    {
      id: 11,
      question: "Can I use this audit to qualify for utility rebate programs?",
      answer:
        "Yes. This audit meets the requirements for participation in New Jersey’s utility-sponsored energy efficiency programs, including Home Performance with ENERGY STAR®. Without it, those incentives aren’t available.",
    },
    {
      id: 12,
      question: "What do I need to do before the technician arrives?",
      answer:
        "Just make sure we can access key areas (attic, basement, utility room), and secure any pets, and upload your 12-month utility usage in the portal — it’s a requirement and it also helps us fine-tune your audit results.",
    },
    {
      id: 13,
      question: "How soon will I receive my report?",
      answer:
        "Your report will typically arrive within a few days. It will include your home’s energy analysis, tailored upgrade recommendations, projected savings, applicable incentives, and a clear action plan.",
    },
    {
      id: 14,
      question: "What will the upgrades actually cost me out of pocket?",
      answer:
        "Thanks to New Jersey's current utility-sponsored incentives, many homeowners are completing upgrades with <strong>little or no out-of-pocket expense</strong>.<br><br>Here's how it works:<br><br>• <strong>Cash-back incentives</strong> can be applied <em>directly to your contractor's invoice</em>, reducing your upfront cost.<br>• For any remaining balance, <strong>0% interest financing</strong> is available for qualified borrowers, with payments spread over <strong>7 to 10 years</strong>.<br>• And because the improvements lower your energy use, many customers find that the <strong>monthly savings help offset the cost of financing</strong>.<br><br>Your audit report will include clear pricing and financing details, and your consultant can walk you through your options.",
    },
    {
      id: 15,
      question: "Do these programs have income requirements?",
      answer:
        "No — there are no income limits for participating in New Jersey’s utility incentive programs. Homeowners at all income levels are eligible to receive rebates and financing through the Whole Home Energy Savings programs being offered through New Jersey’s regional utility providers. That said, there are additional programs and enhanced incentives available for low- to moderate-income households. If you think your household might qualify, just let your consultant know. We’re here to help you access every benefit you’re eligible for.",
    },
    {
      id: 16,
      question:
        "What kinds of safety tests will be performed during the audit?",
      answer:
        "Safety is central to everything we do. During your audit, our technician will conduct several important checks to ensure your home is healthy and ready for any energy efficiency improvements. These include:<br><br>• <strong>Gas leak detection</strong> using a sensitive gas sniffer on exposed gas lines<br>• <strong>Carbon monoxide testing</strong> in the ambient air around fuel-burning appliances<br>• <strong>Combustion safety evaluation</strong> of your chimney or venting systems<br>• <strong>Visual checks</strong> for potential hazards like mold, asbestos, or outdated wiring<br><br>If we find anything concerning, we'll document it clearly in your report and guide you on what to do next. In the rare case of a gas leak, we're required to contact your utility provider for your safety.",
    },
    {
      id: 17,
      question: "What kind of energy efficiency information will be collected?",
      answer:
        "Our technician will collect a comprehensive set of data that helps us understand how your home uses (and loses) energy. This includes:<br><br>• <strong>Insulation levels</strong> in your attic, walls, and basement<br>• <strong>Air leakage</strong> through the blower door and infrared testing<br>• <strong>Details about your HVAC, water heating, and ventilation systems</strong><br>• <strong>Construction details</strong>, such as window types, orientation, and building materials<br>• <strong>Occupancy and usage patterns</strong>, like how many people live in the home and how it's used day to day<br><br>We use this information to create a <strong>virtual energy model</strong> of your home and simulate how different upgrades would improve comfort, performance, and energy savings. It's the foundation of your customized energy roadmap.",
    },
    {
      id: 18,
      question:
        "What do you do with the data you collect, and how is my privacy protected?",
      answer:
        "We use the information from your audit — including insulation levels, utility usage, and system details — to generate your personalized report, calculate incentive eligibility, and plan potential upgrades.<br><br>Your data is processed using secure, industry-standard tools, including:<br><br>• <strong>SnuggPro</strong>, for energy modeling<br>• <strong>Our CRM</strong>, for managing your project and communication<br><br>We do <strong>not</strong> sell or share your personal information for marketing purposes. Any data shared with your utility company is used <strong>only</strong> to support your participation in rebate or financing programs.<br><br>Your privacy matters to us. You can review our full privacy policy here, or reach out if you have questions.",
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* First Accordion */}
      <div className="border-2 border-[#e0f0d0] rounded-lg">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
                <FileText className="text-[#8bc34a]" size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-black text-lg font-bold">
                  What You&apos;ll Gain from Your Audit
                </h3>
                <p className="text-gray-600">
                  You’ve taken the first step toward something meaningful — a
                  home that works better for you.
                </p>
              </div>
            </div>
            <button onClick={() => toggleSection("gain")}>
              <ChevronRight
                className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "gain" ? "rotate-90" : ""}`}
              />
            </button>
          </div>

          {openSection === "gain" && (
            <div className="mt-3 text-black">
              <p className="text-black mb-8">
                We know your home is more than just a building — it’s where life
                happens. That’s why your upcoming home energy audit is about
                more than checking boxes or qualifying for rebates (though it
                does that too). It’s about giving you real answers, clear next
                steps, and the support you need to make informed choices — at
                your pace.
              </p>
              <div className="flex">
                <div className="flex-1">
                  <div className="mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-black text-lg font-bold">
                        Here’s what this audit means for you:
                      </h3>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3">
                        A More Comfortable Living Space
                      </h4>
                      <p className="mb-3">
                        You may already know what isn’t working — the cold
                        floors, the rooms that never quite feel right. Our audit
                        is designed to uncover the reasons behind those
                        discomforts and offer specific, practical solutions.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3">
                        A Smarter Use of Energy — and Your Budget
                      </h4>
                      <p className="mb-3">
                        Through the audit, you’ll receive a personalized plan
                        that outlines where energy is being lost and what you
                        can do to fix it. You’ll also gain access to New
                        Jersey’s energy efficiency programs — which can reduce
                        your costs significantly. These programs aren’t
                        available without a certified audit like the one you’ve
                        scheduled.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3">
                        Guidance Without Pressure
                      </h4>
                      <p className="mb-3">
                        There’s no one-size-fits-all solution, and no obligation
                        to move forward with our recommendations. We’re here to
                        equip you with the knowledge and resources — and to
                        support you if and when you decide to move forward.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3">
                        Confidence That You’re Making a Good Call
                      </h4>
                      <p className="mb-3">
                        Whether you’re thinking about upgrades now or planning
                        ahead, this audit gives you the facts you need to feel
                        confident. And when improvements are made, we can help
                        ensure they’re documented through Pearl Certification —
                        something that can add value when it’s time to refinance
                        or sell.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3">
                        A Positive Impact That Lasts
                      </h4>
                      <p className="mb-3">
                        Every improvement you make to your home has a ripple
                        effect — on your energy bills, your comfort, and even
                        the environment. We believe that’s something to be proud
                        of.
                      </p>
                    </div>
                  </div>
                  <div className="mb-8 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-black text-lg font-bold">
                        We’re Looking Forward to It
                      </h3>
                    </div>
                    <p className="mb-3">
                      Thank you for taking this step. When we arrive, we’ll be
                      ready to listen, learn about your home, and give you the
                      clearest possible picture of what’s next.
                    </p>
                    <p className="mb-3">
                      If there’s anything you’d like us to know before we visit
                      — a specific concern, something that’s been bothering you,
                      or just some background on your home — you’re welcome to
                      share it with us in advance. Your insight helps us serve
                      you better.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Second Accordion */}
      <div className="border-2 border-[#e0f0d0] rounded-lg">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
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
                  className="text-[#8bc34a]"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-black text-lg font-bold">
                  What Happens During the Audit
                </h3>
                <p className="text-gray-600">
                  We’re here to help, not to disrupt — here’s how we’ll move
                  through your home and what we’ll be looking for.
                </p>
              </div>
            </div>
            <button onClick={() => toggleSection("during")}>
              <ChevronRight
                className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "during" ? "rotate-90" : ""}`}
              />
            </button>
          </div>

          {openSection === "during" && (
            <div className="mt-3 text-black">
              <p className="mb-3">
                We know that inviting someone into your home is a personal
                decision. That’s why our approach to the home energy audit is
                designed to be respectful, efficient, and informative — with no
                pressure, and no surprises.
              </p>
              <p className="mb-6">
                To help you get a full picture of what to expect, we’ve created
                a short explainer video that walks through each step of the
                process. We encourage you to watch it at your convenience.
              </p>
              <div className="relative w-full aspect-video mb-3">
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
            </div>
          )}
        </div>
      </div>

      <div className="border-2 border-[#e0f0d0] rounded-lg">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
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
                  className="text-[#8bc34a]"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-black text-lg font-bold">
                  What to Expect During Your Home Energy Audit
                </h3>
                <p className="text-gray-600">
                  Your audit involves two key phases: a visit from one of our
                  trained technicians, followed by a detailed analysis back at
                  our office.
                </p>
              </div>
            </div>
            <button onClick={() => toggleSection("during-1")}>
              <ChevronRight
                className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "during-1" ? "rotate-90" : ""}`}
              />
            </button>
          </div>

          {openSection === "during-1" && (
            <>
              <div className="mt-3 mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-black text-lg font-bold">
                    During the Visit
                  </h3>
                </div>
                <ul className="list-disc pl-6 mb-4 space-y-5">
                  <li>
                    <b>We collect detailed information.</b> Our technician will
                    move room to room, collecting about 10 pages worth of data —
                    everything from insulation levels to how your heating,
                    cooling, and hot water systems are performing.
                  </li>
                  <li>
                    <b>We conduct diagnostic testing.</b> This includes a blower
                    door test to measure air leakage and an infrared scan to
                    identify where conditioned air is escaping or entering your
                    home.
                  </li>
                  <li>
                    <b>We run safety checks.</b> We’ll inspect for potential
                    concerns like mold, asbestos, outdated wiring, gas leaks,
                    and carbon monoxide — all to ensure that your home is safe
                    for insulation or air sealing upgrades.
                  </li>
                </ul>
                <p className="mb-3">
                  If there’s anything you’d like us to know before we visit — a
                  specific concern, something that’s been bothering you, or just
                  some background on your home — you’re welcome to share it with
                  us in advance. Your insight helps us serve you better.
                </p>
              </div>
              <div className="mt-3 mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-black text-lg font-bold">
                    After the Visit
                  </h3>
                </div>
                <ul className="list-disc pl-6 mb-4 space-y-5">
                  <li>
                    <b>Our engineers model your home.</b> Using software
                    provided by your utility company, we build a virtual model
                    of your home to simulate the energy savings you could
                    achieve with specific upgrades.
                  </li>
                  <li>
                    <b>We generate your personalized report.</b> This document
                    outlines:
                    <ul className="list-disc pl-6 mt-2 space-y-3">
                      <li>Energy performance data and safety findings</li>
                      <li>A prioritized list of recommended improvements</li>
                      <li>Available incentives, rebates, and tax credits</li>
                      <li>Estimated costs and energy savings</li>
                      <li>Next steps, if you choose to move forward</li>
                    </ul>
                  </li>
                </ul>
                <p className="mb-3">
                  Your report is easy to understand, yours to keep, and comes
                  with no obligation.
                </p>
              </div>
              <div className="mt-3 mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-black text-lg font-bold">
                    We’re Committed to a Low-Stress, High-Value Experience
                  </h3>
                </div>
                <p className="mb-3">
                  Whether you’re just looking for clarity or actively planning
                  improvements, this audit is designed to empower you — not sell
                  you. Our role is to provide insight, support, and options. If
                  you have any specific questions, concerns, or areas of your
                  home you'd like us to focus on, feel free to share them with
                  us before our visit.
                </p>
                <p className="mb-3">
                  We’re honored to be part of your home improvement journey, and
                  we look forward to meeting you.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Third Accordion */}
      <div className="border-2 border-[#e0f0d0] rounded-lg">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
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
                  className="text-[#8bc34a]"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-black text-lg font-bold">How To Prepare</h3>
                <p className="text-black">
                  We’ll come prepared — this is just to keep you in the loop and
                  help avoid surprises.
                </p>
              </div>
            </div>
            <button onClick={() => toggleSection("prepare")}>
              <ChevronRight
                className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${openSection === "prepare" ? "rotate-90" : ""}`}
              />
            </button>
          </div>

          {openSection === "prepare" && (
            <div className="mt-3 text-black">
              <div className="mt-3 text-black">
                <p className="mb-3">
                  You’ve already taken a smart step by scheduling your home
                  energy audit. Now, here’s how you can help us make the most of
                  our visit — no stress, no heavy lifting, just a few simple
                  steps to keep things running smoothly.
                </p>
              </div>
              <div className="mt-3 mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-black text-lg font-bold">
                    Before We Arrive
                  </h3>
                </div>
                <ul className="list-disc pl-6 mb-4 space-y-5">
                  <li>
                    <b>Clear access to key areas. </b> <br />
                    Please make sure we can easily reach your attic, basement,
                    utility rooms, and any crawlspaces. These spaces help us get
                    a complete picture of your home’s energy performance.
                  </li>
                  <li>
                    <b>Secure pets.</b> <br />
                    We love pets — but for safety and peace of mind, we ask that
                    any animals be kept secure while we’re in your home.
                  </li>
                  <li>
                    <b>Plan to walk us through.</b>
                    <br /> When we arrive, we’ll take a few moments to listen.
                    Whether it’s a room that’s always too hot or a draft you’ve
                    learned to live with, your insight helps guide our focus and
                    fine-tune our recommendations.
                  </li>
                  <li>
                    <b>Upload your utility usage (optional but helpful).</b>
                    <br /> If you haven’t already, we recommend uploading 12
                    months of your energy usage to the Document Portal in the
                    Ciel Customer Portal. This helps us create a more accurate
                    model of your home’s energy patterns and tailor our analysis
                    to your real-life usage. You can usually download this
                    information from your utility company’s website — look for
                    an option like “Energy Usage History” or “Download Usage
                    Summary.”
                  </li>
                </ul>
              </div>
              <div className="mt-3 mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
                <div className="mt-3 text-black">
                  <h3 className="text-black text-lg font-bold">
                    What We'll Bring and Do
                  </h3>
                  <p className="mb-3">
                    Our technician will come equipped to perform a full
                    diagnostic evaluation of your home, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-5">
                    <li>
                      A <b>blower door test</b> to measure how much air is
                      leaking in and out
                    </li>
                    <li>
                      An <b>infrared scan</b> to locate hidden drafts or
                      insulation gaps
                    </li>
                    <li>
                      <b>Safety testing</b> for gas leaks, carbon monoxide, and
                      other potential hazards
                    </li>
                    <li>
                      Detailed data collection about your insulation, HVAC, hot
                      water systems, and more
                    </li>
                  </ul>
                  <p className="mb-6">
                    We’ll be careful and efficient, with as little disruption as
                    possible.
                  </p>
                </div>
              </div>
              <div className="mt-3 mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]">
                <div className="mt-3 text-black">
                  <h3 className="text-black text-lg font-bold">
                    No Need to Tidy Up — Just Let Us In
                  </h3>
                  <p className="mb-3">
                    We’re here to help, not to judge. As long as we can access
                    the right areas, you don’t need to worry about making your
                    home “audit-ready.”
                  </p>
                  <p className="mb-6">
                    And remember — if you have any questions or want to flag
                    something specific ahead of time, you can reach out or leave
                    a note in your portal. We’re here to support you every step
                    of the way.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fourth Accordion - FAQ */}
      <div className="border-2 border-[#e0f0d0] rounded-lg">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-md border border-[#e0f0d0]">
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
                  className="text-[#8bc34a]"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-black text-lg font-bold">
                  Frequently Asked Questions(FAQ)
                </h3>
                <p className="text-gray-600">
                  Have questions? You're not alone — here are answers to the
                  things most homeowners want to know.
                </p>
              </div>
            </div>
            <button onClick={() => toggleSection("faq")}>
              <ChevronRight
                className={`text-[#8bc34a] flex-shrink-0 transition-transform duration-200 ${
                  openSection === "faq" && !openSection?.startsWith("faq-")
                    ? "rotate-90"
                    : ""
                }`}
              />
            </button>
          </div>

          {(openSection === "faq" || openSection?.startsWith("faq-")) && (
            <div className="mt-3 text-black">
              {faqItems.map((item) => {
                const isOpen = openSection === `faq-${item.id}`;
                return (
                  <div
                    key={item.id}
                    className="mt-3 mb-4 text-black p-6 rounded-lg border-2 border-[#e0f0d0]"
                  >
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() =>
                        setOpenSection(isOpen ? "faq" : `faq-${item.id}`)
                      }
                    >
                      <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#4caf50] mr-4">
                        <span className="font-medium">{item.id}</span>
                      </div>
                      <h3 className="text-[17px] font-medium text-black flex-grow">
                        {item.question}
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 text-[#4caf50] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {isOpen && (
                      <div className="px-16 pb-6 pt-2 text-[15px] leading-relaxed text-black">
                        <p
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        ></p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EnergyAuditAccordions() {
  return <EnergyAuditAccordion />;
}
