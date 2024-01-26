import * as yup from "yup";

const NEW_PASSWORD_INPUTS = [
  { name: "newPassword", type: "password" },
  { name: "confirmPassword", type: "password" },
];

const newPasswordValidationSchema = yup.object({
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

export const pageHelpers = {
  NEW_PASSWORD_INPUTS,
  newPasswordValidationSchema,
};
