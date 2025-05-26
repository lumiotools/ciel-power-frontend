import { FederalTaxCreditData } from "@/app/admin/[bookingNumber]/report/page";
import { Activity, PlusCircle, Trash2 } from "lucide-react";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      id="tax-credits"
      className="w-full border-b border-gray-200 mb-4 -mt-4"
    >
      <div className="w-full mx-auto px-4 py-4">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Activity className="text-[#67b502] w-8 h-8 mr-2" />
            <h2 className="text-[#67b502] text-2xl font-bold">
              Federal Tax Credits
            </h2>
          </div>
        </div>

        <div className="mt-4">
          {/* Introduction Text */}
          <div className="bg-[#ffffff] rounded-xl border border-gray-200 p-8 shadow-sm mb-4">
            <div className="text-lg font-medium text-gray-800 mb-2">
              Energy Efficient Home Improvement Federal Tax Credit
            </div>
            <div className="text-gray-700">
              If you make qualified energy-efficient improvements to your home
              after Jan. 1, 2023, you may qualify for a tax credit up to $3,200.
            </div>
          </div>

          <div className="space-y-4">
            {/* Tax Credits List */}
            {taxCredits.length > 0 ? (
              taxCredits.map((item, index) => (
                <motion.div
                  key={`tax-credit-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-[#ffffff] rounded-xl text-center border border-gray-200 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center">
                        <Activity className="h-5 w-5 text-[#67B502]" />
                      </div>
                      <div>
                        <h3
                          className="font-semibold text-lg text-left"
                          style={{ color: "#545454" }}
                        >
                          {isAdmin ? (
                            <ReportEditableInput
                              value={item.title}
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
                        {item.note && (
                          <p className="text-xs text-gray-500 text-left">
                            {item.note}
                          </p>
                        )}
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
                </motion.div>
              ))
            ) : (
              // Empty State
              <div className="bg-[#ffffff] rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Activity className="h-5 w-5 text-[#67B502]" />
                  <h3 className="font-medium text-[#67B502]">No Tax Credits</h3>
                </div>
                {isAdmin && (
                  <button
                    onClick={addTaxCreditItem}
                    className="bg-[#ffffff] rounded-xl border border-gray-200 p-3 shadow-sm hover:bg-[#67B5020A] transition-all duration-300 flex items-center gap-2 text-[#67b502] font-medium"
                    type="button"
                  >
                    <PlusCircle className="h-5 w-5" />
                    Add Tax Credit
                  </button>
                )}
              </div>
            )}

            {/* Add Tax Credit Button */}
            {isAdmin && taxCredits.length > 0 && (
              <div className="flex justify-end p-4">
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

            {/* Instructions Text */}
            <div className="bg-[#ffffff] rounded-xl border border-gray-200 p-8 shadow-sm mt-4">
              <div className="text-lg font-medium text-gray-800 mb-2">
                How to claim the Energy Efficient Home Improvement Credit
              </div>
              <div className="text-gray-700">
                File Form 5695, Residential Energy Credits Part II, with your tax return
                to claim the credit. You must claim the credit for the tax year when
                the property is installed, not merely purchased.
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportSummarySectionFederalTaxCredits;
