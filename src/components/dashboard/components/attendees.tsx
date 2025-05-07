import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";

interface Attendee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatarUrl?: string;
  online: boolean; // Added online status
}

const attendees: Attendee[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Admin",
    avatarUrl: "https://i.pravatar.cc/150?u=john.doe@example.com",
    online: true, // Added online status
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "CEO",
    avatarUrl: "https://i.pravatar.cc/150?u=jane.smith@example.com",
    online: false, // Added online status
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    role: "Manager",
    avatarUrl: "https://i.pravatar.cc/150?u=alice.johnson@example.com",
    online: true,
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    email: "bob.brown@example.com",
    role: "Developer",
    avatarUrl: "https://i.pravatar.cc/150?u=bob.brown@example.com",
    online: false,
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Davis",
    email: "charlie.davis@example.com",
    role: "Designer",
    avatarUrl: "https://i.pravatar.cc/150?u=charlie.davis@example.com",
    online: true,
  },
];

export default function AttendeeList() {
  return (
    <Card className="w-auto p-4 grid gap-4">
      <CardContent>
        <div className="space-y-4">
          {attendees.map((attendee) => (
            <div key={attendee.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`h-3 w-3 rounded-full ${attendee.online ? 'bg-emerald-500' : 'bg-crimson'}`} /> {/* Green for online, grey for offline */}
                <Avatar className="h-7 w-7 border">
                  <AvatarImage src={attendee.avatarUrl} alt={attendee.firstName} />
                  <AvatarFallback>{attendee.firstName[0]}{attendee.lastName[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{attendee.firstName} {attendee.lastName}</p>
                  <p className="text-xs text-muted-foreground">{attendee.email}</p>
                </div>
              </div>
              <div className="ml-4"> {/* Add margin to create space */}
                <Badge>{attendee.role}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
