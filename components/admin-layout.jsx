
import { Sidebar } from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-48 hidden md:block" />
      <div className="flex-1 p-4 md:p-6">{children}</div>
      <Toaster />
    </div>
  )
}
