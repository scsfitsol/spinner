import React from "react";
import Certificate from "../Certification/Certificate";
import FormSection from "./Form/Form";
import Spinwheel from "./SpinWheel/index";
import SpinningWheel from "./SpinWheel/index";
import Calculator from "./Calculator/Calculator";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Spin from "./Script";
import "./Min.css";
import SpinPoster from "./Spin1";
const Main = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<FormSection />} />
      <Route path="/spin" element={<SpinningWheel />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/certificate" element={<Certificate />} />
      </Routes>
    </div>
  );
};
export default Main;

{
  /* <FormSection/>
      <SpinningWheel/> */
}
{
  /* <div >
          <div >
            <Spin1 />
          </div>
          <div >
            <SpinningWheel/>
          </div>
      </div> */
}
