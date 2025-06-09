import React, { useState } from 'react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Textarea } from '../../ui/textarea'

export type AgendaItem = {
  title: string;
  description: string;
  duration: number;
  presenter: string;
  priority: 'High' | 'Medium' | 'Low';
};

function AgendaItemList({ items }: { items: AgendaItem[] }) {
  return (
    <div className="mt-6 space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border p-3 rounded-md shadow-sm">
          <h3 className="text-md font-semibold">  {index + 1}. {item.title} </h3>
          <p className="text-sm">{item.description}</p>
          <p className="text-xs text-gray-500">Presenter: {item.presenter}</p>
          <p className="text-xs text-gray-500">Duration: {item.duration} mins</p>
          <p className="text-xs text-gray-600">Priority: {item.priority}</p>
        </div>
      ))}
    </div>  
  )
}

export default function Agenda({ agenda, updateAgenda }: { agenda: AgendaItem[]; updateAgenda: (agenda: AgendaItem[]) => void }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    duration: '',
    presenter: '',
    priority: '',
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePriorityChange = (value: string) => {
    setForm({ ...form, priority: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: AgendaItem = {
      title: form.title,
      description: form.description,
      duration: parseInt(form.duration),
      presenter: form.presenter,
      priority: form.priority as 'High' | 'Medium' | 'Low',
    };
    updateAgenda([...agenda, newItem]);
    setForm({ title: '', description: '', duration: '', presenter: '', priority: '' });
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
            <span>Agenda item added successfully!</span>
          </div>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="agenda-title">Title</Label>
          <Input id="agenda-title" type="text" placeholder="Enter agenda item title" name="title" value={form.title} onChange={handleChange} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="agenda-description">Description</Label>
          <Textarea id="agenda-description" placeholder="Provide a brief description of the agenda item" name="description" value={form.description} onChange={handleChange} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="agenda-duration">Duration (minutes)</Label>
          <Input id="agenda-duration" type="number" name="duration" placeholder="Specify duration in minutes" value={form.duration} onChange={handleChange} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="agenda-presenter">Presenter</Label>
          <Input id="agenda-presenter" type="text" placeholder="Enter presenter's name" name="presenter" value={form.presenter} onChange={handleChange} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="agenda-priority">Priority</Label>
          <Select value={form.priority} onValueChange={handlePriorityChange}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Choose priority level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">Add Agenda Item</Button>
      </form>

      {agenda.length > 0 && <AgendaItemList items={agenda} />}

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
