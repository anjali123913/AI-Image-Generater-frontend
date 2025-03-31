import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <div className="flex items-center justify-between p-5 bg-gray-200 shadow-xl shadow-gray-100">
      <Link to="/" className="font-bold text-3xl">
        Logo
      </Link>
      {location.pathname === "/" ? (
        <Link to="/generate-image">
          <button
            type="button"
            className="border-none px-5 py-3 bg-green-600 rounded-xl cursor-pointer shadow-xl shadow-green-200 font-semibold text-xl"
          >
            Generate Image
          </button>
        </Link>
      ) : (
        <Link to="/">
          <button
            type="button"
            className="border-none px-10 py-3 bg-red-600 rounded-xl cursor-pointer shadow-xl shadow-green-200 font-semibold text-xl"
          >
            History
          </button>
        </Link>
      )}
    </div>
  );
}