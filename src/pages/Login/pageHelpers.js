import * as yup from "yup";

const LOGIN_INPUTS = [
  { name: "username", type: "text" },
  { name: "password", type: "password" },
];

const EMAIL_INPUT = [{ name: "email", type: "email" }];

const loginFormValidationSchema = yup.object({
  username: yup
    .string()
    .required()
    .min(2)
    .max(30)
    .matches(
      /^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/,
      "invalid username"
    ),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "password must be at least 8 characters long and include at least one letter and one number"
    ),
});

const emailValidationSchema = yup.object({
  email: yup.string().required().email(),
});

const determineSchema = (status) => {
  switch (status) {
    case "login":
      return loginFormValidationSchema;
    case "resetPassword":
      return emailValidationSchema;
  }
};

const modalContent = {
  title: "Enter your email",
  inputList: EMAIL_INPUT,
  buttonContent: "Get reset password link",
};

export const userAuthUIContent = {
  buttonContent: "Login",
  textContent: "create account",
  mainTextContent: "Login",
  flexDirection: "column",
  flexWrap: false,
};

export const pageHelpers = {
  determineSchema,
  LOGIN_INPUTS,
  EMAIL_INPUT,
  modalContent,
  userAuthUIContent,
};
