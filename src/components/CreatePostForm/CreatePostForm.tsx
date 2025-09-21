import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import toast from "react-hot-toast";

interface initialValueType {
  title: string;
  body: string;
}

interface PostFormProps {
  onClose: () => void;
}

export default function PostForm({ onClose }: PostFormProps) {
  const PostFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "title must be at least 3 characters")
      .max(50, "title is too long")
      .required("title is required"),
    body: Yup.string().required("body is required").max(500, "body is too long"),
  });
  const queryClient = useQueryClient();
  const initialValues: initialValueType = {
    title: "",
    body: "",
  };

  const mutation = useMutation({
    mutationFn: (newTask: initialValueType) => createPost(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
      toast.success("Post was created!");
    },
  });

  const handleSubmit = (values: initialValueType) => {
    if (values) {
      mutation.mutate({
        title: values.title,
        body: values.body,
      });
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostFormSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
