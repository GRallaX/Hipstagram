import { actionTypes } from "./actionTypes";

export const actionCreators = {
  addComment: function (comment) {
    return {
      type: actionTypes.GET_COMMENT_BY_POST_ID,
      payload: comment,
    };
  },
};
