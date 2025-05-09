import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MeetingProvider, useMeetings } from "./components/meeting-context";
import { MeetingNavbar } from "./components/MeetingNavbar";
import { Card } from "../ui/card";
import { ExtendedAttendee } from "./types/meeting-types";
import { ParticipantSearchBar } from "./components/ParticipantSearchBar";
import { ParticipantList } from "./components/ParticipantList";

// Mock participants data with additional properties
const mockAttendees: ExtendedAttendee[] = [
  {
    name: "John Smith",
    email: "john.smith@company.com",
    role: "host",
    confirmed: true,
  },
  {
    name: "Maria Garcia",
    email: "m.garcia@company.com",
    role: "presenter",
    confirmed: true,
  },
  {
    name: "David Chen",
    email: "d.chen@company.com",
    role: "attendee",
    confirmed: false,
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "presenter",
    confirmed: true,
  },
  {
    name: "Robert Williams",
    email: "r.williams@company.com",
    role: "attendee",
    confirmed: true,
  },
  {
    name: "Emily Davis",
    email: "e.davis@company.com",
    role: "attendee",
    confirmed: false,
  },
  {
    name: "Michael Brown",
    email: "m.brown@company.com",
    role: "attendee",
    confirmed: true,
  },
  {
    name: "Jessica Taylor",
    email: "j.taylor@company.com",
    role: "attendee",
    confirmed: true,
  },
];

export function ParticipantsView() {
  const { id } = useParams();
  const { meetings } = useMeetings();
  const [searchTerm, setSearchTerm] = useState("");

  const meetingId = id ? parseInt(id) : -1;
  const meeting = meetings.find(m => m.id === meetingId);

  if (!meeting) {
    return <div>Meeting not found</div>;
  }

  // If meeting has no attendees, use mock data
  // Make sure to explicitly type the role as 'attendee' to match ExtendedAttendee type
  const attendees: ExtendedAttendee[] = meeting.Attendees.length > 0 ? 
    meeting.Attendees.map(a => ({ 
      ...a, 
      role: 'attendee' as const, 
      confirmed: true 
    })) : 
    mockAttendees;

  // Filter based on search term
  const filteredAttendees = attendees.filter(attendee => 
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group attendees by confirmation status
  const confirmedAttendees: ExtendedAttendee[] = filteredAttendees.filter(a => a.confirmed);
  const pendingAttendees: ExtendedAttendee[] = filteredAttendees.filter(a => !a.confirmed);

  const removeAttendee = (email: string) => {
    // If using real data, would update the meeting
    console.log(`Removing attendee: ${email}`);
  };

  const clearSearch = () => setSearchTerm("");

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <MeetingNavbar />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-6">
        <h2 className="text-xl font-semibold">Participants</h2>
        <ParticipantSearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
      </div>
      
      <div className="space-y-6">
        {/* Confirmed Attendees */}
        <ParticipantList 
          title="Confirmed" 
          participants={confirmedAttendees} 
          removeAttendee={removeAttendee}
        />
        
        {/* Pending Attendees */}
        <ParticipantList 
          title="Pending" 
          participants={pendingAttendees} 
          removeAttendee={removeAttendee}
          isPending={true}
        />
        
        
      </div>
    </div>
  );
}

export function ParticipantsPage() {
  return (
    <MeetingProvider>
      <ParticipantsView />
    </MeetingProvider>
  );
}
