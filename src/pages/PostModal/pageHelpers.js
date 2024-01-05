import * as yup from "yup";

export const addCommentValidationSchema = yup.object({
  comment: yup.string().max(200),
});
