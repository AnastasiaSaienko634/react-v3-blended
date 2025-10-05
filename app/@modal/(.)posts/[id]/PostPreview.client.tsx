'use client';

import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/user';

export default function PostPreviewClient() {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(Number(id)),
  });

  useEffect(() => {
    if (!data) return;
    const response = async () => {
      const rest = await fetchUserById(data?.userId);
      setUser(rest);
    };
    response();
  }, [data]);

  const router = useRouter();
  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  if (isLoading) return <p>Please wait...loading</p>;
  if (isError) return <p>Whops...Something wrong</p>;
  return (
    <>
      <Modal onClose={toggle}>
        <button onClick={handleClose} className={css.backBtn}>
          ← Back
        </button>
        <div className={css.post}>
          <div className={css.wrapper}>
            <div className={css.header}>
              <h2>{data && data.title}</h2>
            </div>

            <p className={css.content}>{data && data.body}</p>
          </div>
          <p className={css.user}>{user && user.name}</p>
        </div>
      </Modal>
    </>
  );
}
