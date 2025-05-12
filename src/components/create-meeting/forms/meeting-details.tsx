"use client"
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
 
interface MeetingDetailsProps {
  details: {
    subject: string;
    date: string;
    time: string;
    location: string;
    attendees: string;
    attendeesValid?: boolean;
    recurrence: string; // Added recurrence field
    [key: string]: string | boolean | undefined;
  };
  updateDetails: (details: MeetingDetailsProps['details']) => void;
}
 
export function MeetingDetails({ details, updateDetails }: MeetingDetailsProps) {
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
 
  return (
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
            <SelectTrigger className="mt-2 w-full pr-8"> {/* Added padding to the right */}
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
      </div>
    </div>
  );
}