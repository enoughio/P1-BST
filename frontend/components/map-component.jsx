"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Create a custom icon using Lucide icon as SVG
const createCustomIcon = (color = "black") => {
  // Convert the Lucide MapPin icon to an SVG string
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-map-pin">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  `

  // Create a base64 encoded data URL
  const iconUrl = `data:image/svg+xml;base64,${btoa(svgString)}`

  return L.icon({
    iconUrl,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  })
}

// Custom marker component that uses our custom icon
function CustomMarker({ position, club, onClick }) {
  // You could customize the color based on club properties if desired
  const customIcon = createCustomIcon()

  return (
    <Marker
      position={position}
      icon={customIcon}
      eventHandlers={{
        click: () => onClick(club),
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
  )
}

function MapController({ center, zoom, selectedClub }) {
  const map = useMap()

  useEffect(() => {
    if (selectedClub) {
      map.flyTo(selectedClub.position, 13, {
        duration: 1.5,
      })
    }
  }, [selectedClub, map])

  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])

  return null
}

export default function MapComponent({ filteredClubs, mapCenter, mapZoom, selectedClub, selectClub }) {
  const mapRef = useRef(null)

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100%", width: "100%" }} ref={mapRef}>
      <MapController center={mapCenter} zoom={mapZoom} selectedClub={selectedClub} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredClubs.map((club) => (
        <CustomMarker key={club.id} position={club.position} club={club} onClick={selectClub} />
      ))}
    </MapContainer>
  )
}

