import React from "react";
import logo from "../SpinMain/Form/LogoForm.png";
import qrcode from "./qrcode.png";

const Certificate = ({ company, amount, date, retirementId, standard }) => {
  return (
    <div className="m-5 mr-5 ml-5 border-4 border-green-600 mx-auto p-5 rounded-lg bg-white shadow-md mt-5 w-26.25 h-37.188">
      <div className="text-center mb-5">
        <div className="flex justify-between items-center mx-5">
          <div className="text-left">
            <h1 className="text-2xl mb-2 font-bold">
              2024
              <br />
              Verified Carbon Offset Certificate
            </h1>
            <hr className="border-t-4 border-D7E5BE w-full" />
          </div>
          <img src={logo} alt="" className="h-16 ml-5" />
        </div>
      </div>
      <div className="text-left mb-5">
        <p className="ml-5">PRESENTED TO</p>
        <h2 className="text-xl font-semibold ml-5 text-green-600 mb-5">
          {company}
        </h2>
        <p className="ml-5">FOR OFFSETTING</p>
        <h2 className="text-xl font-semibold ml-5 text-green-600">
          {amount} tCO2e
        </h2>
      </div>
      <div className="text-left mb-5 ml-5">
        <p>
          Climate change and protecting the environment go hand in hand. Your
          continued investment in your customers, your community, and the
          environment will have a measurable impact for years to come.
          <br />
        </p>
        <p className="mt-5">
          Fitsol thanks you for committing to bold climate action and
          contributing to the Sustainable Development Goals set out by the UN.
        </p>
      </div>
      <div className="text-left mb-5">
        <div className="flex justify-end">
          <div className="mr-5 ">
            Date:
            <br /> {date}
          </div>
          <div className="mr-5 ml-5 ">
            CEO Fitsol
            <br />
            Signature
          </div>

          <div className="text-center mr-5 ml-5">
            QR Code <br />
            <img src={qrcode} alt="QR Code" className="w-20 h-20" />
          </div>
        </div>
        <div className="mx-5">
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
      <div className="text-left mt-0 mb-5 mx-5">
        <p className="mb-5">
          Fitsol commits to retire the purchased carbon credits or certificates
          in the relevant public registry in line with the highest International
          carbon accounting and reporting standards. These credits are utilized
          to offset estimated carbon footprint of beneficiary for year 2023-24
        </p>
        <hr className="border-t-4 border-D7E5BE w-full" />
        <center>
          <p>
            This certificate is issued by Fitsol Supply Chain Solutions Private
            Limited. For more information about our services and climate change
            mitigation projects, please{" "}
            <a href="http://www.Fitsol.green" className="text-blue-500">
              www.Fitsol.green
            </a>{" "}
            <p>
              The CeO2 emissions indicated on the certificate are compensated
              through investments in carbon offset projects based on
              international standards.
            </p>
          </p>
        </center>
      </div>
    </div>
  );
};

export default Certificate;
