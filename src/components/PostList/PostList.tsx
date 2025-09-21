import { deletePost } from "../../services/postService";
import type { Post } from "../../types/post";
import css from "./PostList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const handleClick = (postId: number) => {
    mutation.mutate(postId);
  };
  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button className={css.edit}>Edit</button>
            <button className={css.delete} onClick={() => handleClick(post.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
