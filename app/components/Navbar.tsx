"use client";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-blue-900 p-2">
      <div className="flex gap-4">
        <img
          className="w-10"
          src="https://wger.de/static/images/logos/logo-bg-white.b608df2e110f.png"
          alt=""
        />
        <select className="text-white">
          <optgroup label="Training" className="text-black">
            <option value="">Routines</option>
            <option value="">Gallery</option>
            <option value="">Trophies</option>
          </optgroup>
        </select>
        <select className="text-white">
          <optgroup label="Nutrition" className="text-black">
            <option value="">Nutrition plans</option>
            <option value="">BMI calculator</option>
            <option value="">Daily calories</option>
          </optgroup>
        </select>
      </div>
      <div className="flex gap-1 text-white">
        <p>Login</p>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Navbar;
