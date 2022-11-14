import React, { useEffect } from "react";
import image from "../assets/image/backgroundImage2.jpg";
import emsLogo from "../assets/image/emsBookLogo.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logOutUser } from "../actions/loginAction";
import jwt_decode from "jwt-decode";

import { toast } from "react-toastify";

const schema = yup.object().shape({
  username: yup.string().required("Please enter Username").min(5).max(255),
  password: yup.string().required("Please enter Password").min(8).max(1024),
});

const Login = () => {
  const token = useSelector((state) => state.loginReducer.token);
  const notify = () => toast("You are not authorized user!");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const decode = jwt_decode(token);
      if (!decode.isActive) {
        notify();
        dispatch(logOutUser());
        return navigate("/");
      }
      navigate(`/${decode.role}`);
    }
  }, [token]);

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const handleLoginSubmit = (data) => {
    dispatch(loginAction(data));
  };
  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.3)",
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "darken",
      }}
      className="h-[calc(100vh-76px)]  bg-no-repeat bg-center flex flex-col justify-center items-center "
    >
      <img src={emsLogo} width="100px" />
      <div className="min-h-2/4  w-96 bg-white px-10 py-4 rounded-lg shadow-2xl ">
        <form
          onSubmit={handleSubmit(handleLoginSubmit)}
          className="flex flex-col justify-center  "
        >
          <h1 className="text-center text-2xl">Log In</h1>
          <hr className="my-2 h-1 bg-yellow-300  border border-yellow-300 rounded-xl " />
          <label className=" my-2">
            Username <br />
            <input
              type="text"
              name="username"
              id="username"
              {...register("username")}
              className="border-2 rounded-full p-3 w-full outline-none focus:border-blue-300"
            />
          </label>
          <p className="text-red-400">{errors.username?.message}</p>
          <label className="my-2">
            Password <br />
            <input
              type="password"
              name="password"
              id="password"
              {...register("password")}
              className="border-2 rounded-full p-3 w-full outline-none focus:border-blue-300"
            />
          </label>
          <p className="text-red-400">{errors.password?.message}</p>

          <button
            type="submit"
            value="LOG IN"
            className="w-full rounded-full bg-slate-700 border-2  p-3 text-white my-2 mt-4 hover:bg-slate-800 focus:bg-slate-800 hover:border-orange-300"
          >
            LOG IN
          </button>
          <div>
            <Link className="text-blue-500 float-right">forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
