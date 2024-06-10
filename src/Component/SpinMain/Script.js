import React, { useState } from "react";
import "./Style.css";

const Spin = () => {
  // const [rotationClass, setRotationClass] = useState("circle");
  const [rotationClass, setRotationClass] = useState("circle");

  const startRotation = () => {
    setRotationClass("circle start-rotate");

    setTimeout(() => {
      setRotationClass("circle start-rotate stop-rotate");
    }, Math.floor(Math.random() * 10000) + 1);
  };
  return (
    <div className="spin">
      <div className="arrow"></div>
      <ul className={rotationClass}>
        <li className="text">
          Green Kit + <br />
          25% CNC
        </li>
        <li className="text">Green Kit</li>
        <li className="text">
          Better Luck
          <br /> Next Time
        </li>
        <li className="text">
          Green Kit + <br />
          100% CNC
        </li>
        <li className="text">Green Kit</li>
        <li className="text">iPad</li>
      </ul>
      <div className="logo">
        <img src="./image/image2.png" alt="Logo" />
      </div>
      {/* <button
        className="spin-button"
        onClick={() => setRotationClass("circle start-rotate")}
      >
        SPIN
      </button> */}
      <button className="spin-button" onClick={startRotation}>
        <b>Take Your Spin Now!</b>
      </button>
    </div>
  );
};

export default Spin;
