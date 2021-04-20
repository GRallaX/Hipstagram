import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import commentsReducer from "./comments/reducer";
import currentUserReducer from "./currentUser/reducer";
import postsReducer from "./posts/reducer";
import usersReducer from "./users/reducer";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  posts: postsReducer,
  users: usersReducer,
  commentsByPostId: commentsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
