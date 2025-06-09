"use client"
import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Button } from "../../ui/button";
import { useMeetings } from "../../details-meeting/components/meeting-context";
import { useNavigate } from "react-router-dom"; // <-- Add this

interface MeetingDetailsProps {
  details: {
    subject: string;
    date: string;
    time: string;
    location: string;
    attendees: string;
    attendeesValid?: boolean;
    recurrence: string;
    [key: string]: string | boolean | undefined;
  };
  updateDetails: (details: MeetingDetailsProps['details']) => void;
}

export function MeetingDetails({ details, updateDetails }: MeetingDetailsProps) {
  // Local state for saved meeting details
  const [savedMeetings, setSavedMeetings] = useState<MeetingDetailsProps['details'][]>([]);
  const [showNotification, setShowNotification] = useState(false); // <-- Add this
  const { addMeeting } = useMeetings();
  const navigate = useNavigate(); // <-- Add this

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateDetails({ ...details, [e.target.id]: e.target.value });
  };

  const handleAttendeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emails = value.split(',').map(email => email.trim());
    const isValid = emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email === '');
    updateDetails({ ...details, attendees: value, attendeesValid: isValid });
  };

  const handleSelectChange = (id: string, value: string) => {
    updateDetails({ ...details, [id]: value });
  };

  // Save current details to the list
  const handleSave = () => {
    // Only save if required fields are filled and attendees are valid
    if (
      details.subject &&
      details.date &&
      details.time &&
      details.location &&
      details.attendeesValid !== false
    ) {
      addMeeting({
        Subject: details.subject,
        startDateTime: new Date(`${details.date}T${details.time}`),
        endDateTime: new Date(`${details.date}T${details.time}`),
        Description: "Meeting created via form",
        Agenda: [],
        Attendees: [], // Fill as needed
        Location: details.location,
        Recurrence: details.recurrence,
        // Add other fields as needed
      });
      setSavedMeetings([...savedMeetings, details]);
      // Optionally clear the form after saving
      updateDetails({
        subject: "",
        date: "",
        time: "",
        location: "",
        attendees: "",
        attendeesValid: undefined,
        recurrence: "none",
      });
      setShowNotification(true); // Show notification
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  return (
    <div>
      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300 animate-fade-in">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Meeting details saved!</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={details.subject}
              onChange={handleChange}
              placeholder="e.g. Q2 Strategy Planning"
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={details.date}
                onChange={handleChange}
                className="w-full max-w-md mt-2"
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={details.time}
                onChange={handleChange}
                className="w-full max-w-md mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={details.location}
              onChange={handleChange}
              placeholder="e.g., Zoom or Conference Room A"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="attendees">Attendees</Label>
            <Input
              id="attendees"
              value={details.attendees}
              onChange={handleAttendeesChange}
              placeholder="e.g., john@example.com, jane@example.com"
              className={`mt-2 ${details.attendeesValid === false ? 'border-red-500' : ''}`}
            />
            {details.attendeesValid === false && (
              <p className="text-red-500 text-sm mt-1">Please enter valid email addresses separated by commas.</p>
            )}
          </div>
          <div>
            <Label htmlFor="recurrence">Recurrence</Label>
            <Select
              value={details.recurrence}
              onValueChange={(value) => handleSelectChange("recurrence", value)}
            >
              <SelectTrigger className="mt-2 w-full pr-8">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="mt-4" onClick={handleSave}>
            Save Meeting Details
          </Button>
        </div>
      </div>
      {/* Display saved meeting details */}
      <div className="p-6">
        <h3 className="font-semibold mb-2">Saved Meeting Details</h3>
        {savedMeetings.length === 0 && <p className="text-gray-500">No meeting details saved yet.</p>}
        <ul className="space-y-2">
          {savedMeetings.map((meeting, idx) => (
            <li key={idx} className="border rounded p-3">
              <div><strong>Subject:</strong> {meeting.subject}</div>
              <div><strong>Date:</strong> {meeting.date}</div>
              <div><strong>Time:</strong> {meeting.time}</div>
              <div><strong>Location:</strong> {meeting.location}</div>
              <div><strong>Attendees:</strong> {meeting.attendees}</div>
              <div><strong>Recurrence:</strong> {meeting.recurrence}</div>
            </li>
          ))}
        </ul>
      </div>
      {/* Tailwind animation for fade-in */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease;
        }
      `}</style>
    </div>
  );
}