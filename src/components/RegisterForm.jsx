import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Img from "../assets/image/officebackgound.jpg";
import { useDispatch } from "react-redux";
import { registerStudent } from "../actions/userAction";

const schema = yup.object().shape({
  firstname: yup.string().required("Please enter firstname").min(3).max(50),
  lastname: yup.string().required("Please enter lastname").min(3).max(50),
  email: yup.string().required("Please enter email").min(5).max(255).email(),
  phone: yup.string().required("Please enter phone").min(10).max(10),
  username: yup.string().required("Please enter username").min(8).max(255),
  password: yup.string().required("Please enter Password").min(8).max(1024),
});

const RegisterForm = () => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const handleLoginSubmit = (data) => {
    dispatch(registerStudent(data));
  };

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.3)",
        backgroundImage: `url(${Img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "darken",
      }}
      className="h-[calc(100vh-76px)] w-full overflow-auto paperWindow"
    >
      <form
        className="  w-1/3 mx-auto my-5 px-14 py-5 border-2 rounded-xl shadow-4xl backdrop-blur-md  border-yellow-300"
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <div className="flex flex-col justify-center items-center mb-4">
          <span className="font-semibold text-lg mb-2 text-white">Sign Up</span>
          <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
        </div>
        <div className="grid gap-6 mb-6  ">
          <div className="">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
            >
              First name
            </label>
            <input
              type="text"
              id="firstname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-yellow-500 outline-none pl-6"
              placeholder="John"
              required=""
              {...register("firstname")}
            />
            <p className="text-yellow-100">{errors.firstname?.message}</p>
          </div>
          <div className="">
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 outline-none pl-6"
              placeholder="Doe"
              required=""
              {...register("lastname")}
            />
            <p className="text-yellow-100">{errors.lastname?.message}</p>
          </div>
          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 outline-none pl-6"
              placeholder="john.doe@company.com"
              required=""
              {...register("email")}
            />
            <p className="text-yellow-100">{errors.email?.message}</p>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 0 dark:focus:border-blue-500 outline-none pl-6"
              placeholder="123-45-678"
              required=""
              {...register("phone")}
            />
            <p className="text-yellow-100">{errors.phone?.message}</p>
          </div>
          <div className="">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 outline-none pl-6"
              placeholder="@shubham"
              required=""
              {...register("username")}
            />
            <p className="text-yellow-100">{errors.username?.message}</p>
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 outline-none pl-6"
              placeholder="•••••••••"
              required=""
              {...register("password")}
            />
            <p className="text-yellow-100">{errors.password?.message}</p>
          </div>
        </div>
        <button
          type="submit"
          // className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm h-full w-full mb-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

          className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-full mt-2 px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
