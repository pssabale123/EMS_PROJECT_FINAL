import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addOption,
  getCurrentOption,
  updateOption,
} from "../../actions/answerOptionAction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { answerOptionReducer } from "../../reducers/answerOptionReducer";

export function getOptionId({ params }) {
  //   console.log(params);
  const optionId = params.optionId;
  return optionId;
}

function UpdateOption() {
  const optionId = useLoaderData();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const option = useSelector(
    (state) => state.answerOptionReducer.currentOption
  );

  console.log(option);

  const schema = yup.object().shape({
    option: yup.string().min(1).required(),
    optionText: yup.string().required(),
    isCorrect: yup.boolean().default(false),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (optionId) dispatch(getCurrentOption(optionId));
  }, []);

  //   console.log("id", option.question);

  useEffect(() => {
    setValue("option", option.option);
    setValue("optionText", option.optionText);
    setValue("isCorrect", option.isCorrect);
    setValue("questionId", option.question?._id);
    setValue("_id", option._id);
  }, [option._id]);

  const onSubmitHandler = (data) => {
    console.log(data._id);
    dispatch(updateOption(data));
    navigate("/examiner/questionBank");
  };

  return (
    <>
      <form
        className="w-[50%] mx-auto my-5 px-14 py-5 border-2 rounded-xl shadow-4xl  border-yellow-300"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="flex flex-col justify-center items-center mb-6">
          <span className="font-semibold text-lg mb-2 ">Update Option</span>
          <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
        </div>
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-2">
            <input
              {...register("option")}
              type="text"
              id="option"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
              placeholder="option"
              required=""
            />
          </div>
          <div className="col-span-5">
            <input
              {...register("optionText")}
              type="text"
              id="optionText"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
              placeholder="optionText"
              required=""
            />
          </div>
          <span>{errors?.message}</span>
        </div>

        <div className="w-full pt-3 px-3 flex justify-center">
          <div className="flex items-center mb-4">
            <input
              {...register("isCorrect")}
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              isCorrect
            </label>
          </div>
        </div>

        <div className="w-full flex justify-center pt-2 ">
          <button
            type="submit"
            // className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm h-full w-full mb-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

            className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-2/3 mt-2  py-2.5 text-center "
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateOption;
