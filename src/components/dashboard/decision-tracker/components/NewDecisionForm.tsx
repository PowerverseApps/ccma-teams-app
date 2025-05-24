import React, { useState } from 'react';
import { Decision } from './App';
 
interface Props {
  onAddDecision: (decision: Omit<Decision, 'id'>) => void;
}
 
const NewDecisionForm: React.FC<Props> = ({ onAddDecision }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    assignedTo: '',
    date: '',
    status: '',
    description: '',
    attachments: [] as string[],
  });
 
  const [error, setError] = useState<string | null>(null);
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...fileNames],
      }));
    }
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, category, assignedTo, date, status, description } = formData;
 
    if (!title || !category || !assignedTo || !date || !status || !description) {
      setError('Please fill in all fields.');
      return;
    }
 
    setError(null);
    onAddDecision(formData);
    setFormData({
      title: '',
      category: '',
      assignedTo: '',
      date: '',
      status: '',
      description: '',
      attachments: [],
    });
  };
 
  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
 
      <input
        type="text"
        name="title"
        placeholder="Decision Title"
        value={formData.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />
 
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Select Category</option>
        <option value="Financial">Financial</option>
        <option value="Operational">Operational</option>
        <option value="Strategic">Strategic</option>
        <option value="Governance">Governance</option>
      </select>
 
      <input
        type="text"
        name="assignedTo"
        placeholder="Assigned To"
        value={formData.assignedTo}
        onChange={handleChange}
        required
        style={inputStyle}
      />
 
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        style={inputStyle}
      />
 
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
 
      <textarea
        name="description"
        placeholder="Decision Description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        required
        style={{ ...inputStyle, resize: 'vertical' }}
      />
 
      <div>
        <label style={{ fontWeight: 'bold' }}>Attach Files:</label>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          style={{ marginTop: '0.5rem' }}
        />
        {formData.attachments.length > 0 && (
          <ul>
            {formData.attachments.map((file, idx) => (
              <li key={idx}>{file}</li>
            ))}
          </ul>
        )}
      </div>
 
      <button
        type="submit"
        style={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '0.75rem',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Add Decision
      </button>
    </form>
  );
};
 
const inputStyle: React.CSSProperties = {
  padding: '0.6rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};
 
export default NewDecisionForm;
// This component allows users to add a new decision with various attributes.