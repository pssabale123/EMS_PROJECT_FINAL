import * as actions from "../actions/actionTypes";

export const answerOptionReducer = (
  state = { answerOptions: [], currentOption: {} },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_OPTIONS: {
      return {
        ...state,
        answerOptions: [...action.payload],
      };
    }

    case actions.ADD_OPTION: {
      state.answerOptions.push(action.payload);
      return { ...state, answerOptions: [...state.answerOptions] };
    }

    case actions.DELETE_OPTIONS: {
      const newOptions = state.answerOptions.filter(
        (e) => e._id !== action.payload._id
      );

      return { ...state, answerOptions: newOptions };
    }

    case actions.GET_CURRENT_OPTION:
      return { ...state, currentOption: action.payload };

    case actions.UPDATE_OPTIONS: {
      state.answerOptions.map((option) => {
        if (option._id === action.payload._id) {
          option.option = action.payload.option;
          option.optionText = action.payload.optionText;
          option.questionId = action.payload.questionId;
          option.isCorrect = action.payload.isCorrect;
          option._id = action.payload._id;
        }
        return option;
      });

      return state;
    }

    default:
      return state;
  }
};
