import React, { useState, useEffect } from "react";
// import "../style.css";
const Section2 = () => {
  const myarr = [
    "Petrol (litres)",
    "Diesel fuel (litres)",
    "Auto LPG (kg)",
    "Taxis (km)",
    "Local bus (Best/Company bus) (km)",
    "Autorickshaw (km)",
    "Local train (km)",
  ];

  const myarr2 = [
    "Number of LPG Cylinders Used for cooking",
    "Amount of CNG used at home (m3)",
    "Electricity used in a month (kWh)",
    "My total emissions (kg CO2e/Month)",
    "My average annual carbon footprint (Tonnes of CO2e)",
  ];

  const myarr3 = [
    "My total emissions (kg CO2e/Month)",
    "My average annual carbon footprint (Tonnes of CO2e)",
  ];

  const myarr4 = [
    "Fuel in litres as used in personal vehicle. In case of car pool, divide total fuel volume by total number of people. All people in the car pool need to account for the divided fuel volume.",
    "Fuel in litres as used in personal vehicle. In case of car pool, divide total fuel volume by total number of people. All people in the car pool need to account for the divided fuel volume.",
    "If you use a car that uses LPG as the fuel.",
    "For these modes of Public Transport, fill in approximate distance used.",
    "For these modes of Public Transport, fill in approximate distance used.",
    "For these modes of Public Transport, fill in approximate distance used.",
    "For these modes of Public Transport, fill in approximate distance used.",
  ];

  const myarr5 = [
    "These reflect you residential consumption. You should get these values from keeping track of the LPG cylinders and from your CNG and electric bills.",
    "These reflect you residential consumption. You should get these values from keeping track of the LPG cylinders and from your CNG and electric bills.",
    "These reflect you residential consumption. You should get these values from keeping track of the LPG cylinders and from your CNG and electric bills.",
  ];

  const initialTransportationValues = Array.from({ length: 7 }, () => ({
    quantity: "",
    co2e: "",
  }));
  const initialDomesticValues = Array.from({ length: 3 }, () => ({
    quantity: "",
    co2e: "",
  }));
  const initialFamilyValue = () => ({
    quantity: "",
  });

  const [transportationValues, setTransportationValues] = useState(
    initialTransportationValues
  );
  const [familyMemberAlertDisplayed, setFamilyMemberAlertDisplayed] =
    useState(false);
  const [familyMembers, setFamilyMembers] = useState("");
  const [domesticValues, setDomesticValues] = useState(initialDomesticValues);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleFamilyMembersChange = (value) => {
    const isValidInput = /^[1-9]\d*$/.test(value);
    if (!isValidInput || parseInt(value) <= 0) {
      // Do not accept non-numeric, zero, or negative values for family members
      setFamilyMembers(""); // Reset the value to empty string
      setFamilyMemberAlertDisplayed(true);
      return;
    }

    setFamilyMembers(value);
    setFamilyMemberAlertDisplayed(false);
  };

  const calculateCO2eTransport = (values, multiplier) => {
    const calculatedCO2e = values.map((item, index) => {
      let co2eValue =
        item.quantity !== "" ? item.quantity * multiplier[index] : "";
      if (co2eValue > 0) {
        co2eValue = Number(co2eValue.toFixed(2));
      }
      return {
        quantity: item.quantity,
        co2e: co2eValue >= 0 ? co2eValue : "",
      };
    });
    return calculatedCO2e;
  };

  const calculateCO2eDomestic = (values, multipliers, familyMembers) => {
    if (!familyMembers || isNaN(familyMembers) || familyMembers <= 0) {
      alert("Please enter a valid number for family members.");
      return [];
    }

    const calculatedCO2e = values.map((item, index) => {
      let co2eValue = 
      item.quantity !== "" ? item.quantity * multipliers[index] : "";;
      // if (item.quantity !== "") {
      //   co2eValue = item.quantity * multipliers[index];
      // }
      if (co2eValue > 0) {
        co2eValue = Number(co2eValue.toFixed(2));
      }
      return {
        quantity: item.quantity,
        co2e: co2eValue >= 0 ? co2eValue : "", // Round off to 2 decimal places
      };
    });

    return calculatedCO2e;
  };

  const handleInputChange = (index, type, value) => {
    const isValidInput =
      /^(?!0\d)[0-9]*(\.\d+)?$/.test(value) || /^0(\.\d+)?$/.test(value);

    if (!isValidInput && value !== "" && value !== "." && value !== "-") {
      // Show an alert for invalid input
      alert("Please enter a valid positive number.");
      return;
    }

    // Convert value to a number
    const numericValue = parseFloat(value);

    if (type === "Transportation") {
      const updatedTransportationValues = [...transportationValues];
      updatedTransportationValues[index].quantity = value;
      const multiplierTransportation = [
        2.3194, 2.69, 3.06, 0.31, 0.05, 0.05, 0.1,
      ];
      const calculatedCO2e = calculateCO2eTransport(
        updatedTransportationValues,
        multiplierTransportation
      );
      setTransportationValues(calculatedCO2e);
    }
    if (type === "Domestic") {
      let updatedDomesticValues = [...domesticValues];
      if (index >= updatedDomesticValues.length) {
        // Ensure the updatedDomesticValues array has enough length to access index
        updatedDomesticValues = Array.from({ length: index + 1 }, (_, i) =>
          i < domesticValues.length
            ? domesticValues[i]
            : { quantity: "", co2e: "" }
        );
      }

      updatedDomesticValues[index].quantity = value;
      const multiplierDomestic = [42.5, 1.82, 0.75]; // Update multipliers here
      const calculatedCO2e = calculateCO2eDomestic(
        updatedDomesticValues,
        multiplierDomestic,
        familyMembers
      );
      setDomesticValues(calculatedCO2e);
    }
  };

  const calculateTotalCO2Emissions = () => {
    let totalCO2Transportation = 0;
    let totalCO2Domestic = 0;

    transportationValues.forEach((item) => {
      if (item.co2e !== "") {
        totalCO2Transportation += parseFloat(item.co2e);
      }
    });

    domesticValues.forEach((item) => {
      if (item.co2e !== "") {
        totalCO2Domestic += parseFloat(item.co2e) / familyMembers;
      }
    });

    return {
      totalCO2Transportation,
      totalCO2Domestic,
      totalCO2: totalCO2Transportation + totalCO2Domestic,
    };
  };

  const calculateAnnualTotalEmissions = (monthlyTotal) => {
    return (monthlyTotal * 12) / 1000;
  };

  const { totalCO2Transportation, totalCO2Domestic, totalCO2 } =
    calculateTotalCO2Emissions();
  const monthlyTotalEmissions = totalCO2;
  const annualTotalEmissions = calculateAnnualTotalEmissions(
    monthlyTotalEmissions
  );
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  return (
    <div className="container pt-[56px] max-w-full  mx-auto">
      {/* <div className="container grid grid-cols-4">
        <h2 className="col-span-4 lg:col-span-3 lg:mx-0 tracking-[8px] pr-4 text-md text-black font-poppins mb-1">
          CARBON FOOTPRINT CALCULATOR
        </h2>
      </div> */}
      <form>
        <table className="w-full">
          <thead>
            <tr className="w-full pr-4 text-left text-black bg-col4">
              <th className="py-2 pr-4 w-1/3 ">Activity/Fuel Use</th>
              <th className="py-2 pr-4 w-1/3">Quantity</th>
              <th className="py-2 pr-4 w-1/3">CO<sub>2</sub>e (KG)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-6 pr-2 text-col8 text-md">
                Enter Total Family Members (*Include self):
              </td>
              <td className="py-2 lg:px-4 w-1/3">
                <input
                  type="number"
                  min="0"
                  onKeyPress={preventMinus}
                  onWheel={(e) => e.target.blur()}
                  className="w-full bg-white border border-bordcol rounded py-2"
                  placeholder=""
                  value={familyMembers}
                  onChange={(e) => handleFamilyMembersChange(e.target.value)}
                />
              </td>
              <td className="py-2 lg:px-4 w-1/3"></td>
            </tr>
            <tr>
              <td className="pt-6 pr-4 text-col8 text-md">Transportation</td>
            </tr>
            {Array.from({ length: 7 }, (_, index) => (
              <tr key={index}>
                <td className="py-2 pr-4 w-1/3 text-black relative">
                  {myarr[index]}
                  <span className="tooltip">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0,0,256,256"
                      width="16px"
                      height="16px"
                    >
                      <g
                        fill="#a19696"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        // font-family="none"
                        // font-weight="none"
                        // font-size="none"
                        text-anchor="none"
                        // style="mix-blend-mode: normal"
                      >
                        <g transform="scale(5.33333,5.33333)">
                          <path d="M24,4c-11.02793,0 -20,8.97207 -20,20c0,11.02793 8.97207,20 20,20c11.02793,0 20,-8.97207 20,-20c0,-11.02793 -8.97207,-20 -20,-20zM24,7c9.40662,0 17,7.59339 17,17c0,9.40661 -7.59338,17 -17,17c-9.40661,0 -17,-7.59339 -17,-17c0,-9.40661 7.59339,-17 17,-17zM24,14c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2zM23.97656,20.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v11c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-11c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852z"></path>
                        </g>
                      </g>
                    </svg>
                    <span className="tooltip-text">{myarr4[index]}</span>
                  </span>
                </td>
                <td className="py-2 pr-2 lg:pr-4 w-1/3">
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    onKeyPress={preventMinus}
                    className="w-full bg-white border border-bordcol rounded px-2 py-2"
                    placeholder=""
                    value={transportationValues[index]?.quantity || ""}
                    onChange={(e) =>
                      handleInputChange(index, "Transportation", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 lg:pr-4 w-1/3">
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    onKeyPress={preventMinus}
                    className="w-full bg-white border border-bordcol rounded px-2 py-2"
                    placeholder=""
                    value={transportationValues[index]?.co2e}
                    readOnly
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="pt-6 pr-4 text-col8 text-md">Domestic Use</td>
            </tr>
            {Array.from({ length: 3 }, (_, index) => (
              <tr key={index}>
                <td className="py-2 pr-4 w-1/3 text-black">
                  {myarr2[index]}
                  <span className="tooltip">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0,0,256,256"
                      width="16px"
                      height="16px"
                    >
                      <g
                        fill="#a19696"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        // font-family="none"
                        // font-weight="none"
                        // font-size="none"
                        text-anchor="none"
                        // style="mix-blend-mode: normal"
                      >
                        <g transform="scale(5.33333,5.33333)">
                          <path d="M24,4c-11.02793,0 -20,8.97207 -20,20c0,11.02793 8.97207,20 20,20c11.02793,0 20,-8.97207 20,-20c0,-11.02793 -8.97207,-20 -20,-20zM24,7c9.40662,0 17,7.59339 17,17c0,9.40661 -7.59338,17 -17,17c-9.40661,0 -17,-7.59339 -17,-17c0,-9.40661 7.59339,-17 17,-17zM24,14c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2zM23.97656,20.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v11c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-11c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852z"></path>
                        </g>
                      </g>
                    </svg>
                    <span className="tooltip-text">{myarr5[index]}</span>
                  </span>
                </td>
                <td className="py-2 pr-2 lg:pr-4 w-1/3">
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    onKeyPress={preventMinus}
                    className="w-full bg-white border border-bordcol rounded px-2 py-2"
                    placeholder=""
                    value={domesticValues[index]?.quantity || ""}
                    onChange={(e) =>
                      handleInputChange(index, "Domestic", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 lg:pr-4 w-1/3">
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    onKeyPress={preventMinus}
                    className="w-full bg-white border border-bordcol rounded px-2 py-2"
                    placeholder=""
                    value={domesticValues[index]?.co2e}
                    readOnly
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="py-6 pr-4 text-col8 text-md"></td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-bold text-black w-1/3">
                My total emissions (kg CO<sub>2</sub>e/Month)
              </td>
              <td className="py-2 lg:pr-4 w-1/3">
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  onKeyPress={preventMinus}
                  className="w-full bg-white border border-bordcol rounded px-2 py-2"
                  placeholder=""
                  value={monthlyTotalEmissions.toFixed(2)}
                  readOnly
                />
              </td>
              <td className="py-2 lg:pr-4 w-1/3"></td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-bold text-black w-1/3">
                My average annual carbon footprint (Tonnes of CO<sub>2</sub>e)
              </td>
              <td className="py-2 lg:pr-4 w-1/3">
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  onKeyPress={preventMinus}
                  className="w-full bg-white border border-bordcol rounded px-2 py-2"
                  placeholder=""
                  value={annualTotalEmissions.toFixed(2)}
                  readOnly
                />
              </td>
              <td className="py-2 lg:pr-4 w-1/3"></td>
            </tr>
          </tbody>
        </table>
        {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default Section2;
