import { Link, useParams, useLocation } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";

export const MeetingNavbar = () => {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { name: "Details", path: `/details-meeting/${id}` },
    { name: "Agenda", path: `/details-meeting/${id}/agenda-screen` },
    { name: "Resolution", path: `/details-meeting/${id}/resolution` },
    { name: "Participants", path: `/details-meeting/${id}/participantsScreen` },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Meeting Details</h1>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-primary"
          asChild
        >
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      
      <div className="border-b flex flex-wrap">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors", 
              currentPath === item.path 
                ? "border-primary text-primary" 
                : "border-transparent hover:text-primary hover:border-primary/30"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
