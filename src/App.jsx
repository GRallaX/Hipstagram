import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { getCurrentUser } from "./store/currentUser/thunks";
import { Login } from "./pages/Login";
import { Feed } from "./pages/Feed";

// import { getUsers } from "./store/users/actions";

const App = () => {
  const dispatch = useDispatch();
  const { userLoaded, isLoggedIn, token } = useSelector(
    (state) => state.currentUser
  );

  useEffect(() => {
    if (!userLoaded && isLoggedIn) {
      dispatch(getCurrentUser(token));
    }
  });
  if (isLoggedIn && !userLoaded) {
    return (
      <div>
        <img src="./Loading_icon.gif" alt="" />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Hipstagram</h1>

        {isLoggedIn ? null : (
          <Switch>
            <Redirect from="/login/registration" to="/login/registration" />
            <Redirect from="/" to="/login" />
          </Switch>
        )}
        <Switch>
          {isLoggedIn ? null : <Route path="/login" component={Login} />}
          <Route path="/feed" component={Feed} />
          {isLoggedIn ? <Redirect from="/" to="/feed" /> : null}
        </Switch>
      </div>
    );
  }
};

export default App;
