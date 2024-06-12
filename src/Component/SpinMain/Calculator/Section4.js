import React from "react";
import Section from "./Section";
import "tailwindcss/tailwind.css";

const Section1 = () => {
  return (
    <Section
      title="CARBON CALCULATOR"
      head="Calculate your personal carbon footprint"
      // desc={`A person emits anything between 4-10 tonne CO\u2082e every year. Take a sneak peek into your individual emission`}
      desc={
        <>
          {/* <span className="text-left"> */}
          <p className="text-left">
            A person emits anything between 4-10 tonne CO<sub>2</sub>e every
            year. Take a sneak peek into your individual emission
          </p>
          {/* </span> */}
        </>
      }
      button={null}
      padding={"px-0"}
    />
  );
};

export default Section1;
