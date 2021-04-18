import { actionTypes } from "./actionTypes";

const defaultState = {
  feedUsers: [],
};

export default function usersReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_BY_ID:
      return {
        ...state,
        feedUsers: [
          ...state.feedUsers.filter((user) => user.id !== action.payload.id),
          action.payload,
        ],
      };

    default:
      return state;
  }
}
