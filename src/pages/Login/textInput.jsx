import React, { useEffect, useRef, useState } from "react";

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

    const [validationValue, setValidationValue] = useState("");
    const [valid, setValid] = useState(null);

    useEffect(() => {
      let cleanupFunction = false;
      if (serverValidation) {
        const timeout = setTimeout(async () => {
          const validation = await serverValidation(validationValue);
          if (!cleanupFunction) setValid(validation);
        }, 1000);

        return () => {
          clearTimeout(timeout);
          cleanupFunction = true;
        };
      }
    }, [validationValue, serverValidation]);

    useEffect(() => {
      if (typeof valid === "string") {
        setError(name, {
          type: "serverValidation",
          message: valid,
        });
      } else if (
        valid === true &&
        (!message[name] || message[name]?.type === "serverValidation")
      ) {
        if (message[name]?.type === "serverValidation") {
          clearErrors(name);
        }
      }
    }, [name, clearErrors, setError, message, valid]);

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
              maxLength="30"
              spellCheck="false"
              type="text"
              aria-label={`enter ${name}`}
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
                  if (message[name]?.type === "serverValidation")
                    clearErrors(name);
                  setValidationValue(e.target.value);
                }
              }}
            />
          </label>
          {valid === true && !message[name] && (
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
