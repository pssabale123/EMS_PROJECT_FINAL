import axios from "axios";
import * as actions from "./actionTypes";
import { getAllTopics } from "./topicAction";
const apiEndPoint = process.env.REACT_APP_API_URL + "questions";

let num = 0;

export const getAllQuestions = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_QUESTIONS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const getQuestionBySubject = (subjectId) => (dispatch, getState) => {
  console.log("subjectid", subjectId);
  axios
    .post(
      apiEndPoint + "/pfs",
      { subjectId },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) =>
      dispatch({
        type: actions.GET_QUESTIONS_BY_SUBJECT,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err.message));
};

export const getQuestionBySubjectId = (subjectId) => (dispatch, getState) => {
  // console.log("subjectid", subjectId);
  axios
    .post(
      apiEndPoint + "/bySubject",
      { subjectId },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) =>
      dispatch({
        type: actions.GET_QUESTIONS_BY_SUBJECT_ID,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err.message));
};
export const getQuestionByTopicId =
  (topicId) => (dispatch, getState) => {
    // console.log("subjectid", subjectId);
    axios
      .post(
        apiEndPoint + "/byTopic",
        { topicId },
        {
          headers: { "x-auth-token": getState().loginReducer.token },
        }
      )
      .then((response) =>
        dispatch({
          type: actions.GET_QUESTIONS_BY_TOPIC_ID,
          payload: response.data,
        })
      )
      .catch((err) => console.log(err.message));
  };

export const getCurrentQuestion = (id) => (dispatch, getState) => {
  // console.log("getcurrid ", id);
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_QUESTIONS,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};

export const addQuestion = (data) => (dispatch, getState) => {
  axios
    .post(
      apiEndPoint,
      {
        // questionNumber: num++,
        text: data.text,
        topicId: data.topicId,
        marks: data.marks,
        complexityLevel: data.complexityLevel,
      },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) =>
      dispatch({ type: actions.ADD_QUESTIONS, payload: response.data })
    )
    .catch((err) => console.log(err.message));
};

export const updateQuestion = (data) => (dispatch, getState) => {
  // console.log("data=", data);
  axios
    .put(
      apiEndPoint + "/" + data._id,
      {
        questionNumber: data.questionNumber,
        text: data.text,
        topicId: data.topicId,
        marks: data.marks,
        complexityLevel: data.complexityLevel,
      },
      { headers: { "x-auth-token": getState().loginReducer.token } }
    )
    .then((response) =>
      dispatch({ type: actions.UPDATE_QUESTIONS, payload: response.data })
    )
    .catch((err) => console.log(err));
};

export const deleteQuestion = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.DELETE_QUESTIONS,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err.message));
};
