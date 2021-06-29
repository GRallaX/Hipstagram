import React, { useRef, useState } from "react";

export const PasswordInput = React.forwardRef(
  ({ name, message, clearErrors, onChange, onBlur }, ref) => {
    const [showPass, setShowPass] = useState(false);
    const [value, setValue] = useState("");

    const lbl = useRef();
    const container = useRef();
    const input = useRef();

    return (
      <div className="input_wrapper">
        <div ref={container} className="pass_lbl_container">
          <label>
            <span
              ref={lbl}
              className="input_lbl"
              onClick={() => input.current.focus()}
            >
              Password
            </span>
            <input
              ref={(ref, input)}
              name={name}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="password"
              type={showPass ? "text" : "password"}
              onBlur={(e) => {
                onBlur(e);
                container.current.className = "pass_lbl_container";
              }}
              onFocus={() => {
                container.current.className = "pass_lbl_container active";
                if (message.loginForm) clearErrors("loginForm");
              }}
              onChange={(e) => {
                onChange(e);
                lbl.current.className = "input_lbl active";
                setValue(e.target.value.trim());
                if (message.loginForm) clearErrors("loginForm");
                if (e.target.value.trim() === "") {
                  lbl.current.className = "input_lbl inactive";
                  setValue("");
                }
              }}
            />
          </label>
          <div className="show_pass">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowPass(!showPass);
              }}
              disabled={value ? false : true}
            >
              Show
            </button>
          </div>
        </div>
        {message[name] && (
          <span className="message">{message[name].message}</span>
        )}
      </div>
    );
  }
);
