import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "paperQuestions";

export const getAllPaperQuestions = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_PAPER_QUESTIONS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const addPaperQuestion = (qid, pid) => (dispatch, getState) => {
  // console.log("paper", pid);

  console.log("question is added to paper...");

  axios
    .post(
      apiEndPoint,
      {
        paperId: pid,
        questionId: qid,
      },
      { headers: { "x-auth-token": getState().loginReducer.token } }
    )
    .then((response) => {
      console.log("response ", response.data);
      dispatch({ type: actions.ADD_PAPER_QUESTION, payload: response.data });
    })
    .catch((err) => console.log(err));
};

export const deletePaperQuestion = (id) => (dispatch, getState) => {
  // alert("question is Remove from paper...");
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      dispatch({ type: actions.DELETE_PAPER_QUESTION, payload: response.data });
    })
    .catch((err) => console.log(err));
};

export const getPaperQuestionByPaper = (paper) => (dispatch, getState) => {
  axios
    .post(
      apiEndPoint + "/byPaper",
      { paper },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) =>
      dispatch({
        type: actions.GET_PAPER_QUESTIONS_BY_PAPER,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err.message));
};

// export const getPaperQuestionByStudentPaper =
//   (paperId, studentId) => (dispatch, getState) => {
//     axios
//       .post(
//         apiEndPoint + "/byStudentPaper",
//         { paperId, studentId },
//         {
//           headers: { "x-auth-token": getState().loginReducer.token },
//         }
//       )
//       .then((response) =>
//         dispatch({
//           type: actions.GET_PAPER_QUESTIONS_BY_STUDENT_PAPER,
//           payload: response.data,
//         })
//       )
//       .catch((err) => console.log(err.message));
//   };
