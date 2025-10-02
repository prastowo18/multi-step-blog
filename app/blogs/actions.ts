'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import {
  authorSchema,
  AuthorSchemaType,
  categorySchema,
  CategorySchemaType,
} from '@/lib/zodSchema';

export async function createAuthor(
  values: AuthorSchemaType
): Promise<ApiResponse> {
  try {
    const result = authorSchema.safeParse(values);

    if (!result.success) {
      return {
        status: 'error',
        message: 'Invalid Data',
      };
    }

    await prisma.author.create({
      data: {
        ...result.data,
      },
    });

    revalidatePath('/blogs');

    return {
      status: 'success',
      message: 'Author created successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to create author',
    };
  }
}

export async function createCategory(
  values: CategorySchemaType
): Promise<ApiResponse> {
  try {
    const result = categorySchema.safeParse(values);

    if (!result.success) {
      return {
        status: 'error',
        message: 'Invalid Data',
      };
    }

    await prisma.category.create({
      data: {
        ...result.data,
      },
    });

    revalidatePath('/blogs');

    return {
      status: 'success',
      message: 'Category created successfully',
    };
  } catch {
    return {
      status: 'error',
      message: 'Failed to create category',
    };
  }
}
