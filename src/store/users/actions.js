import axios from "axios";

import { actionCreators } from "./actionCreators";

const baseUrl = "https://hipstagram-api.herokuapp.com";

export const getUsers = (token, userId) => {
  return async (dispatch) => {
    try {
      let { data: user } = await axios.get(baseUrl + "/users/" + userId, {
        headers: {
          Authorization: token,
        },
      });

      dispatch(actionCreators.addUser(user));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};
