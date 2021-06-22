import api from "./config";

export const fetchPostComments = (postId) => {
  return api.get("/comments/" + postId);
};

export const postComment = (postId, text) => {
  return api.post("/comments", {
    postId: postId,
    text: text,
  });
};
