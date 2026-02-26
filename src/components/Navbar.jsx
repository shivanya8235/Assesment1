// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ onSave }) => {
  return (
    <header className="flex items-center justify-between px-8 py-3 bg-gray-100 border-b border-gray-300 shadow-sm">
      <div className="flex-1">
        <span className="text-xl font-bold text-blue-600">BiteSpeed</span>
      </div>
      <div className="flex-1 text-right">
        <button
          onClick={onSave}
          className="px-6 py-2 font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all active:scale-95"
        >
          Save Changes
        </button>
      </div>
    </header>
  );
};

export default Navbar;
