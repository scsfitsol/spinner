import React from "react";
import logo from "../Form/LogoForm.png";
import Section1 from "./Section4";
import Section2 from "./Section2";

const Calculator = () => {
  return (
    <div className="p-5">
      {/* Header Section */}
      <div className="bg-blue-800 rounded-lg text-left p-5">
        <img
          src={logo}
          alt="Logo"
          className="ml-10 mt-6 mb-6"
          style={{ width: "180px" }}
        />
      </div>

      <div className="ml-5">
        {/* Sections */}
        <Section1 />
        <Section2 />
      </div>
    </div>
  );
};

export default Calculator;
