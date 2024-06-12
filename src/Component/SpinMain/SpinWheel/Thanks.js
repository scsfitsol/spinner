import React from "react";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You! 🎉</h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for participating in our contest! Your support for sustainable practices and environmental conservation is greatly appreciated. 🌱🌍
        </p>
        <p className="text-lg text-green-800 font-bold">We hope to see you again in future events!</p>
      </div>
    </div>
  );
};

export default ThankYou;
