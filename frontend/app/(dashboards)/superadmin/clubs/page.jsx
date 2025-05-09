"use client";

import { useEffect, useState } from "react";
import { getClubs } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Building,
  CalendarClock,
  MapPin,
  MoreHorizontal,
  Plus,
  Users,
  Mail,
  Phone,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const data = await getClubs();

        if (!data) {
          throw new Error("Data not found");
        }

        setClubs(data);
  
      } catch (error) {
        console.error("Error fetching clubs:", error);
        toast({
          title: "Error fetching clubs",
          description: "Unable to fetch clubs. Please reload.",
          variant: "destructive",
        });

      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  const handleViewClub = (club) => {
    setSelectedClub(club);
    setIsViewDialogOpen(true);
  };

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clubs</h1>
          <p className="text-muted-foreground">
            Manage all clubs in the organization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/superadmin/clubs/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Club
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Club Details</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Meeting Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    Loading clubs...
                  </TableCell>
                </TableRow>
              ) : clubs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    No clubs found.
                  </TableCell>
                </TableRow>
              ) : (
                clubs.map((club) => (
                  <TableRow key={club.club_id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={club.image} alt={club.club_name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {getInitials(club.club_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{club.club_name}</div>
                          <div className="text-xs text-gray-500">{club.club_id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{club.city}</TableCell>
                    <TableCell>
                      <div>
                        <div>{club.admin}</div>
                        <div className="text-xs text-gray-500">{club.admin_username}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {club.members}
                      </div>
                    </TableCell>
                    <TableCell>{club.meeting_time}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleViewClub(club)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/superadmin/clubs/${club.club_id}/edit`}>
                              Edit Club
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/superadmin/clubs/${club.club_id}/members`}
                            >
                              View Members
                            </Link>
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

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} >
        <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Club Details</DialogTitle>
            <DialogDescription>
              Detailed information about the club.
            </DialogDescription>
          </DialogHeader>

          {selectedClub && (
            <div className="grid gap-6 py-4">
              {selectedClub.image && (
                <div className="flex justify-center md:col-span-2">
                  <div className="w-full max-w-md overflow-hidden rounded-md border">
                    <img 
                      src={selectedClub.image} 
                      alt={selectedClub.club_name} 
                      className="h-48 w-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <Building className="h-4 w-4 mr-1" /> Club ID
                    </h3>
                    <p className="font-medium">{selectedClub.club_id}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <Building className="h-4 w-4 mr-1" /> Club Name
                    </h3>
                    <p className="font-medium">{selectedClub.club_name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> Address
                    </h3>
                    <p>{selectedClub.address}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> City
                    </h3>
                    <p>{selectedClub.city}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <CalendarClock className="h-4 w-4 mr-1" /> Meeting Time
                    </h3>
                    <p>{selectedClub.meeting_time}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <Users className="h-4 w-4 mr-1" /> Members
                    </h3>
                    <p>{selectedClub.members}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <Users className="h-4 w-4 mr-1" /> Admin
                    </h3>
                    <p className="font-medium">{selectedClub.admin}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <Users className="h-4 w-4 mr-1" /> Admin Username
                    </h3>
                    <p>{selectedClub.admin_username}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <Mail className="h-4 w-4 mr-1" /> Email
                    </h3>
                    <p>{selectedClub.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <Phone className="h-4 w-4 mr-1" /> Phone
                    </h3>
                    <p>{selectedClub.mobile}</p>
                  </div>

                  {selectedClub.initiative && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Initiative</h3>
                      <p>{selectedClub.initiative}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Description
                    </h3>
                    <p className="text-sm">{selectedClub.description}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Location
                </h3>
                <div className="rounded-md border overflow-hidden aspect-video">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59365.55110417767!2d77.40113913124998!3d23.233433599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1690356415188!5m2!1sen!2sin`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
            {selectedClub && (
              <Button asChild>
                <Link href={`/superadmin/clubs/${selectedClub.club_id}/edit`}>
                  Edit Club
                </Link>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}