import { actionCreators } from "./actionCreators";

export const getUserById = (userId) => {
  return async (dispatch) => {
    try {
      const { data: user } = await fetchUserById(userId);
      dispatch(actionCreators.addUserById(userId, user));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};
