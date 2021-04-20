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
