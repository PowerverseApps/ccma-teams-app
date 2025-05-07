import React, { createContext, useState, useContext } from "react";

// Type Definitions
export type IAttendee = {
  name: string;
  email: string;
};

export type IAttachment = {
  name?: string;
  agendaId?: string;
  id?: string;
  DocumentUrl?: string;
  file?: File;
  removed?: boolean;
};

export type IResolutionItem = {
  resolutionName: string;
  resolutionDetails?: string;
};

export type IAgendaItem = {
  agendaItemName: string;
  agendaItemUrl?: string;
  agendaItemFiles?: IAttachment[];
  agendaPresenter?: IAttendee;
  agendaApprover?: IAttendee;
  agendaResolutions?: IResolutionItem[];
  agendaItemType?: string;
};

export type Meeting = {
  id: number;
  AllowMic?: boolean;
  AllowVideo?: boolean;
  Subject: string;
  endDateTime: Date;
  startDateTime: Date;
  Agenda: IAgendaItem[];
  Attendees: IAttendee[];
  Recurrence?: string;
  Description: string;
  Location?: string;
  meetingTypeId?: any;
  Status: "draft" | "published" | "pending";
  Priority?: "High" | "Medium" | "Low";
};

interface MeetingContextProps {
  meetings: Meeting[];
  addMeeting: (meeting: Omit<Meeting, "id" | "Status">) => void;
  updateMeeting: (id: number, meeting: Partial<Meeting>) => void;
  deleteMeeting: (id: number) => void;
}

const MeetingContext = createContext<MeetingContextProps | undefined>(undefined);

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    { 
      id: 1, 
      Subject: "Board Meeting", 
      Status: "pending", 
      startDateTime: new Date("2025-04-07"), 
      endDateTime: new Date("2025-04-07"),
      Description: "Monthly board meeting",
      Agenda: [],
      Attendees: [],
    },
    { 
      id: 2, 
      Subject: "Team Sync", 
      Status: "published", 
      startDateTime: new Date("2025-02-21"), 
      endDateTime: new Date("2025-02-21"),
      Description: "Weekly team sync",
      Agenda: [],
      Attendees: [],
    },
    { 
      id: 3, 
      Subject: "Project Kickoff", 
      Status: "draft", 
      startDateTime: new Date("2025-08-05"), 
      endDateTime: new Date("2025-08-05"),
      Description: "Project kickoff meeting",
      Agenda: [],
      Attendees: [],
    },
  ]);

  const addMeeting = (meeting: Omit<Meeting, "id" | "Status">) => {
    const newMeeting: Meeting = {
      ...meeting,
      id: meetings.length > 0 ? Math.max(...meetings.map(m => m.id)) + 1 : 1,
      Status: "draft"
    };
    setMeetings([...meetings, newMeeting]);
  };

  const updateMeeting = (id: number, updatedMeeting: Partial<Meeting>) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === id ? { ...meeting, ...updatedMeeting } : meeting
    ));
  };

  const deleteMeeting = (id: number) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  return (
    <MeetingContext.Provider value={{ meetings, addMeeting, updateMeeting, deleteMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetings = () => {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error("useMeetings must be used within a MeetingProvider");
  }
  return context;
};
