import React, { useEffect, useRef, useState } from "react";

export const PasswordInput = React.forwardRef(
  (
    {
      label,
      name,
      message,
      clearErrors,
      onChange,
      onBlur,
      passwordShown,
      setPasswordShown,
    },
    ref
  ) => {
    const [showPass, setShowPass] = useState(false);
    const [value, setValue] = useState("");

    const lbl = useRef();
    const container = useRef();
    const input = useRef();

    useEffect(() => {
      if (setPasswordShown) {
        if (passwordShown !== showPass) setShowPass(!showPass);
      }
    }, [passwordShown, showPass, setPasswordShown]);

    return (
      <div className="input_wrapper">
        <div ref={container} className="pass_lbl_container">
          <label>
            <span
              ref={lbl}
              className="input_lbl"
              onClick={() => input.current.focus()}
            >
              {label}
            </span>
            <input
              ref={(ref, input)}
              name={name}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="password"
              type={showPass ? "text" : "password"}
              spellCheck="false"
              maxLength="16"
              onBlur={e => {
                onBlur(e);
                container.current.className = "pass_lbl_container";
              }}
              onFocus={() => {
                container.current.className = "pass_lbl_container active";
              }}
              onChange={e => {
                onChange(e);
                lbl.current.className = "input_lbl active";
                setValue(e.target.value.trim());
                if (message.form) clearErrors("form");
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
              onClick={e => {
                e.preventDefault();
                setShowPass(!showPass);
                if (setPasswordShown) setPasswordShown(!passwordShown);
              }}
              disabled={value ? false : true}
            >
              {showPass ? "Hide" : "Show"}
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
