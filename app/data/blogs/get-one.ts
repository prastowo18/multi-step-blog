import 'server-only';

import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export async function getOneBlog(id: string) {
  const data = await prisma.blog.findUnique({
    where: { id },
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

  if (!data) {
    return notFound();
  }

  return data;
}
