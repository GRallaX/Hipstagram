import axios from "axios";
import { actionCreators } from "./actionCreators";

const baseUrl = "https://hipstagram-api.herokuapp.com";

export const userRegistration = (login, email, password) => {
  return async (dispatch) => {
    try {
      const {
        data: { id },
      } = await axios.post(baseUrl + "/auth/registration", {
        login: login,
        email: email,
        password: password,
      });
      const {
        data: { access_token: token },
      } = await axios.post(baseUrl + "/auth/login", {
        login: login,
        password: password,
      });
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
      } = await axios.post(baseUrl + "/auth/login", {
        login: login,
        password: password,
      });
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

export const getCurrentUser = (token) => {
  return async (dispatch) => {
    try {
      const { data: currentUser } = await axios.get(
        baseUrl + "/users/current",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(actionCreators.setCurrentUser(currentUser));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const updateCurrentUser = (
  token,
  firstName,
  lastName,
  email,
  login,
  avatar
) => {
  return async (dispatch) => {
    try {
      const { data: updatedUser } = await axios.patch(
        baseUrl + "/users/current",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          login: login,
          avatar: avatar,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(actionCreators.setUpdateUser(updatedUser));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const updatePassword = (
  login,
  password,
  token,
  newPassword,
  confirmNewPassword
) => {
  return async (dispatch) => {
    try {
      await axios.post(baseUrl + "/auth/login", {
        login: login,
        password: password,
      });
      await axios.post(
        baseUrl + "/auth/updatePassword",
        { password: newPassword, confirmPassword: confirmNewPassword },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(actionCreators.setPassword());
    } catch (e) {
      console.log(e.response.data);
    }
  };
};
