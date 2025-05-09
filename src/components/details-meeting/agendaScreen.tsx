import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { MeetingProvider, useMeetings, IAgendaItem, IAttachment, IAttendee, IResolutionItem } from "../details-meeting/components/meeting-context";
import { MeetingNavbar } from "./components/MeetingNavbar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Paperclip } from "lucide-react";

// Additional mock data for agenda items with complete properties
const mockAgendaItems: IAgendaItem[] = [
  {
    agendaItemName: "Q1 Financial Review",
    agendaItemType: "Discussion",
    agendaItemUrl: "https://example.com/financial-review",
    agendaPresenter: { name: "Sarah Johnson", email: "sarah.j@company.com" },
    agendaApprover: { name: "Michael Chen", email: "m.chen@company.com" },
    agendaItemFiles: [
      { name: "Q1 Results.pdf", id: "1", DocumentUrl: "#" },
      { name: "Future Projections.xlsx", id: "2", DocumentUrl: "#" }
    ],
    agendaResolutions: [
      { 
        resolutionName: "Approve Q1 budget allocation",
        resolutionDetails: "Allocate $250,000 for Q2 marketing campaigns across digital and traditional channels."
      }
    ]
  },
  {
    agendaItemName: "New Product Launch Timeline",
    agendaItemType: "Decision",
    agendaItemUrl: "https://example.com/product-launch",
    agendaPresenter: { name: "David Williams", email: "d.williams@company.com" },
    agendaApprover: { name: "Jennifer Lopez", email: "j.lopez@company.com" },
    agendaItemFiles: [
      { name: "Product Launch Plan.pdf", id: "3", DocumentUrl: "#" },
      { name: "Market Analysis.pdf", id: "4", DocumentUrl: "#" }
    ],
    agendaResolutions: [
      {
        resolutionName: "Approve new launch date",
        resolutionDetails: "Move the product launch date from July to August to allow for additional quality testing."
      }
    ]
  },
  {
    agendaItemName: "Team Structure Review",
    agendaItemType: "Information",
    agendaItemUrl: "https://example.com/team-structure",
    agendaPresenter: { name: "Emily Rodriguez", email: "e.rodriguez@company.com" },
    agendaApprover: { name: "Robert Smith", email: "r.smith@company.com" },
    agendaItemFiles: [
      { name: "Org Chart.pdf", id: "5", DocumentUrl: "#" }
    ],
    agendaResolutions: [
      {
        resolutionName: "Approve team reorganization",
        resolutionDetails: "Approve the proposed reorganization of the development team to support the new product strategy."
      }
    ]
  }
];

export function AgendaView() {
  const { id } = useParams();
  const { meetings, updateMeeting } = useMeetings();

  const meetingId = id ? parseInt(id) : -1;
  const meeting = meetings.find(m => m.id === meetingId);

  if (!meeting) {
    return <div>Meeting not found</div>;
  }

  // If meeting has no agenda items, use mock data
  const agendaItems = meeting.Agenda.length > 0 ? meeting.Agenda : mockAgendaItems;

  const getAgendaTypeBadgeColor = (type?: string) => {
    switch(type?.toLowerCase()) {
      case 'discussion': return "bg-blue-100 text-blue-800";
      case 'decision': return "bg-purple-100 text-purple-800";
      case 'information': return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <MeetingNavbar />
      
      <div className="flex justify-between items-center my-6">
        <h2 className="text-xl font-semibold">Agenda Items</h2>
        <Button>Add Agenda Item</Button>
      </div>
      
      {agendaItems.length > 0 ? (
        <div className="space-y-4">
          {agendaItems.map((item, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row justify-between items-start border-b pb-2">
                <div>
                  <CardTitle className="text-lg">{item.agendaItemName}</CardTitle>
                  {item.agendaItemType && (
                    <Badge className={getAgendaTypeBadgeColor(item.agendaItemType)} variant="outline">
                      {item.agendaItemType}
                    </Badge>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {item.agendaItemUrl && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">URL</p>
                      <a href={item.agendaItemUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {item.agendaItemUrl}
                      </a>
                    </div>
                  )}
                  
                  {/* Presenter and Approver Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.agendaPresenter && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Presenter</p>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="font-medium">{item.agendaPresenter.name}</p>
                          <p className="text-sm text-gray-600">{item.agendaPresenter.email}</p>
                        </div>
                      </div>
                    )}
                    
                    {item.agendaApprover && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Approver</p>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="font-medium">{item.agendaApprover.name}</p>
                          <p className="text-sm text-gray-600">{item.agendaApprover.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Attachments Section */}
                  {item.agendaItemFiles && item.agendaItemFiles.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Attachments</p>
                      <div className="space-y-2">
                        {item.agendaItemFiles.map((file, fileIndex) => (
                          <div key={fileIndex} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                            <Paperclip className="h-4 w-4 text-gray-500" />
                            <a href={file.DocumentUrl} className="text-blue-600 hover:underline">
                              {file.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Resolutions Section */}
                  {item.agendaResolutions && item.agendaResolutions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Resolutions</p>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                        {item.agendaResolutions.map((resolution, resIndex) => (
                          <li key={resIndex} className="text-gray-700">
                            {resolution.resolutionName}
                            {resolution.resolutionDetails && (
                              <p className="text-sm text-gray-500 ml-5">{resolution.resolutionDetails}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500">No agenda items have been added yet.</p>
          <Button variant="outline" className="mt-4">Add First Item</Button>
        </div>
      )}
    </div>
  );
}

export function AgendaPage() {
  return (
    <MeetingProvider>
      <AgendaView />
    </MeetingProvider>
  );
}
