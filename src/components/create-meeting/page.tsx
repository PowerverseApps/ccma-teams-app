import React from 'react'
import { Separator } from '../ui/separator'
import CreateMeetingLayout from '../layout/layout'
import Agenda from './forms/agenda'

import Resolutions from './forms/resolutions'
import Participants from './forms/participants'
import { MeetingDetails } from './forms/meeting-details'

export default function CreateMeeting() {
  return (
    <CreateMeetingLayout>
      <div title="Meeting Details">
        <div className="space-y-6">
          <div>
          <h2 className="text-xl font-semibold">Meeting Details</h2>
          <p className="text-sm text-muted-foreground mt-2">This information will be displayed publicly so be careful what you share.</p>
          </div>
          <Separator className='mt-2' />
          <div className='mt-4'>
          <MeetingDetails />
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
          <Separator className='mt-2' />
          <div className='mt-4'>
          <Agenda />
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
          <Separator className='mt-2' />
          <div className='mt-4'>
          <Resolutions />
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
          <Separator className='mt-2' />
          <div className='mt-4'>
          <Participants />
          </div>
        </div>
      </div>
    </CreateMeetingLayout>
  )
}
