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
    case "configureEmail":
      return emailValidationSchema;
  }
};

const determineDataToPost = (status, inputValue, credentialsInputsValue) => {
  let obj;
  if (status === "login") {
    obj = {
      ...obj,
      values: inputValue,
      navigateTo: "/twind",
      toastErr: true,
    };
  } else {
    obj = { ...obj, headers: "json", values: credentialsInputsValue };
  }
  return obj;
};

export const pageHelpers = {
  LOGIN_INPUTS,
  EMAIL_INPUT,
  determineSchema,
  determineDataToPost,
};
