import axios from "axios";

const api = axios.create({
  baseURL: "https://hipstagram-api.herokuapp.com",
});

export default api;
