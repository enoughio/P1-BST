"use client"

import { useEffect, useState } from "react"
import { getAllAdmins } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ClubAdminsPage() {
  const [admins, setAdmins] = useState([])
  const [filteredAdmins, setFilteredAdmins] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    totalPages: 1,
  })
  const [pageSize] = useState(10) // Default page size

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async (url = null) => {
    setLoading(true)
    try {
      const data = await getAllAdmins(url)
      setAdmins(data.results)
      setFilteredAdmins(data.results)
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous,
        currentPage: getPageNumberFromUrl(data.next, data.previous) || 1,
        totalPages: Math.ceil(data.count / pageSize),
      })
      setLoading(false)
    } catch (error) {
      console.error("Error fetching admins:", error)
      setLoading(false)
    }
  }

  // Helper function to extract page number from pagination URLs
  const getPageNumberFromUrl = (next, previous) => {
    if (previous === null && next === null) return 1
    if (previous === null) return 1
    if (next === null) {
      const match = previous.match(/page=(\d+)/)
      return match ? parseInt(match[1]) + 1 : 2
    }
    const match = next.match(/page=(\d+)/)
    return match ? parseInt(match[1]) - 1 : 1
  }

  // Navigate to next/previous page
  const goToPage = (url) => {
    if (url) {
      fetchAdmins(url)
    }
  }

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const filtered = admins.filter(
        (admin) =>
          `${admin.first_name} ${admin.last_name}`.toLowerCase().includes(term) ||
          admin.username.toLowerCase().includes(term) ||
          admin.email.toLowerCase().includes(term) ||
          admin.mobile.toLowerCase().includes(term) ||
          admin.club.toLowerCase().includes(term)
      )
      setFilteredAdmins(filtered)
    } else {
      setFilteredAdmins(admins)
    }
  }, [searchTerm, admins])

  // Get admin initials for avatar
  const getAdminInitials = (firstName, lastName) => {
    return (firstName?.[0] || "") + (lastName?.[0] || "")
  }

  // Get full name
  const getFullName = (firstName, lastName) => {
    return `${firstName || ""} ${lastName || ""}`.trim()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Club Admins</h1>
          <p className="text-muted-foreground">Manage club administrators across the organization.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/superadmin/club-admins/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Club Admin
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search club admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8"
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Club ID</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      Loading club admins...
                    </TableCell>
                  </TableRow>
                ) : filteredAdmins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      No club admins found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAdmins.map((admin, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={admin.avatar || ""} alt={getFullName(admin.first_name, admin.last_name)} />
                            <AvatarFallback>
                              {getAdminInitials(admin.first_name, admin.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{getFullName(admin.first_name, admin.last_name)}</div>
                        </div>
                      </TableCell>
                      <TableCell>{admin.username}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.mobile}</TableCell>
                      <TableCell>{admin.club}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/superadmin/club-admins/${admin.username}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/superadmin/club-admins/${admin.username}/edit`}>Edit Admin</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/superadmin/clubs/${admin.club}`}>View Club</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination Controls */}
        {!loading && filteredAdmins.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredAdmins.length}</span> of{" "}
              <span className="font-medium">{pagination.count}</span> admins
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(pagination.previous)}
                disabled={!pagination.previous}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="text-sm font-medium">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(pagination.next)}
                disabled={!pagination.next}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}