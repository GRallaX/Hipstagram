import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../store/currentUser/thunks";
import validation from "./validation";

export const UpdateUserForm = () => {
  const [editingField, setEditingField] = useState(false);
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const currentUser = useSelector(state => state.currentUser);
  const {
    // id: currentUserId,
    // email,
    firstName,
    // lastName,
    // login,
    // avatar,
  } = currentUser;
  const dispatch = useDispatch();

  const SubmitButton = () => {
    return (
      <button className="submit_btn" type="submit">
        Submit
      </button>
    );
  };

  useEffect(() => {
    if (editingField) setFocus(editingField);
  }, [editingField, setFocus]);

  const ChangeButton = ({ name }) => {
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

  const CancelButton = ({ name }) => {
    return (
      <button
        className="cancel_btn"
        type="button"
        onClick={e => {
          e.preventDefault();
          setEditingField(false);
          setValue(name, currentUser[name]);
          unregister(name);
        }}
      >
        Cancel
      </button>
    );
  };

  return (
    <form
      className="data"
      onSubmit={handleSubmit(async data => {
        const key = Object.keys(data)[0];
        if (data[key] === currentUser[key]) {
          console.log("no changes");
        } else {
          const updatedUser = await dispatch(updateCurrentUser(key, data[key]));
          console.log(`data sent: type – "${key}", value – "${data[key]}"`);
          if (updatedUser.response) {
            setError(key, {
              type: "server",
              message: updatedUser.response?.data,
            });
            return;
          }
        }
        unregister(editingField);
        setEditingField(false);
      })}
    >
      <label>
        First name
        <input
          defaultValue={firstName}
          type="text"
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Name"
          maxLength="30"
          {...(editingField === "firstName"
            ? register("firstName", validation.firstName)
            : { disabled: true })}
        />
        {errors.firstName && (
          <span className="message">{errors.firstName.message}</span>
        )}
        {editingField === "firstName" ? (
          <>
            <CancelButton name="firstName" /> <SubmitButton />
          </>
        ) : (
          <ChangeButton name="firstName" />
        )}
      </label>
    </form>
  );
};
