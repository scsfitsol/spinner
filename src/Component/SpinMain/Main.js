import React from "react";
// import Calculator from "./Calculator/Calculator";
import Certificate from "../Certification/Certificate";
import FormSection from "./Form/Form";
import Spinwheel from "./SpinWheel/index";
import SpinningWheel from "./SpinWheel/index";
import Spin from "./Script";
import "./Min.css";
import SpinPoster from "./Spin1";
// import Form1 from "./Form/Form";
const Main = () => {
  return (
    <div>
      {/* <div className="main">
        <SpinPoster/>
      </div> */}
      <FormSection/>
        <SpinningWheel/>
    </div>
  );
};
export default Main;

{/* <div >
          <div >
            <Spin1 />
          </div>
          <div >
            <SpinningWheel/>
          </div>
      </div> */}