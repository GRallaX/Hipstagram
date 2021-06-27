import { actionTypes } from "./actionTypes";

export const actionCreators = {
  setRegistration: function (id, token) {
    return {
      type: actionTypes.REGISTRATION,
      payload: {
        id: id,
        token: token,
      },
    };
  },

  setLogIn: function (token) {
    return {
      type: actionTypes.LOG_IN,
      payload: {
        token: token,
      },
    };
  },

  setLogOut: function () {
    return {
      type: actionTypes.LOG_OUT,
    };
  },

  setCurrentUser: function (currentUser) {
    return {
      type: actionTypes.GET_CURRENT_USER,
      payload: currentUser,
    };
  },

  setUpdateUser: function (updatedUser) {
    return {
      type: actionTypes.UPDATE_CURRENT_USER,
      payload: updatedUser,
    };
  },

  setPassword: function () {
    return {
      type: actionTypes.UPDATE_PASSWORD,
    };
  },

  subscribeUser: function (user) {
    return {
      type: actionTypes.SUBSCRIBE_USER,
      payload: user,
    };
  },

  unSubscribeUser: function (userId) {
    return {
      type: actionTypes.UNSUBSCRIBE_USER,
      payload: userId,
    };
  },
};
