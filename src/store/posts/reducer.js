import { actionTypes } from "./actionTypes";

const defaultState = {
  feed: [],
};

export default function postsReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_FEED:
      return {
        ...state,
        feed: action.payload,
      };

    default:
      return state;
  }
}
