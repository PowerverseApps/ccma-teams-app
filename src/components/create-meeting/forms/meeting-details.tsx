"use client"
import React from "react"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"

export function MeetingDetails() {
return(
 
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
    <div className="p-6 space-y-4">
      <div>
        <Label htmlFor="meeting-title">Subject</Label>
        <Input id="meeting-title" placeholder="e.g. Q2 Strategy Planning" className="mt-2" />
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="meeting-date">Date</Label>
          <Input id="meeting-date" type="date" className="w-full max-w-md mt-2" />
        </div>
        <div>
          <Label htmlFor="meeting-time">Time</Label>
          <Input id="meeting-time" type="time" className="w-full max-w-md mt-2" />
        </div>
      </div>
      <div>
        <Label htmlFor="meeting-location">Location</Label>
        <Input id="meeting-location" placeholder="e.g., Zoom or Conference Room A" className="mt-2" />
      </div>
    </div>
  </div>
  )
}
