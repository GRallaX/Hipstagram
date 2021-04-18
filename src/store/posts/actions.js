import axios from "axios";

import { actionCreators } from "./actionCreators";

const baseUrl = "https://hipstagram-api.herokuapp.com";

export const getFeed = (token) => {
  return async (dispatch) => {
    try {
      let { data: posts } = await axios.get(baseUrl + "/posts/feed", {
        headers: {
          Authorization: token,
        },
      });

      dispatch(actionCreators.updateFeed(posts));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};
