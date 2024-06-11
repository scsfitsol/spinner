import React, { useState } from "react";
import WheelComponent from "react-wheel-of-prizes";

const App = () => {
  // Define segments
  const segments = [
    "better luck next time",
    "won 70",
    "won 10",
    "better luck next time",
    "won 2",
    "won uber pass", // This segment will be visible but not selectable
  ];

  const rand = () => {
    const item = Math.floor(Math.random() * segments.length);
    console.log("item", item);
    const num = segments[Math.floor(Math.random() * segments.length)];
    console.log("num", num);
     return num;
  }

  // Define segment colors
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  const [winner, setWinner] = useState(null);
  const [spinCount, setSpinCount] = useState(0);
  const [currentWinningSegment, setCurrentWinningSegment] = useState("better luck next time");
  const winningSegments = ["better luck next time", "won 70"];
  const handleSpin = () => {
    console.log("hemanth")
    // Select a random winning segment from the winningSegments array
    const randomWinner =
      winningSegments[Math.floor(Math.random() * winningSegments.length)];
    setCurrentWinningSegment(randomWinner);
    setSpinCount(spinCount + 1);
  };

  const onFinished = (winner) => {
    console.log("winner", winner);
    setWinner(winner);
  };
  return (
    <div
      className="App"
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <div>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment={"won 2"}
          onFinished={onFinished}
          // winningSegment= "better luck next time"
          // onFinished={(winner) => onFinished(winner)}
          // onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          // need to make it true
          isOnlyOnce={false}
          size={190}
          upDuration={500}
          downDuration={600}
          fontFamily="Arial"
        />
      </div>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
};

export default App;
