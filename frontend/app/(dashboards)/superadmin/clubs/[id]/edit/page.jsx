"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { getClub, updateClub } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditClubPage() {
  const clubId = useParams().id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [clubData, setClubData] = useState({
    club_name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    map: "",
    meeting_time: "",
    description: "",
    initiative: "",
    email: "",
    mobile: "",
    image: "",
  });
  const [newImage, setNewImage] = useState(null);

  // Fetch club data on component mount
  useEffect(() => {
    async function fetchClubData() {
      try {
        const data = await getClub(clubId);
        if (data) {
          setClubData({
            club_name: data.club_name || "",
            street: data.street || "",
            city: data.city || "",
            state: data.state || "",
            country: data.country || "",
            postal_code: data.postal_code || "",
            map: data.map || "",
            meeting_time: data.meeting_time || "",
            description: data.description || "",
            initiative: data.initiative || "",
            email: data.email || "",
            mobile: data.mobile || "",
            image: data.image || "",
          });
        } else {
          throw new Error("Club data is undefined");
        }
      } catch (error) {
        console.error("Error fetching club data:", error);
        toast({
          title: "Error",
          description: "Failed to load club information",
          variant: "destructive",
        });
      } finally {
        setIsFetching(false);
      }
    }

    if (clubId) {
      fetchClubData();
    }
  }, [clubId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for Select component
  const handleSelectChange = (value, name) => {
    setClubData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
    // if (files && files[0]) {
    //   // For a real implementation, you'd likely want to handle file uploads
    //   // differently, perhaps with clubData or a dedicated upload service
    //   setNewImage(files[0]);
    //   // setClubData((prev) => ({ ...prev, [name]: files[0] }));
    // }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clubData || !clubData.club_name) {
      toast({
        title: "Invalid Data",
        description: "Club data is missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formPayload = new FormData();

      // Append all the fields manually
      formPayload.append("club_name", clubData.club_name);
      formPayload.append("street", clubData.street);
      formPayload.append("city", clubData.city);
      formPayload.append("state", clubData.state);
      formPayload.append("country", clubData.country);
      formPayload.append("postal_code", clubData.postal_code);
      formPayload.append("map", clubData.map);
      formPayload.append("meeting_time", clubData.meeting_time);
      formPayload.append("description", clubData.description);
      formPayload.append("initiative", clubData.initiative);
      formPayload.append("email", clubData.email);
      formPayload.append("mobile", clubData.mobile);

      // For file (image) input
      if (newImage) {
        formPayload.append("image", newImage);
      }
      const response = await updateClub(clubId, formPayload);

      toast({
        title: `${response.club_name} Club data Updated`,
        description: "The club has been successfully updated.",
        variant: "default",
      });
      router.push("/superadmin/clubs");
    } catch (error) {
      console.error("Error updating club:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the club.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading club data...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/superadmin/clubs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Edit Club
            </h1>
            <p className="text-gray-500">Update club details</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Club Information</CardTitle>
            <CardDescription>Update the details for this club</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="club_name">Club Name *</Label>
              <Input
                id="club_name"
                name="club_name"
                type="text"
                placeholder="e.g., Bhopal Storytellers"
                value={clubData.club_name || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initiative">Initiative</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange(value, "initiative")
                }
                value={clubData.initiative}
                defaultValue={clubData.initiative}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an Initiative" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Storytellers</SelectItem>
                  <SelectItem value="2">Young Oraters</SelectItem>
                  <SelectItem value="3">Young Leaders</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                name="street"
                value={clubData.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={clubData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input
                id="postal_code"
                name="postal_code"
                value={clubData.postal_code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={clubData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={clubData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting_time">Meeting Time</Label>
              <Input
                id="meeting_time"
                name="meeting_time"
                value={clubData.meeting_time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="map">Google Map Iframe Link</Label>
              <Textarea
                id="map"
                name="map"
                placeholder="e.g., <iframe src='https://www.google.com/maps/embed?...'></iframe>"
                value={clubData.map || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={clubData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              {clubData.image && (
                <div className="mb-2">
                  <p className="text-sm text-gray-500">
                    Current image: {clubData.image}
                  </p>
                </div>
              )}
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to keep current image
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={clubData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Phone *</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  value={clubData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              {/* 
            <div className="space-y-2">
              <Label htmlFor="admin">still under testing....</Label>
              <Label htmlFor="Admin">Admin Name *</Label>
              <Input
                id="admin"
                name="admin"
                value={club.admin}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminUsername">Admin Username *</Label>
              <Input
                id="adminUsername"
                name="adminUsername"
                value={club.adminUsername}
                onChange={handleChange}
                required
              />
            </div> */}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/superadmin/clubs")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Club...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Club
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
