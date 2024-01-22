import * as yup from "yup";

const LOGIN_INPUTS = [
  { name: "username", type: "text" },
  { name: "password", type: "password" },
];

const NEW_PASSWORD_INPUTS = [
  { name: "email", type: "email" },
  { name: "newPassword", type: "password" },
  { name: "confirmPassword", type: "password" },
];

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

const newPasswordValidationSchema = yup.object({
  email: yup.string().required().email(),
  newPassword: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "password must be at least 8 characters long and include at least one letter and one number"
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "passwords do not match, please make sure your passwords match"
    ),
});

const updateModalContent = (status) => {
  let obj;
  switch (status) {
    case "forgotPassword":
      return (obj = {
        title: "New Password",
        inputList: NEW_PASSWORD_INPUTS,
        description:
          "Password must be at least 8 characters long and include at least one letter and one number.",
      });
  }
  return obj;
};

const determineSchema = (status) => {
  switch (status) {
    case "login":
      return loginFormValidationSchema;
    case "forgotPassword":
      return newPasswordValidationSchema;
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
  updateModalContent,
  determineSchema,
  determineDataToPost,
};
