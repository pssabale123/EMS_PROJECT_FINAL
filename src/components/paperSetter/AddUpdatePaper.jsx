import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getAllSubjects } from "../../actions/subjectAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addPaper,
  getAllPapers,
  getCurrentPaper,
  updatePaper,
} from "../../actions/paperAction";
import { useLoaderData, useNavigate } from "react-router-dom";

export function getPaperId({ params }) {
  const paperId = params.paperId;
  return paperId;
}

function AddUpdatePaper() {
  const paperId = useLoaderData();
  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const papers = useSelector((state) => state.paperReducer.papers);
  const paper = useSelector((state) => state.paperReducer.currentPaper);
  // console.log("paper", paper);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required().min(1).max(256),
    subjectId: yup.string().required(),
    totalMarks: yup.number().min(20).max(100).required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    dispatch(getAllSubjects());
    if (paperId) dispatch(getCurrentPaper(paperId));
  }, []);

  useEffect(() => {
    if (!paperId) return;
    dispatch(getAllSubjects());
    // const paper = papers.find((p) => p._id === paperId);
    setValue("name", paper.name);
    setValue("subjectId", paper.subject ? paper.subject._id : "");
    setValue("totalMarks", paper.totalMarks);
    setValue("_id", paper._id);
  }, [paper._id]);

  const onSubmitHandler = (data) => {
    if (!paperId) {
      console.log(data);

      dispatch(addPaper(data));

      navigate("/paperSetter/papers");
    } else {
      console.log("update", data);
      dispatch(updatePaper(data));
      navigate("/paperSetter/papers");
    }
  };

  return (
    <form
      className="w-1/3 mx-auto my-5 px-14 py-5 border-2 rounded-xl shadow-4xl  border-yellow-300"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="flex flex-col justify-center items-center mb-6">
        <span className="font-semibold text-lg mb-2 ">
          {paperId ? "Update Paper" : "Add Paper"}
        </span>
        <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
      </div>
      <div className="grid gap-6 mb-6 px-1 ">
        <div className="">
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
            placeholder="Paper name"
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
            <option>Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          <p>{errors.subject?.message}</p>
        </div>
        <div>
          <input
            type="text"
            id="marks"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
            placeholder="totalMarks"
            required=""
            {...register("totalMarks")}
          />
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <button
          type="submit"
          className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-2/3 mt-2  py-2.5 text-center "
        >
          {paperId ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}

export default AddUpdatePaper;
