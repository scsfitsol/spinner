import React from "react";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Confirm</h2>
        <p className="mb-6">Do you want to claim your certificate?</p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 mr-2"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-bold rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
