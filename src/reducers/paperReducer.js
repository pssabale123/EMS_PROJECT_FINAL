import * as actions from "../actions/actionTypes";

export const paperReducer = (
  state = { papers: [], currentPaper: {} },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_PAPERS: {
      // console.log(action.payload);
      return {
        ...state,
        papers: [...action.payload],
      };
    }

    case actions.ADD_PAPER: {
      state.papers.push(action.payload);
      return { ...state, papers: [...state.papers] };
    }

    case actions.DELETE_PAPER: {
      const newPapers = state.papers.filter(
        (e) => e._id !== action.payload._id
      );

      return { ...state, papers: newPapers };
    }

    case actions.GET_CURRENT_PAPER:
      return { ...state, currentPaper: action.payload };

    case actions.UPDATE_PAPER: {
      state.papers.map((paper) => {
        if (paper._id === action.payload._id) {
          paper.name = action.payload.name;
          paper.subject = action.payload.subjectId;
          paper.totalMarks = action.payload.totalMarks;
          paper._id = action.payload._id;
        }
        return paper;
      });

      return state;
    }

    default:
      return state;
  }
};
