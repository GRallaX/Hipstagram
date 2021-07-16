import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { PasswordInput } from "./passInput";
import loadingIcon from "../../images/loading_small.svg";
import { changeUserPassword, logOutUser } from "../../store/currentUser/thunks";
import { deleteUser } from "../../api/users";

export const SecuritySettings = () => {
  const [editPass, setEditPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successChange, setSuccessChange] = useState(false);

  const {
    watch,
    register,
    unregister,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { login, id: currentUserId } = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  const handleStopEdit = () => {
    setShowPass(false);
    setEditPass(false);
    setValue("currentPassword", "");
    setValue("newPassword", "");
    setValue("newPassword1", "");
    unregister(["currentPassword", "newPassword", "newPassword1"]);
  };

  const handleOpenPasswordForm = () => {
    if (!editPass) {
      setEditPass(true);
      setTimeout(() => setFocus("currentPassword"), 500);
    } else {
      handleStopEdit();
    }
  };

  const handleChangePassword = async ({
    currentPassword,
    newPassword,
    newPassword1,
  }) => {
    if (currentPassword === newPassword1) {
      return setError("form", {
        type: "checkEqual",
        message: "New password is the same",
      });
    } else {
      setLoading(true);
      const passChange = await dispatch(
        changeUserPassword(login, currentPassword, newPassword, newPassword1)
      );
      if (passChange.response) {
        setLoading(false);
        return setError("form", {
          type: "server",
          message: passChange.response?.data,
        });
      } else if (passChange === true) {
        setLoading(false);
        handleStopEdit();
        setSuccessChange(true);
      }
    }
  };

  const oldPassword = watch("currentPassword");
  const password = watch("newPassword");
  const checkPassword = watch("newPassword1");
  useEffect(() => {
    if (password === checkPassword) {
      if (errors.newPassword?.type === "checkEqual") clearErrors("newPassword");
      if (errors.newPassword1?.type === "checkEqual")
        clearErrors("newPassword1");
    }
    if (password !== checkPassword) {
      if (password && checkPassword) {
        if (!errors.newPassword) {
          setError("newPassword", {
            type: "checkEqual",
            message: "Passwords should be equal",
          });
        }
        if (!errors.newPassword1) {
          setError("newPassword1", {
            type: "checkEqual",
            message: "Passwords should be equal",
          });
        }
      }
    }
  }, [
    clearErrors,
    password,
    checkPassword,
    setError,
    errors.newPassword,
    errors.newPassword1,
  ]);

  useEffect(() => {
    clearErrors("form");
  }, [oldPassword, password, checkPassword, clearErrors]);

  useEffect(() => {
    let cleanupFunction = false;
    if (successChange) {
      setTimeout(() => {
        if (!cleanupFunction) setSuccessChange(false);
      }, 2000);
    }
  }, [successChange]);

  const [openDeleteUser, setOpenDeleteUser] = useState(false);

  const handleOpenDelete = e => {
    e.preventDefault();
    setOpenDeleteUser(v => !v);
  };

  const handleDeleteUser = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteUser(currentUserId);
      await dispatch(logOutUser());
      setLoading(false);
    } catch (e) {
      console.log(e.response?.data);
      setLoading(false);
    }
  };

  return (
    <div className="security_wrapper">
      <h2>Security settings</h2>
      <div className="password_container">
        <div className="edit_pass">
          <span>Password settings</span>
          <button
            className="change_btn"
            type="button"
            onClick={handleOpenPasswordForm}
          >
            {editPass ? "Cancel" : "Change"}
          </button>
          <span className={successChange ? "success" : "success hidden"}>
            Password has been changed
            <span className="validated"> &#10003;</span>
          </span>
        </div>

        <form
          className={editPass ? "password_form" : "password_form hidden"}
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <PasswordInput
            label="Current password"
            name="currentPassword"
            errors={errors}
            editPass={editPass}
            register={register}
            showPass={showPass}
          />
          <PasswordInput
            label="New password"
            name="newPassword"
            errors={errors}
            editPass={editPass}
            register={register}
            showPass={showPass}
          />
          <PasswordInput
            label="Confirm password"
            name="newPassword1"
            errors={errors}
            editPass={editPass}
            register={register}
            showPass={showPass}
          />
          <div className="btns">
            <button
              className="show_btn"
              type="button"
              onClick={() => setShowPass(v => !v)}
              disabled={!editPass ? true : undefined}
            >
              {!showPass ? "Show" : "Hide"}
            </button>
            <button
              className="submit_btn"
              type="submit"
              disabled={
                !editPass || Object.keys(errors).length ? true : undefined
              }
            >
              {loading ? <img src={loadingIcon} alt="loadingIcon" /> : "Submit"}
            </button>
          </div>
          {errors.form && (
            <span className="message">{errors.form.message}</span>
          )}
        </form>
      </div>
      <div className="delete_user">
        <span>Delete account</span>
        <button className="change_btn" type="button" onClick={handleOpenDelete}>
          {openDeleteUser ? "Cancel" : "Delete"}
        </button>
      </div>
      <div
        className={
          openDeleteUser ? "delete_user_btns" : "delete_user_btns hidden"
        }
      >
        <div className="btns_container">
          <span>Are you sure?</span>
          <button
            className="change_btn"
            type="button"
            onClick={handleOpenDelete}
            disabled={!openDeleteUser ? true : undefined}
          >
            Cancel
          </button>
          <button
            className="submit_btn"
            type="button"
            onClick={handleDeleteUser}
            disabled={!openDeleteUser ? true : undefined}
          >
            {loading ? <img src={loadingIcon} alt="loadingIcon" /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
