import axios from "axios";
import { store } from "../store";
import { actionCreators } from "../store/currentUser/actionCreators";

let { token } = store.getState().currentUser;
store.subscribe(() => {
  token = store.getState().currentUser.token;
});

const api = axios.create({
  baseURL: "https://hipstagram-api.herokuapp.com",
});

api.interceptors.request.use(function (config) {
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch(actionCreators.logOut());
    }
    if (error.response.data === "User not found") {
      store.dispatch(actionCreators.logOut());
    }
    return Promise.reject(error);
  }
);

export default api;
