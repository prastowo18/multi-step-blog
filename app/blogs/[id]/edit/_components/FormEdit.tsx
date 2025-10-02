'use client';

import { AuthorType } from '@/app/data/authors/get-all';
import { BlogType } from '@/app/data/blogs/get-all';
import { CategoriesType } from '@/app/data/categories/get-all';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema, BlogSchemaType } from '@/lib/zodSchema';
import { tryCatch } from '@/hooks/try-catch';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from '@/components/rich-text-editor/Editor';
import { RenderDescription } from '@/components/rich-text-editor/RenderDescription';
import { EditBlog } from './actions';

type iAppProps = {
  authors: AuthorType[];
  categories: CategoriesType[];
  blog: BlogType;
};

export function FormEdit({ authors, blog, categories }: iAppProps) {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;
  const progress = (step - 1) / (totalSteps - 1);

  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog.title,
      content: blog.content,
      summary: blog.summary,
      authorId: blog.Author.id,
      categoryId: blog.Category.id,
    },
  });

  const next = async () => {
    let valid = false;
    if (step === 1) valid = await form.trigger(['title', 'authorId']);
    if (step === 2) valid = await form.trigger(['summary', 'categoryId']);
    if (step === 3) valid = await form.trigger(['content']);
    if (!valid) return;
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  function onSubmit(values: BlogSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(EditBlog(values, blog.id));

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
    <>
      <div className="flex items-center gap-4">
        <Link
          href="/blogs"
          className={buttonVariants({
            variant: 'outline',
            className: 'mb-5',
          })}
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">
            Step {step} of {totalSteps}
          </div>
          <div className="text-xs text-gray-500">
            {Math.round(progress * 100)}%
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.round(progress * 100)}%`,
              background: 'linear-gradient(90deg,#7c3aed,#06b6d4)',
            }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Basic Information -{' '}
            {step === 1
              ? 'Blog Metadata'
              : step === 2
              ? 'Blog Summary & Category'
              : step === 3
              ? 'Blog Content'
              : 'Review & Submit'}
          </CardTitle>
          <CardDescription>
            Provide basic information about the blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Tile" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="authorId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Author</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Author" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {authors.map((author) => (
                              <SelectItem key={author.id} value={author.id}>
                                {author.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[120px]"
                            placeholder="Summary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 3 && (
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <RichTextEditor field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 4 && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">Title</p>
                    <p className="text-sm">{form.watch('title')}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">Summary</p>
                    <p className="text-sm">{form.watch('summary')}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">Content</p>
                    <div className="border border-border rounded-md p-5">
                      <RenderDescription
                        json={JSON.parse(form.watch('content'))}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">Category</p>
                    <p className="text-sm">
                      {
                        categories.find(
                          (category) => category.id === form.watch('categoryId')
                        )?.title
                      }
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">Author</p>
                    <p className="text-sm">
                      {
                        authors.find(
                          (author) => author.id === form.watch('authorId')
                        )?.name
                      }
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-5">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={prev}
                    disabled={pending}
                    variant="outline"
                  >
                    Back
                  </Button>
                )}

                {step < totalSteps && (
                  <Button type="button" onClick={next}>
                    Next
                  </Button>
                )}

                {step === totalSteps && (
                  <Button
                    type="submit"
                    disabled={pending}
                    variant={'outline'}
                    className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 hover:text-white transition-colors"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
