import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjects } from "../../actions/subjectAction";
import { getAllQuestions } from "../../actions/questionAction";
import {
  getAllPaperQuestions,
  getPaperQuestionByPaper,
} from "../../actions/paperQuestion";
import { Navigate, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { getAllOptions } from "../../actions/answerOptionAction";
import jwt_decode from "jwt-decode";

export function getPaperIdForQuestion({ params }) {
  // console.log("params", params);
  const paperId = params.paperId;
  return paperId;
}

const ExamPaper = () => {
  const [answers, setAnswers] = useState([]);
  const token = useSelector((state) => state.loginReducer.token);
  const decode = jwt_decode(token);
  const studentId = decode._id;
  // console.log("token", decode);

  // const subjects = useSelector((state) => state.subjectReducer.subjects);
  const options = useSelector(
    (state) => state.answerOptionReducer.answerOptions
  );
  const paperQuestions = useSelector(
    (state) => state.paperQuestionReducer.paperQuestions
  );

  const paperId = useLoaderData();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllSubjects());
    dispatch(getAllQuestions());
    dispatch(getAllOptions());
  }, []);

  useEffect(() => {
    dispatch(getPaperQuestionByPaper(paperId));
  }, [paperId]);

  const handleSelectAnswer = (id, answer, check, isCorrect) => {
    let value = {
      studentId: studentId,
      paperQuestionId: id,
      answer: answer,
      isCorrect: isCorrect,
    };

    if (check) {
      setAnswers([...answers, value]);
      // console.log(" " + check);
    } else {
      setAnswers(answers.filter((a) => a.answer != answer));
    }
  };

  const handleSubmit = () => {
    console.log("submit");
    console.log("ffffg", answers);
  };

  return (
    <>
      {/* <div className="h-10 w-full bg-[#172337] text-slate-300 flex items-center justify-between pl-4 pr-24">
        <>
          <span>Test Questions</span>
          <span>Total Marks</span>
        </>
      </div> */}

      <div className="h-full h-cover mt-3">
        {paperQuestions.map((q, index) => {
          return (
            <div
              className="h-cover w-full  px-2 sm:rounded-lg shadow-lg mx-2 "
              key={index}
            >
              {/* <div className="h-cover flex m-1"> */}
              <div className="h-cover w-full ">
                <div className="h-cover  w-[80%] font-medium tracking-wide flex flex-between">
                  {`${index + 1 + ") "}` + q.question.text}
                </div>

                <div className="  w-cover flex font-bold font-mono text-md justify-end pr-20">
                  {q.question?.marks + "  " + "marks"}
                </div>

                <div className="flex items-start w-[75%] flex-wrap py-1 ">
                  {options.map((o) => {
                    if (o.question._id === q.question._id)
                      return (
                        <span className="flex pl-7 pt-1 pb-5" key={o._id}>
                          {o ? (
                            <label
                              key={o._id}
                              htmlFor=""
                              className="w-3/2 flex  justify-evenly items-start  text-lg"
                            >
                              <input
                                type="checkbox"
                                name={index + "ch" + 1}
                                // {...register(index + 1 + "")}

                                onChange={(e) =>
                                  handleSelectAnswer(
                                    q._id,
                                    o.optionText,
                                    e.target.checked,
                                    o.isCorrect
                                  )
                                }
                                className="h-4 w-5 accent-[#172337] m-2"
                              />
                              {`${o?.optionText}`}
                            </label>
                          ) : (
                            ""
                          )}
                        </span>
                      );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        <div className=" w-full h-[20%] flex justify-end pr-2  pt-1 pt-5">
          <button
            className="h-[34px] bg-[#172337] rounded-lg w-32 text-slate-200 font-thin hover:bg-[#273e63]"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ExamPaper;
