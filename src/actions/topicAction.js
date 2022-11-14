import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "topics";

export const getAllTopics = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      dispatch({
        type: actions.GET_ALL_TOPICS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const addTopic = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({ type: actions.ADD_TOPIC, payload: response.data })
    )
    .catch((err) => console.log(err));
};

export const getCurrentTopic = (id) => (dispatch) => {
  axios.get(apiEndPoint + "/" + id).then((response) => {
    dispatch({
      type: actions.GET_CURRENT_TOPIC,
      payload: response.data,
    });
  });
};

export const updateTopic = (topic) => (dispatch, getState) => {
  axios
    .put(
      apiEndPoint + "/" + topic._id,
      {
        name: topic.name,
        subjectId: topic.subject,
      },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) =>
      dispatch({ type: actions.UPDATE_TOPIC, payload: response.data })
    )
    .catch((err) => console.log(err));
};

export const deleteTopic = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.DELETE_TOPIC,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};
