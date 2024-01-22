import * as yup from "yup";

const EDIT_PROFILE_INPUTS = [
  { name: "name", type: "text" },
  { name: "lastname", type: "text" },
  { name: "username", type: "text" },
  { name: "about", type: "textArea" },
  { name: "country", type: "asyncPicklist" },
  { name: "userImgURL", type: "photo" },
];

const CHANGE_PASSWORD_INPUTS = [
  { name: "currentPassword", type: "password" },
  { name: "newPassword", type: "password" },
  { name: "confirmPassword", type: "password" },
];

const CHANGE_EMAIL_INPUTS = [
  { name: "currentEmail", type: "email" },
  { name: "newEmail", type: "email" },
];

const editProfileValidationSchema = yup.object({
  name: yup.string().required().min(2).max(20),
  lastname: yup.string().required().min(3).max(20),
  username: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/,
      "invalid username"
    ),
  country: yup.string().required(),
  about: yup.string().max(250).nullable(),
});

const emailValidationSchema = yup.object({
  currentEmail: yup.string().required().email(),
  newEmail: yup.string().required(),
});

const passwordValidationSchema = yup.object({
  currentPassword: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "password must be at least 8 characters long and include at least one letter and one number"
    ),
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

const updateModalContent = (modalStatus) => {
  let obj;
  switch (modalStatus) {
    case "changePassword":
      return (obj = {
        title: "Change Password",
        inputList: CHANGE_PASSWORD_INPUTS,
        description:
          "Password must be at least 8 characters long and include at least one letter and one number.",
      });
    case "changeEmail":
      return (obj = {
        title: "Change Email",
        inputList: CHANGE_EMAIL_INPUTS,
        description: "Email must be of this format: example@gmail.com",
      });
  }
  return obj;
};

const determineSchema = (modalStatus) => {
  switch (modalStatus) {
    case "changePassword":
      return passwordValidationSchema;
    case "changeEmail":
      return emailValidationSchema;
    case "editProfile":
      return editProfileValidationSchema;
  }
};

const determineDataToPost = (
  modalStatus,
  inputValue,
  credentialsInputsValue
) => {
  let obj;
  if (modalStatus === "editProfile") {
    obj = { ...obj, headers: "multipart", values: inputValue };
  } else {
    obj = { ...obj, headers: "json", values: credentialsInputsValue };
  }
  return obj;
};

export const pageHelpers = {
  EDIT_PROFILE_INPUTS,
  CHANGE_PASSWORD_INPUTS,
  CHANGE_EMAIL_INPUTS,
  editProfileValidationSchema,
  updateModalContent,
  determineSchema,
  determineDataToPost,
};
