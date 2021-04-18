import { actionTypes } from "./actionTypes";

export const actionCreators = {
  addUser: function (user) {
    return {
      type: actionTypes.GET_USER_BY_ID,
      payload: user,
    };
  },
};
