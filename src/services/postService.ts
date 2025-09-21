import axios from "axios";
import type { Post } from "../types/post";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
const apiKey = import.meta.env.VITE_API_KEY;
interface FetchPostsResponse {
  posts: Post[];
  totalPages: number;
}

interface deletePostReponse {
  postId: number;
}

interface newPostProps {
  title: string;
  body: string;
}

export const fetchPosts = async (searchText: string, page: number): Promise<FetchPostsResponse> => {
  const reponse = await axios.get<FetchPostsResponse>("/posts", {
    params: {
      searchText: searchText,
      page: page,
    },
    headers: {
      Authorization: apiKey,
    },
  });
  return reponse.data;
};

export const createPost = async (newPost: newPostProps) => {
  const response = await axios.post("/posts", {
    params: {
      newPost: newPost,
    },
    headers: {
      Authorization: apiKey,
    },
  });
  return response.data.posts;
};

// export const editPost = async (newDataPost) => {};

export const deletePost = async (postId: number) => {
  const response = await axios.delete<deletePostReponse>(`/posts/${postId}`, {
    headers: {
      Authorization: apiKey,
    },
  });
  console.log(response.data);
  return response.data;
};
