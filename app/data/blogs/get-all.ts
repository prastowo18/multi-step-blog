import 'server-only';

import { prisma } from '@/lib/db';

export async function getAllBlog() {
  const data = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      content: true,
      summary: true,
      createdAt: true,
      Author: {
        select: {
          id: true,
          name: true,
        },
      },
      Category: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return data;
}

export type BlogType = Awaited<ReturnType<typeof getAllBlog>>[0];
