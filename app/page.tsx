import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

const features: featureProps[] = [
  {
    title: 'Step-by-Step Form',
    description:
      'Simplify your writing process by moving through dedicated steps—no endless scrolling.',
    icon: '📝',
  },
  {
    title: 'Edit Anytime',
    description:
      'Update your posts even after publishing—refine your content whenever you need.',
    icon: '✏️',
  },
  {
    title: 'Real-Time Updates',
    description:
      'Your posts are instantly saved and updated without any extra effort.',
    icon: '⚡',
  },
  {
    title: 'Blog Post Listing',
    description:
      'Once your post is complete, it appears immediately on the main blog page, ready to be read and shared.',
    icon: '🌐',
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="outline">With Blog Wizard</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">
            Write Smarter with the Multi-Step Blog Wizard
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Create blog posts step by step—simple, structured, and stress-free.
            With Multi-Step Blog Wizard, your writing journey flows seamlessly
            from idea to publish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              className={buttonVariants({
                size: 'lg',
              })}
              href="/blogs"
            >
              See Blog
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
