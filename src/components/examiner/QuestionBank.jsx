import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteQuestion,
  getAllQuestions,
  getQuestionBySubject,
  getQuestionBySubjectId,
  getQuestionByTopicId,
} from "../../actions/questionAction";
import { getAllSubjects } from "../../actions/subjectAction";
import { getAllTopics } from "../../actions/topicAction";
import CreateOption from "./CreateOption";
import ExaminerItemsTable from "./ExaminerItemsTable";

const QuestionBank = () => {
  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const naviagte = useNavigate();

  const topics = useSelector((state) => state.topicReducer.topics);
  const questions = useSelector((state) => state.questionReducer.questions);
  const [selected, setSelected] = useState(subjects._id);
  const [selectedTopic, setSelectedTopic] = useState(topics._id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubjects());
    dispatch(getAllTopics());
    // dispatch(getAllQuestions());
  }, []);

  useEffect(() => {
    if (!selected) return dispatch(getAllQuestions());
    if (selected) dispatch(getQuestionBySubjectId(selected));
    if (selectedTopic) dispatch(getQuestionByTopicId(selectedTopic));
  }, [selected, selectedTopic]);

  const head = ["Question", "Answer"];

  const handeleDeleteQuestionBank = (id) => {
    console.log("delete question bank");
    dispatch(deleteQuestion(id));
  };

  const handleCreateOption = (id) => {
    naviagte(`/examiner/questionBank/createOption/${id}`);
  };

  const handleSelectSubject = (value) => {
    setSelectedTopic("");
    setSelected(value);
  };

  // console.log("selectedTopic", selectedTopic);

  return (
    <div>
      <div className="flex mt-2">
        <select
          name="subject"
          id="subject"
          value={selected}
          className="w-44 h-10 border-2 rounded-md py-1 pl-4 text-left"
          onChange={(e) => handleSelectSubject(e.target.value)}
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

        <select
          name="topic"
          id="topic"
          className="w-44 h-10 ml-4 border-2 rounded-md py-1 pl-4 text-left"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="">Topic</option>
          {topics.map((topic) => {
            if (selected == topic.subject._id)
              return (
                <option value={topic._id} key={topic._id}>
                  {topic.name}
                </option>
              );
          })}
        </select>
      </div>

      <div>
        <ExaminerItemsTable
          head={head}
          items={questions}
          text="text"
          handleDelete={handeleDeleteQuestionBank}
          handleCreateOption={handleCreateOption}
          // handeleDeleteOption={handleDeleteOption}
          selectedTopic={selectedTopic}
        />
      </div>
    </div>
  );
};

export default QuestionBank;
