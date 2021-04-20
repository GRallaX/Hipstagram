import { actionCreators } from "./actionCreators";
import {
  fetchCurrentUser,
  registartion,
  logIn,
  updateUser,
  updatePassword,
} from "../../api/currentUser";

export const userRegistration = (login, email, password) => {
  return async (dispatch) => {
    try {
      const {
        data: { id },
      } = await registartion(login, email, password);
      const {
        data: { access_token: token },
      } = await logIn(login, password);
      dispatch(actionCreators.setRegistration(id, token));
      localStorage.token = JSON.stringify(token);
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
      } = await logIn(login, password);
      dispatch(actionCreators.setLogIn(token));
      localStorage.token = JSON.stringify(token);
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatch(actionCreators.setLogOut());
    delete localStorage.token;
  };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const { data: currentUser } = await fetchCurrentUser();
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
      const { data: updatedUser } = await updateUser(
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
      await logIn(login, password);
      await updatePassword(newPassword, confirmNewPassword);
      dispatch(actionCreators.setPassword());
    } catch (e) {
      console.log(e.response.data);
    }
  };
};
