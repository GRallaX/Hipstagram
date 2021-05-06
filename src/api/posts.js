import api from "./config";
import { store } from "../store";

const { token } = store.getState().currentUser;

export const fetchFeed = (tokenParam = token) => {
  return api.get("/posts/feed", {
    headers: {
      Authorization: tokenParam,
    },
  });
};
