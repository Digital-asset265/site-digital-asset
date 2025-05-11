import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="text-white px-6 py-2 flex justify-start items-center z-50">
      <div
        className="relative"
        onMouseEnter={() => setShowDropdown(true)}
        ref={dropdownRef}
      >
        <button className="text-white font-semibold hover:underline">
          Login
        </button>

        {showDropdown && (
          <div className="absolute left-0 mt-2 bg-[#0c1c30] text-white rounded-2xl shadow-lg w-64 z-50 border border-white">
            <Link to="/login" className="block px-4 py-2 hover:bg-white/10">
              Login
            </Link>
            <Link to="/registo" className="block px-4 py-2 hover:bg-white/10">
              Ainda não é nosso cliente?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;







