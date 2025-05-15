import React from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Mail, X } from "lucide-react";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { ExtendedAttendee } from "../types/meeting-types";

interface ParticipantCardProps {
  attendee: ExtendedAttendee;
  removeAttendee: (email: string) => void;
  showRemindButton?: boolean;
}

export const getInitials = (name: string) => {
  return name.split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const getRoleBadge = (role?: string) => {
  switch(role) {
    case 'host':
      return <Badge className="bg-purple-100 text-purple-800">Host</Badge>;
    case 'presenter':
      return <Badge className="bg-blue-100 text-blue-800">Presenter</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">Attendee</Badge>;
  }
};

export const ParticipantCard = ({ attendee, removeAttendee, showRemindButton }: ParticipantCardProps) => {
  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className={attendee.confirmed ? "bg-primary/10 text-primary" : "bg-gray-200 text-gray-600"}>
            {getInitials(attendee.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{attendee.name}</p>
            {attendee.confirmed 
              ? (attendee.role && getRoleBadge(attendee.role))
              : <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">Pending</Badge>
            }
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Mail className="h-3.5 w-3.5" />
            <span>{attendee.email}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {!attendee.confirmed && showRemindButton && (
          <Button size="sm" variant="outline">Remind</Button>
        )}
        <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => removeAttendee(attendee.email)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
