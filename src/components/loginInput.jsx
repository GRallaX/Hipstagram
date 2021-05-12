import { useRef } from "react";

export const LoginInput = () => {
  const lbl = useRef();
  const input = useRef();
  const container = useRef();

  return (
    <div ref={container} className="login_lbl_container">
      <label>
        <span ref={lbl} className="input_lbl">
          Login
        </span>
        <input
          ref={input}
          aria-label="login"
          aria-required="true"
          autoCapitalize="off"
          autoCorrect="off"
          maxLength="30"
          name="login"
          type="text"
          onBlur={() => (container.current.className = "login_lbl_container")}
          onFocus={() =>
            (container.current.className = "login_lbl_container active")
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
