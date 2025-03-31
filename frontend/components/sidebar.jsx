"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  CalendarRange,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  GanttChartSquare,
  Clock,
  Building2,
  Bell,
  Flag,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Sidebar({ className }) {
  const pathname = usePathname()
  const isAdmin = pathname.includes("/admin")
  const isSuperAdminPage = pathname.includes("/superadmin")

  // Determine navigation links based on role
  const navigationLinks = isSuperAdminPage
    ? [
        { name: "Dashboard", href: "/superadmin/dashboard", icon: LayoutDashboard },
        { name: "Clubs", href: "/superadmin/clubs", icon: Building2 },
        { name: "All Members", href: "/superadmin/members", icon: Users },
        { name: "Club Admins", href: "/superadmin/club-admins", icon: Users },
        { name: "Events", href: "/superadmin/events", icon: CalendarRange },
        { name: "Requests", href: "/superadmin/requests", icon: Bell },
        { name: "Settings", href: "/superadmin/settings", icon: Settings },
      ]
    : [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Members", href: "/admin/members", icon: Users },
        { name: "Meetings", href: "/admin/meetings", icon: Clock },
        { name: "Events", href: "/admin/events", icon: CalendarRange },
        { name: "Projects", href: "/admin/projects", icon: GanttChartSquare },
        { name: "Club Details", href: "/admin/club-details", icon: Building2 },
        { name: "Requests", href: "/admin/requests", icon: Flag },
      ]

  return (
    <div className={cn("pb-12 min-h-screen bg-muted/40", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="px-2 mb-6 flex items-center justify-between">
            <Link
              href={isSuperAdminPage ? "/superadmin/dashboard" : "/admin/dashboard"}
              className="flex items-center gap-2"
            >
              <span className="font-bold text-xl">{isSuperAdminPage ? "Super Admin" : "Club Admin"}</span>
            </Link>
          </div>
          <div className="flex flex-col gap-1 mb-8">
            <div className="flex items-center gap-4 px-2 py-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                <AvatarFallback>{isSuperAdminPage ? "SA" : "CA"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{isSuperAdminPage ? "Super Admin" : "John Doe"}</p>
                <p className="text-xs text-muted-foreground">
                  {isSuperAdminPage ? "superadmin@example.com" : "admin@example.com"}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                  pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 absolute bottom-4 w-full">
        <Link href="/">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </Link>
      </div>
    </div>
  )
}

