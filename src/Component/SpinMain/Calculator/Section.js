"use client";
import React, { useState } from "react";
import "./style1.css";
import Popup from "./popup";
import { Link } from "react-router-dom";
// const icon = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="8"
//     height="12"
//     viewBox="0 0 8 12"
//     fill="none"
//   >
//     <path
//       d="M0 10.59L4.58 6L0 1.41L1.41 0L7.41 6L1.41 12L0 10.59Z"
//       fill="#060DBF"
//     />
//   </svg>
// );
const Section = (props) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const getDynamicClass = () => {
    if (isPopupOpen) {
      return "py-4 lg:py-5 lg:px-3 flex items-center bg-col18 hover:bg-col8 px-1";
    } else {
      return "py-4 lg:py-5 lg:px-3 flex items-center bg-primary hover:bg-col8 px-1";
    }
  };
  return (
    <div
      className={`container max-w-full grid grid-cols-12 gap-2 ${props.padding} pt-[96px]`}
    >
      <h2 className=" col-span-12 lg:col-span-8 lg:mx-0 tracking-[8px]  md:text-lg text-col13 font-poppins mb-1 text-left ml-1">
        {props.title}
      </h2>
      <h1 className="col-span-12 lg:col-span-8 lg:mx-0 text-4xl text-black lg:text-6xl font-serif mb-1 text-left">
        {props.head}
        {/* <hr className="border-t-3 border-blue-800 w-20 h-10" /> */}
      </h1>
      <div className="col-span-12 lg:col-span-8 lg:mx-0 underline w-16 h-[2px] bg-col15 mt-4 mb-2"></div>
      {props.desc !== null && (
        <div className="col-span-12 lg:mx-0  lg:col-span-8 mt-2">
          <p
            style={{ wordSpacing: "2px" }}
            className="col-span-12 lg:col-span-8 lg:mx-0 md:text-lg lg:text-xl text-col9 font-poppins"
          >
            {props.desc}
          </p>
        </div>
      )}
      {props.button !== null && (
        <div className="col-span-12 lg:col-span-8 lg:mx-0 mt-4 flex items-center hover:cursor-pointer">
          <div
            className={getDynamicClass()}
            style={{ borderRadius: "var(--radius-lg, 16px)" }}
            onClick={(e) => {
              e.preventDefault();
              togglePopup();
            }}
          >
            <div>
              <Link
                href="#"
                className="lg:mx-0 text-md lg:text-lg  px-4   text-hemanth  font-semibold  font-poppins "
                onClick={(e) => {
                  e.preventDefault();
                  togglePopup();
                }}
              >
                {props.button}
              </Link>
            </div>
          </div>
          <Popup isOpen={isPopupOpen} onClose={togglePopup}></Popup>
        </div>
      )}
    </div>
  );
};

export default Section;
