import { useState } from 'react';
import CreateMeetingLayout from '../layout/layout';
import { Separator } from '../ui/separator';
import Agenda, { AgendaItem } from './forms/agenda';
import { MeetingDetails } from './forms/meeting-details';
import Participants from './forms/participants';
import Resolutions from './forms/resolutions';

export default function CreateMeeting() {
  interface MeetingDataType {
    details: {
      subject: string;
      date: string;
      time: string;
      location: string;
      attendees: string;
      recurrence: string;
    };
    agenda: AgendaItem[];
    resolutions: {
      title: string;
      description: string;
      agendaItem: string;
      options: any[];
    };
  }

  const [meetingData, setMeetingData] = useState<MeetingDataType>({
    details: {
      subject: '',
      date: '',
      time: '',
      location: '',
      attendees: '',
      recurrence: '',
    },
    agenda: [] as AgendaItem[],
    resolutions: {
      title: '',
      description: '',
      agendaItem: '',
      options: [],
    },
  });

  const updateMeetingDetails = (details: MeetingDataType['details']) => {
    setMeetingData((prev) => ({ ...prev, details }));
  };

  const updateAgenda = (agenda: AgendaItem[]) => {
    setMeetingData((prev) => ({ ...prev, agenda }));
  };

  const updateResolutions = (resolutions: MeetingDataType['resolutions']) => {
    setMeetingData((prev) => ({ ...prev, resolutions }));
  };

  return (
    <CreateMeetingLayout>
      <div title="Meeting Details">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Meeting Details</h2>
            <p className="text-sm text-muted-foreground mt-2">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          <Separator className="mt-2" />
          <div className="mt-4">
            <MeetingDetails
              details={meetingData.details}
              updateDetails={updateMeetingDetails}
            />
          </div>
        </div>
      </div>
      <div title="Agenda">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Meeting Agenda</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Define the agenda for your meeting.
            </p>
          </div>
          <Separator className="mt-2" />
          <div className="mt-4">
            <Agenda agenda={meetingData.agenda} updateAgenda={updateAgenda} />
          </div>
        </div>
      </div>
      <div title="Resolutions">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Resolutions</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Add resolutions to be discussed in the meeting.
            </p>
          </div>
          <Separator className="mt-2" />
          <div className="mt-4">
            <Resolutions
              resolutions={meetingData.resolutions}
              updateResolutions={updateResolutions}
            />
          </div>
        </div>
      </div>
      <div title="Participants">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Participants</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Manage participants for the meeting.
            </p>
          </div>
          <Separator className="mt-2" />
          <div className="mt-4">
            <Participants />
          </div>
        </div>
      </div>
    </CreateMeetingLayout>
  );
}
