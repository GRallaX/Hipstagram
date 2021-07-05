const validation = {
  firstName: {
    // required: { value: true, message: "First name is required" },
    maxLength: {
      value: 100,
      message: "First name should contain 2–8 characters",
    },
    minLength: {
      value: 2,
      message: "First name should contain 2–8 characters",
    },
    // pattern: {
    //   value: /^[A-Z]+$/gi,
    //   message: "First name should contain only numers and letters",
    // },
  },
};

export default validation;
