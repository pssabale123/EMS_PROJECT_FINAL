import React from "react";
import { BsPen } from "react-icons/bs";

import { MdNotifications, MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOutUser } from "../../actions/loginAction";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
const StudentPorfile = (props) => {
  const { profilePic } = props;
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  const token = useSelector((state) => state.loginReducer.token);
  const decode = jwt_decode(token);

  return (
    <>
      <div className=" my-1  flex items-center justify-between ">
        <div className="h-16 w-16 mx-2 w-[30%] rounded-full  overflow-hidden border-2 border-green-500 ">
          <img src={profilePic} alt="profilePic" srcSet="" />
        </div>
        <div className="w-[70%]">
          <h3 className=" whitespace-normal items-center font-bold">
            {decode.name}
          </h3>
          <h6 className=" whitespace-normal">{decode.role}</h6>
        </div>
      </div>

      <hr className="h-1 bg-red-500" />
      <div className="w-4/5 mx-auto mt-2 flex flex-col">
        <NavLink className="px-2 py-3 flex cursor-pointer hover:bg-slate-200 rounded">
          <BsPen size={25} />
          <span className="ml-3">Change Password</span>
        </NavLink>
        <NavLink className="px-2 py-3 flex cursor-pointer hover:bg-slate-200 rounded">
          <MdNotifications size={25} />
          <span className="ml-3">Notifications</span>
        </NavLink>
        <NavLink
          className="px-2 py-3 flex cursor-pointer hover:bg-slate-200 rounded"
          onClick={handleLogOut}
        >
          <MdLogout size={25} />
          <span className="ml-3">Logout</span>
        </NavLink>
      </div>
    </>
  );
};

export default StudentPorfile;
