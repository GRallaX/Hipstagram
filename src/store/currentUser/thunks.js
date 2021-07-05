import { actionCreators } from "./actionCreators";
import {
  fetchCurrentUser,
  fetchRegistration,
  fetchLogIn,
  updateUser,
  fetchUpdatePassword,
} from "../../api/currentUser";

export const getCurrentUser = () => {
  return async dispatch => {
    try {
      const { data: currentUser } = await fetchCurrentUser();
      dispatch(actionCreators.setCurrentUser(currentUser));
    } catch (e) {
      console.log(e.response);
      return e;
    }
  };
};

export const userRegistration = (login, email, password) => {
  return async dispatch => {
    try {
      const {
        data: { id },
      } = await fetchRegistration(login, email, password);
      const {
        data: { access_token: token },
      } = await fetchLogIn(login, password);
      dispatch(actionCreators.registration(id, token));
      return id;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  };
};

export const logInUser = (login, password) => {
  return async dispatch => {
    try {
      const {
        data: { access_token: token },
      } = await fetchLogIn(login, password);
      return dispatch(actionCreators.logIn(token));
    } catch (e) {
      console.log(e.response);
      return e;
    }
  };
};

export const logOutUser = () => {
  return dispatch => {
    dispatch(actionCreators.logOut());
  };
};

export const updateCurrentUser = (type, value) => {
  return async dispatch => {
    try {
      console.log("start updating user");
      const { data: updatedUser } = await updateUser(type, value);
      dispatch(actionCreators.updateUser(updatedUser));
      return updatedUser;
    } catch (e) {
      console.log(e);
      return e;
    }
  };
};

export const updateUsersPassword = (
  login,
  password,
  newPassword,
  confirmNewPassword
) => {
  return async dispatch => {
    try {
      await fetchLogIn(login, password);
      await fetchUpdatePassword(newPassword, confirmNewPassword);
      dispatch(actionCreators.setPassword());
    } catch (e) {
      console.log(e);
    }
  };
};

export const subscribeUser = user => {
  return dispatch => {
    dispatch(actionCreators.subscribeUser(user));
  };
};

export const unSubscribeUser = userId => {
  return dispatch => {
    dispatch(actionCreators.unSubscribeUser(userId));
  };
};
