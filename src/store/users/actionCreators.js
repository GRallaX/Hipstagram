import { actionTypes } from "./actionTypes";

export const actionCreators = {
  addUserById: function (userId, user) {
    return {
      type: actionTypes.GET_USER_BY_ID,
      payload: [userId, user],
    };
  },
};
