import { useEffect } from "react";
import validation from "./validation";
import loadingIcon from "../../images/loading_small.svg";

export const EditUserInput = ({
  label,
  name,
  defaultValue,
  register,
  unregister,
  editingField,
  setEditingField,
  setValue,
  setFocus,
  errors,
  loading,
  isValid,
  children,
}) => {
  useEffect(() => {
    if (editingField) setFocus(editingField);
  }, [editingField, setFocus]);

  useEffect(() => {
    if (editingField !== name) setValue(name, defaultValue);
  }, [editingField, defaultValue, name, setValue]);

  const hadleStopEdit = e => {
    if (e) e.preventDefault();
    setEditingField(false);
    setValue(name, defaultValue);
    unregister(name);
  };

  const SubmitButton = () => {
    return (
      <button
        className="submit_btn"
        type="submit"
        disabled={isValid ? undefined : true}
      >
        {loading ? <img src={loadingIcon} alt="loadingIcon" /> : "Submit"}
      </button>
    );
  };

  const ChangeButton = () => {
    return (
      <button
        className="change_btn"
        type="button"
        onClick={e => {
          e.preventDefault();
          setEditingField(name);
        }}
      >
        Change
      </button>
    );
  };

  const CancelButton = () => {
    return (
      <button className="cancel_btn" type="button" onClick={hadleStopEdit}>
        Cancel
      </button>
    );
  };

  return (
    <label className="data_label">
      {label}
      <input
        className={!children ? "data_input" : "data_input valid"}
        defaultValue={defaultValue}
        type="text"
        autoCapitalize="off"
        autoCorrect="off"
        aria-label={label}
        maxLength="30"
        spellCheck="false"
        {...(editingField === name
          ? register(name, validation[name])
          : { disabled: true })}
        onKeyUp={e => {
          if (e.key === "Escape") {
            hadleStopEdit(e);
          }
        }}
      />

      {children}

      {editingField === name ? (
        <>
          <CancelButton /> <SubmitButton />
        </>
      ) : (
        <ChangeButton />
      )}
      {errors[name] && <span className="message">{errors[name].message}</span>}
    </label>
  );
};
