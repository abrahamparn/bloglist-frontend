import React from "react";

export default function Notification({ message }) {
  if (!message) {
    return null;
  }

  console.log(message);

  // Safely access response status or fallback to message.status
  const status = message.response?.status || message.status;

  const type =
    status != "401"
      ? "bg-green-100 text-green-800 border-green-400"
      : "bg-red-100 text-red-800 border-red-400";

  return (
    <div className={`border-l-4 p-4 rounded-lg mb-4 shadow-md ${type}`} role="alert">
      <p className="text-lg font-medium">{message.message}</p>
    </div>
  );
}
