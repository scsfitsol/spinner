import React from "react";
import Section from "./Section";
const Section1 = () => {
  return (
    <Section
      title="CARBON CALCULATOR"
      head="Calculate your personal carbon footprint"
      // desc={`A person emits anything between 4-10 tonne CO\u2082e every year. Take a sneak peek into your individual emission`}
      desc={
        <>
          <span>
            A person emits anything between 4-10 tonne CO<sub>2</sub>e every
            year. Take a sneak peek into your individual emission
          </span>
        </>
      }
      button={null}
      padding={"px-0"}
    />
  );
};

export default Section1;
