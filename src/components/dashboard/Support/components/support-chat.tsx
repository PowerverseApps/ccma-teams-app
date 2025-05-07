
import React, { useState } from 'react';

interface Message {
  sender: 'user' | 'agent';
  text: string;
}

const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'agent', text: '👋 Hello! Welcome to CCMA Support. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, newMessage]);

    setTimeout(() => {
      const response = getAutoReply(input);
      setMessages(prev => [...prev, { sender: 'agent', text: response }]);
    }, 1000); // simulate typing delay

    setInput('');
  };

  const getAutoReply = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes('upload')) return 'To upload your board pack, click the “Upload” button at the top right.';
    if (lower.includes('help')) return 'Sure, I can help. Please describe the issue in detail.';
    if (lower.includes('hi') || lower.includes('hello')) return 'Hi there! How can I assist you today?';
    return 'Thank you for your message. A support agent will respond shortly.';
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '550px'
    }}>
      <h2 style={{ color: '#003366', marginBottom: '1rem' }}>💬 Live Chat</h2>

      <div style={{
        background: '#f0f0f0',
        borderRadius: '8px',
        padding: '1rem',
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? '#ffcc00' : '#003366',
              color: msg.sender === 'user' ? '#000' : '#fff',
              padding: '0.75rem 1rem',
              borderRadius: msg.sender === 'user'
                ? '16px 16px 0 16px'
                : '16px 16px 16px 0',
              maxWidth: '80%'
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: '#003366',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SupportChat;