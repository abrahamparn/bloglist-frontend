import React from "react";
import { useState, forwardRef, useImperativeHandle } from "react";

const Toggleable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const handleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { handleVisibility };
  });

  return (
    <div className="max-w-md mx-auto mt-4">
      <div style={hideWhenVisible}>
        <button
          onClick={handleVisibility}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="bg-gray-100 p-4 rounded-lg shadow-md">
        {children}
        <button
          onClick={handleVisibility}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
});

export default Toggleable;
