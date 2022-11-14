import * as actions from "../actions/actionTypes";

export const questionReducer = (
  state = { questions: [], currentQuestion: {} },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_QUESTIONS: {
      return {
        ...state,
        questions: [...action.payload],
      };
    }

    case actions.GET_QUESTIONS_BY_SUBJECT: {
      return {
        ...state,
        questions: [...action.payload],
      };
    }

    case actions.GET_QUESTIONS_BY_SUBJECT_ID: {
      return {
        ...state,
        questions: [...action.payload],
      };
    }

    case actions.GET_QUESTIONS_BY_TOPIC_ID: {
      return {
        ...state,
        questions: [...action.payload],
      };
    }

    case actions.ADD_QUESTIONS: {
      state.questions.push(action.payload);

      return { ...state, questions: [...state.questions] };
    }

    case actions.GET_CURRENT_QUESTIONS:
      // console.log("action", action.payload);
      return { ...state, currentQuestion: action.payload };

    case actions.UPDATE_QUESTIONS:
      state.questions.map((q) => {
        if (q._id === action.payload._id) {
          q._id = action.payload._id;
          q.questionNumber = action.payload.questionNumber;
          q.text = action.payload.text;
          q.topicId = action.payload.topicId;
          q.marks = action.payload.marks;
          q.complexityLevel = action.payload.complexityLevel;
        }
        return q;
      });

      return state;

    case actions.DELETE_QUESTIONS:
      const newState = state.questions.filter(
        (q) => q._id !== action.payload._id
      );

      return { ...state, questions: newState };

    default:
      return state;
  }
};
