import { getOneBlog } from '@/app/data/blogs/get-one';
import Image from 'next/image';

import img1 from '@/public/img1.jpg';
import { format } from 'date-fns';
import { ArrowLeft, Book, User } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { RenderDescription } from '@/components/rich-text-editor/RenderDescription';

type Params = Promise<{ id: string }>;

export default async function DetailPageRoute({ params }: { params: Params }) {
  const { id } = await params;
  const blog = await getOneBlog(id);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <Link
          href="/blogs"
          className={buttonVariants({
            variant: 'outline',
            className: '',
          })}
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg h-[500px]">
        <Image src={img1} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
      <div className="">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-muted-foreground">
          {format(blog.createdAt, 'eeee, dd MMMM yyyy')}
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <User className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{blog.Author.name}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <Book className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">
              {blog.Category.title}
            </p>
          </div>
        </div>
        <div className="pt-10">
          <RenderDescription json={JSON.parse(blog.content)} />
        </div>
      </div>
    </div>
  );
}
