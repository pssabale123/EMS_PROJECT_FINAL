import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import profilePic from "../../assets/image/profile girl.jpg";
import { IoClose } from "react-icons/io5";
import emsIcon from "../../assets/image/ems icon.png";
import { MdDashboard } from "react-icons/md";
import StudentPorfile from "./StudentPorfile";
import StudentDashboardContent from "./StudentDashboardContent";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export const StudentDashboard = () => {
  const location = useLocation();

  // useEffect(()=>{
  //   if(location.pathname == "student")
  //   {
  //     // navigate("/")
  //   }
  // })

  const [showProfileOptions, setShowProfileOptions] = useState(false);
  return (
    <div className="h-screen w-[95%] mx-auto flex rounded-lg overflow-hidden">
      <div className="h-full  bg-[#172337] " style={{ flex: "1" }}>
        <div className="my-2">
          <img className="w-full" src={emsIcon} />
        </div>
        <div>
          <NavLink className="bg-[#FFD630] flex mx-2 p-1" to="dashboard">
            <MdDashboard size={25} />
            <span className="ml-2">Dashboard</span>
          </NavLink>
        </div>
      </div>
      <div style={{ flex: "5" }} className="h-full">
        <nav className="bg-zinc-200 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 ">
          <div className="container flex flex-wrap justify-between items-center mx-auto relative">
            <div className="flex ">
              <button
                type="button"
                data-collapse-toggle="navbar-search"
                aria-controls="navbar-search"
                aria-expanded="false"
                className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
              <div className="hidden relative md:block">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
              <button
                data-collapse-toggle="navbar-search"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-search"
                aria-expanded="false"
              >
                <span className="sr-only">Open menu</span>
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
            </div>
            <div className="h-10 w-10 rounded-full bg-cover bg-center overflow-hidden  cursor-pointer">
              <img
                src={profilePic}
                alt="profilePic"
                srcSet=""
                className={!showProfileOptions ? "block" : "hidden"}
                onClick={() => setShowProfileOptions(true)}
              />
              <div
                className={`bg-white absolute top-[20px] right-0 h-80 w-60  flex flex-col shadow-lg rounded-md  overflow-hidden ${
                  showProfileOptions ? "block" : "hidden"
                }`}
              >
                <div className="flex justify-end">
                  <IoClose
                    className=" p-1 cursor-pointer text-center  rounded-full hover:bg-slate-100"
                    onClick={() => setShowProfileOptions(false)}
                    size={35}
                  />
                </div>
                <StudentPorfile profilePic={profilePic} name="examiner name " />
              </div>
            </div>
          </div>
        </nav>

        <StudentDashboardContent />

        <Outlet />
      </div>
    </div>
  );
};
