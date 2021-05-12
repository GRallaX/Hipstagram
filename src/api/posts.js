import api from "./config";

export const fetchFeed = () => {
  return api.get("/posts/feed");
};

export const likePost = (postId) => {
  return api.get("/posts/like/" + postId);
};

export const getPostById = (postId) => {
  return api.get("/posts/" + postId);
};
