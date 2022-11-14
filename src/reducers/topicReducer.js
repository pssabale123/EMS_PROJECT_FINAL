import * as actions from "../actions/actionTypes";

export const topicReducer = (
  state = { topics: [], currentTopic: "" },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_TOPICS: {
      return {
        ...state,
        topics: [...action.payload],
      };
    }

    case actions.ADD_TOPIC: {
      state.topics.push(action.payload);

      return { ...state, topics: [...state.topics] };
    }

    case actions.GET_CURRENT_TOPIC: {
      return {
        ...state,
        currentTopic: action.payload,
      };
    }
    case actions.UPDATE_TOPIC: {
      const ele = state.topics.filter(
        (topic) => topic._id === action.payload._id
      );
      const index = state.topics.indexOf(ele[0]);
      state.topics[index] = action.payload._id;
      return {
        ...state,

        topics: [...state.topics],
      };
    }

    case actions.DELETE_TOPIC: {
      const newState = state.topics.filter(
        (ele) => ele._id !== action.payload._id
      );
      return {
        ...state,

        topics: newState,
      };
    }

    default:
      return state;
  }
};
