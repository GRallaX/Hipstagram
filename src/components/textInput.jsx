import React, { useRef, useState } from "react";

export const TextInput = React.forwardRef(
  (
    {
      label,
      message,
      setError,
      clearErrors,
      serverValidation,
      name,
      onChange,
      onBlur,
    },
    ref
  ) => {
    const lbl = useRef();
    const container = useRef();
    const input = useRef();

    const [valid, setValid] = useState(null);

    const debounce = (
      (timer = null) =>
      (callback, delay = 500) =>
      (...args) => {
        if (timer !== null) clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          return callback(...args);
        }, delay);
      }
    )();

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
              onBlur={e => {
                onBlur(e);
                container.current.className = "text_input_container";
              }}
              onFocus={() => {
                container.current.className = "text_input_container active";
              }}
              onChange={e => {
                onChange(e);
                lbl.current.className = "input_lbl active";
                if (message.form) clearErrors("form");
                if (e.target.value === "") {
                  lbl.current.className = "input_lbl inactive";
                }

                if (valid) setValid(null);
                if (
                  serverValidation &&
                  (message[name]?.type === "serverValidation" || !message[name])
                ) {
                  const validation = debounce(
                    () => serverValidation(e.target.value),
                    700
                  )();
                  if (typeof validation === "string") {
                    setError(name, {
                      type: "serverValidation",
                      message: validation,
                    });
                  } else if (
                    validation === true &&
                    (!message[name] ||
                      message[name]?.type === "serverValidation")
                  ) {
                    if (message[name]?.type === "serverValidation") {
                      clearErrors(name);
                    }
                    setValid(true);
                  }
                }
              }}
            />
          </label>
          {valid && !message[name] && (
            <span className="validated">&#10003;</span>
          )}
        </div>
        {message[name] && (
          <span className="message">{message[name]?.message}</span>
        )}
      </div>
    );
  }
);
