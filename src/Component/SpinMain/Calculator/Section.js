import React, { useState } from "react";
import "./style.css";
const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
  >
    <path
      d="M0 10.59L4.58 6L0 1.41L1.41 0L7.41 6L1.41 12L0 10.59Z"
      fill="#060DBF"
    />
  </svg>
);
const Section = () => {
  return (
    <div
      className={`container max-w-full mx-auto pt-12`}
    >
      <h2 className=" text-center lg:mx-0 tracking-[8px]  text-md md:text-lg text-col13 font-poppins mb-1">
        CARBON FOOTPRINT CALCULATOR
      </h2>
      <h1 className=" lg:mx-0 text-poppins text-4xl text-black lg:text-6xl py-4">
        Calculate your personal carbon footprint
      </h1>
      {/* <div className=" lg:mx-0 underline w-16 h-[2px] bg-col15 mt-4 mb-2"></div> */}
      <div className=" lg:mx-0  lg:col-span-8 mt-2">
        <p
          style={{ wordSpacing: "2px" }}
          className=" lg:mx-0 text-md text-col9 font-poppins"
        >
          A person emits anything between 4-10 tonne CO<sub>2</sub>e every year.
          Take a sneak peek into your individual emission
        </p>
      </div>
    </div>
  );
};

export default Section;
