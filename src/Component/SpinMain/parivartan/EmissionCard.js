import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import parivartan from "../parivartan.png"; // Ensure you have the image in the correct path

const EmissionCard = ({ businessEmission, hotelEmission }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const totalEmission = businessEmission + hotelEmission;

  const handleClose = () => {
    navigate("/offset-emissions"); // Adjust navigation as necessary
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-3/4 md:w-2/3 lg:w-1/3">
      <img src={parivartan} alt="parivartan" className="w-full h-full" />
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Congratulations! ✅
          </h2>
          <p className="text-gray-700 text-center">
            🎉 You have successfully contributed to reducing your carbon footprint! 🌱🌍
          </p>
          <div className="my-6">
            <p className="text-lg text-center">
              <strong>Business Travels:</strong> {businessEmission || 0} kg CO₂e
            </p>
            <p className="text-lg text-center">
              <strong>Hotel Stays:</strong> {hotelEmission || 0} kg CO₂e
            </p>
            <p className="mt-4 text-xl text-center font-bold">
              Total Emission: {totalEmission || 0} kg CO₂e
            </p>
          </div>
          <p className="text-gray-700 mt-4 text-center">
            We appreciate your efforts in adopting sustainable practices and helping offset carbon emissions through your corporate and personal activities.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Offset Your Emissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionCard;
