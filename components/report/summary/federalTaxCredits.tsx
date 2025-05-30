import { FederalTaxCreditData } from "@/app/admin/[bookingNumber]/report/page";
import { DollarSign, PlusCircle, Trash2, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReportEditableInput from "../common/editableInput";

interface ReportSummarySectionFederalTaxCreditsProps {
  isAdmin?: boolean;
  federalTaxCredits?: FederalTaxCreditData[];
  onUpdateValue?: (federalTaxCredits: FederalTaxCreditData[]) => void;
}

const ReportSummarySectionFederalTaxCredits = ({
  isAdmin,
  federalTaxCredits,
  onUpdateValue,
}: ReportSummarySectionFederalTaxCreditsProps) => {
  const [taxCredits, setTaxCredits] = useState<FederalTaxCreditData[]>(
    federalTaxCredits ?? [
      { title: "Insulation", amount: "1200.00" },
      {
        title: "Mechanical Equipment",
        amount: "0",
        note: "*after installing proposed upgrades",
      },
    ]
  );

  const [isOpen, setIsOpen] = useState(true); // Add state for toggle functionality

  useEffect(() => {
    onUpdateValue && onUpdateValue(taxCredits);
  }, [taxCredits]);

  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";

  const formatCurrency = (amount: string): string => {
    // Convert to number, format, then back to string
    const numericValue = Number.parseFloat(amount);
    if (isNaN(numericValue)) return "$0.00";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(numericValue);
  };

  const addTaxCreditItem = () => {
    const newItem: FederalTaxCreditData = {
      title: "New Tax Credit",
      amount: "0",
    };
    setTaxCredits([...taxCredits, newItem]);
  };

  const deleteTaxCreditItem = (index: number) => {
    const updatedTaxCredits = taxCredits.filter((_, i) => i !== index);
    setTaxCredits(updatedTaxCredits);
  };

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      id="tax-credits"
      className="w-full border-b border-gray-200 bg-white max-h-fit p-8"
    >
      {/* --- Outer Container Padding (adjust here) --- */}
      <div className="w-full mx-auto px-4 py-4">
        {/* --- Header Section with Toggle Button --- */}
        <div className="flex justify-between items-center">
          <h2 className="text-[#67b502] text-2xl font-bold flex items-center">
            <DollarSign className="w-8 h-8 mr-2" />
            Federal Tax Credits
          </h2>
          <button
            onClick={toggleSection}
            className="text-[#67b502] transition-transform duration-300 border-2 border-[#67b502] rounded-full p-0.5"
            aria-label={isOpen ? "Hide section" : "Show section"}
          >
            <ChevronUp
              className={`w-6 h-6 transition-transform duration-300 ${
                isOpen ? "" : "transform rotate-180"
              }`}
            />
          </button>
        </div>
        {/* --- End Header Section --- */}

        {/* --- Collapsible Content Section --- */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[2000px] opacity-100 mt-4"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          {/* --- Inner Content Padding (adjust here) --- */}
          <div className="mt-4">
            {/* --- Introduction Text Section --- */}
            <div className="bg-[#ffffff] rounded-xl border border-gray-200 p-8 shadow-sm mb-4">
              {/* p-8 above controls padding for intro box */}
              <div className="text-lg font-medium text-gray-800 mb-2">
                Energy Efficient Home Improvement Federal Tax Credit
              </div>
              <div className="text-gray-700">
                If you make qualified energy-efficient improvements to your home
                after Jan. 1, 2023, you may qualify for a tax credit up to
                $3,200.
              </div>
            </div>
            {/* --- End Introduction Text Section --- */}

            {/* --- Tax Credits List Section --- */}
            <div className="space-y-4">
              {/* Each tax credit item container */}
              {taxCredits.length > 0 ? (
                taxCredits.map((item, index) => (
                  <motion.div
                    key={`tax-credit-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-[#ffffff] rounded-xl text-center border border-gray-200 p-2 shadow-sm" // This p-4 controls the container padding
                  >
                    {/* --- Tax Credit Row --- */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12">
                          <DollarSign className="h-5 w-5 text-[#67B502]" />
                        </div>
                        <div>
                          <h3
                            className="font-semibold text-lg text-left mb-0" // Remove bottom margin from heading
                            style={{ color: "#545454" }}
                          >
                            {isAdmin ? (
                              <ReportEditableInput
                                value={item.title}
                                // Optionally add style={{marginBottom: 0}} here if needed
                                onChange={(value) => {
                                  setTaxCredits([
                                    ...taxCredits.slice(0, index),
                                    {
                                      ...item,
                                      title: value as string,
                                    },
                                    ...taxCredits.slice(index + 1),
                                  ]);
                                }}
                              />
                            ) : (
                              item.title
                            )}
                          </h3>
                          {/* Space between heading and note - adjust 'mt-[-2px]' as needed */}
                          <div className="text-sm mt-[-2px]">
                            {isAdmin ? (
                              <ReportEditableInput
                                value={item.note ?? ""}
                                placeholder="Add a note (optional)"
                                // Optionally add style={{marginTop: 0, paddingTop: 0}} here if needed
                                onChange={(value) => {
                                  setTaxCredits([
                                    ...taxCredits.slice(0, index),
                                    {
                                      ...item,
                                      note: value as string,
                                    },
                                    ...taxCredits.slice(index + 1),
                                  ]);
                                }}
                              />
                            ) : item.note ? (
                              <p className="text-gray-500">{item.note}</p> // Note text color
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div
                        className="flex items-center font-semibold text-lg"
                        style={{ color: "#545454" }}
                      >
                        {isAdmin ? (
                          <ReportEditableInput
                            value={item.amount}
                            onChange={(value) => {
                              setTaxCredits([
                                ...taxCredits.slice(0, index),
                                {
                                  ...item,
                                  amount: formatCurrency(value as string),
                                },
                                ...taxCredits.slice(index + 1),
                              ]);
                            }}
                          />
                        ) : item.amount === "0" ? (
                          "--"
                        ) : (
                          item.amount
                        )}
                        {isAdmin && (
                          <button
                            onClick={() => deleteTaxCreditItem(index)}
                            className="ml-2 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    {/* --- End Tax Credit Row --- */}
                  </motion.div>
                ))
              ) : (
                // --- Empty State Section ---
                <div className="bg-[#ffffff] rounded-xl border border-gray-200 p-8 shadow-sm">
                  {/* p-8 above controls padding for empty state box */}
                  <div className="flex items-center gap-4 mb-6">
                    <DollarSign className="h-5 w-5 text-[#67B502]" />
                    <h3 className="font-medium text-[#gray-800]">
                      No Tax Credits
                    </h3>
                  </div>
                  {isAdmin && (
                    <div className="flex justify-start">
                      {" "}
                      {/* this is the first add tax credit button */}
                      {/* p-4 above controls padding for add button row */}
                      <button
                        onClick={addTaxCreditItem}
                        className="bg-[#ffffff] rounded-xl border border-gray-200 p-3 shadow-sm hover:bg-[#67B5020A] transition-all duration-300 flex items-center gap-2 text-[#67b502] font-medium"
                        type="button"
                      >
                        <PlusCircle className="h-5 w-5" />
                        Add Tax Credit
                      </button>
                    </div>
                  )}
                </div>
                // --- End Empty State Section ---
              )}

              {/* --- Add Tax Credit Button Section --- */}
              {isAdmin && taxCredits.length > 0 && (
                // Changed justify-end to justify-start for left alignment
                <div className="flex justify-start pl-8">
                  {" "}
                  {/* this is the second add tax credit button */}
                  {/* p-4 above controls padding for add button row */}
                  <button
                    onClick={addTaxCreditItem}
                    className="bg-[#ffffff] rounded-xl border border-gray-200 p-3 shadow-sm hover:bg-[#67B5020A] transition-all duration-300 flex items-center gap-2 text-[#67b502] font-medium"
                    type="button"
                  >
                    <PlusCircle className="h-5 w-5" />
                    Add Tax Credit
                  </button>
                </div>
              )}
              {/* --- End Add Tax Credit Button Section --- */}

              {/* --- Instructions Text Section --- */}
              <div className="bg-[#ffffff] rounded-xl border border-gray-200 p-8 shadow-sm mt-4">
                {/* p-8 above controls padding for instructions box */}
                <div className="text-lg font-medium text-gray-800 mb-2">
                  How to claim the Energy Efficient Home Improvement Credit
                </div>
                <div className="text-gray-700">
                  File Form 5695, Residential Energy Credits Part II, with your
                  tax return to claim the credit. You must claim the credit for
                  the tax year when the property is installed, not merely
                  purchased.
                </div>
              </div>
              {/* --- End Instructions Text Section --- */}
            </div>
            {/* --- End Tax Credits List Section --- */}
          </div>
          {/* --- End Inner Content Padding --- */}
        </div>
        {/* --- End Collapsible Content Section --- */}
      </div>
      {/* --- End Outer Container Padding --- */}
    </motion.div>
  );
};

export default ReportSummarySectionFederalTaxCredits;
