import React, { useEffect } from "react";
import { useState } from "react";
import { IoClose, IoNewspaperOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllOptions } from "../../actions/answerOptionAction";
import { getAllPapers, getCurrentPaper } from "../../actions/paperAction";
import {
  addPaperQuestion,
  deletePaperQuestion,
  getAllPaperQuestions,
  getPaperQuestionByPaper,
} from "../../actions/paperQuestion";
import {
  deleteQuestion,
  getAllQuestions,
  getQuestionBySubject,
} from "../../actions/questionAction";
import FinalPaper from "./FinalPaper";
import PaperSetterItemsTable from "./PaperSetterItemsTable";

const PaperQuestion = () => {
  const AddSuccess = () => {
    toast.success("Question is added to paper....", {
      position: "top-center",
      autoClose: 800,
    });
  };

  const RemovePaperToast = () => {
    toast.warn("Question is remove from paper....", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const [selectedPaper, setSelectedPaper] = useState();
  const [showPopUpPaper, setShowPopUpPaper] = useState(false);

  const dispatch = useDispatch();

  const papers = useSelector((state) => state.paperReducer.papers);
  const paper = useSelector((state) => state.paperReducer.currentPaper);

  const paperQuestions = useSelector(
    (state) => state.paperQuestionReducer.paperQuestions
  );

  const head = ["Question", "Answer"];

  const questions = useSelector((state) => state.questionReducer.questions);

  const options = useSelector(
    (state) => state.answerOptionReducer.answerOptions
  );

  let questionArray = [];

  useEffect(() => {
    dispatch(getAllPapers());
    dispatch(getAllOptions());
    dispatch(getAllQuestions());
    // dispatch(getAllPaperQuestions());
  }, []);

  useEffect(() => {
    dispatch(getCurrentPaper(selectedPaper));
    dispatch(getQuestionBySubject(selectedPaper));
    dispatch(getPaperQuestionByPaper(selectedPaper));
  }, [questions.length, paperQuestions.length]);

  const handleChange = (subjectId) => {
    setSelectedPaper(subjectId);

    dispatch(getQuestionBySubject(subjectId));
  };

  paperQuestions.map((p) => {
    questionArray.push(p.question);
  });

  // console.log("quesArr", questionArray);

  const handleDelete = (id) => {
    // console.log("delete", id);
    dispatch(deleteQuestion(id));
  };

  const handleAddPaperToQuestion = (id, active) => {
    if (active == true) {
      paperQuestions?.map((p) => {
        if (p.question._id == id) {
          dispatch(deletePaperQuestion(p._id));
          RemovePaperToast();
        }
      });
    } else {
      dispatch(addPaperQuestion(id, selectedPaper));
      AddSuccess();
    }

    dispatch(getPaperQuestionByPaper(selectedPaper));
  };

  const handleShowPaper = (selectedPaper) => {
    setShowPopUpPaper(true);
  };

  return (
    <div className="h-screen w-full ">
      <div className="flex flex-between">
        <select
          name="subject"
          id="subject"
          value={selectedPaper}
          className="w-44 h-10 border-2 rounded-md py-1 pl-4 text-left mt-2"
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="">Paper</option>
          {papers.map((paper) => {
            return (
              <option value={paper._id} key={paper._id}>
                {paper.name}
              </option>
            );
          })}
        </select>

        <div
          className={`${
            selectedPaper ? "block" : "hidden"
          } w-full mx-3 mt-2 flex justify-end`}
        >
          <IoNewspaperOutline
            fontSize={33}
            color="green"
            onClick={() => handleShowPaper(selectedPaper)}
          />

          <div
            className={`w-full h-[90%] flex justify-center absolute bg-gray/10 rounded-xl ${
              showPopUpPaper ? "block" : "hidden"
            }`}
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <div className="w-[60%] mx-auto  pb-4  bg-black/40 ">
              <div className="flex justify-end p-3">
                <IoClose
                  className="cursor-pointer text-center flex justify-end rounded-full text-red-500 bg-white hover:bg-yellow-400"
                  onClick={() => setShowPopUpPaper(false)}
                  size={30}
                />
              </div>

              <div className="px-6 h-[calc(80vh-30px)] overflow-x-auto paperWindow">
                <div className="flex font-extrabold justify-center text-yellow font-mono text-3xl bg-green-200 rounded-2xl border-b-4 border-yellow-400">
                  {paper?.name}
                </div>
                {/* <div className="h-[5px] w-full border-yellow-300 bg-yellow-500 my-1"></div> */}
                <FinalPaper
                  selectedPaper={selectedPaper}
                  head={head}
                  items={questionArray}
                  handleAddPaperToQuestion={handleAddPaperToQuestion}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaperSetterItemsTable
        // items={selectedPaper && !add ? questionArray : questions}
        items={questions}
        selectedPaperQuestions={paperQuestions}
        head={head}
        text="text"
        options={options}
        handleDelete={handleDelete}
        selectedPaper={selectedPaper}
        handleAddPaperToQuestion={handleAddPaperToQuestion}
      />
    </div>
  );
};

export default PaperQuestion;
