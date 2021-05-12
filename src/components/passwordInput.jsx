import { useRef } from "react";

export const PasswordInput = () => {
  const lbl = useRef();
  const input = useRef();
  const container = useRef();
  const show = useRef();

  return (
    <div ref={container} className="pass_lbl_container">
      <label>
        <span ref={lbl} className="input_lbl">
          Password
        </span>
        <input
          ref={input}
          aria-label="password"
          aria-required="true"
          autoCapitalize="off"
          autoCorrect="off"
          maxLength="30"
          name="password"
          type="password"
          onBlur={() => (container.current.className = "pass_lbl_container")}
          onFocus={() =>
            (container.current.className = "pass_lbl_container active")
          }
          onChange={(e) => {
            lbl.current.className = "input_lbl active";
            show.current.className = "show_pass";
            if (e.target.value === "") {
              lbl.current.className = "input_lbl inactive";
              show.current.className = "show_pass hidden";
            }
          }}
        />
      </label>
      <div ref={show} className="show_pass hidden">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            input.current.type === "password"
              ? (input.current.type = "text")
              : (input.current.type = "password");
          }}
        >
          Show
        </button>
      </div>
    </div>
  );
};
