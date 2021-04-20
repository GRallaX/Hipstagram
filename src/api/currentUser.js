import api from "./config";
import { store } from "../store";

const { token } = store.getState().currentUser;

export const registartion = (login, email, password) => {
  return api.post("/auth/registration", {
    login: login,
    email: email,
    password: password,
  });
};

export const logIn = (login, password) => {
  return api.post("/auth/login", {
    login: login,
    password: password,
  });
};

export const fetchCurrentUser = () => {
  return api.get("/users/current", {
    headers: {
      Authorization: token,
    },
  });
};

export const updateUser = (firstName, lastName, email, login, avatar) => {
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

export const updatePassword = (password, confirmPassword) => {
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
