import validation from "./validation";

export const PasswordInput = ({
  label,
  name,
  errors,
  editPass,
  register,
  showPass,
}) => {
  return (
    <label className="data_label">
      {label}
      <input
        type={showPass ? "text" : "password"}
        className="data_input"
        autoCapitalize="off"
        autoCorrect="off"
        aria-label={label}
        maxLength="16"
        spellCheck="false"
        {...(editPass
          ? register(name, validation.password)
          : { disabled: true })}
      />
      {errors[name] && <span className="message">{errors[name].message}</span>}
    </label>
  );
};
