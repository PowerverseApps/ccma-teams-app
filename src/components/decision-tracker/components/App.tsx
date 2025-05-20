import React, { useState } from 'react';
import NavBar from './Navbar';
import NewDecisionForm from './NewDecisionForm';
import Controls from './controls';
import DecisionList from './decisionList';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';
 
export interface Decision {
  id: number;
  title: string;
  category: string;
  assignedTo: string;
  date: string;
  status: string;
  description: string;
  attachments: string[];
}
 
function App() {
  const [decisions, setDecisions] = useState<Decision[]>([
    {
      id: 1,
      title: 'Budget Approval',
      category: 'Financial',
      assignedTo: 'Jane Frank',
      date: '2023-09-09',
      status: 'Pending',
      description: 'Approve the new budget for Q4.',
      attachments: []
    },
    {
      id: 2,
      title: 'New Hiring',
      category: 'Operational',
      assignedTo: 'Anderson',
      date: '2022-03-30',
      status: 'In Progress',
      description: 'Hire 2 new developers for the mobile team.',
      attachments: []
    },
    {
      id: 3,
      title: 'System Upgrade',
      category: 'Strategic',
      assignedTo: 'Mr. Trott',
      date: '2023-01-31',
      status: 'Completed',
      description: 'Upgrade the server infrastructure for better performance.',
      attachments: []
    },
    {
      id: 4,
      title: 'Policy Review',
      category: 'Governance',
      assignedTo: 'Sarah Lee',
      date: '2023-11-15',
      status: 'Completed',
      description: 'Review and update the company HR policies.',
      attachments: []
    }
  ]);
 
  const addDecision = (decision: Omit<Decision, 'id'>) => {
    const newDecision = { ...decision, id: Date.now() };
    setDecisions([newDecision, ...decisions]);
  };
 
  const updateDecisions = (updatedList: Decision[]) => {
    setDecisions(updatedList);
  };
 
  // Prepare data for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
 
  const statusData = Array.from(
    decisions.reduce((acc, dec) => {
      acc.set(dec.status, (acc.get(dec.status) || 0) + 1);
      return acc;
    }, new Map<string, number>()),
    ([name, value]) => ({ name, value })
  );
 
  const categoryData = Array.from(
    decisions.reduce((acc, dec) => {
      acc.set(dec.category, (acc.get(dec.category) || 0) + 1);
      return acc;
    }, new Map<string, number>()),
    ([name, value]) => ({ name, value })
  );
 
  const totalDecisions = decisions.length;
  const completedCount = decisions.filter(d => d.status === 'Completed').length;
  const completionRate = ((completedCount / totalDecisions) * 100).toFixed(1);
 
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '1rem', background: '#f5f5f5' }}>
      {/* Nav */}
      <div style={{ marginBottom: '1rem' }}>
        <NavBar />
      </div>
 
      {/* New Decision */}
      <div style={{
        background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Add New Decision</h2>
        <NewDecisionForm onAddDecision={addDecision} />
      </div>
 
      {/* Controls + List */}
      <div style={{
        background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Manage Decisions</h2>
        <Controls decisions={decisions} updateDecisions={updateDecisions} />
        <DecisionList decisions={decisions} />
      </div>
 
      {/* Reports + Analytics */}
      <div style={{
        background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Decision Reports & Analytics</h2>
 
        {/* Quick Summary */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{
            flex: 1, background: '#e3f2fd', padding: '1rem', borderRadius: '8px', textAlign: 'center'
          }}>
            <h3>Total Decisions</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalDecisions}</p>
          </div>
          <div style={{
            flex: 1, background: '#e8f5e9', padding: '1rem', borderRadius: '8px', textAlign: 'center'
          }}>
            <h3>Completion Rate</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{completionRate}%</p>
          </div>
        </div>
 
        {/* Pie Chart */}
        <div style={{ marginBottom: '2rem' }}>
          <h3>Decisions by Status</h3>
          <p>This pie chart shows how decisions are distributed by their current status (e.g., Pending, In Progress, Completed).</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={400} height={400}>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
 
        {/* Bar Chart */}
        <div>
          <h3>Decisions by Category</h3>
          <p>This bar chart shows how many decisions belong to each category (e.g., Financial, Operational, Strategic).</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BarChart
              width={600}
              height={400}
              data={categoryData}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default App;
 
 