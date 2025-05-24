import React from 'react';
import { Decision } from './App';
import './Controls.css';
 
interface Props {
  decisions: Decision[];
  updateDecisions: (list: Decision[]) => void;
}
 
const Controls: React.FC<Props> = ({ decisions, updateDecisions }) => {
  const handleFilter = () => {
    const pending = decisions.filter(d => d.status === 'Pending');
    updateDecisions(pending);
  };
 
  const handleSort = () => {
    const sorted = [...decisions].sort((a, b) => a.title.localeCompare(b.title));
    updateDecisions(sorted);
  };
 
  const handleExport = () => {
    const csv = decisions.map(d =>
      `${d.id},${d.title},${d.category},${d.assignedTo},${d.date},${d.status}`
    ).join('\n');
 
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
 
    const a = document.createElement('a');
    a.href = url;
    a.download = 'decisions.csv';
    a.click();
 
    URL.revokeObjectURL(url);
  };
 
  const handleEmail = () => {
    alert('Simulating email sending...\n(This would require backend or API integration)');
  };
 
  return (
    <div className="controls">
      <button onClick={handleFilter}>Filter Pending</button>
      <button onClick={handleSort}>Sort A-Z</button>
      <button onClick={handleExport}>Export CSV</button>
      <button onClick={handleEmail}>Send via Email</button>
    </div>
  );
};
 
export default Controls;
 
 