import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { getAllTopics } from "../../actions/topicAction";
import {
  addQuestion,
  getCurrentQuestion,
  updateQuestion,
} from "../../actions/questionAction";

export function getPaperQuestionId({ params }) {
  // console.log("params", params);
  const questionId = params.paperQuestionId;
  return questionId;
}

const schema = yup.object().shape({
  text: yup.string().required().min(1).max(1024),
  topicId: yup.string().required(),
  marks: yup.number().min(1).max(20).required(),
  complexityLevel: yup.string().required(),
  // subjectId: yup.string().required(),
});

function AddUpdateQuestion() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const topics = useSelector((state) => state.topicReducer.topics);
  const questionId = useLoaderData();

  // console.log("que", questionId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const [selected, setSelected] = useState(subjects._id);

  const question = useSelector(
    (state) => state.questionReducer.currentQuestion
  );

  useEffect(() => {
    dispatch(getAllTopics());
    if (questionId) dispatch(getCurrentQuestion(questionId));
  }, []);

  useEffect(() => {
    if (!questionId) return;
    console.log("qqq", question);
    dispatch(getAllTopics());
    // setValue("subjectId", );
    setValue("text", question.text);
    setValue("marks", question.marks);
    setValue("complexityLevel", question.complexityLevel);
    setValue("questionNumber", question.questionNumber);
    setValue("_id", question._id);

    setTimeout(() => {
      setValue("topicId", question?.topic?._id);
    }, 100);
  }, [question._id]);

  const onSubmitHandler = (data) => {
    if (!questionId) {
      console.log("data", data);
      dispatch(addQuestion(data));
      navigate("/paperSetter/paperQuestions");
    } else {
      console.log(data);
      dispatch(updateQuestion(data));
      navigate("/paperSetter/paperQuestions");
    }
  };

  return (
    <>
      <div className="h-[calc(100vh-60px)] overflow-x-auto paperWindow">
        <form
          className="w-[50%] mx-auto my-5 px-14 py-5 border-2 rounded-xl shadow-4xl  border-yellow-300"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex flex-col justify-center items-center mb-6">
            <span className="font-semibold text-lg mb-2 ">
              {questionId ? "Update Question" : "Add Question"}
            </span>
            <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
          </div>

          <div className="grid gap-6 mb-6 px-1 ">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  // {...register("subjectId")}
                  name="subject"
                  id="subject"
                  value={`${selected}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="">Subject</option>
                  {subjects.map((subject) => {
                    return (
                      <option value={subject._id} key={subject._id}>
                        {subject.name}
                      </option>
                    );
                  })}
                </select>
                {/* <span>{errors.subjectId?.message}</span> */}
              </div>
              <div>
                {!questionId ? (
                  <select
                    {...register("topicId")}
                    id="topic"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
                  >
                    <option value="topic">Topic</option>
                    {topics.map((topic) => {
                      if (selected == topic.subject._id)
                        return (
                          <option value={topic._id} key={topic._id}>
                            {topic.name}
                          </option>
                        );
                    })}
                  </select>
                ) : (
                  <select
                    {...register("topicId")}
                    id="topic"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
                  >
                    <option value="topic">Topic</option>
                    {topics.map((topic) => {
                      return (
                        <option value={topic._id} key={topic._id}>
                          {topic.name}
                        </option>
                      );
                    })}
                  </select>
                )}
                <span>{errors.topicId?.message}</span>
              </div>
            </div>
            <div className="">
              <input
                {...register("text")}
                type="text"
                id="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
                placeholder="Question text"
                required=""
              />
              <span>{errors.text?.message}</span>
              {/* <p className="text-yellow-100">{errors.name?.message}</p> */}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register("marks")}
                  type="text"
                  id="Marks"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
                  placeholder="marks"
                  required=""
                />
                <span>{errors.marks?.message}</span>
              </div>
              <div>
                <select
                  {...register("complexityLevel")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
                >
                  <option defaultChecked>Complexity Level</option>
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
                </select>
                <span>{errors.complexityLevel?.message}</span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <button
              type="submit"
              className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-2/3 mt-2  py-2.5 text-center "
              // onClick={!questionId ? handleOption : ""}
            >
              {questionId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUpdateQuestion;
