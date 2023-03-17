type ValidationSchema = {
  email: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
    minLength: {
      value: number;
      message: string;
    };
    maxLength: {
      value: number;
      message: string;
    };
  };
  password: {
    required: string;
    minLength: {
      value: number;
      message: string;
    };
    maxLength: {
      value: number;
      message: string;
    };
  };
  confirmPassword: {
    required: string;
    minLength: {
      value: number;
      message: string;
    };
    maxLength: {
      value: number;
      message: string;
    };
    validate: (value: string, values: { password: string }) => string | true;
  };
};

const minLength = 5;
const maxLength = 40;

const validationSchema: ValidationSchema = {
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
  confirmPassword: {
    required: "Password is required.",
    minLength: {
      value: minLength,
      message: `Password must have at least ${minLength} characters`,
    },
    maxLength: {
      value: maxLength,
      message: `Password must have at most ${maxLength} characters`,
    },
    validate: (value, { password }) =>
      value === password ? true : "The passwords do not match",
  },
};

export default validationSchema;
