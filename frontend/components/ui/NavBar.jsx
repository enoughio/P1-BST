import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Event", href: "/event" },
  { name: "Membership", href: "/membership" },
  { name: "Resources", href: "/resources" },
]

export function MainNav() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}

          <div className="flex items-center space-x-2">
            <Image
            priority={true}
              src="/logo.svg"
              alt="Bharat Storytellers Logo"
              width={100}
              height={60}
              className="opject-cover"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 md:flex">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-medium text-gray-900 hover:text-gray-600">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Profile Image */}
          <div className="flex items-center space-x-4">
            <Image
              src="/a-kid.jpg?height=40&width=40"
              alt="Profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />

            {/* Mobile Menu */}
            <Sheet >
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col ">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href} className="text-lg font-medium">
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
  )
}

