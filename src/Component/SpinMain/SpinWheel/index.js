import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import 'tailwindcss/tailwind.css';

const data = [
  { option: 'Green kit', probability: 0.6 },
  { option: 'Better luck next time', probability: 0.0 },
  { option: 'Ipad', probability: 0.0 },
  { option: 'Green kit + 25% CNC', probability: 0.3 },
  { option: 'Green kit + 100% CNC', probability: 0.1 },
];

const getPrizeIndexByProbability = (data) => {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (let i = 0; i < data.length; i++) {
    cumulativeProbability += data[i].probability;
    if (random < cumulativeProbability) {
      return i;
    }
  }

  return data.length - 1;
};

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = getPrizeIndexByProbability(data);
      console.log("new prize", newPrizeNumber, " : ", data[newPrizeNumber].option);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col mt-44">
        <div className="relative w-72 h-72 flex justify-center items-center">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data.map(item => ({ option: item.option }))}
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
          className="mt-24 px-4 py-2 bg-blue-500 text-white rounded"
        >
          SPIN
        </button>
      </div>
    </>
  );
};
