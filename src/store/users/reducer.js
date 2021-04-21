import { actionTypes } from "./actionTypes";

const defaultState = {};

export default function usersReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_BY_ID:
      return {
        ...state,
        [action.payload[0]]: action.payload[1],
      };
    case actionTypes.FOLLOW_UNFOLLOW_USER:
      return state;
    default:
      return state;
  }
}
