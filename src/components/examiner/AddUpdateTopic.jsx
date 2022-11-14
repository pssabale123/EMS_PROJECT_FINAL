import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  addTopic,
  getCurrentTopic,
  updateTopic,
} from "../../actions/topicAction";
import { getAllSubjects } from "../../actions/subjectAction";
// import { addPaper } from "../../actions/paperAction";

export function getTopicId({ params }) {
  const topicId = params.topicId;
  return topicId;
}

const schema = yup.object().shape({
  name: yup.string().min(3).max(255).required(),
  subjectId: yup.string().required(),
});

const AddUpdateTopic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topicId = useLoaderData();

  const topic = useSelector((state) => state.topicReducer.currentTopic);
  const subjects = useSelector((state) => state.subjectReducer.subjects);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    dispatch(getAllSubjects());
    if (topicId) dispatch(getCurrentTopic(topicId));
  }, []);

  console.log("topic", topic);

  useEffect(() => {
    // if (topicId) dispatch(getCurrentTopic(topicId));

    if (!topicId) return;

    setValue("name", topic.name);
    setValue("subjectId", topic.subject?._id);
    setValue("_id", topic._id);
  }, [topic?._id]);

  const onSubmitHandler = (data) => {
    if (!topicId) {
      dispatch(addTopic(data));
      console.log("onsubmit", data);
      navigate("/examiner/topics");
    } else {
      console.log(data);
      dispatch(updateTopic(data));
      navigate("/examiner/topics");
    }
  };

  return (
    <form
      className="  w-1/3 mx-auto my-5 px-14 py-5 border-2 rounded-xl shadow-4xl  border-yellow-300"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="flex flex-col justify-center items-center mb-6">
        <span className="font-semibold text-lg mb-2 ">
          {topicId ? "Update Topic" : "Add Topic"}
        </span>
        <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
      </div>
      <div className="grid gap-6 mb-6  ">
        <div className="">
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
            placeholder="John"
            required=""
            {...register("name")}
          />
          <p className="text-yellow-100">{errors.name?.message}</p>
        </div>
        <div>
          <select
            {...register("subjectId")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
          >
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          <p>{errors.subject?.message}</p>
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <button
          type="submit"
          // className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm h-full w-full mb-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

          className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-2/3 mt-2  py-2.5 text-center "
        >
          {topicId ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddUpdateTopic;
