import api from "./config";

export const getUserById = (userId) => {
  return api.get("/users/" + userId);
};

export const followUser = (userId) => {
  return api.get("/users/follow/" + userId);
};

export const searchUsersByID = (query) => {
  return api.get("/users?search=" + query);
};
