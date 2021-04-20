import { actionTypes } from "./actionTypes";

const defaultState = {};

export default function commentsReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_COMMENTS_BY_POST_ID:
      return {
        ...state,
        [action.payload[0]]: action.payload[1],
      };

    default:
      return state;
  }
}
