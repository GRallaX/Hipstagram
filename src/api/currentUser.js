import api from "./config";
import { store } from "../store";

const { token } = store.getState().currentUser;

export const fetchRegistration = (login, email, password) => {
  return api.post("/auth/registration", {
    login: login,
    email: email,
    password: password,
  });
};

export const fetchLogIn = (login, password) => {
  return api.post("/auth/login", {
    login: login,
    password: password,
  });
};

export const fetchCurrentUser = (deafaultToken = token) => {
  return api.get("/users/current", {
    headers: {
      Authorization: deafaultToken,
    },
  });
};

export const fetchUpdateUser = (firstName, lastName, email, login, avatar) => {
  return api.patch(
    "/users/current",
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
};

export const fetchUpdatePassword = (password, confirmPassword) => {
  return api.post(
    "/auth/login",
    {
      password: password,
      confirmPassword: confirmPassword,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
