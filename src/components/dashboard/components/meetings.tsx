import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { SortAsc } from "lucide-react";
import { useMeetings } from "../../details-meeting/components/meeting-context"; // <-- use context

export default function Meetings() {
  const navigate = useNavigate();
  const { meetings } = useMeetings(); // <-- get meetings from context

  const [filter, setFilter] = useState<"all" | "draft" | "published" | "pending">("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };

  // Sort and filter meetings
  const sortedMeetings = [...meetings].sort((a, b) =>
    sortOrder === "latest" ? b.id - a.id : a.id - b.id
  );
  const filteredMeetings =
    filter === "all" ? sortedMeetings : sortedMeetings.filter((meeting) => meeting.Status === filter);

  return (
    <div className="sm:px-6 w-full">
      {/* Header */}
      <div className="px-4 md:px-10 py-4 md:py-7 flex justify-between items-center"></div>

      {/* Filters and Add Button */}
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="sm:flex items-center justify-between mt-2">
          <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
            <TabsList>
              {["all", "draft", "published", "pending"].map((status) => (
                <TabsTrigger key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button variant="default" onClick={() => navigate("/create-meeting")}>
            Add Meeting
          </Button>
        </div>

        {/* Meeting Table */}
        <div className="mt-4 overflow-x-auto ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Meeting</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead>
                  <div className="flex items-center text-muted-foreground">
                    Date
                    <Button variant="ghost" size="sm" onClick={handleSortToggle} className="ml-2">
                      <SortAsc className={`h-4 w-4 transform ${sortOrder === "latest" ? "rotate-180" : ""}`} />
                    </Button>
                  </div>
                </TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>
                    <span className="text-base font-medium text-gray-700">{meeting.Subject}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm leading-none text-gray-600">{meeting.Status}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm leading-none text-gray-600">
                      {meeting.startDateTime
                        ? new Date(meeting.startDateTime).toLocaleDateString()
                        : ""}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="text-indigo-600 mr-2">
                      Edit
                    </Button>
                    {meeting.Status !== "published" && (
                      <Button variant="link" className="text-red-600 mr-2">
                        Delete
                      </Button>
                    )}
                    {meeting.Status === "published" && (
                      <Button
                        variant="link"
                        className="text-green-600"
                        onClick={() => navigate(`/details-meeting/${meeting.id}`)}
                      >
                        View
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
