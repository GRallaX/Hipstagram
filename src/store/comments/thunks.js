import { fetchPostComments } from "../../api/comments";
import { actionCreators } from "./actionCreators";

export const getComments = (postId) => {
  return async (dispatch) => {
    try {
      const { data: comments } = await fetchPostComments(postId);
      dispatch(actionCreators.addComments(postId, comments));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};
