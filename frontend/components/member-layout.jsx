"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Home, Calendar, GanttChartSquare, Building2, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"

export default function MemberLayout({ children }) {
  const pathname = usePathname()

  const navigationLinks = [
    { name: "Dashboard", href: "/member/dashboard", icon: Home },
    { name: "My Profile", href: "/member/profile", icon: User },
    { name: "Meetings & Events", href: "/member/events", icon: Calendar },
    { name: "My Projects", href: "/member/projects", icon: GanttChartSquare },
    { name: "Club Information", href: "/member/club", icon: Building2 },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
          <div className="px-4 py-2 mb-6">
            <div className="px-2 flex items-center justify-between">
              <Link href="/member/dashboard" className="flex items-center gap-2">
                <span className="font-bold text-xl text-gray-900">Member Portal</span>
              </Link>
            </div>
            <div className="flex flex-col gap-1 mt-8 mb-8">
              <div className="flex items-center gap-4 px-2 py-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    pathname === link.href
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="px-4 mt-auto mb-4">
            <Link href="/">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 md:hidden">
          <Link href="/member/dashboard" className="flex items-center gap-2">
            <span className="font-bold text-xl text-gray-900">Member Portal</span>
          </Link>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}

