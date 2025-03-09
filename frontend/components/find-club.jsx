"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Search } from "lucide-react"
import Link from "next/link"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { clubsData } from "@/lib/data/data"

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(() => import("@/components/map-component.jsx"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted flex items-center justify-center">Loading map...</div>,
})

export default function FindClub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredClubs, setFilteredClubs] = useState(clubsData)
  const [selectedClub, setSelectedClub] = useState(null)
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]) // Center of US
  const [mapZoom, setMapZoom] = useState(4)

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setFilteredClubs(clubsData)
      setMapCenter([39.8283, -98.5795])
      setMapZoom(4)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = clubsData.filter((club) => club.city.toLowerCase().includes(query))

    setFilteredClubs(filtered)

    // Center map on first result if available
    if (filtered.length > 0) {
      setMapCenter(filtered[0].position)
      setMapZoom(11)
    }
  }

  // Handle club selection
  const selectClub = (club) => {
    setSelectedClub(club)
    setMapCenter(club.position)
    setMapZoom(13)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter city name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredClubs.length === 0 ? (
            <div className="text-center p-4 border rounded-lg">No clubs found in this city. Try another search.</div>
          ) : (
            filteredClubs.map((club) => (
              <div
                className={`border rounded-lg cursor-pointer transition-colors ${
                  selectedClub?.id === club.id ? "border-primary" : ""
                }`}
                onClick={() => selectClub(club)}
                key={club.id}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">{club.name}</h3>
                    <div className="bg-gray-200 p-2 text-sm text-nowrap rounded-lg">{club.members} members</div>
                    <Link href={`/findaclub/${club.id}`} className="text-primary border rounded-md m-2 font-medium p-2">
                      Details
                    </Link>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">{club.address}</p>
                  <p className="text-sm mt-2">{club.meetingTime}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden border">
        <MapComponent
          filteredClubs={filteredClubs}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          selectedClub={selectedClub}
          selectClub={selectClub}
        />
      </div>
    </div>
  )
}

