import api from "./config";

export const fetchFeed = () => {
  return api.get("/posts/feed");
};

export const likePost = postId => {
  return api.get("/posts/like/" + postId);
};

export const getPostById = postId => {
  return api.get("/posts/" + postId);
};

export const sendNewPost = (image, title) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);

  return api.post("/posts", formData);
};
