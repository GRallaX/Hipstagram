import { actionCreators } from "./actionCreators";
import { fetchFeed } from "../../api/posts";

export const getFeed = () => {
  return async (dispatch) => {
    try {
      const { data: posts } = await fetchFeed();
      dispatch(actionCreators.updateFeed(posts));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};
