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

export const updateUser = (type, value) => {
  const data = {};
  data[type] = value;
  return api.patch("/users/current", data);
};

export const fetchUpdatePassword = (password, confirmPassword) => {
  return api.post("/auth/login", {
    password: password,
    confirmPassword: confirmPassword,
  });
};
