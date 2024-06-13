import React, { useEffect, useState } from "react";
import logo from "../LogoForm.png";
import Section4 from "./Section";
import { Modal, Button } from "antd";
import Section2 from "./Section2";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { baseUrl } from "../../../constant";

const Calculator = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  
  
  const storeOffSetValue = async () => {
    try {
      const userEmail = localStorage.getItem("email");
      const offSetValue = localStorage.getItem("offSetValue");
      let finalValue = offSetValue;
      if (offSetValue){
        const numericValue = parseFloat(offSetValue);
        const roundedNumericValue = numericValue.toFixed(2); 
        finalValue = roundedNumericValue;
      }
      if (!userEmail) {
        localStorage.clear();
        navigate(
          '/'
        )
      }
      if (!offSetValue) {
        alert("Something went wrong!!");
      }
      await axios.post(`${baseUrl}/offSet`, {
        "businessEmail": userEmail,
        "offSetValue": finalValue
      });
    } catch (err) {
      const msg = err?.response?.data?.message;
      alert(msg)
      console.log(err);
    }
  }
  const showModal = async () => {
    await storeOffSetValue();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/certificate");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="bg-blue-800 rounded-lg text-left p-5">
        <img
          src={logo}
          alt="Logo"
          className="ml-10 mt-6 mb-6"
          style={{ width: "180px" }}
        />
      </div>

      <div className="px-8">
        <Section4 />
        <Section2 />
      </div>
      <button
        onClick={showModal}
        className=" mx-[30%]  my-4 px-6 py-4 font-poppins bg-buttonColor hover:bg-hoveColor text-black font-bold rounded"
      >
        offset your emissions! 🌱🌍
      </button>
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Next"
        cancelText="Back"
        okButtonProps={{
          style: {
            backgroundColor: '#D6E4BE', // Custom green color
            // borderColor: '#4CAF50', // Custom green color
            color: 'var(--Text_pr, #1A1C3C)', // Text color
          }
        }}
        cancelButtonProps={{
          style: {
            // backgroundColor: '#f44336', // Custom red color
            // borderColor: '#f44336', // Custom red color
            color: 'var(--Text_pr, #1A1C3C)', // Text color
          }
        }}
      >
        <p className="text-poppins pt-4 text-md font-semibold text-black">You are about to generate a carbon-neutral certificate for your personal emissions for the year 2023-24.<br/> Please click on "Next" to continue, or press "Back to re-enter the information.</p>
      </Modal>
    </div>
  );
};

export default Calculator;
