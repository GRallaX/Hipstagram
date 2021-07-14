import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { ModalWindow } from "../../components/modalWindow";
import loadingIcon from "../../images/loading_small.svg";
import "./dialogues.css";
import { createNewPost } from "../../store/currentUser/thunks";

const convertImage = file => {
  return new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.onload = () => res(fileReader.result);
    fileReader.onerror = e => rej(e);
    fileReader.readAsDataURL(file);
  });
};

export const CreateNewPost = ({ closeFunc }) => {
  const [sending, setSending] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const {
    watch,
    register,
    unregister,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const handleResetImage = e => {
    e.preventDefault();
    setImagePreview("");
    setValue("image", "");
  };

  const validation = {
    image: {
      required: { value: true, message: "Image is required" },
      validate: {
        sizeValid: ([file]) =>
          file.size <= 2 * 1024 ** 2 || "Image max size 2mb",
        setImagePreview: async ([file]) => {
          console.log("file size: " + file.size / 1024 ** 2);
          setLoadingFile(true);
          const convertedImage = await convertImage(file);
          await setImagePreview(convertedImage);
          setLoadingFile(false);
          setFocus("title");
        },
      },
    },
  };

  const handleSubmitPost = async ({ image, title }) => {
    setSending(true);
    const dispatchedPost = await dispatch(createNewPost(image, title));

    if (dispatchedPost.response) {
      setError("form", {
        type: "server",
        message: dispatchedPost.response?.data,
      });
      setSending(false);
      return;
    }

    setSending(false);
  };

  return (
    <ModalWindow closeModalFunc={closeFunc}>
      <div className="small_modal_wrapper">
        <h2>Creating new post</h2>
        <form
          className="post_creating_form"
          onSubmit={handleSubmit(handleSubmitPost)}
        >
          <div className="editing_container">
            <h3>Preview</h3>
            <div className="prevew_image">
              <img
                src={
                  imagePreview
                    ? imagePreview
                    : "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
                }
                alt="prevew"
                height="auto"
                width="600px"
              />
            </div>
            <button
              className="delete"
              type="button"
              onClick={handleResetImage}
              disabled={imagePreview ? undefined : true}
            >
              delete
            </button>
            <label className="image_lbl"></label>
            <input
              type="file"
              id="image_input"
              accept=".png, .jpg, .jpeg"
              {...register("image", validation.image)}
            />

            <label>
              <textarea
                className="new_text post_title"
                placeholder="Enter post title here..."
                aria-label="Enter text"
                maxLength="100"
                {...register("title", validation.title)}
              />
            </label>
          </div>
          <div className="btns">
            <button type="button" className="cancel" onClick={closeFunc}>
              Cancel
            </button>
            <button
              className="submit"
              type="submit"
              disabled={!isValid ? true : undefined}
            >
              {sending ? <img src={loadingIcon} alt="loading" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
};
