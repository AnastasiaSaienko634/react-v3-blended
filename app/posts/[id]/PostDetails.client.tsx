'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

interface Props {
  postId: number;
}

export default function PostDetailsClient({ postId }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);

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
  const handleClickBack = () => {
    setIsOpen(false);
    router.back();
  };

  if (isLoading) return <p>Please wait...loading</p>;
  if (isError) return <p>Whops...Something wrong</p>;
  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button onClick={handleClickBack} className={css.backBtn}>
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
          </div>
        </div>
      </main>
    </>
  );
}
