import Link from "next/link";
import Image from "next/image";
import { CircleUser, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { grid1, logo } from "@/lib/data/images";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Event", href: "/events" },
  { name: "Membership", href: "/membership" },
  { name: "Resources", href: "/resources" },
];

export function MainNav() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}

          <div className="flex items-center space-x-2 justify-center">
            <Image
              src={logo}
              alt="Bharat Storytellers Logo"
              width={100}
              height={60}
              className="opject-cover"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 md:flex">
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

          {/* Profile Image */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="hidden md:flex items-center space-x-4"
            >
              {/* <Image
                src={}
                alt="Profile"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              /> */}
              <div>
                <CircleUser className="h-10 w-10 text-gray-500" />
              </div>

            </Link>

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
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium"
                    >
                      {item.name}
                    </Link>
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
