import React from "react";
const Certificate = ({ company, amount, date, retirementId, standard }) => {
  return (
    <div className="max-w-2xl mx-auto p-5 rounded-lg bg-white shadow-md mt-5">
      <div className="text-center mb-5">
        <h1 className="text-2xl mb-2 font-bold align-baseline">
          2024
          <br />
          Verified Carbon Offset Certificate
        </h1>
      </div>
      <div className="text-left mb-5">
        <p>PRESENTED TO</p>
        <h2 className="text-xl font-semibold">{company}</h2>
        <p>FOR OFFSETTING</p>
        <h2 className="text-xl font-semibold">{amount} tCO2e</h2>
      </div>
      <div className="text-left mb-5">
        <p>
          This certificate is issued by Fitsol Supply Chain Solutions Private
          Limited. For more information about our services and climate change
          mitigation projects please visit:{" "}
          <a href="http://www.Fitsol.green" className="text-blue-500">
            www.Fitsol.green
          </a>
        </p>
        <p>
          The CO2 emissions indicated on the certificate are compensated through
          investments in carbon offset projects based on international
          standards.
        </p>
      </div>
      <div className="text-left mb-5">
        <p>Retirement ID: {retirementId}</p>
        <p>Standard: {standard}</p>
        <p>Certificate Number: {retirementId}</p>
      </div>
      <div className="text-left mb-5">
        <p>
          Fitsol commits to retire the purchased carbon credits or certificates
          in the relevant public registry in line with the highest International
          carbon accounting and reporting standards. These credits are utilized
          to offset estimated carbon footprint of beneficiary for year 2023-24.
        </p>
        <p>
          Climate change and protecting the environment go hand in hand. Your
          continued investment in your customers, your community, and the
          environment will have a measurable impact for years to come.
        </p>
      </div>
      <div className="text-left mb-5">
        <p>
          Fitsol thanks you for committing to bold climate action and
          contributing to the Sustainable Development Goals set out by the UN.
        </p>
        <p>Supply Chain Solutions Private Limited</p>
        <p>Date: {date}</p>
        <p>CEO Fitsol</p>
        <p>Signature</p>
      </div>
      <div className="text-center">
        <img src="path_to_qr_code_image" alt="QR Code" className="mx-auto" />
      </div>
    </div>
  );
};
export default Certificate;
