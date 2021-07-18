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
import { ToastContainer } from "react-toastify";

import { LoadingIconBig } from "./components/loadingIcon";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  const { userLoaded, isLoggedIn } = useSelector(state => state.currentUser);

  useEffect(() => {
    if (!userLoaded && isLoggedIn) {
      dispatch(getCurrentUser());
    }
  }, [isLoggedIn, userLoaded, dispatch]);

  if (isLoggedIn && !userLoaded) {
    return (
      <div className="main">
        <LoadingIconBig />
      </div>
    );
  } else {
    return (
      <div className="App">
        {userLoaded && <Header />}
        <Switch>
          {!isLoggedIn && <Route path="/login" component={Login} />}
          {!isLoggedIn && <Redirect from="*" to="/login" />}
          <Route path="/feed" component={Feed} />
          <Route path="/users_search" component={SearchUsers} />
          <Route
            path="/users/:id/profile_settings"
            component={ProfileSettings}
          />
          <Route path="/users/:id" component={User} />
          {isLoggedIn && <Redirect from="*" to="/feed" />}
        </Switch>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          transition={Slide}
        />
      </div>
    );
  }
};

export default App;
