import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL+"users";

export const getAllUsers = ()=>(dispatch)=>{
        axios.get(apiEndPoint).then((response)=>{
            dispatch({
                type:actions.GET_ALL_USERS,
                payload:response.data
            })
        }).catch((err)=>console.log(err.message))
}

export const registerStudent = (student) => (dispatch) => {
    student["role"]="student";
  axios
    .post(apiEndPoint, student)
    .then((response) =>
      dispatch({
        type: actions.ADD_USER,
        payload: response.data ,
      })
    )
    .catch((err) => console.log(err.message));
};

export const getCurrentUser = (id)=>(dispatch)=>{
  axios.get(apiEndPoint+"/"+id).then((response)=>{
      dispatch({
          type:actions.GET_CURRENT_USER,
          payload:response.data
      })
  })
}

export const addUser = (user) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, user, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.ADD_USER,
        payload:response.data,
      })
    )
    .catch((err) => console.log(err.message));
};


export const updateUser = (user) => (dispatch,getState) => {
  axios
    .put(apiEndPoint + "/" + user._id, {
      firstname: user.firstname,
      lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        password:"12345678",
        role: user.role,
    },{
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      dispatch({
        type: actions.UPDATE_USER,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error.message));
};

export const deleteUser = (id) => (dispatch,getState)=>{
  axios.delete(apiEndPoint+"/"+id,{
    headers:{"x-auth-token":getState().loginReducer.token}
  }).then((response)=>{
    dispatch({
      type:actions.DELETE_USER,
      payload:response.data,
    })
  }).catch((error)=>console.log(error.message))
}