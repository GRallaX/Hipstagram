import { actionTypes } from "./actionTypes";

const defaultState = {
  isLoading: true,
  isAuth: false,
  token: !localStorage.token ? "" : JSON.parse(localStorage.token),
  firstName: "",
  lastName: "",
  email: "",
  login: "",
  avatar: "",
  id: "",
  posts: [],
  followers: [],
  following: [],
};

export default function currentUserReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.REGISTRATION:
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        isAuth: true,
      };

    case actionTypes.LOG_IN:
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
      };

    case actionTypes.LOG_OUT:
      return {
        ...state,
        token: "",
        isAuth: false,
        firstName: "",
        lastName: "",
        email: "",
        login: "",
        avatar: "",
        id: "",
        posts: [],
        followers: [],
        following: [],
      };
    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case actionTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.UPDATE_PASSWORD:
      return state;

    default:
      return state;
  }
}
