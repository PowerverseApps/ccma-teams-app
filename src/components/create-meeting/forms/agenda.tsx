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
  };
 
  return (
    <div className="w-full max-w-xl mx-auto p-4">
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
    </div>
  );
}
 
