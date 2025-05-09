import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Button } from "../../ui/button";
import { ParticipantCard } from "../components/ParticipantCard";
import { ExtendedAttendee } from "../types/meeting-types";

interface ParticipantListProps {
  title: string;
  participants: ExtendedAttendee[];
  removeAttendee: (email: string) => void;
  isPending?: boolean;
}

export const ParticipantList: React.FC<ParticipantListProps> = ({
  title,
  participants,
  removeAttendee,
  isPending = false,
}) => {
  if (participants.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <h3 className="text-lg font-medium">
          {title} ({participants.length})
        </h3>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {participants.map((attendee) => (
            <ParticipantCard
              key={attendee.email} // Better than using index
              attendee={attendee}
              removeAttendee={removeAttendee}
              showRemindButton={isPending}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
