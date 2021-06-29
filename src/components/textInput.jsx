import React, { useRef } from "react";

export const TextInput = React.forwardRef(
  ({ label, message, clearErrors, name, onChange, onBlur }, ref) => {
    const lbl = useRef();
    const container = useRef();
    const input = useRef();

    return (
      <div className="input_wrapper">
        <div ref={container} className="text_input_container">
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
              type="text"
              onBlur={(e) => {
                onBlur(e);
                container.current.className = "text_input_container";
              }}
              onFocus={() => {
                container.current.className = "text_input_container active";
                if (message.loginForm) clearErrors("loginForm");
              }}
              onChange={(e) => {
                onChange(e);
                lbl.current.className = "input_lbl active";
                if (message.loginForm) clearErrors("loginForm");
                if (e.target.value === "") {
                  lbl.current.className = "input_lbl inactive";
                }
              }}
            />
          </label>
        </div>
        {message[name] && (
          <span className="message">{message[name]?.message}</span>
        )}
      </div>
    );
  }
);
