import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { getAllPapers } from "../../actions/paperAction";
import { getAllUsers } from "../../actions/userAction";
import {
  addStudentPaper,
  getCurrentStudentPaper,
  updateStudentPaper,
} from "../../actions/studentPaperAction";

export function getStudentPaperId({ params }) {
  // console.log("params", params);
  const studentPaperId = params.studentPaperId;
  return studentPaperId;
}

const schema = yup.object().shape({
  paperId: yup.string().required(),
  studentId: yup.string().required(),
});

function AddUpdateStudentPaper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentPaperId = useLoaderData();

  const studentPaper = useSelector(
    (state) => state.studentPaperReducer.currentStudentPaper
  );

  // console.log("spid", studentPaper);

  const papers = useSelector((state) => state.paperReducer.papers);
  const users = useSelector((state) => state.userReducer.users);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (studentPaperId) dispatch(getCurrentStudentPaper(studentPaperId));
    dispatch(getAllPapers());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (!studentPaperId) return;
    // if (studentPaperId) dispatch(getCurrentStudentPaper(studentPaperId));

    setValue("studentId", studentPaper.student?._id);
    setValue("paperId", studentPaper.paper?._id);
    setValue("_id", studentPaper._id);
    setValue("status", studentPaper.status);
  }, [studentPaper?._id]);

  const onSubmitHandler = (data) => {
    if (!studentPaperId) {
      console.log(data);
      dispatch(addStudentPaper(data));
      navigate("/paperSetter/studentPapers");
    } else {
      console.log(data);
      dispatch(updateStudentPaper(data));
      navigate("/paperSetter/studentPapers");
    }
  };

  return (
    <>
      <form
        className="w-1/3 mx-auto my-5 px-14 py-5 border-2 rounded-xl shadow-4xl  border-yellow-300"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="flex flex-col justify-center items-center mb-6">
          <span className="font-semibold text-lg mb-2 ">Assign Paper</span>
          <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
        </div>
        <div className="grid gap-6 mb-6 px-1 ">
          <div>
            <select
              {...register("paperId")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
            >
              <option>Select Paper</option>
              {papers.map((paper) => (
                <option key={paper._id} value={paper._id}>
                  {paper.name}
                </option>
              ))}
            </select>
            <span>{errors.paperId?.message}</span>
          </div>

          <div>
            <select
              {...register("studentId")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
            >
              <option>Select Student</option>

              {users.map((u) =>
                u.role == "student" ? (
                  <option key={u._id} value={u._id}>
                    {u.firstName + " " + u.lastName}
                  </option>
                ) : (
                  ""
                )
              )}
            </select>
            <span>{errors.studentId?.message}</span>
          </div>

          {studentPaperId ? (
            <select
              {...register("status")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
            >
              <option>Select Status</option>
              <option>assigned</option>
              <option>inProgress</option>
              <option>submitted</option>
              <option>checked</option>
            </select>
          ) : (
            ""
          )}
        </div>
        <div className="w-full flex justify-center ">
          <button
            type="submit"
            className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-2/3 mt-2  py-2.5 text-center "
          >
            Assign
          </button>
        </div>
      </form>
    </>
  );
}

export default AddUpdateStudentPaper;
