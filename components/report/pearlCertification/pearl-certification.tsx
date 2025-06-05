import Discover from "./discover";
import WhatIsPearl from "./whatispearl";
import Package from "./package";
import WhyItMatters from "./why-it-matters";
import PeaceOfMind from "./mind";
import Access from "./access";

const PearlCertificationSection = () => {
  return (
    <div className="container bg-[#eaeaea]" id="pearl-certification">
      <div className="pt-24">
        <section
          className="flex items-center justify-center"
          id="pearl-discover"
        >
          <Discover />
        </section>
      </div>

      <div className="pt-24">
        <section
          className="flex items-center justify-center"
          id="pearl-what-is"
        >
          <WhatIsPearl />
        </section>
      </div>

      <div className="pt-24">
        <section
          className="flex items-center justify-center"
          id="pearl-package"
        >
          <Package />
        </section>
      </div>

      <div className="pt-24">
        <section
          className="flex items-center justify-center"
          id="pearl-why-matters"
        >
          <WhyItMatters />
        </section>
      </div>

      <div className="pt-24">
        <section
          className="flex items-center justify-center"
          id="pearl-peace-of-mind"
        >
          <PeaceOfMind />
        </section>
      </div>

      <div className="pt-24">
        <section className="flex items-center justify-center" id="pearl-access">
          <Access />
        </section>
      </div>
    </div>
  );
};

export default PearlCertificationSection;
