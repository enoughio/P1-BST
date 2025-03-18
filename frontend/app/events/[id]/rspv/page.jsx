import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RsvpForm from "@/components/ui/event/rsvp-form"; 

// This would normally come from a database or API
const getEventData = (id) => {
  return {
    id,
    title: "The Art of Storytelling: Connecting Cultures",
    date: "March 23, 2025",
    time: "9:00 AM - 9:00 PM",
    location: "Cultural Center, New Delhi",
  };
};

export default async function RsvpPage({ params }) {
  const {id} = await params
  const event = getEventData(id);

  return (
    <main className="container px-4 md:px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/events/${id}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to event
        </Link>

        <div className="bg-card rounded-lg border shadow-sm p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">RSVP for {event.title}</h1>

          <div className="mb-8 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{event.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{event.location}</span>
            </div>
          </div>

          <RsvpForm id={params.id} />
        </div>
      </div>
    </main>
  );
}
