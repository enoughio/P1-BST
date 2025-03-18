"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// This would normally come from a database or API
const getTicketData = (id, email) => {
  return {
    id: `BSEV-${id.slice(0, 4).toUpperCase()}-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
    eventId: id,
    eventTitle: "The Art of Storytelling: Connecting Cultures",
    date: "March 23, 2025",
    time: "9:00 AM - 9:00 PM",
    location: "Cultural Center, New Delhi",
    attendeeName: email
      .split("@")[0]
      .replace(/[.]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    email: email,
    ticketType: "General Admission",
  };
};

export default function TicketPage({ params }) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "guest@example.com";
  const ticket = getTicketData(params.id, email);
  const ticketRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const downloadTicket = async () => {
    if (typeof window !== "undefined" && ticketRef.current) {
      try {
        // In a real app, you would use html2canvas or a similar library
        alert("In a production app, this would download the ticket as a PDF or image");
      } catch (error) {
        console.error("Failed to download ticket:", error);
      }
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <main className="container px-4 md:px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/events/${params.id}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to event
        </Link>

        <div className="bg-card rounded-lg border shadow-sm p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Your Ticket</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={downloadTicket}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Download ticket</span>
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share ticket</span>
              </Button>
            </div>
          </div>

          <div ref={ticketRef} className="bg-white rounded-lg overflow-hidden border">
            <div className="bg-primary p-4 text-primary-foreground">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-xl">BHARAT STORYTELLERS</h2>
                  <p className="text-xs opacity-80">Event Ticket</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-80">Ticket #</p>
                  <p className="font-mono">{ticket.id}</p>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-4">
                <div>
                  <h3 className="text-lg font-bold">{ticket.eventTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    {ticket.date} • {ticket.time}
                  </p>
                  <p className="text-sm text-muted-foreground">{ticket.location}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Attendee</p>
                    <p className="font-medium">{ticket.attendeeName}</p>
                    <p className="text-sm">{ticket.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ticket Type</p>
                    <p className="font-medium">{ticket.ticketType}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="h-full w-full flex flex-col items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=150&width=150&text=QR"
                    alt="QR Code"
                    width={150}
                    height={150}
                    className="mb-2"
                  />
                  <p className="text-xs text-center text-muted-foreground">Scan for entry</p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 text-center text-xs text-muted-foreground">
              <p>Please present this ticket at the event entrance. This ticket is non-transferable.</p>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Important Information</h2>
          <ul className="space-y-2 text-sm">
            <li>• Please arrive 15 minutes before the event starts</li>
            <li>• Bring a valid ID that matches the name on your ticket</li>
            <li>• Photography and recording may be prohibited during certain performances</li>
            <li>• For any questions, contact us at support@bharatstorytellers.com</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
