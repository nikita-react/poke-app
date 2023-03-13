const minLength = 5;
const maxLength = 40;

const validationSchema = {
  email: {
    required: "Email is required.",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
    minLength: {
      value: minLength,
      message: `Email must have at least ${minLength} characters`,
    },
    maxLength: {
      value: maxLength,
      message: `Email must have at most ${maxLength} characters`,
    },
  },
  password: {
    required: "Password is required.",
    minLength: {
      value: minLength,
      message: `Password must have at least ${minLength} characters`,
    },
    maxLength: {
      value: maxLength,
      message: `Password must have at most ${maxLength} characters`,
    },
  },
};

export default validationSchema;
