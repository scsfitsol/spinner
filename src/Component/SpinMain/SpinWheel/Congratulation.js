import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import bgImage from "../image4.png"; // Ensure you have the image in the correct path

const CongratulationsCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 sm:w-96">
        <div
          className="bg-cover bg-center h-40"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        ></div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Congratulations!</h2>
          <p className="text-gray-700 mb-6">
            You have won an exciting prize! Thank you for participating in our contest. We appreciate your support for sustainable practices and environmental conservation.
          </p>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsCard;
