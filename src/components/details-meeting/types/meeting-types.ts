import { IAttendee } from "../components/meeting-context";

export interface ExtendedAttendee extends IAttendee {
  role?: 'host' | 'presenter' | 'attendee';
  confirmed?: boolean;
  avatar?: string;
}