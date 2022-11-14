import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { getAllStudentPapers } from "../../actions/studentPaperAction";
import score from "../../assets/image/score.jpg";

function StudentResult() {
  const dispatch = useDispatch();

  let studentPapers = useSelector(
    (state) => state.studentPaperReducer.studentPapers
  );

  //   console.log("s", studentPapers);

  useEffect(() => {
    dispatch(getAllStudentPapers());
  }, []);

  // console.log("ssss", studentPapers[0]);

  return studentPapers[0] ? (
    <>
      <div className="h-cover w-full flex flex overflow-hidden ">
        <div className="h-cover w-full flex justify-center">
          <div className="  h-cover w-2/4 m-7  overflow-hidden flex flex-col justify-around items-center  ">
            <div className="grid grid-cols-2 gap-cols-12 gap-3 text-green-500 ">
              <div className="w-full h-cover text-lg flex font-bold ">
                Student Name
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPapers[0].student?.firstName +
                  " " +
                  studentPapers[0].student?.lastName}
              </div>
              <div className="w-full h-cover text-lg flex font-bold ">
                Email
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPapers[0].student?.email}
              </div>
              <div className="w-full h-cover text-lg flex font-bold ">
                Exam paper
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPapers[0].paper?.name}
              </div>
              <div className="w-full h-cover text-lg flex font-bold ">
                TotalAttempt
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPapers[0]?.totalAttempt}
              </div>
              <div className="w-full h-cover text-lg flex font-bold ">
                TotalCorrect
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPapers[0]?.totalCorrect}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default StudentResult;
