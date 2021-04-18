import axios from "axios";

import { actionCreators } from "./actionCreators";

const baseUrl = "https://hipstagram-api.herokuapp.com";

export const getComments = (token, postId) => {
  return async (dispatch) => {
    try {
      let { data: comments } = await axios.get(
        baseUrl + "/comments/" + postId,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      await console.log(comments);
      if (!!comments.length) {
        comments.forEach((comment) => {
          dispatch(actionCreators.addComment(comment));
        });
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };
};
