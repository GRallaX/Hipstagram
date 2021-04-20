import { Route, Switch } from "react-router-dom";
import { LoginForm } from "../components/loginForm";
import { RegistrationForm } from "../components/registartionForm";

export const Login = () => {
  return (
    <div className="main">
      <Switch>
        <Route path="/login/registration" component={RegistrationForm} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </div>
  );
};
