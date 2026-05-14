"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 px-4 py-3 shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/">
            <img
              className="w-10 cursor-pointer"
              src="https://wger.de/static/images/logos/logo-bg-white.b608df2e110f.png"
              alt="logo"
            />
          </Link>

          <select className="rounded-md hover:bg-blue-100 hover:text-blue-900 px-3 py-2 text-sm text-white outline-none">
            <optgroup label="Training" className="text-black">
              <option>Routines</option>
              <option>Gallery</option>
              <option>Trophies</option>
            </optgroup>
          </select>

          <select className="rounded-md hover:bg-blue-100 hover:text-blue-900 px-3 py-2 text-sm text-white outline-none">
            <optgroup label="Nutrition" className="text-black">
              <option>Nutrition plans</option>
              <option>BMI calculator</option>
              <option>Daily calories</option>
            </optgroup>
          </select>
        </div>

        <Link
          href="/workout"
          className="w-full rounded-full bg-white px-5 py-2 text-center text-sm font-semibold text-blue-900 transition hover:bg-blue-100 lg:w-auto"
        >
          My Workout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
