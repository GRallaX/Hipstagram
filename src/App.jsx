import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { getCurrentUser } from "./store/currentUser/thunks";
import { Login } from "./pages/Login";
import { Feed } from "./pages/Feed";
import { Header } from "./components/header";
import { User } from "./pages/User";
import { ProfileSettings } from "./pages/ProfileSettings";
import { SearchUsers } from "./pages/SearchUsers";

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
        <img src="./images/Loading_icon.gif" alt="" />
      </div>
    );
  } else {
    return (
      <div className="App">
        {userLoaded && <Header />}
        <Switch>
          {!isLoggedIn && <Route path="/login" component={Login} />}
          {!isLoggedIn && (
            <Redirect from="/login/registration" to="/login/registration" />
          )}
          {!isLoggedIn && <Redirect from="*" to="/login" />}
          <Route path="/feed" component={Feed} />
          <Route path="/users_search" component={SearchUsers} />
          <Route
            path="/user/:id/profile_settings"
            component={ProfileSettings}
          />
          <Route path="/user/:id" component={User} />
          {isLoggedIn && <Redirect from="*" to="/feed" />}
        </Switch>
      </div>
    );
  }
};

export default App;
