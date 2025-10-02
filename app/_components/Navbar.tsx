'use client';

import Link from 'next/link';
import Image from 'next/image';

// import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

import Logo from '@/public/logo.png';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Blogs',
    href: '/blogs',
  },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === '/') return pathname === '/';
    return pathname.startsWith(url);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-backgroun/60">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href="" className="flex items-center space-x-2 mr-10">
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
          {/* <div className="flex items-center space-x-4">
            {isPending ? null : session ? (
              <>
                <UserDropdown
                  email={session.user.email}
                  image={
                    session?.user.image ??
                    `https://avatar.vercel.sh/rauchg/${session?.user.email}`
                  }
                  name={
                    session?.user.name && session.user.name.length > 0
                      ? session?.user.name
                      : session?.user.email.split('@')[0]
                  }
                />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: 'secondary' })}
                >
                  Login
                </Link>
                <Link href="/login" className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            )}
          </div> */}
        </nav>
      </div>
    </header>
  );
}
