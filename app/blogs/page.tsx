import Link from 'next/link';
import { Suspense } from 'react';

import { Plus } from 'lucide-react';

import { getAllBlog } from '../data/blogs/get-all';

import { buttonVariants } from '@/components/ui/button';
import { BlogCard, BlogsCardSkeleton } from './_components/BlogCard';

import { NewAuthorModal } from './_components/AuthorModal';
import { NewCategoryModal } from './_components/CategoryModal';

export const dynamic = 'force-dynamic';

export default function BlogsRoute() {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Explore Blogs
          </h1>
          <p className="text-muted-foreground">
            Discover inspiring articles and insights crafted to guide you on
            your journey and spark new ideas.
          </p>
        </div>

        <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:gap-5">
          <Link href={'/blogs/create'} className={buttonVariants({})}>
            <Plus className="size-4" />
            Create Blog
          </Link>
          <NewAuthorModal />
          <NewCategoryModal />
        </div>
      </div>

      <Suspense fallback={<LoadingSkeletonLayout />}>
        <RenderBlogs />
      </Suspense>
    </div>
  );
}

async function RenderBlogs() {
  const blogs = await getAllBlog();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} data={blog} />
      ))}
    </div>
  );
}

function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <BlogsCardSkeleton key={index} />
      ))}
    </div>
  );
}
