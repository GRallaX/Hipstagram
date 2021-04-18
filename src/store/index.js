import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import currentUserReducer from "./currentUser/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
