import { Suspense } from 'react';

import { FormCreate } from './_components/FormCreate';

import { getAllAuthor } from '@/app/data/authors/get-all';
import { getAllCategories } from '@/app/data/categories/get-all';
import { SkeletonRenderForm } from '../[id]/edit/page';

export default function CreateBlogRoute() {
  return (
    <div className="">
      <Suspense fallback={<SkeletonRenderForm />}>
        <RenderForm />
      </Suspense>
    </div>
  );
}

async function RenderForm() {
  const [author, category] = await Promise.all([
    getAllAuthor(),
    getAllCategories(),
  ]);

  return <FormCreate author={author} category={category} />;
}
