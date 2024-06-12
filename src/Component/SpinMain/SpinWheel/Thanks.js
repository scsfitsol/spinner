import React from "react";
import { useNavigate } from "react-router-dom";
const ThankYou = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Thank You! 🎉
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for participating in our contest! Your support for
          sustainable practices and environmental conservation is greatly
          appreciated. 🌱🌍
        </p>
        <p className="text-lg text-green-800 font-bold">
          We hope to see you again in future events!
        </p>
        <button
          onClick={handleClose}
          className="px-4 py-2 my-4 bg-buttonColor text-black font-bold rounded hover:bg-hoveColor transition duration-300"
        >
          return to home page
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
