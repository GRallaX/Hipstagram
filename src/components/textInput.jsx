import { useRef } from "react";

export const TextInput = ({ name, label, required }) => {
  const lbl = useRef();
  const input = useRef();
  const container = useRef();

  return (
    <div ref={container} className="text_input_container">
      <label>
        <span ref={lbl} className="input_lbl">
          {label}
        </span>
        <input
          ref={input}
          aria-label={name}
          aria-required={required}
          autoCapitalize="off"
          autoCorrect="off"
          maxLength="30"
          name={name}
          type="text"
          onBlur={() => (container.current.className = "text_input_container")}
          onFocus={() =>
            (container.current.className = "text_input_container active")
          }
          onChange={(e) => {
            lbl.current.className = "input_lbl active";
            if (e.target.value === "") {
              lbl.current.className = "input_lbl inactive";
            }
          }}
        />
      </label>
    </div>
  );
};
