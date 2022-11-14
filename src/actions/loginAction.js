import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "login";

const loginSuccess = () => {
  toast.success("LogIn....", {
    position: "top-center",
  });
};

export const loginAction = (data) => (dispatch) => {
  axios
    .post(apiEndPoint, data)
    .then((response) => {
      sessionStorage.setItem("token", response.data);
      loginSuccess();
      dispatch({
        type: actions.LOGIN_USER,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err.message));
};

export const loadLogin = () => {
  return {
    type: actions.LOGIN_USER,
    payload: sessionStorage.getItem("token"),
  };
};

export const logOutUser = () => {
  sessionStorage.setItem("token", "");
  return {
    type: actions.LOG_OUT_USER,
  };
};
