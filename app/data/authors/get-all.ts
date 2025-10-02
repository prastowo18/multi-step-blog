import 'server-only';

import { prisma } from '@/lib/db';

export async function getAllAuthor() {
  const data = await prisma.author.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
    },
  });

  return data;
}

export type AuthorType = Awaited<ReturnType<typeof getAllAuthor>>[0];
