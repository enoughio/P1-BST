"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { getEventsByAdmin, deleteEvent, getCurrentUser } from "@/lib/api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronDown, MoreHorizontal, Plus, Star, Users, Briefcase } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function EventsPage() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeType, setActiveType] = useState("all")
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser()
        setCurrentUser(user)

        const data = await getEventsByAdmin(user.id)
        setItems(data)
        setFilteredItems(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Filter items when search term or type changes
    if (searchTerm || activeType !== "all") {
      let filtered = [...items]

      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(
          (item) =>
            item.title.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.location.toLowerCase().includes(term),
        )
      }

      // Apply type filter
      if (activeType !== "all") {
        filtered = filtered.filter((item) => item.type === activeType)
      }

      setFilteredItems(filtered)
    } else {
      setFilteredItems(items)
    }
  }, [searchTerm, activeType, items])

  const handleDelete = async () => {
    if (!selectedItem) return

    try {
      await deleteEvent(selectedItem.id)

      // Update local state
      setItems(items.filter((e) => e.id !== selectedItem.id))
      setFilteredItems(filteredItems.filter((e) => e.id !== selectedItem.id))

      setIsDeleteDialogOpen(false)

      toast({
        title: "Deleted",
        description: `The ${selectedItem.type} has been successfully deleted.`,
      })
    } catch (error) {
      console.error("Error deleting:", error)
      toast({
        title: "Error",
        description: "Failed to delete. Please try again.",
        variant: "destructive",
      })
    }
  }

  const isUpcoming = (date) => {
    return new Date(date) > new Date()
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Events & Workshops</h1>
            <p className="text-muted-foreground">Manage your events and workshops</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/admin/events/add?type=event">
                    <Calendar className="mr-2 h-4 w-4" />
                    New Event
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/events/add?type=workshop">
                    <Briefcase className="mr-2 h-4 w-4" />
                    New Workshop
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Tabs value={activeType} onValueChange={setActiveType} className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="event">
                    <Calendar className="mr-1 h-4 w-4" />
                    Events
                  </TabsTrigger>
                  <TabsTrigger value="workshop">
                    <Briefcase className="mr-1 h-4 w-4" />
                    Workshops
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <Tabs defaultValue="grid" className="space-y-4">
            <TabsList className="ml-auto">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-4">
              {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader className="h-40 bg-muted/40"></CardHeader>
                      <CardContent className="h-24 mt-4 space-y-2">
                        <div className="h-4 bg-muted/60 rounded w-1/2"></div>
                        <div className="h-4 bg-muted/60 rounded w-full"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">No events or workshops found.</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/admin/events/add?type=event">
                          <Calendar className="mr-2 h-4 w-4" />
                          New Event
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/events/add?type=workshop">
                          <Briefcase className="mr-2 h-4 w-4" />
                          New Workshop
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`flex flex-col overflow-hidden ${
                        item.type === "workshop" ? "border-purple-200" : "border-blue-200"
                      }`}
                    >
                      <div className="relative aspect-video bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={
                              item.image ||
                              `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(item.title) || "/placeholder.svg"}`
                            }
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute top-2 right-2 flex gap-2">
                          {item.highlighted && (
                            <Badge className="bg-yellow-500">
                              <Star className="mr-1 h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                          <Badge
                            className={item.type === "event" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"}
                          >
                            {item.type === "event" ? "Event" : "Workshop"}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                        <CardDescription className="flex items-center text-sm">
                          <Calendar className="mr-1 h-4 w-4" />
                          {item.formattedDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.categories &&
                            item.categories.slice(0, 3).map((category, i) => (
                              <Badge variant="outline" key={i}>
                                {category}
                              </Badge>
                            ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 mt-auto">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-3 w-3" />
                          <span>
                            {item.attendees}/{item.maxCapacity}
                          </span>
                        </div>
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
                              <Link href={`/admin/events/${item.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/events/${item.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/events/${item.id}/participants`}>View Participants</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setSelectedItem(item)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="list">
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="grid grid-cols-5 font-medium">
                        <div>Title</div>
                        <div>Type</div>
                        <div>Date & Time</div>
                        <div>Location</div>
                        <div>Attendees</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      {filteredItems.map((item) => (
                        <div key={item.id} className="grid grid-cols-5 p-4">
                          <div className="font-medium flex items-center">
                            {item.highlighted && <Star className="mr-1 h-4 w-4 text-yellow-500" />}
                            {item.title}
                          </div>
                          <div>
                            <Badge
                              className={item.type === "event" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"}
                            >
                              {item.type === "event" ? "Event" : "Workshop"}
                            </Badge>
                          </div>
                          <div>
                            {item.formattedDate}, {item.time}
                          </div>
                          <div className="truncate">{item.location}</div>
                          <div className="flex justify-between items-center">
                            <span className="flex items-center">
                              <Users className="mr-1 h-4 w-4" />
                              {item.attendees}/{item.maxCapacity}
                            </span>
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
                                  <Link href={`/admin/events/${item.id}`}>View Details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/events/${item.id}/edit`}>Edit</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/events/${item.id}/participants`}>View Participants</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => {
                                    setSelectedItem(item)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {selectedItem?.type === "event" ? "Event" : "Workshop"}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {selectedItem?.type === "event" ? "event" : "workshop"}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
