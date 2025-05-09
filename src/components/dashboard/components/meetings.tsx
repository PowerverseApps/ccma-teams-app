import { SortAsc } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";

interface Meeting {
  id: number;
  title: string;
  status: "draft" | "published" | "pending";
  date: string;
}

export default function Meetings() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([
    { id: 1, title: "Board Meeting", status: "pending", date: "04/07" },
    { id: 2, title: "Team Sync", status: "published", date: "21/02" },
    { id: 3, title: "Project Kickoff", status: "draft", date: "05/08" },
  ]);

  const [filter, setFilter] = useState<"all" | "draft" | "published" | "pending">("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const handleSortToggle = () => {
    const newSortOrder = sortOrder === "latest" ? "oldest" : "latest";
    setSortOrder(newSortOrder);
    setMeetings((prevMeetings) =>
      [...prevMeetings].sort((a, b) => (newSortOrder === "latest" ? b.id - a.id : a.id - b.id))
    );
  };

  const filteredMeetings =
    filter === "all" ? meetings : meetings.filter((meeting) => meeting.status === filter);

  return (
    <div className="sm:px-6 w-full">
      {/* Header */}
      <div className="px-4 md:px-10 py-4 md:py-7 flex justify-between items-center">
        {/* <p className="text-xl font-bold text-gray-800">Meetings</p> */}
      </div>

      {/* Filters and Add Button */}
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="sm:flex items-center justify-between mt-2">
          <Tabs value={filter} onValueChange={(value) => setFilter(value as "all" | "draft" | "published" | "pending")}>
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
                    <span className="text-base font-medium text-gray-700">{meeting.title}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm leading-none text-gray-600">{meeting.status}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm leading-none text-gray-600">{meeting.date}</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="text-indigo-600 mr-2">
                      Edit
                    </Button>
                    {meeting.status !== "published" && (
                      <Button variant="link" className="text-red-600 mr-2">
                        Delete
                      </Button>
                    )}
                    {meeting.status === "published" && (
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
