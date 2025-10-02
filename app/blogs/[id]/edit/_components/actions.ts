'use server';

import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import { blogSchema, BlogSchemaType } from '@/lib/zodSchema';

export async function EditBlog(
  data: BlogSchemaType,
  id: string
): Promise<ApiResponse> {
  try {
    const result = blogSchema.safeParse(data);

    if (!result.success) {
      return {
        status: 'error',
        message: 'Invalid data',
      };
    }

    await prisma.blog.update({
      where: {
        id,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: 'success',
      message: 'Blog updated successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to update Blog',
    };
  }
}
