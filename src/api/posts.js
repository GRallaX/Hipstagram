import api from "./config";
import { store } from "../store";

const { token } = store.getState().currentUser;

export const fetchFeed = () => {
  return api.get("/posts/feed", {
    headers: {
      Authorization: token,
    },
  });
};

export const likePost = (postId) => {
  return api.get("/posts/like/" + postId, {
    headers: {
      Authorization: token,
    },
  });
};

export const getPostById = (postId) => {
  return api.get("/posts/" + postId, {
    headers: {
      Authorization: token,
    },
  });
};
