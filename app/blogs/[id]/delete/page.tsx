'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Loader2, Trash2 } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { tryCatch } from '@/hooks/try-catch';

import { deleteBlog } from './actions';

export default function DeleteBlogRoute() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [pending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteBlog(id));

      if (error) {
        toast.error('An unexpected error occurred. Please try again.');
        return;
      }

      if (result.status === 'success') {
        toast.success(result.message);
        router.push('/blogs');
      } else if (result.status === 'error') {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="max-w-xl mx-auto w-full">
      <Card className="mt-32">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this blog?</CardTitle>
          <CardDescription>
            This action action can not be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Link
            className={buttonVariants({
              variant: 'outline',
            })}
            href="/blogs"
          >
            Cancel
          </Link>
          <Button disabled={pending} variant="destructive" onClick={onSubmit}>
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
