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
import { toast, useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
// import { c } from "framer-motion/dist/types.d-6pKw1mTI";
import { createClub } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddClubPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    meetingTime: "",
    position: [0, 0],
    dmsPosition: "",
    description: "",
    Admin: "",
    adminId: "",
    inicative: "",
    adminUsername: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePositionChange = (axis, value) => {
    const newPosition = [...formData.position];
    newPosition[axis] = Number.parseFloat(value) || 0;
    setFormData((prev) => ({ ...prev, position: newPosition }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, this would be an API call
    // setTimeout(() => {
    //   toast({
    //     title: "Club Created",
    //     description: "The club has been successfully created.",
    //   })
    //   router.push("/superadmin/clubs")
    //   setIsLoading(false)
    // }, 1500)

    try {

      const response = await createClub(formData);

        toast({
          title: "Club Created",
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
    //  <AdminLayout>
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
            <p className="text-gray-500">Create a new storyteller club</p>
            <h5>you first need to create an admin</h5>
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
              <Label htmlFor="name">Club Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., 123 Main St, Apt 4B"
                rows={3}
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingTime">Meeting Time *</Label>
                <Input
                  id="meetingTime"
                  name="meetingTime"
                  placeholder="e.g., Tuesdays, 6:30 PM"
                  value={formData.meetingTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inicative">
                </Label>
                {/* <Input
                    id="inicative"
                    name="inicative"
                    placeholder=""
                    value={formData.meetingTime}
                    onChange={handleChange}
                    required
                  /> */}

                <Select
                  id="inicative"
                  name="inicative"
                  value={formData.inicative}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <SelectTrigger className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select an Inicative" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Storytellers">Storytellers</SelectItem>
                    <SelectItem value="Young Orater's">
                      Young Orater's
                    </SelectItem>
                    <SelectItem value="Young Leaders">Young Leaders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location Coordinates</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude</Label>
                  <Input
                    id="lat"
                    value={formData.position[0]}
                    onChange={(e) => handlePositionChange(0, e.target.value)}
                    placeholder="e.g., 23.2339"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    value={formData.position[1]}
                    onChange={(e) => handlePositionChange(1, e.target.value)}
                    placeholder="e.g., 77.4401"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dmsPosition">DMS Position (Optional)</Label>
              <Input
                id="dmsPosition"
                name="dmsPosition"
                placeholder="e.g., 40°42'46.08&quot;N, 74°00'21.6&quot;W"
                value={formData.dmsPosition}
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Information</CardTitle>
            <CardDescription>
              Contact details for the club administrator
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="Admin">Admin Name *</Label>
              <Input
                id="Admin"
                name="Admin"
                value={formData.Admin}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminId">Admin Id *</Label>
              <Input
                id="adminId"
                name="adminId"
                value={formData.Admin}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminUsername">Admin Username *</Label>
              <Input
                id="adminUsername"
                name="adminUsername"
                value={formData.adminUsername}
                onChange={handleChange}
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
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
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
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
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
    // </AdminLayout>
  );
}
