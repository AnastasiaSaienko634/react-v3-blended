import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import CreatePostForm from "../CreatePostForm/CreatePostForm";

import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebounce } from "use-debounce";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [isModal, setIsModalOpen] = useState(false);
  const [debounceSearchValue] = useDebounce(searchText, 300);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", debounceSearchValue, page],
    queryFn: () => fetchPosts(debounceSearchValue, page),
  });

  const debouncedOnSearch = (value: string) => {
    setSearchText(value);
  };

  const toggleModal = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);
  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <header className={css.toolbar}>
        <SearchBox value={searchText} onSearch={debouncedOnSearch} />
        {data && (
          <Pagination
            totalPages={data ? data.length / 10 : 0}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={toggleModal}>
          Create post
        </button>
      </header>
      {isModal && (
        <Modal onClose={onClose}>
          <CreatePostForm onClose={onClose} />
        </Modal>
      )}

      {isLoading && <p>Please waiting...</p>}
      {isError && <p>Here some Problems...reset your Web-Site</p>}
      {data && <PostList posts={data} />}
    </div>
  );
}
