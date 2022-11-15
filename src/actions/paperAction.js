import axios from "axios";
import * as actions from "./actionTypes";
// import { getAllSubjects } from "./subjectAction";
const apiEndPoint = process.env.REACT_APP_API_URL + "papers";

export const getAllPapers = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_PAPERS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};
export const addPaper = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      dispatch({
        type: actions.ADD_PAPER,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const deletePaper = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      dispatch({ type: actions.DELETE_PAPER, payload: response.data });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getCurrentPaper = (id) => (dispatch, getState) => {
  console.log("idddd", id);
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_PAPER,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err.message));
};

export const updatePaper = (data) => (dispatch, getState) => {
  console.log("data", data);
  //dispatch(getAllSubjects());

  // const newData = {
  //   name: data.name,
  //   subject: data.subjectId,
  //   totalmarks: data.totalmarks,
  // };

  axios
    .put(apiEndPoint + "/" + data._id, {
      name: data.name,
      subjectId: data.subjectId,
      totalMarks: data.totalMarks,
    })
    .then((response) =>
      dispatch({ type: actions.UPDATE_PAPER, payload: response.data })
    )
    .catch((error) => console.log(error));
};
