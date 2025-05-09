import React from "react";

import { X } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Separator } from "../../ui/separator";
import { Textarea } from "../../ui/textarea";

interface Option {
  id: number;
  text: string;
}

interface ResolutionsProps {
  resolutions: {
    title: string;
    description: string;
    agendaItem: string;
    options: Option[];
  };
  updateResolutions: (resolutions: {
    title: string;
    description: string;
    agendaItem: string;
    options: Option[];
  }) => void;
}

export default function Resolution({ resolutions, updateResolutions }: ResolutionsProps) {
  const handleOptionChange = (id: number, text: string) => {
    const updatedOptions = resolutions.options.map((opt) =>
      opt.id === id ? { ...opt, text } : opt
    );
    updateResolutions({ ...resolutions, options: updatedOptions });
  };

  const addOption = () => {
    const newId = resolutions.options.length
      ? Math.max(...resolutions.options.map((o) => o.id)) + 1
      : 1;
    updateResolutions({
      ...resolutions,
      options: [...resolutions.options, { id: newId, text: "" }],
    });
  };

  const removeOption = (id: number) => {
    const updatedOptions = resolutions.options.filter((opt) => opt.id !== id);
    updateResolutions({ ...resolutions, options: updatedOptions });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateResolutions({ ...resolutions, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Voting Config:", resolutions);
    // submit config logic here
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="agenda">Agenda Item</Label>
            <Select
              onValueChange={(value) => updateResolutions({ ...resolutions, agendaItem: value })}
              value={resolutions.agendaItem}
            >
              <SelectTrigger id="agenda" className="mt-2">
                <SelectValue placeholder="Select an agenda item" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget Approval</SelectItem>
                <SelectItem value="policy">Policy Update</SelectItem>
                <SelectItem value="election">Board Election</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={resolutions.title}
              onChange={handleChange}
              placeholder="Enter resolution title"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={resolutions.description}
              onChange={handleChange}
              placeholder="Enter resolution description"
              className="mt-2"
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Vote Options</h2>
              <Button variant="outline" onClick={addOption}>
                Add Option
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Add the options that participants can vote on. For example, "Yes", "No", or any other relevant choices.
            </p>
            {resolutions.options.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <Input
                  value={option.text}
                  onChange={(e) => handleOptionChange(option.id, e.target.value)}
                  placeholder="Option text"
                  className="mt-2"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(option.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button className="w-full mt-4" onClick={handleSubmit}>
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}