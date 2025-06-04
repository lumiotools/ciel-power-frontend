import Discover from "./discover";
import WhatIsPearl from "./whatispearl";
import Package from "./package";
import WhyItMatters from "./why-it-matters";
import PeaceOfMind from "./mind";
import Access from "./access";

const PearlCertificationSection = () => {
  return (
    <div className="container bg-[#eaeaea]" id="pearl-certification">
      <section
        className="min-h-screen flex items-center justify-center"
        id="pearl-discover"
      >
        <Discover />
      </section>

      <section
        className="min-h-screen flex items-center justify-center"
        id="pearl-what-is"
      >
        <WhatIsPearl />
      </section>

      <section
        className="min-h-screen flex items-center justify-center"
        id="pearl-package"
      >
        <Package />
      </section>

      <section
        className="min-h-screen flex items-center justify-center"
        id="pearl-why-matters"
      >
        <WhyItMatters />
      </section>

      <section
        className="min-h-screen flex items-center justify-center"
        id="pearl-peace-of-mind"
      >
        <PeaceOfMind />
      </section>

      <section
        className="min-h-screen flex items-center justify-center"
        id="pearl-access"
      >
        <Access />
      </section>
    </div>
  );
};

export default PearlCertificationSection;
