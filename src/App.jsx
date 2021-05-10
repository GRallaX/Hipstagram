import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { getCurrentUser } from "./store/currentUser/thunks";
import { Login } from "./pages/Login";
import { Feed } from "./pages/Feed";
import { Header } from "./containers/header";
import { User } from "./pages/User";
import { ProfileSettings } from "./pages/ProfileSettings";
import { SearchUsers } from "./pages/SearchUsers";
import { ModalPost } from "./containers/modalPost";
import loadingIcon from "./images/loading_big.svg";

const App = () => {
  const dispatch = useDispatch();
  const { userLoaded, isLoggedIn } = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (!userLoaded && isLoggedIn) {
      dispatch(getCurrentUser());
    }
  });
  if (isLoggedIn && !userLoaded) {
    return (
      <main>
        <div className="loading_screen">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </main>
    );
  } else {
    return (
      <div className="App">
        {userLoaded && <Header />}
        <Switch>
          {!isLoggedIn && <Route path="/login" component={Login} />}
          {!isLoggedIn && <Redirect from="*" to="/login" />}
          <Route path="/feed">
            <Feed />
            <Route path="/feed/post/:postId" component={ModalPost} />
          </Route>
          <Route path="/users_search" component={SearchUsers} />
          <Route
            path="/users/:id/profile_settings"
            component={ProfileSettings}
          />
          <Route path="/users/:id" component={User} />
          {isLoggedIn && <Redirect from="*" to="/feed" />}
        </Switch>
      </div>
    );
  }
};

export default App;
