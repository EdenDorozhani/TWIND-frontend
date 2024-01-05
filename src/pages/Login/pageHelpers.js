import * as yup from "yup";

export const LOGIN_INPUTS = [
  { name: "username", type: "text" },
  { name: "password", type: "password" },
];

export const loginFormValidationSchema = yup.object({
  username: yup
    .string()
    .required()
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
