import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import emsLogo from "../assets/image/ems logo 1.png";

export const Navbar = () => {
  return (
    <nav className="bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900 shadow-md">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <NavLink
          to="/"
          className="flex items-center bg-[#172337] p-1 rounded-md shadow-md shadow-slate-900"
        >
          <img
            src={emsLogo}
            className=" sm:h-9"
            alt="ems logo"
            style={{ height: "3rem" }}
          />
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg shadow-md border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to=""
                className="block py-2 pr-4 pl-3 text-gray-700 focus:text-yellow-500  text-white rounded md:bg-transparent  md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="login"
                className="block py-2 pr-4 pl-3 text-gray-700 focus:text-yellow-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Log In
              </NavLink>
            </li>
            <li>
              <NavLink
                to="register"
                className="block py-2 pr-4 pl-3 focus:text-yellow-500 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="login"
                className="block focus:text-yellow-500 py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
