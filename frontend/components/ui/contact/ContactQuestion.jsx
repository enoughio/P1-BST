

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CircleHelp } from "lucide-react"

export default function ContactQuestion() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link"> <CircleHelp /> </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white p-4 rounded-lg shadow-lg">
   
          <div className="space-y-1">
            <p className="text-sm">
              The Given message will be sent to the company's email address. 
                <h4 className="text-sm font-semibold">contact@bharatstorytellers.com</h4><br/>             
                <h3>
                    It usuly takes less then a week to get a response from the company.,<br/>
                    plesae be patient.
                </h3>
            </p>
          
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
