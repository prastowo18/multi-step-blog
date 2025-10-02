import Link from 'next/link';
import Image from 'next/image';

import { format } from 'date-fns';

import { Book, Eye, MoreVertical, Pencil, Trash2, User } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { BlogType } from '@/app/data/blogs/get-all';

import img1 from '@/public/img1.jpg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface iAppProps {
  data: BlogType;
}

export function BlogCard({ data }: iAppProps) {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/blogs/${data.id}/edit`}>
                <Pencil className="size-4 mr-2" />
                Edit Blog
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/blogs/${data.id}`}>
                <Eye className="size-4 mr-2" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/blogs/${data.id}/delete`}>
                <Trash2 className="size-4 mr-2 text-destructive" />
                Delete Blog
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Image
        src={img1}
        alt="Thumbnail Image"
        width={600}
        height={400}
        className="w-full rounded-t-xl aspect-video h-full object-cover"
      />

      <CardContent className="p-4">
        <Link
          href={`/blogs/${data.id}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors w-fit"
        >
          {data.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.summary}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {format(data.createdAt, 'eeee, dd MMMM yyyy')}
        </p>
        <div className="mt-7 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <User className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{data.Author.name}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <Book className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">
              {data.Category.title}
            </p>
          </div>
        </div>

        <Link
          href={`/blogs/${data.id}`}
          className={buttonVariants({
            className: 'w-full mt-4',
          })}
        >
          See More
        </Link>
      </CardContent>
    </Card>
  );
}

export function BlogsCardSkeleton() {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center">
        <Skeleton className="h-6 w-20 rounded-l-full" />
      </div>
      <div className="w-full relative h-fit">
        <Skeleton className="w-full rounded-t-xl aspect-video" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        <Skeleton className="mt-4 w-full h-10 rounded-md" />
      </CardContent>
    </Card>
  );
}
