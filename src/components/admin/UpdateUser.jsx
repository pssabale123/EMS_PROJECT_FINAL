import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getCurrentUser, updateUser } from "../../actions/userAction";

export function getUserId({ params }) {
  const userId = params.userId;
  return userId;
}

function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useLoaderData();

  const user = useSelector((state) => state.userReducer.currentUser);
  const schema = yup.object().shape({
    firstname: yup.string().required().min(3).max(50),
    lastname: yup.string().required().min(3).max(50),
    email: yup.string().required().min(5).max(255).email(),
    phone: yup.string().required().min(10).max(10),
    username: yup.string().required().min(8).max(255),
    password: yup.string().required().min(8).max(1024),
    role: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    dispatch(getCurrentUser(userId));
  }, []);

  useEffect(() => {
    setValue("firstname", user.firstName);
    setValue("_id", user._id);
    setValue("lastname", user.lastName);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("username", user.userName);
    setValue("password", user.password);
    setValue("role", user.role);
  }, [user]);
  const onSubmitHandler = (data) => {
    dispatch(updateUser(data));
    navigate("/admin/users");
  };

  return (
    <form
      className="  w-1/3 mx-auto my-5 px-14 py-5 border-2 rounded-xl shadow-4xl   border-yellow-300"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="flex flex-col justify-center items-center mb-4">
        <span className="font-semibold text-lg mb-2 ">Upadate User</span>
        <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
      </div>
      <div className="grid gap-6 mb-6  ">
        <div className="">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium  dark:text-gray-300"
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
            className="block mb-2 text-sm font-medium  dark:text-gray-300"
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
            className="block mb-2 text-sm font-medium  dark:text-gray-300"
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
            className="block mb-2 text-sm font-medium  dark:text-gray-300"
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
            className="block mb-2 text-sm font-medium  dark:text-gray-300"
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
        <div>
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Role
          </label>
          <select
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("role")}
          >
            <option value="admin">admin</option>
            <option value="examiner">examiner</option>
            <option value="student">student</option>
            <option value="paperSetter">paperSetter</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        // className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm h-full w-full mb-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

        className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-full mt-2 px-5 py-2.5 text-center "
      >
        Update
      </button>
    </form>
  );
}

export default UpdateUser;
