import React from "react";
import logo from '../SpinMain/LogoForm.png';
import qrcode from "./qrcode.png";
import sign from '../SpinMain/Sign.png';
const Certificate = ({ company, amount, retirementId, standard }) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="m-5 mr-5 ml-5 border-4 border-green-600 mx-auto p-5 rounded-lg bg-white shadow-md mt-5 w-26.25 h-37.188">
      <div className="text-center mb-5">
        <div className="flex justify-between items-center mx-[12%]">
          <div className="text-left">
            <h1 className="text-2xl mb-2 font-bold">
              2024
              <br />
              Verified Carbon Offset Certificate
            </h1>
            <hr className="border-t-4 border-D7E5BE w-[118%] ml-[-5%]" />
          </div>
          <img src={logo} alt="" className="h-25 mx-[-5%]" />
        </div>
      </div>
      <div className="text-left mb-5 mx-[10%]">
        <p className="ml-5 ">PRESENTED TO</p>
        <h2 className="text-2xl font-bold ml-5 text-green-600 mb-5">
          {company}
        </h2>
        <p className="ml-5">FOR OFFSETTING</p>
        <h2 className="text-2xl font-bold ml-5 text-green-600">
          {amount} tCO<sub>2</sub>e
        </h2>
      </div>
      <div className="text-left ml-[6%] mb-5 mr-[5%] text-lg">
        <p>
          Climate change and environmental protection are closely linked. Your
          efforts to enhance the environment will create a significant and
          long-term impact.
          <br />
        </p>
        <p className="mt-3">
          Fitsol deeply appreciates your dedication to taking decisive climate
          action and for supporting the UN's Sustainable Development Goals.
        </p>
      </div>
      <div className="text-left mb-5 ml-[5%]">
        <div className="flex justify-end mr-[5%]">
          <div className=" mr-5">
            Date:
            <br /> {getCurrentDate()}
          </div>
          <div className="mr-5 ml-5 ">
            CEO Fitsol Signature
            <br />
            <img src={sign} alt="" className="ml-4 h-25 w-20" />
            <br />
          </div>
          <div className="text-center mr-5 ml-5">
            QR Code <br />
            <img src={qrcode} alt="QR Code" className="w-20 h-20" />
          </div>
        </div>
        <div className="mx-5 mb-0 ">
          <p>
            <b>Retirement ID</b>: {retirementId}
          </p>
          <p>
            <b>RStandard</b>: {standard}
          </p>
          <p>
            <b>RCertificate Number</b>: {retirementId}
          </p>
        </div>
      </div>
      <div className="text-left mb-5 mx-5 text-md mx-[5%]">
        <p className="mb-3 ml-5 mt-0">
          These credits are utilized to offset the estimated carbon footprint of
          the beneficiary for year 2023-24
        </p>
        <hr className="border-t-4 border-D7E5BE w-full" />
        <center>
          <p className="text-sm">
            This certificate is issued by Fitsol Supply Chain Solutions Private
            Limited. For more information about our services and climate change
            mitigation projects, please visit:{" "}
            <a href="http://www.Fitsol.green" className="text-blue-500">
              www.Fitsol.green
            </a>{" "}
            The CeO<sub>2</sub> emissions indicated on the certificate are
            compensated through investments in carbon offset projects based on
            international standards.
            {/* <p>
              The CeO <sub>2</sub>emissions indicated on the certificate are
              compensated through investments in carbon offset projects based on
              international standards.
            </p> */}
          </p>
        </center>
      </div>
    </div>
  );
};
export default Certificate;