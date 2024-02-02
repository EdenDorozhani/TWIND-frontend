import * as yup from "yup";

export const MANAGE_POST_INPUTS = [
  { name: "postImage", type: "file" },
  { name: "caption", type: "textArea" },
  { name: "location", type: "location" },
];

export const managePostValidationSchema = yup.object({
  postImage: yup.mixed().test("file", "There is no file added", (value) => {
    if (value.length === 0) return false;
    return true;
  }),
  caption: yup.string().max(200).nullable(),
});
