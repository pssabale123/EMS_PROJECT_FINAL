import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "answerOptions";

export const getAllOptions = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_OPTIONS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const addOption = (data, qId) => (dispatch, getState) => {
  axios
    .post(
      apiEndPoint,
      {
        option: data.option,
        optionText: data.optionText,
        questionId: qId,
        isCorrect: data.isCorrect,
      },
      { headers: { "x-auth-token": getState().loginReducer.token } }
    )
    .then((response) =>
      dispatch({ type: actions.ADD_OPTION, payload: response.data })
    )
    .catch((err) => console.log(err));
};

export const updateOption = (data) => (dispatch, getState) => {
  console.log("ctionOption", data);
  axios
    .put(
      apiEndPoint + "/" + data._id,
      {
        option: data.option,
        optionText: data.optionText,
        questionId: data.questionId,
        isCorrect: data.isCorrect,
      },
      { headers: { "x-auth-token": getState().loginReducer.token } }
    )
    .then((response) =>
      dispatch({ type: actions.UPDATE_OPTIONS, payload: response.data })
    )
    .catch((err) => console.log(err));
};

export const deleteOption = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({ type: actions.DELETE_OPTIONS, payload: response.data })
    )
    .then((err) => console.log(err.message));
};
export const getCurrentOption = (id) => (dispatch, getState) => {
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_OPTION,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err.message));
};
