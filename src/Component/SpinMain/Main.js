import React from "react";
import Spin from "./Script";
import "./Min.css";
import Spin1 from "./Spin1";

const Main = () => {
  return (
    <div className="app">
      {/* <img src="./image4.png" alt="Logo" /> */}
      <div className="main">
        {/* <img src="./image4.png" alt="Logo" /> */}
        <div className="task_column">
          <Spin1 />
        </div>
        <div className="task_column">
          <Spin />
        </div>
      </div>
    </div>
  );
};

export default Main;
