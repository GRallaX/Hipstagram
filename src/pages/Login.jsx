import { Route, Switch } from "react-router-dom";
import { LoginForm } from "../components/loginForm";
import { RegistrationForm } from "../components/registrationForm";

export const Login = () => {
  return (
    <main>
      <Switch>
        <Route path="/login/registration" component={RegistrationForm} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </main>
  );
};
