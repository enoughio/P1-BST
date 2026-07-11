"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {  logo } from "@/lib/data/images";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Event", href: "/events" },
  { name: "Membership", href: "/membership" },
  { name: "Resources", href: "/resources" },
];

export function MainNav() {
  const pathname = usePathname();

  if (pathname === "/vanguard" || pathname.startsWith("/vanguard/")) {
    return null;
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center">
          {/* Logo Section */}

          <Link
            href="/"
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <div className="flex items-center space-x-2 justify-center">
              <Image
                src={logo}
                alt="Bharat Storytellers Logo"
                width={100}
                height={60}
                className="opject-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden justify-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-900 hover:text-gray-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex justify-end justify-self-end ml-auto">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col ">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link href={item.href} className="text-lg font-medium">
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
