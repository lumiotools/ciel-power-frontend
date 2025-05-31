import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Discover from "./discover";
import WhatIsPearl from "./whatispearl";
import Package from "./package";
import WhyItMatters from "./why-it-matters";
import PeaceOfMind from "./mind";
import Access from "./access";

const PearlCertificationSection = () => {
  return (
    <div className="container bg-[#eaeaea]" id="pearl-header">
      <div className="min-h-screen flex items-center justify-center">
        <Discover />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <WhatIsPearl />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <Package />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <WhyItMatters />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <PeaceOfMind />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <Access />
      </div>
    </div>
  );
};

export default PearlCertificationSection;
