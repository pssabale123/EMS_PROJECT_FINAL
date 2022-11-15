import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "studentAnswers";

export const getAllStudentAnswers = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_STUDENT_ANSWER,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const addArrayOfStudentAnswers = (data) => (dispatch, getState) => {
  axios
    .post(
      apiEndPoint,
      {
        studentId: data.studentId,
        paperQuestionId: data.paperQuestionId,
        answer: data.answer,
        isCorrect: data.isCorrect,
      },
      { headers: { "x-auth-token": getState().loginReducer.token } }
    )
    .then((response) =>
      dispatch({
        type: actions.ADD_ARRAY_OF_STUDENT_ANSWER,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err.message));
};
