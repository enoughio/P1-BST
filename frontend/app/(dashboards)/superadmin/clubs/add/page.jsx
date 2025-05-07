"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { createClub } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddClubPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    club_name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    map: "",
    meeting_time: "",
    description: "",
    initiative: "", // Fixed spelling from "inicative"
    email: "",
    mobile: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for Select component since it doesn't use the standard event format
  const handleSelectChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for file input
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Handle file upload logic here
      // For now, we'll just store the file name
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const formPayload = new FormData();
  
      // Append all the fields manually
      formPayload.append("club_name", formData.club_name);
      formPayload.append("street", formData.street);
      formPayload.append("city", formData.city);
      formPayload.append("state", formData.state);
      formPayload.append("country", formData.country);
      formPayload.append("postal_code", formData.postal_code);
      formPayload.append("map", formData.map);
      formPayload.append("meeting_time", formData.meeting_time);
      formPayload.append("description", formData.description);
      formPayload.append("initiative", formData.initiative);
      formPayload.append("email", formData.email);
      formPayload.append("mobile", formData.mobile);
  
      // For file (image) input
      if (formData.image && formData.image[0]) {
        formPayload.append("image", formData.image[0]);
      }
  
      // Send FormData instead of plain object
      const response = await createClub(formPayload);
  
      toast({
        title: `${response?.club_name} Club Created`,
        description: "The club has been successfully created.",
        variant: "default",
      });
      router.push("/superadmin/clubs");
    } catch (error) {
      console.error("Error creating club:", error);
      toast({
        title: "Error",
        description: "An error occurred while creating the club.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

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
              Add Club
            </h1>
            <p className="text-gray-500">Create new club</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Club Information</CardTitle>
            <CardDescription>
              Enter the basic details for the new club
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="club_name">Club Name *</Label>
              <Input
                id="club_name"
                name="club_name"
                type="text"
                placeholder="e.g., Bhopal Storytellers"
                value={formData.club_name}
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
                value={formData.initiative}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an Initiative" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Bhopal Storytellers</SelectItem>
                  <SelectItem value="Young Oraters">Young Oraters</SelectItem>
                  <SelectItem value="Young Leaders">Young Leaders</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting_time">Meeting Time</Label>
              <Input
                id="meeting_time"
                name="meeting_time"
                value={formData.meeting_time}
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
                value={formData.map}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image </Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Phone *</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
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
                  Creating Club...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Club
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
