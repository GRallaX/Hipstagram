const validation = {
  login: {
    required: { value: true, message: "Login is required" },
    maxLength: {
      value: 30,
      message: "Login should contain 2–30 characters",
    },
    minLength: {
      value: 2,
      message: "Login should contain 2–30 characters",
    },
    pattern: {
      value: /^[A-Z0-9]+$/gi,
      message: "Login should contain only numbers and letters",
    },
  },

  email: {
    required: { value: true, message: "Email is required" },
    pattern: {
      value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g,
      message: "Email should be type of 'test@gmail.com'",
    },
  },

  firstName: {
    maxLength: {
      value: 30,
      message: "First name should contain 2–30 characters",
    },
    minLength: {
      value: 2,
      message: "First name should contain 2–30 characters",
    },
    pattern: {
      value: /^[A-Z]+$/gi,
      message: "First name should contain only letters",
    },
  },

  lastName: {
    maxLength: {
      value: 30,
      message: "Last name should contain 2–30 characters",
    },
    minLength: {
      value: 2,
      message: "Last name should contain 2–30 characters",
    },
    pattern: {
      value: /^[A-Z]+$/gi,
      message: "Last name should contain only letters",
    },
  },
};

export default validation;
