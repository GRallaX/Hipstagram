import { actionCreators } from "./actionCreators";
import {
  fetchCurrentUser,
  fetchRegistration,
  fetchLogIn,
  fetchUpdateUser,
  fetchUpdatePassword,
} from "../../api/currentUser";

export const userRegistration = (login, email, password) => {
  return async (dispatch) => {
    try {
      const {
        data: { id },
      } = await fetchRegistration(login, email, password);
      const {
        data: { access_token: token },
      } = await fetchLogIn(login, password);
      dispatch(actionCreators.setRegistration(id, token));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const logInUser = (login, password) => {
  return async (dispatch) => {
    try {
      const {
        data: { access_token: token },
      } = await fetchLogIn(login, password);
      dispatch(actionCreators.setLogIn(token));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatch(actionCreators.setLogOut());
  };
};

export const getCurrentUser = (token) => {
  return async (dispatch) => {
    try {
      const { data: currentUser } = await fetchCurrentUser(token);
      dispatch(actionCreators.setCurrentUser(currentUser));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const updateCurrentUser = (
  firstName,
  lastName,
  email,
  login,
  avatar
) => {
  return async (dispatch) => {
    try {
      const { data: updatedUser } = await fetchUpdateUser(
        firstName,
        lastName,
        email,
        login,
        avatar
      );

      dispatch(actionCreators.setUpdateUser(updatedUser));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const updateUsersPassword = (
  login,
  password,
  newPassword,
  confirmNewPassword
) => {
  return async (dispatch) => {
    try {
      await fetchLogIn(login, password);
      await fetchUpdatePassword(newPassword, confirmNewPassword);
      dispatch(actionCreators.setPassword());
    } catch (e) {
      console.log(e.response.data);
    }
  };
};
