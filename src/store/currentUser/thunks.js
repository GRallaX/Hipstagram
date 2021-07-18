import { actionCreators } from "./actionCreators";
import {
  fetchCurrentUser,
  fetchRegistration,
  fetchLogIn,
  updateUser,
  fetchUpdatePassword,
} from "../../api/currentUser";
import { followUser } from "../../api/users";
import { sendNewPost } from "../../api/posts";
import { toast } from "react-toastify";

export const getCurrentUser = () => {
  return async dispatch => {
    try {
      const { data: currentUser } = await fetchCurrentUser();
      dispatch(actionCreators.setCurrentUser(currentUser));
      return currentUser;
    } catch (e) {
      toast.error(e.response?.data || e.message);
      dispatch(logOutUser());
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
      if (!e.response) toast.error(e.message);

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
      if (!e.response) toast.error(e.message);

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
      const { data: updatedUser } = await updateUser(type, value);
      dispatch(actionCreators.updateUser(updatedUser));
      return updatedUser;
    } catch (e) {
      if (!e.response) toast.error(e.message);
      return e;
    }
  };
};

export const changeUserPassword = (
  login,
  password,
  newPassword,
  confirmNewPassword
) => {
  return async dispatch => {
    try {
      await fetchLogIn(login, password);
      await fetchUpdatePassword(newPassword, confirmNewPassword);
      dispatch(actionCreators.updatePassword());
      return true;
    } catch (e) {
      if (!e.response) toast.error(e.message);
      return e;
    }
  };
};

export const subscribeUser = user => {
  return async dispatch => {
    try {
      await followUser(user.id);
      dispatch(actionCreators.subscribeUser(user));
      return true;
    } catch (e) {
      toast.error(e.response?.data || e.message);
      return e;
    }
  };
};

export const unSubscribeUser = user => {
  return async dispatch => {
    try {
      await followUser(user.id);
      dispatch(actionCreators.unsubscribeUser(user.id));
      return true;
    } catch (e) {
      toast.error(e.response?.data || e.message);
      return e;
    }
  };
};

export const createNewPost = (image, title) => {
  return async dispatch => {
    const { data: uploadedPost } = await sendNewPost(image, title);
    dispatch(actionCreators.createNewPost(uploadedPost));
    return uploadedPost;
  };
};
