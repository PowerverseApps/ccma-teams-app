import { format } from "date-fns";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { MeetingProvider, useMeetings } from "./components/meeting-context";
import { MeetingNavbar } from "./components/MeetingNavbar";

export function MeetingView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { meetings } = useMeetings();

  const meetingId = id ? parseInt(id) : -1;
  const meeting = meetings.find(m => m.id === meetingId);

  if (!meeting) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Meeting not found</h2>
        <Button onClick={() => navigate("/meetings")}>Back to Meetings</Button>
      </div>
    );
  }

  // Format dates for display
  const formatDate = (date: Date) => {
    return format(new Date(date), "PPP p"); // e.g., "Apr 29, 2025, 3:45 PM"
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <MeetingNavbar />
      
      <Card className="shadow-md mt-6">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">{meeting.Subject}</CardTitle>
              <CardDescription>
                Status: <span className="font-medium capitalize">{meeting.Status}</span>
              </CardDescription>
            </div>
            {meeting.Priority && (
              <div className={`px-3 py-1 rounded-full text-sm font-medium
                ${meeting.Priority === "High" ? "bg-red-100 text-red-700" : ""}
                ${meeting.Priority === "Medium" ? "bg-yellow-100 text-yellow-700" : ""}
                ${meeting.Priority === "Low" ? "bg-green-100 text-green-700" : ""}
              `}>
                {meeting.Priority} Priority
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Start Time</p>
                <p>{formatDate(meeting.startDateTime)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Time</p>
                <p>{formatDate(meeting.endDateTime)}</p>
              </div>
              {meeting.Location && (
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>{meeting.Location}</p>
                </div>
              )}
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="mt-1 whitespace-pre-wrap">{meeting.Description}</p>
            </div>
            
            <div className="mt-4 flex gap-4">
              <div className="flex items-center">
                <span className="text-sm mr-2">Microphone:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${meeting.AllowMic ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {meeting.AllowMic ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2">Video:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${meeting.AllowVideo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {meeting.AllowVideo ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 border-t">
          <div className="flex w-full justify-between">
            <Button onClick={() => navigate(`/meeting-edit/${meeting.id}`)}>
              Edit Meeting
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export function MeetingPage() {
  return (
    <MeetingProvider>
      <MeetingView />
    </MeetingProvider>
  );
}
