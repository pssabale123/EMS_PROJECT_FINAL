import { data } from "autoprefixer";
import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "studentPapers";

export const getAllStudentPapers = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_STUDENT_PAPERS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const getEmpty = () => (dispatch) => {
  dispatch({
    type: actions.GET_EMPTY,
    payload: [],
  });
};

export const addStudentPaper = (data) => (dispatch, getState) => {
  //   console.log("data", data);

  axios
    .post(
      apiEndPoint,
      {
        paperId: data.paperId,
        studentId: data.studentId,
      },
      { headers: { "x-auth-token": getState().loginReducer.token } }
    )
    .then((response) =>
      dispatch({ type: actions.ADD_STUDENT_PAPER, payload: response.data })
    )
    .catch((err) => console.log(err.message));
};

export const getCurrentStudentPaper = (id) => (dispatch, getState) => {
  //   console.log("getcurrid ", id);
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_STUDENT_PAPER,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};

export const getExamPaperResult =
  (totalAttempts, totalCorrects, studentId, paperId) =>
  (dispatch, getState) => {
    // console.log("answers", answers);
    axios
      .post(
        apiEndPoint + "/getResult",
        { totalAttempts, totalCorrects, studentId, paperId },
        {
          headers: { "x-auth-token": getState().loginReducer.token },
        }
      )
      .then((response) =>
        dispatch({
          type: actions.GET_RESULT,
          payload: response.data,
        })
      )
      .catch((err) => console.log(err.message));
  };

export const updateStudentPaper = (data) => (dispatch, getState) => {
  //   console.log("update", data);
  axios
    .put(
      apiEndPoint + "/" + data._id,
      { paperId: data.paperId, studentId: data.studentId, status: data.status },
      { headers: { "x-auth-token": getState().loginReducer.token } }
    )
    .then((response) =>
      dispatch({
        type: actions.UPDATE_STUDENT_PAPER,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};

export const deleteStudentPaper = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.DELETE_STUDENT_PAPER,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};

export const patchStudentPapers = (data) => (dispatch, getState) => {
  // console.log("Action",data);
  axios
    .patch(
      apiEndPoint + "/" + data._id,
      {
        _id: data._id,
        totalAttempt: data.totalAttempt,
        totalCorrect: data.totalCorrect,
        obtainMarks: data.obtainMarks,
        status: "submitted",
      },
      { headers: { "x-auth-token": getState().loginReducer.token } }
    )
    .then((response) =>
      dispatch({ type: actions.PATCH_STUDENT_PAPER, payload: response.data })
    )
    .catch((err) => console.log(err));
};
