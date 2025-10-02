'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';

export async function deleteBlog(id: string): Promise<ApiResponse> {
  try {
    await prisma.blog.delete({
      where: {
        id: id,
      },
    });

    revalidatePath('/blogs');

    return {
      status: 'success',
      message: 'Blog deleted successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to delete Blog!',
    };
  }
}
