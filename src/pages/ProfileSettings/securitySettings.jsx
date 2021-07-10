import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { PasswordInput } from "./passInput";
import loadingIcon from "../../images/loading_small.svg";

export const SecuritySettings = () => {
  const [editPass, setEditPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    watch,
    register,
    unregister,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { login } = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  const handleStopEdit = () => {
    setEditPass(false);
    setValue("currentPassword", "");
    setValue("newPassword", "");
    setValue("newPassword1", "");
    unregister(["currentPassword", "newPassword", "newPassword1"]);
  };

  return (
    <div className="security_wrapper">
      <h2>Security Settings</h2>
      <div className="password_container">
        <div className="edit_pass">
          <span>Password settings</span>
          <button
            className="change_btn"
            type="button"
            onClick={() => {
              if (!editPass) {
                setEditPass(true);
                setTimeout(() => setFocus("currentPassword"), 500);
              } else {
                handleStopEdit();
              }
            }}
          >
            {editPass ? "Cancel" : "Change"}
          </button>
        </div>
        <form
          className={editPass ? "password_form" : "password_form hidden"}
          onSubmit={handleSubmit(d => console.log(d))}
        >
          <PasswordInput
            label="Current password"
            name="currentPassword"
            errors={errors}
            editPass={editPass}
            register={register}
          />
          <PasswordInput
            label="New password"
            name="newPassword"
            errors={errors}
            editPass={editPass}
            register={register}
          />
          <PasswordInput
            label="Confirm password"
            name="newPassword1"
            errors={errors}
            editPass={editPass}
            register={register}
          />
          <button className="submit_btn" type="submit">
            {loading ? <img src={loadingIcon} alt="loadingIcon" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
