'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import Logo from '@/public/logo.png';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Blogs', href: '/blogs' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/';
    return pathname.startsWith(url);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-backgroun/60">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8 justify-between sm:justify-start">
        <Link href="/" className="flex items-center space-x-2 mr-10">
          <div className="size-12 flex items-center justify-center">
            <Image src={Logo} alt="Logo" className="object-contain" />
          </div>
          <span className="font-bold">MultiStepBlog.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between ">
          <div className="flex items-center space-x-7">
            {navigationItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive(item.href) && 'underline underline-offset-4'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="sm:hidden">
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center space-x-2 mr-10"
                >
                  <div className="size-12 flex items-center justify-center">
                    <Image src={Logo} alt="Logo" className="object-contain" />
                  </div>
                  <span className="font-bold">MultiStepBlog.</span>
                </Link>
              </SheetTitle>
              <SheetDescription>
                Discover inspiring articles and insights crafted to guide you on
                your journey and spark new ideas.
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-2 px-5">
              {navigationItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  onClick={() => setOpen(false)}
                  className={buttonVariants({
                    variant: isActive(item.href) ? 'outline' : 'default',
                  })}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
