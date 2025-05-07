"use client"

import { useEffect, useState } from "react"
import { renewMember, reinstateMember, getClubMembers } from "@/lib/api"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChevronDown, Filter, MoreHorizontal, RefreshCcw, UserPlus } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"

export default function MembersPage() {
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()
  const { user: admin } = useAuth()

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getClubMembers(admin.clubId);
        setMembers(data);
        setFilteredMembers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching members:", error)
        setLoading(false)
      }
    }

    fetchMembers()
  }, [admin.clubId])

  useEffect(() => {
    applyFilters()
  }, [searchTerm, activeTab, members])

  const applyFilters = () => {
    let filtered = [...members]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          m.email.toLowerCase().includes(term) ||
          m.mobile.includes(term)
      )
    }

    if (activeTab === "active") {
      filtered = filtered.filter((m) => 
        m.membership_expiry_date && new Date(m.membership_expiry_date) > new Date()
      )
    } else if (activeTab === "expiring") {
      const now = new Date()
      const nextMonth = new Date()
      nextMonth.setMonth(nextMonth.getMonth() + 1)

      filtered = filtered.filter((m) => {
        if (!m.membership_expiry_date) return false
        const expiryDate = new Date(m.membership_expiry_date)
        return expiryDate > now && expiryDate < nextMonth
      })
    } else if (activeTab === "expired") {
      filtered = filtered.filter((m) => 
        m.membership_expiry_date && new Date(m.membership_expiry_date) < new Date()
      )
    }

    setFilteredMembers(filtered)
  }

  const handleRenewMember = async (username) => {
    try {
      const now = new Date()
      const nextYear = new Date(now.setFullYear(now.getFullYear() + 1))
      const expiryDate = nextYear.toISOString().split("T")[0]

      await renewMember(username, expiryDate)

      setMembers(members.map((m) => (m.username === username ? { ...m, membership_expiry_date: expiryDate } : m)))

      toast({
        title: "Membership Renewed",
        description: "Member's subscription has been renewed for 1 year.",
      })
    } catch (error) {
      console.error("Error renewing membership:", error)
      toast({
        title: "Error",
        description: "Failed to renew membership. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReinstateMember = async (username) => {
    try {
      await reinstateMember(username)

      const now = new Date()
      const nextYear = new Date(now.setFullYear(now.getFullYear() + 1))
      const expiryDate = nextYear.toISOString().split("T")[0]

      setMembers(members.map((m) => (m.username === username ? { ...m, membership_expiry_date: expiryDate } : m)))

      toast({
        title: "Member Reinstated",
        description: "Member has been successfully reinstated.",
      })
    } catch (error) {
      console.error("Error reinstating member:", error)
      toast({
        title: "Error",
        description: "Failed to reinstate member. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  const getMembershipStatus = (expiryDate) => {
    if (!expiryDate) {
      return { label: "Pending", variant: "outline" }
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

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "??"
    const parts = name.split(" ")
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return parts[0][0].toUpperCase()
  }

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Not set"
    return dateString
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">Manage your club members, renew memberships, and add new members.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/admin/members/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
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
                <DropdownMenuItem onClick={() => setActiveTab("all")}>All Members</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("active")}>Active Members</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("expiring")}>Expiring Soon</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("expired")}>Expired Memberships</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">All Members</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          Loading members...
                        </TableCell>
                      </TableRow>
                    ) : filteredMembers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          No members found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMembers.map((member) => {
                        const status = getMembershipStatus(member.membership_expiry_date)

                        return (
                          <TableRow key={member.username}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <AvatarImage src={member.avatar || ""} />
                                  <AvatarFallback>
                                    {getInitials(member.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {member.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{member.occupation || "Member"}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.mobile}</TableCell>
                            <TableCell>{formatDate(member.join_date)}</TableCell>
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
                                    <Link href={`/admin/members/${member.username}`}>View Details</Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/admin/members/${member.username}/edit`}>Edit Details</Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleRenewMember(member.username)}>
                                    <RefreshCcw className="h-4 w-4 mr-2" />
                                    Renew Membership
                                  </DropdownMenuItem>
                                  {status.label === "Expired" && (
                                    <DropdownMenuItem onClick={() => handleReinstateMember(member.username)}>
                                      <UserPlus className="h-4 w-4 mr-2" />
                                      Reinstate Member
                                    </DropdownMenuItem>
                                  )}
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
              <CardFooter className="flex justify-between py-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredMembers.length} of {members.length} members
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}