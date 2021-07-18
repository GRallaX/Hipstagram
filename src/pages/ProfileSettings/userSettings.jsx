import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { searchUsersByLogin } from "../../api/users";
import { updateCurrentUser } from "../../store/currentUser/thunks";

import { EditUserInput } from "./textInput";
import { Avatar } from "../../components/avatar";
import { ChangeAvatar } from "../../containers/dialogues/changeAvatar";
import { toast } from "react-toastify";

export const UserSettings = () => {
  const [editingField, setEditingField] = useState(false);
  const [validationValue, setValidationValue] = useState("");
  const [valid, setValid] = useState(null);
  const [changeAvatar, setChangeAvatar] = useState(false);
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

  const currentUser = useSelector(state => state.currentUser);
  const { login, email, firstName, lastName, avatar } = currentUser;
  const dispatch = useDispatch();

  const handleChangeAvatar = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setChangeAvatar(v => !v);
  };

  const handleEditUser = async data => {
    if (data[editingField] === currentUser[editingField]) {
    } else {
      setLoading(true);
      const updatedUser = await dispatch(
        updateCurrentUser(editingField, data[editingField])
      );
      if (updatedUser.response) {
        setError(editingField, {
          type: "server",
          message: updatedUser.response?.data,
        });
        return setLoading(false);
      }
    }
    unregister(editingField);
    setLoading(false);
    setEditingField(false);
  };

  const serverLoginValidation = useCallback(
    async login => {
      try {
        const { data: foundedUsers } = await searchUsersByLogin(login);
        if (
          foundedUsers.length &&
          foundedUsers.some(user => user.login === login)
        ) {
          if (!errors.login) {
            return false;
          }
        } else {
          return true;
        }
      } catch (e) {
        toast.error(e.response?.data || e.message);
      }
    },
    [errors.login]
  );

  useEffect(() => {
    let cleanupFunction = false;
    if (editingField === "login" && validationValue) {
      const timeout = setTimeout(async () => {
        const validation = await serverLoginValidation(validationValue);
        if (!cleanupFunction) setValid(validation);
      }, 600);

      return () => {
        clearTimeout(timeout);
        cleanupFunction = true;
      };
    }
  }, [validationValue, serverLoginValidation, editingField]);

  const loginValue = watch("login");
  useEffect(() => {
    if (editingField === "login") {
      if (
        !errors.login &&
        loginValue !== login &&
        validationValue !== loginValue
      ) {
        setValidationValue(loginValue);
      }
    }
  }, [
    validationValue,
    setValidationValue,
    editingField,
    loginValue,
    login,
    errors.login,
  ]);

  useEffect(() => {
    if (editingField === "login") {
      if (valid === false) {
        setError("login", {
          type: "notAvailable",
          message: "This login already registered",
        });
      } else if (loginValue !== validationValue) setValid(null);
    } else {
      if (valid) {
        setValid(null);
        setValidationValue("");
      }
    }
  }, [valid, setValid, editingField, loginValue, setError, validationValue]);

  return (
    <div className="settings_wrapper">
      <h2>User settings</h2>
      <div className="settings_container">
        <div className="avatar_container">
          <Avatar avatar={avatar} size="big" onClick={handleChangeAvatar}>
            <button
              type="button"
              className="change_avatar_btn"
              onClick={handleChangeAvatar}
            >
              Change
            </button>
          </Avatar>
          {changeAvatar && (
            <ChangeAvatar avatar={avatar} closeFunc={handleChangeAvatar} />
          )}
        </div>
        <div className="user_data_container">
          <form className="data_form" onSubmit={handleSubmit(handleEditUser)}>
            <EditUserInput
              label="Login"
              name="login"
              defaultValue={login}
              editingField={editingField}
              register={register}
              unregister={unregister}
              setEditingField={setEditingField}
              setValue={setValue}
              setFocus={setFocus}
              errors={errors}
              loading={loading}
            >
              {valid === true ? (
                <span className="validated">&#10003;</span>
              ) : null}
            </EditUserInput>
            <EditUserInput
              label="Email"
              name="email"
              defaultValue={email}
              editingField={editingField}
              register={register}
              unregister={unregister}
              setEditingField={setEditingField}
              setValue={setValue}
              setFocus={setFocus}
              errors={errors}
              loading={loading}
            />
            <EditUserInput
              label="First Name"
              name="firstName"
              defaultValue={firstName}
              editingField={editingField}
              register={register}
              unregister={unregister}
              setEditingField={setEditingField}
              setValue={setValue}
              setFocus={setFocus}
              errors={errors}
              loading={loading}
            />
            <EditUserInput
              label="Last Name"
              name="lastName"
              defaultValue={lastName}
              editingField={editingField}
              register={register}
              unregister={unregister}
              setEditingField={setEditingField}
              setValue={setValue}
              setFocus={setFocus}
              errors={errors}
              loading={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
