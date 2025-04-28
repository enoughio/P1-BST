"use client"

import { useEffect, useState } from "react"
import { getAllMembers } from "@/lib/api"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronLeft, ChevronRight, Filter, MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"

export default function AllMembersPage() {
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [clubs, setClubs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClub, setSelectedClub] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalMembers, setTotalMembers] = useState(0)
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [previousPageUrl, setPreviousPageUrl] = useState(null)

  useEffect(() => {
    fetchMembers()
  }, [currentPage])

  const fetchMembers = async (url = null) => {
    try {
      setLoading(true)
      const response = await getAllMembers(url)
      
      // Extract data from response
      const membersData = response.results
      setMembers(membersData)
      setFilteredMembers(membersData)
      setTotalMembers(membersData.length)
      
      // Set pagination data
      setNextPageUrl(response.next)
      setPreviousPageUrl(response.previous)
      
      // Calculate total pages (assuming a default page size if not specified)
      const pageSize = membersData.length || 20
      setTotalPages(Math.ceil(membersData.length / pageSize))
      
      // Extract unique clubs from the response
      const uniqueClubs = [...new Set(membersData.map(member => member.club_name))]
        .filter(club => club)
        .map(club => ({ id: club, name: club }))
      
      setClubs(uniqueClubs)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching members:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    applyFilters()
  }, [searchTerm, selectedClub, members])

  const applyFilters = () => {
    let filtered = [...members]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (m) =>
          (m.name && m.name.toLowerCase().includes(term)) ||
          (m.email && m.email.toLowerCase().includes(term)) ||
          (m.mobile && m.mobile.includes(term)) ||
          (m.username && m.username.toLowerCase().includes(term))
      )
    }

    // Apply club filter
    if (selectedClub) {
      filtered = filtered.filter((m) => m.club_name === selectedClub)
    }

    setFilteredMembers(filtered)
  }

  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(currentPage + 1)
      fetchMembers(nextPageUrl)
    }
  }

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      setCurrentPage(currentPage - 1)
      fetchMembers(previousPageUrl)
    }
  }

  const getMembershipStatus = (expiryDate) => {
    if (!expiryDate) {
      return { label: "No Expiry", variant: "secondary" }
    }
    
    const now = new Date()
    const expiry = new Date(expiryDate)
    const oneMonthFromNow = new Date()
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)

    if (expiry < now) {
      return { label: "Expired", variant: "destructive" }
    } else if (expiry < oneMonthFromNow) {
      return { label: "Expiring Soon", variant: "warning" }
    } else {
      return { label: "Active", variant: "success" }
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Members</h1>
            <p className="text-muted-foreground">View and manage members across all clubs.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8"
              />
            </div>

            <div className="w-full sm:w-64">
              <Select value={selectedClub || "all"} onValueChange={(value) => setSelectedClub(value === "all" ? null : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by club" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clubs</SelectItem>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedClub(null)}>All Members</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const filtered = members.filter((m) => {
                        const status = getMembershipStatus(m.membership_expiry_date)
                        return status.label === "Active"
                      })
                      setFilteredMembers(filtered)
                    }}
                  >
                    Active Members
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const filtered = members.filter((m) => {
                        const status = getMembershipStatus(m.membership_expiry_date)
                        return status.label === "Expiring Soon"
                      })
                      setFilteredMembers(filtered)
                    }}
                  >
                    Expiring Soon
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const filtered = members.filter((m) => {
                        const status = getMembershipStatus(m.membership_expiry_date)
                        return status.label === "Expired"
                      })
                      setFilteredMembers(filtered)
                    }}
                  >
                    Expired Memberships
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Membership Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        Loading members...
                      </TableCell>
                    </TableRow>
                  ) : filteredMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        No members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMembers.map((member) => {
                      const status = getMembershipStatus(member.membership_expiry_date)
                      const initials = member.name ? 
                        member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 
                        member.username.substring(0, 2).toUpperCase();

                      return (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar>
                                <AvatarImage src={member.avatar || ""} />
                                <AvatarFallback>
                                  {initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {member.name || "N/A"}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{member.username}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.mobile}</TableCell>
                          <TableCell>{member.club_name}</TableCell>
                          <TableCell>
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </TableCell>
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
                                  <Link href={`/superadmin/members/${member.id}`}>View Details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/superadmin/members/${member.id}/edit`}>Edit Details</Link>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {filteredMembers.length} of {totalMembers} members
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePreviousPage} 
                  disabled={!previousPageUrl}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="text-sm text-muted-foreground px-2">
                  Page {currentPage} of {totalPages}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNextPage} 
                  disabled={!nextPageUrl}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}