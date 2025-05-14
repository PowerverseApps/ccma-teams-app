import React from 'react';
import MenuLayout from '../../layout/MenuLayout';

const actions = [
  {
    title: 'Create Task',
    description: 'Start a new task and assign it to your team.',
    action: () => {
      // Implement create task logic here
      alert('Create Task clicked');
    },
  },
  {
    title: 'View Reports',
    description: 'Check the latest reports and analytics.',
    action: () => {
      // Implement view reports logic here
      alert('View Reports clicked');
    },
  },
  {
    title: 'Manage Users',
    description: 'Add, remove, or update user permissions.',
    action: () => {
      // Implement manage users logic here
      alert('Manage Users clicked');
    },
  },
];

export default function Actions() {
  return (
    <MenuLayout>
      <div style={{ padding: '2rem' }}>
        <h1>Actions</h1>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {actions.map((action, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                minWidth: '220px',
                background: '#fafbfc',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <h2 style={{ margin: '0 0 0.5rem 0' }}>{action.title}</h2>
              <p style={{ margin: '0 0 1rem 0', color: '#555' }}>{action.description}</p>
              <button
                onClick={action.action}
                style={{
                  padding: '0.5rem 1.2rem',
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Go
              </button>
            </div>
          ))}
        </div>
      </div>
    </MenuLayout>
  );
}
