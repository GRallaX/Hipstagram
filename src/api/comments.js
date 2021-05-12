import api from "./config";

export const fetchPostComments = (postId) => {
  return api.get("/comments/" + postId);
};
