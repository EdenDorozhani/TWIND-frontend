import * as yup from "yup";

export const SIGNUP_INPUTS = [
  { name: "name", type: "text" },
  { name: "lastname", type: "text" },
  { name: "username", type: "text" },
  { name: "email", type: "email" },
  { name: "password", type: "password" },
  { name: "confirmPassword", type: "password" },
  { name: "about", type: "textArea" },
  { name: "country", type: "asyncPicklist" },
];

export const userDataFormValidationSchema = yup.object({
  name: yup.string().required().min(2).max(20),
  lastname: yup.string().required().min(3).max(20),
  username: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/,
      "invalid username"
    ),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "password must be at least 8 characters long and include at least one letter and one number"
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "passwords do not match, please make sure your passwords match"
    ),
  country: yup.string().required(),
  about: yup.string().max(250),
});
