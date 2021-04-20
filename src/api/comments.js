import api from "./config";
import { store } from "../store";

const { token } = store.getState().currentUser;

export const fetchPostComments = (postId) => {
  return api.get("/comments/" + postId, {
    headers: {
      Authorization: token,
    },
  });
};
