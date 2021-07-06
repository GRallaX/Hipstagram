import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../store/currentUser/thunks";

import { EditUserInput } from "./editUserInput";

export const UpdateUserForm = () => {
  const [editingField, setEditingField] = useState(false);
  const [loading, setLoading] = useState(false);
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
    login,
    email,
    firstName,
    lastName,
    // avatar,
  } = currentUser;
  const dispatch = useDispatch();

  const handleEditUser = async data => {
    console.log(data);
    if (data[editingField] === currentUser[editingField]) {
      console.log("no changes");
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
      console.log(
        `data sent: type – "${editingField}", value – "${data[editingField]}"`
      );
    }
    unregister(editingField);
    setLoading(false);
    setEditingField(false);
  };

  console.table(errors);

  return (
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
      />
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
  );
};
