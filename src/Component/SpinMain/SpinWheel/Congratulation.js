import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import bgImage from "../image4.png"; // Ensure you have the image in the correct path
import axios from "axios";
import { baseUrl } from "../../../constant";

const CongratulationsCard = (props) => {
  const { prize } = props;
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const prizesValue = {
    "Green kit + 25% CNC": "25",
    "Green kit + 100% CNC": "100"
  }


  const storeSpinningValue = async (val) => {
    try {
      if (!userEmail) {
        localStorage.clear();
        navigate(
          '/'
        )
      }
      await axios.post(`${baseUrl}/spinValue`, {
        "businessEmail": userEmail,
        "spinValue": val
      });
      localStorage.setItem("spinValue", val);
    } catch (err) {
      const msg = err?.response?.data?.message;
      alert(msg)
      console.log(err);
    }
  }

  const handleClose = async () => {
    if (prize.includes("CNC")) {
      const percent = prizesValue[prize];
      await storeSpinningValue(percent);
      navigate("/calculator");
    } else {
      localStorage.clear();
      navigate("/");
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const renderMessage = () => {
    if (prize === "Green kit") {
      return (
        <>
          You have won a sustainable corporate kit! 🌱
          <p className="text-gray-700 mt-4">
            We wish you all the best and thank you for your participation in helping Fitsol reduce carbon emissions from the environment by adopting sustainable materials in your corporate lifestyle!
          </p>
        </>
      );
    } else if (prize.includes("CNC")) {
      return (
        <>
           You have won a sustainable corporate kit and a chance to offset your personal carbon footprint for <strong>ONE WHOLE YEAR</strong>! 🌱
          <p className="text-gray-700 mt-4">
            We wish you all the best and thank you for your participation in helping Fitsol offset carbon emissions from the environment!
          </p>
        </>
      );
    }
};

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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Congratulation!✅
          </h2>
          <div className="text-gray-700">{renderMessage()}</div>
          {/* <p className="text-gray-700 mb-6">
            🎉 Congratulations! You have won{" "}
            <span className="text-green-800 font-bold">{prize}</span>! Thank you
            for participating in our contest. We appreciate your support for
            sustainable practices and environmental conservation. 🌱🌍
          </p> */}
          <button
            onClick={handleClose}
            className="px-4 py-2 my-2 bg-buttonColor text-black font-bold rounded hover:bg-hoveColor transition duration-300"
          >
            {prize.includes("CNC") ? "Calculate your Emissions" : "return to home"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsCard;
