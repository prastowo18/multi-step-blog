import { Suspense } from 'react';

import { getOneBlog } from '@/app/data/blogs/get-one';
import { getAllAuthor } from '@/app/data/authors/get-all';
import { getAllCategories } from '@/app/data/categories/get-all';

import { FormEdit } from './_components/FormEdit';
import { Skeleton } from '@/components/ui/skeleton';

type Params = Promise<{ id: string }>;

export default async function DetailPageRoute({ params }: { params: Params }) {
  return (
    <div className="">
      <div className="">
        <Suspense fallback={<SkeletonRenderForm />}>
          <RenderForm params={params} />
        </Suspense>
      </div>
    </div>
  );
}

async function RenderForm({ params }: { params: Params }) {
  const { id } = await params;

  const [authors, categories, blog] = await Promise.all([
    getAllAuthor(),
    getAllCategories(),
    getOneBlog(id),
  ]);

  return <FormEdit authors={authors} categories={categories} blog={blog} />;
}

export function SkeletonRenderForm() {
  return (
    <div className="">
      <Skeleton className="w-21 h-9 mb-5" />
      <div className="mb-6">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-full h-3 mt-2" />
      </div>
      <div className="bg-card w-full h-[340px] rounded-lg border border-border px-6 py-5">
        <Skeleton className="w-56 h-6" />
        <Skeleton className="w-48 h-4 mt-3" />

        <div className="flex flex-col mt-10 gap-5">
          <div className="flex flex-col gap-2 ">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-full h-5" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-full h-5" />
          </div>
        </div>

        <Skeleton className="w-21 h-9 mt-14" />
      </div>
    </div>
  );
}
