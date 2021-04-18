import { actionTypes } from "./actionTypes";

const defaultState = {
  all: [],
};

export default function commentsReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_COMMENT_BY_POST_ID:
      return {
        ...state,
        all: [
          ...state.all.filter((comment) => comment.id !== action.payload.id),
          action.payload,
        ],
      };

    default:
      return state;
  }
}
