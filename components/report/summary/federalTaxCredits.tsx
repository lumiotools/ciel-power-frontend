import { FederalTaxCreditData } from "@/app/admin/[bookingNumber]/report/page";
import { Activity, Trash2 } from "lucide-react";
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
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/notes-icon.svg" className="text-[#67b502] w-8 h-8 mr-2" />
            <h2 className="text-[#67b502] text-2xl font-bold">
              Federal Tax Credits
            </h2>
          </div>
        </div>

        <div className="mt-4">
          {/* Static introduction text */}
          <div
            className="mb-5 p-5 rounded-lg"
            style={{ backgroundColor: "#67B5020A" }}
          >
            <div className="space-y-2">
              <div className="text-lg font-medium text-gray-800">
                Energy Efficient Home Improvement Federal Tax Credit
              </div>
              <div className="text-gray-700 italic">
                If you make qualified energy-efficient improvements to your home
                after Jan. 1, 2023, you may qualify for a tax credit up to
                $3,200.
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {taxCredits.length > 0 ? (
              taxCredits.map((item, index) => (
                <motion.div
                  key={`tax-credit-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-5 rounded-lg"
                  // style={{ backgroundColor: "#67B5020A" }}
                  // above wala code is after add tax credit click - new tax credit wla container
                >
                  <div className="flex items-start gap-3">
                    {/* after add tax credit click - new tax credit wla container ka icon wala div below*/}
                    <div
                      className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                      // style={{ backgroundColor: "#67B5021A" }}
                    >
                      <Activity
                        className="h-5 w-5"
                        style={{ color: "#67B502" }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div
                          className="font-medium mb-1"
                          style={{ color: "#67B502" }}
                        >
                          {isAdmin ? (
                            <ReportEditableInput
                              placeholder="Enter title"
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
                        </div>
                        <div
                          className="flex items-center font-semibold"
                          style={{ color: "#67B502" }}
                        >
                          {isAdmin ? (
                            <ReportEditableInput
                              placeholder="Enter amount"
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
                      {(isAdmin || item.note) && (
                        <div className="text-gray-700 text-sm">
                          {isAdmin ? (
                            <ReportEditableInput
                              placeholder="Enter note"
                              value={item.note ?? ""}
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
                          ) : (
                            item.note
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-5 rounded-lg"
                style={{ backgroundColor: "#67B5020A" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                    style={{ backgroundColor: "#67B5021A" }}
                  >
                    <Activity
                      className="h-5 w-5"
                      style={{ color: "#67B502" }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium" style={{ color: "#67B502" }}>
                      No Tax Credits
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">
                      No tax credits have been added yet.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Add new item button for admin */}
            {isAdmin && (
              <div className="flex justify-end p-4">
                <button
                  onClick={addTaxCreditItem}
                  className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1"
                  style={{ backgroundColor: "#67B5021A", color: "#67B502" }}
                  type="button"
                >
                  + Add Tax Credit
                </button>
              </div>
            )}
          </div>

          {/* Static instructions text */}
          <div
            className="mt-5 p-5 rounded-lg"
            style={{ backgroundColor: "#67B5020A" }}
          >
            <div className="space-y-2">
              <div className="text-lg font-medium text-gray-800">
                How to claim the Energy Efficient Home Improvement Credit
              </div>
              <div className="text-gray-700">
                File Form 5695, Residential Energy Credits Part II, with your
                tax return to claim the credit. You must claim the credit for
                the tax year when the property is installed, not merely
                purchased.
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportSummarySectionFederalTaxCredits;
