"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ReportContextProps {
  reportData: object;
  setReportData: (data: object) => void;
}

const ReportContext = createContext<ReportContextProps | undefined>(undefined);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reportData, setReportData] = useState<object>({});

  return (
    <ReportContext.Provider value={{ reportData, setReportData }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReportContext must be used within a ReportProvider");
  }
  return context;
};