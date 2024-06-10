import Contact from "./contact";
import React from "react";
import "./style1.css";

const Popup = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;
  const handleCloseClick = (event) => {
    event.preventDefault();
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto border shadow-lg  w-[80%] lg:w-[60%] rounded-md  bg-white">
        <button
          className="absolute top-2 right-2 text-gray-500 focus:outline-none"
          onClick={handleCloseClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mx-auto h-[80%] w-[100%]">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Popup;
