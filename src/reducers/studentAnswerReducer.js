import * as actions from "../actions/actionTypes";

export const studentAnswerReducer = (
  state = { studentAnswers: [] },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_STUDENT_ANSWER: {
      return {
        ...state,
        studentAnswers: [...action.payload],
      };
    }

    case actions.ADD_ARRAY_OF_STUDENT_ANSWER: {
      state.studentAnswers.push(action.payload);
      return {
        ...state,
        studentAnswers: [...state.studentAnswers],
      };
    }

    default:
      return state;
  }
};
