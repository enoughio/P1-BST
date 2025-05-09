"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateClubExecutive, getClubMembers } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { 
  Loader2, 
  Plus, 
  Save, 
  Trash2, 
  User 
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ExecutiveCommitteeManager({ club, onUpdate }) {
  const [executiveCommittee, setExecutiveCommittee] = useState([])
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedMember, setSelectedMember] = useState("")
  const [position, setPosition] = useState("")
  const [showPositionDropdown, setShowPositionDropdown] = useState(true) // State to track which input to show
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch club members
        const membersData = await getClubMembers()
        setMembers(membersData)
        
        // Set executive committee from club data if available
        if (club && club.executive_committee) {
          setExecutiveCommittee(club.executive_committee)
        }
        
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load club members or executive committee data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [club])

  const handleAddExecutiveMember = () => {
    if (!selectedMember || !position.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a member and enter a position.",
        variant: "destructive",
      })
      return
    }

    // Find the selected member details from the members list
    const memberDetails = members.find(member => member.username === selectedMember)
    if (!memberDetails) {
      toast({
        title: "Error",
        description: "Selected member not found.",
        variant: "destructive",
      })
      return
    }

    // Create new executive committee member object
    const newExecutiveMember = {
      username: memberDetails.username,
      name: memberDetails.name,
      email: memberDetails.email,
      avatar: memberDetails.avatar || null,
      position: position.trim()
    }

    // Check if this member is already in the committee
    const existingIndex = executiveCommittee.findIndex(
      member => member.username === memberDetails.username
    )

    if (existingIndex !== -1) {
      // Update the existing member's position
      const updatedCommittee = [...executiveCommittee]
      updatedCommittee[existingIndex].position = position.trim()
      setExecutiveCommittee(updatedCommittee)
    } else {
      // Add the new member to the committee
      setExecutiveCommittee([...executiveCommittee, newExecutiveMember])
    }

    // Reset the form
    setSelectedMember("")
    setPosition("")
  }

  const handleRemoveExecutiveMember = (username) => {
    setExecutiveCommittee(executiveCommittee.filter(member => member.username !== username))
  }

  const handleSaveExecutiveCommittee = async () => {
    setIsSaving(true)
    try {
      // Update the club's executive committee
      const updatedClub = await updateClubExecutive(club.club_id, executiveCommittee)
      
      // Update parent component state
      if (onUpdate) {
        onUpdate({
          ...club,
          executive_committee: executiveCommittee
        })
      }

      toast({
        title: "Success",
        description: "Executive committee has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating executive committee:", error)
      toast({
        title: "Error",
        description: "Failed to update executive committee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Filter out members who are already in executive positions (optional)
  const availableMembers = members.filter(member => 
    !executiveCommittee.some(exec => exec.username === member.username)
  )

  if (isLoading) {
    return (
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Executive Committee</CardTitle>
          <CardDescription>Manage your club's executive committee members.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Executive Committee</CardTitle>
        <CardDescription>Manage your club's executive committee members.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add new executive member form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="member-select">Select Member</Label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger id="member-select">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {/* Show all members in dropdown */}
                  {members.map((member) => (
                    <SelectItem key={member.username} value={member.username}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="position-select">Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger id="position-select">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="President">President</SelectItem>
                  <SelectItem value="Vice President">Vice President</SelectItem>
                  <SelectItem value="Secretary">Secretary</SelectItem>
                  <SelectItem value="Treasurer">Treasurer</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Event Coordinator">Event Coordinator</SelectItem>
                  <SelectItem value="Public Relations">Public Relations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleAddExecutiveMember}
              className="w-full md:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add to Committee
            </Button>
          </div>

          {/* Current executive committee list */}
          <div className="space-y-4">
            <div className="text-sm font-medium">Current Executive Committee</div>
            {executiveCommittee.length === 0 ? (
              <div className="text-sm text-muted-foreground p-4 border rounded-md">
                No executive committee members added yet. Add members above.
              </div>
            ) : (
              <div className="space-y-2">
                {executiveCommittee.map((member) => (
                  <div 
                    key={member.username}
                    className="flex items-center justify-between p-4 border rounded-md bg-background"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.position}</div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveExecutiveMember(member.username)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <Button onClick={handleSaveExecutiveCommittee} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Committee
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}