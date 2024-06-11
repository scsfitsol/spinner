import React from "react";
import Spinwheel from './SpinWheel/index';
// import Section2 from "./Calculator/Section2";
// import Section1 from "./Calculator/Section4";
import Spin from "./Script";
import "./Min.css";
import Spin1 from "./Spin1";

// import Form1 from "./Form/Form";

const Main = () => {
  return (
    <div>
    <div className="app">
      <div className="main">
        <div className="task_column">
          <Spin1 />
        </div>
        <div className="task_column">
          <Spin />
        </div>
      </div>
    </div>

    <div>
      <Spinwheel/>
    </div>
    </div>

    // <div>
    //   <Form1 />
    //   <Section1 />
    //   <Section2 />
    // </div>
  );
};

export default Main;
