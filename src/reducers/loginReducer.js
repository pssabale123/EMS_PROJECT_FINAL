import * as actions from "../actions/actionTypes";

export const loginReducer = (state = { token: "" }, action) => {
  switch (action.type) {
    case actions.LOGIN_USER: {
      return {
        ...state,
        token: action.payload,
      };
    }

    case actions.LOG_OUT_USER: {
      return {
        ...state,
        token: "",
      };
    }

    default:
      return state;
  }
};
