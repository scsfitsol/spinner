import React, { useState } from "react";
import logo from "../LogoForm.png";
import Section4 from "./Section";
import { Modal, Button } from "antd";
import Section2 from "./Section2";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Calculator = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
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
        Claim your certificate! 🌱🌍
      </button>
      <Modal
        title="Confirm"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
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
        <p className="text-poppins text-black">Do you want to claim your certificate?</p>
      </Modal>
    </div>
  );
};

export default Calculator;
