// src/components/CallCentre/CallCentre.tsx
import React from 'react';

const CallCentre: React.FC = () => {
  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      padding: '1.5rem', 
      borderRadius: '12px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
      width: '100%', 
      maxWidth: '400px'
    }}>
      <h2 style={{ color: '#003366', marginBottom: '1rem' }}>📞 Call Centre</h2>
      <p style={{ marginBottom: '1rem' }}>Prefer to speak to an agent? Contact us directly:</p>
      <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', lineHeight: '1.8' }}>
        <li><strong>Phone:</strong> 0800 123 456 (Toll-Free)</li>
        <li><strong>Support Hours:</strong> 24/7 (including public holidays)</li>
        <li><strong>Email:</strong> <a href="mailto:support@ccma.org.za">support@ccma.org.za</a></li>
      </ul>
    </div>
  );
};

export default CallCentre;