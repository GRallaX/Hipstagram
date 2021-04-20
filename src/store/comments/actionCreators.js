import { actionTypes } from "./actionTypes";

export const actionCreators = {
  addComments: function (postId, comments) {
    return {
      type: actionTypes.GET_COMMENTS_BY_POST_ID,
      payload: [postId, comments],
    };
  },
};
