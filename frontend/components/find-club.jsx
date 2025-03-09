"use client";

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin } from "lucide-react";
import { useMap } from "react-leaflet";
import Link from "next/link";


import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"; 


import { clubsData } from "@/lib/data/data"; //TODO : import data from backend

// Create a custom icon using Lucide icon as SVG
const createCustomIcon = (color = "#237fdb") => {
  // Convert the Lucide MapPin icon to an SVG string
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  `;

  // Create a base64 encoded data URL
  const iconUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

  return L.icon({
    iconUrl,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });
};

// Custom marker component that uses our custom icon
function CustomMarker({ position, club, onClick }) {
  // You could customize the color based on club properties if desired
  const customIcon = createCustomIcon();
  
  return (
    <Marker 
      position={position} 
      icon={customIcon}
      eventHandlers={{
        click: () => onClick(club)
      }}
    >
      <Popup>
        <div className="p-1">
          <h3 className="font-bold">{club.name}</h3>
          <p className="text-sm">{club.address}</p>
          <p className="text-sm mt-1">{club.meetingTime}</p>
          <p className="text-sm mt-1">{club.members} members</p>
          <Link href={`/findaclub/${club.id}`}>
            <Button>View Club</Button>
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}

function MapController({ center, zoom, selectedClub }) {
  const map = useMap();

  useEffect(() => {
    if (selectedClub) {
      map.flyTo(selectedClub.position, 13, {
        duration: 1.5,
      });
    }
  }, [selectedClub, map]);

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export default function FindClub() {
  // const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClubs, setFilteredClubs] = useState(clubsData);
  const [selectedClub, setSelectedClub] = useState(null);
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]); // Center of US
  const [mapZoom, setMapZoom] = useState(4);
  const mapRef = useRef(null);
  
  // No need for the Leaflet icon fix since we're using custom icons

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setFilteredClubs(clubsData);
      setMapCenter([39.8283, -98.5795]);
      setMapZoom(4);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = clubsData.filter((club) =>
      club.city.toLowerCase().includes(query)
    );

    setFilteredClubs(filtered);

    // Center map on first result if available
    if (filtered.length > 0) {
      setMapCenter(filtered[0].position);
      setMapZoom(11);
    }
  };

  // Handle club selection
  const selectClub = (club) => {
    setSelectedClub(club);
    setMapCenter(club.position);
    setMapZoom(13);
  };

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
            <div className="text-center p-4 border rounded-lg">
              No clubs found in this city. Try another search.
            </div>
          ) : (
            filteredClubs.map((club) => (
              <Card
                key={club.id}
                className={`cursor-pointer transition-colors ${
                  selectedClub?.id === club.id ? "border-primary" : ""
                }`}
                onClick={() => selectClub(club)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{club.name}</h3>
                    <Badge>{club.members} members</Badge>
                    <Link
                      href={`/findaclub/${club.id}`}
                      className="text-primary border-2"
                    >
                      Club Details
                    </Link>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    {club.address}
                  </p>
                  <p className="text-sm mt-2">{club.meetingTime}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden border">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <MapController
            center={mapCenter}
            zoom={mapZoom}
            selectedClub={selectedClub}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredClubs.map((club) => (
            <CustomMarker
              key={club.id}
              position={club.position}
              club={club}
              onClick={selectClub}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}