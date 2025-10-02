import z from 'zod';

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(100, {
      message: 'Title must be at most 100 characters long',
    }),
  summary: z
    .string()
    .min(3, {
      message: 'Summary must be at least 3 characters long',
    })
    .max(100, {
      message: 'Summary must be at most 100 characters long',
    }),
  content: z.string().min(3, {
    message: 'Content must be at least 3 characters long',
  }),
  authorId: z.string().uuid({ message: 'Invalid author ID' }),
  categoryId: z.string().uuid({ message: 'Invalid category ID' }),
});

export type BlogSchemaType = z.infer<typeof blogSchema>;
