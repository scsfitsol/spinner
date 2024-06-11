import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'

const data = [
  { option: 'Green kit' },
  { option: 'Better luck next time' },
  { option: 'Green kit + 25% CNC' },
  { option: 'Green kit + 100% CNC' },
];

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      console.log("new prize", newPrizeNumber, " : ", data[newPrizeNumber].option)
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col mt-44">
        <div className=" w-72 h-72 flex justify-center items-center">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
            innerBorderColor={"#000000"}
            outerBorderColor={"#000000"}
            radiusLineColor={"#000000"}
            fontSize={14}
            textColors={["#ffffff"]}
            fontFamily={"Arial"}
          />
        </div>
        <button
          onClick={handleSpinClick}
          className="mt-24 px-4 py-2 bg-blue-500 text-red rounded"
        >
          SPIN
        </button>
      </div>
    </>
  );
};