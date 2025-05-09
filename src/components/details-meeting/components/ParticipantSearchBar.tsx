
import React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Search, UserPlus } from "lucide-react";

interface ParticipantSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const ParticipantSearchBar = ({ searchTerm, setSearchTerm }: ParticipantSearchBarProps) => {
  return (
    <div className="flex w-full sm:w-auto gap-2">
      <div className="relative flex-1 sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search participants..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button className="whitespace-nowrap">
        <UserPlus className="h-4 w-4 mr-2" />
        Add Participant
      </Button>
    </div>
  );
};
