import { fetchPosts } from '@/lib/api';
import PostsClient from './Posts.client';

interface PostsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { slug } = await params;
  const postId: string = slug[0];
  const response = await fetchPosts({
    searchText: '',
    page: 1,
    userId: postId,
  });
  return (
    <>
      <PostsClient initialData={response} userId={postId ?? ''} />
    </>
  );
}
