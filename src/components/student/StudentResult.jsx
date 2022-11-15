import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import {
  getAllStudentPapers,
  getCurrentStudentPaper,
  patchStudentPapers,
} from "../../actions/studentPaperAction";
import jwt_decode from "jwt-decode";
import { getAllStudentAnswers } from "../../actions/studentAnswerAction";

export function getPaperIdForStudentAnswers({ params }) {
  // console.log("params", params);
  const paperId = params.paperId;
  return paperId;
}

function StudentResult() {
  const dispatch = useDispatch();
  let totalAttempt = 0;
  let totalCorrect = 0;
  let obtainMarks = 0;

  const paperId = useLoaderData();

  const token = useSelector((state) => state.loginReducer.token);
  const decode = jwt_decode(token);

  // console.log("pa", paperId);

  let studentPapers = useSelector(
    (state) => state.studentPaperReducer.studentPapers
  );

  let studentAnswers = useSelector(
    (state) => state.studentAnswerReducer.studentAnswers
  );
  let studentPaper = useSelector(
    (state) => state.studentPaperReducer.currentStudentPaper
  );

  useEffect(() => {
    dispatch(getAllStudentAnswers());
    dispatch(getAllStudentPapers());
  }, []);

  studentAnswers = studentAnswers?.filter(
    (a) => a?.paperQuestion?.paper?._id == paperId
  );

  studentAnswers = studentAnswers?.filter((a) => a.student?._id == decode._id);

  // console.log("student", studentAnswers);

  studentAnswers.map((element) => {
    if (element.isCorrect == true) {
      totalCorrect = totalCorrect + 1;
      obtainMarks = obtainMarks + element.paperQuestion.question.marks;
    }
    totalAttempt = totalAttempt + 1;
  });

  // studentPapers = studentPapers?.filter((a) => a.paper?._id == paperId);
  // studentPapers = studentPapers?.filter((a) => a.student?._id == decode._id);

  // console.log("rrr " + totalAttempt + " " + totalCorrect + " " + obtainMarks);

  // console.log("len =", studentAnswers.length);

  studentPapers.map((p) => {
    if (p.status == "inProgress") {
      const data = {
        _id: p._id,
        totalAttempt: totalAttempt,
        totalCorrect: totalCorrect,
        obtainMarks: obtainMarks,
      };

      dispatch(getCurrentStudentPaper(p._id));
      dispatch(patchStudentPapers(data));
    }
  });

  return studentPaper ? (
    <>
      <div className="flex justify-center text-green-500 text-3xl font-bold border-b-2 border-yellow-600 rounded-xl">
        Result
      </div>
      <div className="h-cover w-full flex flex overflow-hidden ">
        <div className="h-cover w-full flex justify-center">
          <div className="  h-cover w-2/4 m-7  overflow-hidden flex flex-col justify-around items-center  ">
            <div className="grid grid-cols-2 gap-cols-12 gap-3 text-green-500 ">
              <div className="w-full h-cover text-lg flex font-bold ">
                Student Name
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPaper.student?.firstName +
                  " " +
                  studentPaper.student?.lastName}
              </div>
              <div className="w-full h-cover text-lg flex font-bold ">
                Email
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPaper.student?.email}
              </div>
              <div className="w-full h-cover text-lg flex font-bold ">
                Exam paper
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPaper.paper?.name}
              </div>
              <div className="w-full h-cover text-lg flex font-bold ">
                Status
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPaper?.status}
              </div>

              <div className="w-full h-cover text-lg flex font-bold ">
                Totalmarks
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPaper.paper?.totalMarks}
              </div>
              <div className="w-full h-cover text-lg flex font-bold ">
                TotalAttempt
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPaper?.totalAttempt}
              </div>
              <div className="w-full h-cover text-lg flex font-bold ">
                TotalCorrect
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPaper?.totalCorrect}
              </div>
              <div className="w-full h-cover text-lg flex font-bold ">
                ObtainMarks
              </div>
              <div className="w-full h-cover text-xl font-bold text-gray-600 flex">
                {studentPaper?.obtainMarks}
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
