import React, { useState } from "react";

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

export default function Resolution() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [agendaItem, setAgendaItem] = useState("");
  const [options, setOptions] = useState<Option[]>([{
    id: 1,
    text: "Yes"
  }, {
    id: 2,
    text: "No"
  }]);

  const handleOptionChange = (id: number, text: string) => {
    setOptions(prev => prev.map(opt => opt.id === id ? { ...opt, text } : opt));
  };

  const addOption = () => {
    const newId = options.length ? Math.max(...options.map(o => o.id)) + 1 : 1;
    setOptions([...options, { id: newId, text: "" }]);
  };

  const removeOption = (id: number) => {
    setOptions(options.filter(opt => opt.id !== id));
  };

  const handleSubmit = () => {
    const config = {
      title,
      description,
      agendaItem,
      options: options.filter(o => o.text.trim() !== "")
    };
    console.log("Voting Config:", config);
    // submit config logic here
  };

  return (
    // <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-lg">
    <div className="w-full max-w-xl mx-auto p-4">
      <div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="agenda">Agenda Item</Label>
            <Select onValueChange={setAgendaItem} value={agendaItem}>
              <SelectTrigger id="agenda" className="mt-2">
                <SelectValue placeholder="Select an agenda item" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget Approval</SelectItem>
                <SelectItem value="policy">Policy Update</SelectItem>
                <SelectItem value="election">Board Electi   on</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resolution title"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter resolution description"
              className="mt-2"
            />
          </div>
<Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Vote Options</h2>
              <Button variant="outline" onClick={addOption}>Add Option</Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Add the options that participants can vote on. For example, "Yes", "No", or any other relevant choices.
            </p>
            {options.map((option) => (
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

          <Button className="w-full mt-4" onClick={handleSubmit}>Save Configuration</Button>
        </div>
      </div>
    </div>
  );
}