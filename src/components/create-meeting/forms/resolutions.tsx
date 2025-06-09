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
  const [savedResolutions, setSavedResolutions] = useState<typeof resolutions[]>([]);
  const [showNotification, setShowNotification] = useState(false);

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
    setSavedResolutions([...savedResolutions, resolutions]);
    // Optionally clear the form after saving
    updateResolutions({
      title: "",
      description: "",
      agendaItem: "",
      options: [],
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };
 
  return (
    <div className="w-full max-w-xl mx-auto p-4 relative">
      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300 animate-fade-in">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Resolution saved successfully!</span>
          </div>
        </div>
      )}

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
                <SelectItem value="election">Board Electi   on</SelectItem>
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
      {/* Display saved resolutions */}
      <div className="p-6">
        <h3 className="font-semibold mb-2">Saved Resolutions</h3>
        {savedResolutions.length === 0 && (
          <p className="text-gray-500">No resolutions saved yet.</p>
        )}
        <ul className="space-y-2">
          {savedResolutions.map((res, idx) => (
            <li key={idx} className="border rounded p-3">
              <div><strong>Agenda Item:</strong> {res.agendaItem}</div>
              <div><strong>Title:</strong> {res.title}</div>
              <div><strong>Description:</strong> {res.description}</div>
              <div>
                <strong>Options:</strong>
                <ul className="list-disc ml-6">
                  {res.options.map((opt) => (
                    <li key={opt.id}>{opt.text}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tailwind animation for fade-in */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease;
        }
      `}</style>
    </div>
  );
}