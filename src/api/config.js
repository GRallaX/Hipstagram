import axios from "axios";
import { store } from "../store";
import { actionCreators } from "../store/currentUser/actionCreators";

const api = axios.create({
  baseURL: "https://hipstagram-api.herokuapp.com",
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response.data);
    if (error.response.status === 401) {
      store.dispatch(actionCreators.setLogOut());
    }
    return Promise.reject(error);
  }
);

export default api;
