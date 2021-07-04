import { actionTypes } from "./actionTypes";

const defaultState = {
  userLoaded: false,
  isLoggedIn: !localStorage.token ? false : true,
  token: !localStorage.token ? false : JSON.parse(localStorage.token),
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
      localStorage.token = JSON.stringify(action.payload.token);
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        isLoggedIn: true,
      };

    case actionTypes.LOG_IN:
      localStorage.token = JSON.stringify(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: true,
      };

    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        userLoaded: true,
      };

    case actionTypes.LOG_OUT:
      delete localStorage.token;
      return {
        ...state,
        token: null,
        userLoaded: false,
        isLoggedIn: false,
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

    case actionTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.UPDATE_PASSWORD:
      return state;

    case actionTypes.SUBSCRIBE_USER:
      return { ...state, following: [...state.following, action.payload] };

    case actionTypes.UNSUBSCRIBE_USER:
      return {
        ...state,
        following: [
          ...state.following.filter(user => user.id !== action.payload),
        ],
      };

    default:
      return state;
  }
}
