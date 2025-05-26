import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FinancialSummaryData } from "@/app/admin/[bookingNumber]/report/page";
import { DollarSign, Trash2 } from "lucide-react";
import ReportEditableInput from "../common/editableInput";
import { PlusCircle, Lightbulb } from "lucide-react";

interface ReportSummarySectionFinancialSummaryProps {
  isAdmin?: boolean;
  financialSummary?: FinancialSummaryData;
  onUpdateValue?: (financialSummary: FinancialSummaryData) => void;
}

const ReportSummarySectionFinancialSummary = ({
  isAdmin,
  financialSummary,
  onUpdateValue,
}: ReportSummarySectionFinancialSummaryProps) => {
  const [financialSummaryData, setFinancialSummaryData] =
    useState<FinancialSummaryData>(
      financialSummary ?? {
        title: "Financial Summary",
        data: [
          { title: "Total Project Costs", amount: "0.00" },
          { title: "Audit Refund", amount: "0.00" },
          { title: "NJ HPwES Cash Back Incentive", amount: "0.00" },
          { title: "Remaining Balance", amount: "0.00" },
          { title: "Amount Eligible for NJ HPwES Financing", amount: "0.00" },
          { title: "Remaining Out of Pocket Expenses", amount: "0.00" },
        ],
        monthlyPayment: 0,
        financingPeriodYears: 1,
      }
    );

  useEffect(() => {
    if (onUpdateValue) {
      onUpdateValue(financialSummaryData);
    }
  }, [financialSummaryData]);

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

  const addFinancialItem = () => {
    setFinancialSummaryData((prev) => ({
      ...prev,
      data: [
        ...(prev.data ?? []),
        { title: "New Financial Item", amount: "0.00" },
      ],
    }));
  };

  const deleteFinancialItem = (index: number) => {
    setFinancialSummaryData((prev) => ({
      ...prev,
      data: [
        ...(prev.data?.slice(0, index) ?? []),
        ...(prev.data?.slice(index + 1) ?? []),
      ],
    }));
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      id="project-costs"
      className="w-full border-b border-gray-200 mb-4 -mt-4"
    >
      <div className="w-full mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <img
              src="/notes-icon.svg"
              className="text-[#67b502] w-8 h-8 mr-2"
              alt="Notes Icon"
            /> */}
            <Lightbulb className="text-[#67b502] w-8 h-8 mr-2" />
            <h2 className="text-[#67b502] text-2xl font-bold">Financial Summary</h2>
          </div>
        </div>

        <div className="mt-4">
          <div className="space-y-4">
            {/* Render all financial items */}
            {financialSummaryData.data?.map((item, index) => (
              <motion.div
                key={`item-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-[#ffffff] rounded-xl text-center border border-gray-200 p-4 shadow-sm"
              // className="p-5 rounded-lg"
              // style={{ backgroundColor: "#67B5020A" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                    // style={{ backgroundColor: "#67B5021A" }}
                    >
                      <DollarSign
                        className="h-5 w-5"
                        style={{ color: "#67B502" }}
                      />
                    </div>

                  {/* text insider container below financial summary */}
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: "#545454" }}>
                        {isAdmin ? (
                          <ReportEditableInput
                            value={item.title}
                            onChange={(title) => {
                              setFinancialSummaryData({
                                ...financialSummaryData,
                                data: [
                                  ...(financialSummaryData.data?.slice(
                                    0,
                                    index
                                  ) ?? []),
                                  { ...item, title: title as string },
                                  ...(financialSummaryData.data?.slice(
                                    index + 1
                                  ) ?? []),
                                ],
                              });
                            }}
                          />
                        ) : (
                          item.title
                        )}
                      </h3>
                      {item.title.toLowerCase().includes("financing") && (
                        <p className="text-xs text-gray-500">
                          *if qualified by financing company (0% Interest Rate)
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* values of the text below financial summary */}
                  <div
                    className="flex items-center font-semibold text-lg"
                    style={{ color: "#545454" }}
                  >
                    {isAdmin ? (
                      <ReportEditableInput
                        value={item.amount}
                        onChange={(amount) => {
                          setFinancialSummaryData({
                            ...financialSummaryData,
                            data: [
                              ...(financialSummaryData.data?.slice(0, index) ??
                                []),
                              {
                                ...item,
                                amount: formatCurrency(amount as string),
                              },
                              ...(financialSummaryData.data?.slice(index + 1) ??
                                []),
                            ],
                          });
                        }}
                      />
                    ) : (
                      item.amount
                    )}
                    {isAdmin && (
                      <button
                        onClick={() => deleteFinancialItem(index)}
                        className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add new item button for admin */}
            {isAdmin &&
              financialSummaryData?.data &&
              financialSummaryData.data.length > 0 && (
                <div className="flex justify-end p-4">
                  <button
                    onClick={addFinancialItem}
                    // className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1"
                    className="bg-[#ffffff] rounded-xl border border-gray-200 p-3 shadow-sm hover:bg-[#67B5020A] transition-all duration-300 flex items-center gap-2 text-[#67b502] font-medium"
                    type="button"
                  >
                    <PlusCircle className="h-5 w-5" />
                    Add Financial Item
                  </button>
                </div>
              )}

            {/* Empty state */}
            {financialSummaryData.data &&
              financialSummaryData.data.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#ffffff] rounded-xl border border-gray-200 p-8 shadow-sm"
                >
                  {/* Header with Icon and Title in one line */}
                  <div className="flex items-center gap-4 mb-6">
                    <DollarSign
                      className="h-5 w-5"
                      style={{ color: "#67B502" }}
                    />
                    <h3 className="font-medium" style={{ color: "#67B502" }}>
                      No Financial Items
                    </h3>
                  </div>

                  {/* Add Button Below */}
                  {isAdmin && (
                    <div>
                    {/* <div className="flex justify-center"> */}
                      <button
                        onClick={addFinancialItem}
                        className="bg-[#ffffff] rounded-xl border border-gray-200 p-3 shadow-sm hover:bg-[#67B5020A] transition-all duration-300 flex items-center gap-2 text-[#67b502] font-medium"
                        type="button"
                      >
                        <PlusCircle className="h-5 w-5" />
                        Add Financial Item 1
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

            {/* Render monthly payment at the bottom */}
            {financialSummaryData.data &&
              financialSummaryData.data.length > 0 && (
                // <div
                //   className="p-5 rounded-lg text-center"
                //   style={{ backgroundColor: "#67B5020A" }}
                // >
                <div className="bg-[#ffffff] rounded-xl text-center border border-gray-200 p-8 shadow-sm">
                  <h3 className="text-3xl font-semibold mb-2" style={{ color: "#545454" }}>
                    Total Project Costs
                  </h3>
                  {isAdmin ? (
                    <div className="flex justify-center items-center my-2">
                      <ReportEditableInput
                        type="number"
                        value={financialSummaryData.monthlyPayment ?? 0}
                        onChange={(monthlyPayment) => {
                          setFinancialSummaryData({
                            ...financialSummaryData,
                            monthlyPayment: Number(monthlyPayment),
                          });
                        }}
                      />
                      <span
                        className="text-2xl font-bold ml-1"
                        style={{ color: "#67B502" }}
                      >
                        /month
                      </span>
                    </div>
                  ) : (
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "#67B502" }}
                    >
                      {formatCurrency(
                        financialSummaryData.monthlyPayment?.toString() as string
                      )}
                      /month
                    </p>
                  )}
                  <div className="text-xs text-gray-600 mt-2 flex items-center justify-center">
                    <span>*Over a </span>
                    {isAdmin ? (
                      <span className="mx-1">
                        <ReportEditableInput
                          type="number"
                          value={financialSummaryData.financingPeriodYears ?? 0}
                          onChange={(financingPeriodYears) => {
                            setFinancialSummaryData({
                              ...financialSummaryData,
                              financingPeriodYears:
                                Number(financingPeriodYears),
                            });
                          }}
                        />
                      </span>
                    ) : (
                      <span className="mx-1">
                        {financialSummaryData.financingPeriodYears}
                      </span>
                    )}
                    <span> year period</span>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportSummarySectionFinancialSummary;
