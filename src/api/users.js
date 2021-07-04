import api from "./config";

export const getUserById = userId => {
  return api.get("/users/" + userId);
};

export const followUser = userId => {
  return api.get("/users/follow/" + userId);
};

export const searchUsersByLogin = query => {
  return api.get("/users?search=" + query, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTk4YjJlZGFkOTVkMDAxNzg3YTU5NCIsImlhdCI6MTYyNTI2MTgxMn0.YOP4iDx92uTkXXSz0Ml9ygwVptZKcGNUazt8VL1sq-M",
    },
  });
};

export const getFollowersAndFollowings = userId => {
  return api.get("/users/followersAndFollowing/" + userId);
};

export const deleteUser = userId => {
  return api.delete("/users/" + userId);
};
