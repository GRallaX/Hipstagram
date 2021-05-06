import api from "./config";
import { store } from "../store";

const { token } = store.getState().currentUser;

export const fetchPostComments = (postId, tokenParam = token) => {
  return api.get("/comments/" + postId, {
    headers: {
      Authorization: tokenParam,
    },
  });
};
