import { Route, Switch } from "react-router-dom";
import { useState } from "react";

import { LoginForm } from "./loginForm";
import { RegistrationForm } from "./registrationForm";
import Wallpaper from "../../images/wpap_final 1.png";
import "./login.css";

export const Login = () => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <div className="login_wrapper">
      <div className={imgLoading ? "wallpaper loading" : "wallpaper"}>
        <img
          src={Wallpaper}
          onLoad={() => setImgLoading(false)}
          alt="wallpaper"
        />
      </div>

      <Switch>
        <Route path="/login/registration" component={RegistrationForm} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </div>
  );
};
