import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createNewPost } from "../../store/currentUser/thunks";

import { ModalWindow } from "../../components/modalWindow";
import { ReactComponent as PlusIcon } from "../../images/plus_icon_big.svg";
import loadingIcon from "../../images/loading_small.svg";
import "./dialogues.css";
import { useHistory } from "react-router-dom";

const convertImage = file => {
  return new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.onload = () => res(fileReader.result);
    fileReader.onerror = e => rej(e);
    fileReader.readAsDataURL(file);
  });
};

export const EditPost = ({ closeFunc }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formRef = useRef();
  const fileLblRef = useRef();

  const [sending, setSending] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const { login } = useSelector(state => state.currentUser);
  const {
    watch,
    register,
    clearErrors,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const imageValue = watch("image");
  const titleValue = watch("title");

  const validation = {
    image: {
      required: { value: true, message: "Post image is required" },
      validate: {
        sizeValid: ([file]) =>
          file.size <= 10 * 1024 ** 2 || "Image max size 10mb",
        setImagePreview: async ([file]) => {
          setLoadingFile(true);
          const convertedImage = await convertImage(file);
          await setImagePreview(convertedImage);
          setLoadingFile(false);
          setFocus("title");
        },
      },
    },
    title: {
      required: { value: true, message: "Post title is required" },
    },
  };

  const { ref, onChange, onBlur } = register("title", validation.title);

  const handleOnChabgeTitle = e => {
    onChange(e);
    if (e.target.value) {
      e.target.style.height = "22px";
      e.target.style.height = e.target.scrollHeight + "px";
    } else {
      e.target.removeAttribute("style");
    }
  };

  const handleClickOnEnter = e => {
    e.preventDefault();
    if (e.key === "Enter") e.target.click();
  };

  const handleOnEnterTitle = e => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const handleSubmitPost = async ({ image, title }) => {
    try {
      setSending(true);
      const [file] = image;
      const dispatchedPost = await dispatch(createNewPost(file, title));
      setSending(false);
      history.push("/feed", { newPost: dispatchedPost });
      closeFunc();
    } catch (e) {
      setError("form", {
        type: "server",
        message: e.response?.data || `server error ${e.response?.status}`,
      });
      setSending(false);
    }
  };

  const handleEditImage = () => {
    fileLblRef.current.click();
  };

  const handleResetImage = e => {
    e.preventDefault();
    setImagePreview("");
    setValue("image", "");
  };

  useEffect(() => {
    if (errors.image) {
      setImagePreview("");
    }
  }, [errors.image]);

  useEffect(() => {
    clearErrors("form");
  }, [imageValue, titleValue, clearErrors]);

  return (
    <ModalWindow closeModalFunc={closeFunc}>
      <div className="small_modal_wrapper">
        <h2>Creating new post</h2>
        <form
          className="post_edit_form"
          onSubmit={handleSubmit(handleSubmitPost)}
          ref={formRef}
        >
          <div className="editing_container">
            <h3>Preview</h3>
            <div
              className={
                imagePreview
                  ? "preview_image_container"
                  : "preview_image_container no_preview"
              }
            >
              <img src={imagePreview} alt="preview" className="preview_image" />
              <div className="image_lbl_container">
                {!loadingFile ? (
                  <label
                    ref={fileLblRef}
                    htmlFor="image_input"
                    className={!imagePreview ? "image_lbl" : "image_lbl hidden"}
                    aria-label="Upload image"
                    tabIndex="0"
                    onKeyUp={handleClickOnEnter}
                  >
                    <PlusIcon />
                  </label>
                ) : (
                  <img src={loadingIcon} alt="loading" className="loading" />
                )}
                <button
                  className="edit"
                  type="button"
                  onClick={handleEditImage}
                  disabled={imagePreview || loadingFile ? undefined : true}
                >
                  edit
                </button>
                <button
                  className="delete"
                  type="button"
                  onClick={handleResetImage}
                  disabled={imagePreview ? undefined : true}
                >
                  delete
                </button>
              </div>
              <span className="message">{errors.image?.message}</span>
            </div>
            <input
              type="file"
              id="image_input"
              accept=".png, .jpg, .jpeg"
              {...register("image", validation.image)}
            />
            <label className="text_lbl">
              <span className="user_login">{login}</span>
              <textarea
                className="post_title"
                placeholder="Enter post title..."
                aria-label="Enter text"
                maxLength="100"
                name="title"
                ref={ref}
                onChange={handleOnChabgeTitle}
                onBlur={onBlur}
                onKeyDown={handleOnEnterTitle}
              />
            </label>
          </div>
          <span className="message">
            {errors.title?.message || errors.form?.message}
          </span>
          <div className="btns">
            <button type="button" className="cancel" onClick={closeFunc}>
              Cancel
            </button>
            <button
              className="submit"
              type="submit"
              disabled={Object.keys(errors).length ? true : undefined}
            >
              {sending ? <img src={loadingIcon} alt="loading" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
};
