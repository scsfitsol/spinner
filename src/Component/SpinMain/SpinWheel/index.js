import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "tailwindcss/tailwind.css";
import ConfettiExplosion from "react-confetti-explosion";
import CongratulationsCard from "./Congratulation";
import bgImage from "../image4.png";

const totalParticipants = 10;
const initialData = [
  { option: "Green kit", probability: 0.3, remaining: 3 },
  { option: "Better luck next time", probability: 0.0, remaining: 0 },
  { option: "Ipad", probability: 0.0, remaining: 0 },
  { option: "Green kit", probability: 0.3, remaining: 3 },
  { option: "Green kit + 25% CNC", probability: 0.3, remaining: 3 },
  { option: "Green kit + 100% CNC", probability: 0.1, remaining: 1 },
];
// const initialData = [
//   { option: "Green kit", probability: 0.3 , remaining: 3},
//   { option: "Better luck next time", probability: 0.0, remaining: 0 },
//   { option: "Ipad", probability: 0.0, remaining: 0 },
//   { option: "Green kit", probability: 0.3, remaining: 3},
//   { option: "Green kit + 25% CNC", probability: 0.3, remaining: 3 },
//   { option: "Green kit + 100% CNC", probability: 0.1, remaining: 1 },
// ];
const backgroundColors = [
  "#D6E4BE",
  "#FFFFFF",
  "#D6E4BE",
  "#FFFFFF",
  "#D6E4BE",
  "#FFFFFF",
];
const confettiProps = {
  force: 0.8,
  duration: 4000,
  particleCount: 400,
  width: 2000,
  colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
};

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const onComplete = () => setShowConfetti(false);
  const [data, setData] = useState(initialData);
  const [showCard, setShowCard] = useState(false);
  const [prizeText, setPrizeText] = useState(null);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = getPrizeIndexByProbability(data);
      const selectedPrize = data[newPrizeNumber];
      console.log(
        "new prize",
        newPrizeNumber,
        " : ",
        data[newPrizeNumber].option
      );
      if (selectedPrize.remaining > 0) {
        selectedPrize.remaining -= 1;
        setData([...data]); // Update data to reflect the remaining prizes
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
        setPrizeText(null);
      } else {
        // Recursively find another prize if the current prize is exhausted
        handleSpinClick();
      }
      // setPrizeNumber(newPrizeNumber);
      // setMustSpin(true);
    }
  };

  return (
    <div>
      {showConfetti && (
        <ConfettiExplosion onComplete={onComplete} {...confettiProps} />
      )}
      {showCard && <CongratulationsCard />}
      <div
        className="flex flex-col lg:flex-row justify-center items-center min-h-screen"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col lg:w-1/2 p-8 bg-cover bg-center">
          <div className="mb-8">
            <img src="./image/image5.png" alt="Logo" className="h-16 mb-4" />
            <h1 className="text-4xl font-bold">Spin & Win</h1>
            <p className="text-xl mt-2">Amazing Prizes!</p>
          </div>
          <p className="text-lg">
            Join our contest for a chance to win <br />
            exciting prizes!
          </p>
          <br />
          <p className="text-lg">
            Support sustainable practices and <br />
            raise awareness for carbon <br />
            accounting and environmental conservation.
          </p>
        </div>
        <div className="flex flex-col lg:w-1/2 justify-center items-center p-8 relative">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data.map((item) => ({ option: item.option }))}
            onStopSpinning={() => {
              setMustSpin(false);
              setShowConfetti(true);
              setShowCard(true);
              // setPrizeText(data[prizeNumber].option);
            }}
            outerBorderColor="white"
            outerBorderWidth={1}
            radiusLineColor="white"
            radiusLineWidth={0.1}
            backgroundColors={backgroundColors}
            spinDuration={0.6}
            fontSize={14}
            textColors={["black"]}
            fontFamily={"Arial"}
            pointerProps={{
              style: {
                // width: 0,
                // height: 0,
                // borderLeft: "20px solid transparent",
                // borderRight: "20px solid transparent",
                color: "black", // Change this color to customize the pointer
                // position: "absolute",
                // top: "40px",
                // left: "20%",
                // transform: "translateX(-50%)",
              },
            }}
          />
          <button
            onClick={handleSpinClick}
            className="mt-8 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
          >
            Spin the Wheel
          </button>

          {prizeText && (
            <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-lg text-center">
              Congratulations! You won: {prizeText}
            </div>
          )}
          {/* {winner && (
          <div className="mt-4 text-2xl font-semibold text-gray-800">
            Congratulations! You won: {winner}
          </div>
        )} */}
        </div>
      </div>
    </div>
  );
};
