import api from "./config";

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

export const fetchCurrentUser = () => {
  return api.get("/users/current");
};

export const fetchUpdateUser = (firstName, lastName, email, login, avatar) => {
  return api.patch("/users/current", {
    firstName: firstName,
    lastName: lastName,
    email: email,
    login: login,
    avatar: avatar,
  });
};

export const fetchUpdatePassword = (password, confirmPassword) => {
  return api.post("/auth/login", {
    password: password,
    confirmPassword: confirmPassword,
  });
};
