import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from '@tanstack/react-query';

import PostPreviewClient from './PostPreview.client';
import { fetchPostById } from '@/lib/api';
interface PostDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function PostPreview({ params }: PostDetailsProps) {
  const { id } = await params;
  const postId = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient />
    </HydrationBoundary>
  );
}
