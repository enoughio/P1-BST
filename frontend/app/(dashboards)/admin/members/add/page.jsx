"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { createMember } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2, Upload } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

export default function AddMemberPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const initialMemberData = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile: "",
    avatar: null,
    address: "",
    gender: null,
    dob: null,
    id_proof: null,
    club: user.clubId, // Will be set from the current logged in user's club
    occupation: null,
    password: "",
  }

  const [memberData, setMemberData] = useState(initialMemberData)
  const [avatarFile, setAvatarFile] = useState(null)
  const [idProofFile, setIdProofFile] = useState(null)
  const [availableClubs, setAvailableClubs] = useState([{ id: user.clubId, name: 'This Club' }]) // Replace with actual clubs

  const handleChange = (e) => {
    const { name, value } = e.target
    setMemberData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setMemberData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      if (name === 'avatar') {
        setAvatarFile(files[0])
      } else if (name === 'id_proof') {
        setIdProofFile(files[0])
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData()
      
      // Add all text fields to the FormData
      Object.keys(memberData).forEach(key => {
        if (key !== 'avatar' && key !== 'id_proof' && memberData[key] !== null && memberData[key] !== '') {
          // Convert gender and occupation to uppercase as per API requirements
          console.log(memberData[key])
          if (key === 'gender' && memberData[key]) {
            formData.append(key, memberData[key])
          } else if (key === 'occupation' && memberData[key]) {
            formData.append(key, memberData[key])
          } else {
            formData.append(key, memberData[key])
          }
        }
      })
      
      // Set the club ID - you would get this from your authentication context
      // This is a placeholder - make sure to use a valid club ID
      const clubId = user.clubId // Replace with actual club ID from your context
      formData.append('club', clubId)
      
      // Add files if they exist
      if (avatarFile) {
        formData.append('avatar', avatarFile)
      }
      
      if (idProofFile) {
        formData.append('id_proof', idProofFile)
      }

      // Use the createMember function
      const result = await createMember(formData);

      toast({
        title: "Member Added",
        description: `${memberData.first_name} ${memberData.last_name} has been added successfully.`,
      })

      router.push("/admin/members")
    } catch (error) {
      console.error("Error adding member:", error)
      toast({
        title: "Error",
        description: `Failed to add new member: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/members">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Member</h1>
            <p className="text-muted-foreground">Register a new member to your club.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
            <CardDescription>
              Enter the member's personal information below. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={memberData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={memberData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={memberData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile * (max 10 characters)</Label>
                <Input 
                  id="mobile" 
                  name="mobile" 
                  value={memberData.mobile} 
                  onChange={handleChange} 
                  required 
                  maxLength={10}
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input id="username" name="username" value={memberData.username} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={memberData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Separator />

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("occupation", value)}
                  defaultValue={memberData.occupation || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Working">Working Professional</SelectItem>
                    <SelectItem value="Business">Self Employed</SelectItem>
                    <SelectItem value="Self Employed">Self Employed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  defaultValue={memberData.gender || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    {/* <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input 
                  id="dob" 
                  name="dob" 
                  type="date" 
                  value={memberData.dob || ''} 
                  onChange={handleChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={memberData.address} onChange={handleChange} />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    id="avatar" 
                    name="avatar" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 border rounded-md p-2 w-full">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('avatar').click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {avatarFile ? avatarFile.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="id_proof">ID Proof</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    id="id_proof" 
                    name="id_proof" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 border rounded-md p-2 w-full">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('id_proof').click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {idProofFile ? idProofFile.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/members")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Adding Member..." : "Add Member"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}