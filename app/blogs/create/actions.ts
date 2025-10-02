'use server';

import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { blogSchema, BlogSchemaType } from '@/lib/zodSchema';
import { revalidatePath } from 'next/cache';

export async function CreateBlog(values: BlogSchemaType): Promise<ApiResponse> {
  try {
    const validation = blogSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid Form Data',
      };
    }

    await prisma.blog.create({
      data: {
        ...validation.data,
      },
    });

    revalidatePath('/blogs');

    return {
      status: 'success',
      message: 'Blog created successfully.',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to create Blog.',
    };
  }
}
