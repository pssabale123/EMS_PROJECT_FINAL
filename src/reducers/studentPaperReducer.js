import * as actions from "../actions/actionTypes";

export const studentPaperReducer = (
  state = { studentPapers: [], currentStudentPaper: {} },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_STUDENT_PAPERS: {
      return {
        ...state,
        studentPapers: [...action.payload],
      };
    }

    case actions.ADD_STUDENT_PAPER: {
      state.studentPapers.push(action.payload);
      return { ...state, studentPapers: [...state.studentPapers] };
    }

    case actions.GET_RESULT: {
      return {
        ...state,
        studentPapers: [...action.payload],
      };
    }

    case actions.UPDATE_STUDENT_PAPER: {
      state.studentPapers.map((s) => {
        if (s._id === action.payload._id) {
          s._id = action.payload._id;
          s.paperId = action.payload.paperId;
          s.studentId = action.payload.studentId;
          s.status = action.payload.status;
        }
        return s;
      });

      return state;
    }

    case actions.DELETE_STUDENT_PAPER: {
      const filteredData = state.studentPapers.filter(
        (s) => s._id !== action.payload._id
      );

      return { ...state, studentPapers: filteredData };
    }

    case actions.GET_CURRENT_STUDENT_PAPER: {
      console.log("Reducer", action.payload);
      return { ...state, currentStudentPaper: action.payload };
    }

    case actions.GET_EMPTY: {
      return { ...state, studentPapers: action.payload };
    }

    default:
      return state;
  }
};
