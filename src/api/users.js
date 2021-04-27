import api from "./config";
import { store } from "../store";

const { token } = store.getState().currentUser;

export const getUserById = (userId) => {
  return api.get("/users/" + userId, {
    headers: {
      Authorization: token,
    },
  });
};

export const followUser = (userId) => {
  return api.get("/users/follow/" + userId, {
    headers: {
      Authorization: token,
    },
  });
};

export const searchUsersByID = (query) => {
  return api.get("/users?search=" + query, {
    headers: {
      Authorization: token,
    },
  });
};
