import { Route, Switch } from "react-router-dom";

import { LoginForm } from "../../containers/loginForm";
import { RegistrationForm } from "../../containers/registrationForm";
import Wallpaper from "../../images/wpap_final 1.png";
import Logo from "../../images/logo 1.png";
import "./login.css";

export const Login = () => {
  return (
    <div className="login_wrapper">
      <div className="wallpaper">
        <img src={Wallpaper} alt="wallpaper" />
      </div>
      <div className="form_wrapper">
        <h1>
          <img src={Logo} alt="hip logo" />
          Hipstagram
        </h1>
        <Switch>
          <Route path="/login/registration" component={RegistrationForm} />
          <Route path="/login" component={LoginForm} />
        </Switch>
      </div>
    </div>
  );
};
