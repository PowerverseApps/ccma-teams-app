
import React from "react";
import { Button } from "../../ui/button";

interface ParticipantsNotFoundProps {
  clearSearch: () => void;
}

export const ParticipantsNotFound = ({ clearSearch }: ParticipantsNotFoundProps) => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
      <p className="text-gray-500">No participants found matching your search.</p>
      <Button variant="outline" className="mt-4" onClick={clearSearch}>Clear Search</Button>
    </div>
  );
};