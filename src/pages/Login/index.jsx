import { Route, Switch } from "react-router-dom";

import "./login.css";
import { LoginForm } from "../../containers/loginForm";
import { RegistrationForm } from "../../containers/registrationForm";

export const Login = () => {
  return (
    <div className="login_wrapper">
      <Switch>
        <Route path="/login/registration" component={RegistrationForm} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </div>
  );
};
