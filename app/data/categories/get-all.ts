import 'server-only';

import { prisma } from '@/lib/db';

export async function getAllCategories() {
  const data = await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
    },
  });

  return data;
}

export type CategoriesType = Awaited<ReturnType<typeof getAllCategories>>[0];
