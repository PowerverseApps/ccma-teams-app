import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { MeetingProvider, useMeetings, IResolutionItem } from "./components/meeting-context";
import { MeetingNavbar } from "./components/MeetingNavbar";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Check, Clock } from "lucide-react";

// Extended resolution properties as requested
interface ResolutionOption {
  id: number;
  text: string;
}

interface ExtendedResolution extends IResolutionItem {
  id: string;
  title: string;
  description: string;
  status: 'approved' | 'pending' | 'rejected';
  agendaItem?: string;
  options: ResolutionOption[];
  votes?: {
    yes: number;
    no: number;
    abstain: number;
  };
  createdAt: Date;
}

const mockResolutions: ExtendedResolution[] = [
  {
    id: "res-1",
    resolutionName: "Approve Q1 Budget Allocation",
    title: "Q1 Budget Approval",
    description: "Allocate $250,000 for Q2 marketing campaigns across digital and traditional channels.",
    resolutionDetails: "Allocate $250,000 for Q2 marketing campaigns across digital and traditional channels.",
    status: 'approved',
    agendaItem: "Q1 Financial Review",
    options: [
      { id: 1, text: "Yes" },
      { id: 2, text: "No" },
      { id: 3, text: "Abstain" }
    ],
    votes: {
      yes: 7,
      no: 1,
      abstain: 2
    },
    createdAt: new Date("2025-04-05")
  },
  {
    id: "res-2",
    resolutionName: "New Product Launch Timeline",
    title: "Product Launch Timeline Adjustment",
    description: "Move the product launch date from July to August to allow for additional quality testing.",
    resolutionDetails: "Move the product launch date from July to August to allow for additional quality testing.",
    status: 'pending',
    agendaItem: "New Product Launch Timeline",
    options: [
      { id: 1, text: "Yes" },
      { id: 2, text: "No" },
      { id: 3, text: "Abstain" }
    ],
    votes: {
      yes: 3,
      no: 2,
      abstain: 5
    },
    createdAt: new Date("2025-04-03")
  },
  {
    id: "res-3",
    resolutionName: "Team Structure Reorganization",
    title: "Development Team Restructuring",
    description: "Approve the proposed reorganization of the development team to support the new product strategy.",
    resolutionDetails: "Approve the proposed reorganization of the development team to support the new product strategy.",
    status: 'approved',
    agendaItem: "Team Structure Review",
    options: [
      { id: 1, text: "Yes" },
      { id: 2, text: "No" },
      { id: 3, text: "Abstain" }
    ],
    votes: {
      yes: 8,
      no: 0,
      abstain: 2
    },
    createdAt: new Date("2025-04-01")
  }
];

export function ResolutionView() {
  const { id } = useParams();
  const { meetings } = useMeetings();

  const meetingId = id ? parseInt(id) : -1;
  const meeting = meetings.find(m => m.id === meetingId);

  if (!meeting) {
    return <div>Meeting not found</div>;
  }

  // Compile all resolutions from agenda items
  const getResolutions = () => {
    if (meeting.Agenda.length > 0) {
      let allResolutions: IResolutionItem[] = [];
      meeting.Agenda.forEach(agendaItem => {
        if (agendaItem.agendaResolutions && agendaItem.agendaResolutions.length > 0) {
          allResolutions = [...allResolutions, ...agendaItem.agendaResolutions];
        }
      });
      return allResolutions.length > 0 ? allResolutions : mockResolutions;
    }
    return mockResolutions;
  };

  const resolutions = getResolutions();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800" variant="outline">
          <Check className="h-3 w-3 mr-1" />Approved
        </Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800" variant="outline">
          <Clock className="h-3 w-3 mr-1" />Pending
        </Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800" variant="outline">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800" variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <MeetingNavbar />
      
      <div className="flex justify-between items-center my-6">
        <h2 className="text-xl font-semibold">Resolutions</h2>
        <Button>New Resolution</Button>
      </div>
      
      {resolutions.length > 0 ? (
        <div className="space-y-4">
          {resolutions.map((resolution, index) => {
            // Cast to ExtendedResolution for accessing additional properties
            const extendedRes = resolution as unknown as ExtendedResolution;
            
            return (
              <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row justify-between items-start border-b pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <CardTitle className="text-lg">{resolution.resolutionName}</CardTitle>
                    {'status' in extendedRes && getStatusBadge(extendedRes.status)}
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {resolution.resolutionDetails && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="mt-1 text-gray-700">{resolution.resolutionDetails}</p>
                      </div>
                    )}
                    
                    {'agendaItem' in extendedRes && extendedRes.agendaItem && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Related Agenda Item</p>
                        <p className="mt-1 text-gray-700">{extendedRes.agendaItem}</p>
                      </div>
                    )}
                    
                    {'votes' in extendedRes && extendedRes.votes && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Voting Results</p>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-green-50 p-2 rounded text-center">
                            <p className="text-sm text-gray-600">Yes</p>
                            <p className="font-bold text-green-600">{extendedRes.votes.yes}</p>
                          </div>
                          <div className="bg-red-50 p-2 rounded text-center">
                            <p className="text-sm text-gray-600">No</p>
                            <p className="font-bold text-red-600">{extendedRes.votes.no}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded text-center">
                            <p className="text-sm text-gray-600">Abstain</p>
                            <p className="font-bold text-gray-600">{extendedRes.votes.abstain}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {'options' in extendedRes && extendedRes.options && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Voting Options</p>
                        <div className="flex gap-2">
                          {extendedRes.options.map(option => (
                            <Badge key={option.id} variant="outline" className="bg-blue-50 text-blue-800">
                              {option.text}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {'createdAt' in extendedRes && extendedRes.createdAt && (
                      <div className="text-sm text-gray-500">
                        Created on {extendedRes.createdAt.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500">No resolutions have been added yet.</p>
          <Button variant="outline" className="mt-4">Add First Resolution</Button>
        </div>
      )}
    </div>
  );
}

export function ResolutionPage() {
  return (
    <MeetingProvider>
      <ResolutionView />
    </MeetingProvider>
  );
}
