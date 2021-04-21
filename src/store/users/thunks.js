import { actionCreators } from "./actionCreators";
import { fetchUserById, followUser } from "../../api/users";
import { getCurrentUser } from "../currentUser/thunks";

export const getUserById = (userId) => {
  return async (dispatch) => {
    try {
      const { data: user } = await fetchUserById(userId);
      dispatch(actionCreators.addUserById(userId, user));
    } catch (e) {
      console.log(e);
    }
  };
};

export const followUserById = (userId) => {
  return async (dispatch) => {
    try {
      await followUser(userId);
      dispatch(actionCreators.followUnfollowUser);
      getCurrentUser();
    } catch (e) {
      console.log(e);
    }
  };
};
