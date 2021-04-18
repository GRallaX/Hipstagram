import { actionTypes } from "./actionTypes";

export const actionCreators = {
  updateFeed: function (feed) {
    return {
      type: actionTypes.GET_FEED,
      payload: feed,
    };
  },
};
