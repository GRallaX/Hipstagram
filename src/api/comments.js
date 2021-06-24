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

export const editComment = (commentId, text) => {
  return api.patch("/comments/" + commentId, {
    text: text,
  });
};

export const deleteComment = (commentId) => {
  return api.delete("/comments/" + commentId);
};
