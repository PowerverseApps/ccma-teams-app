import React, { useState } from 'react';

const participants = [
  { id: 1, name: 'John Smith', email: 'john.smith@company.com', role: 'Host' },
  { id: 2, name: 'Maria Garcia', email: 'm.garcia@company.com', role: 'Presenter' },
  { id: 3, name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Presenter' },
  { id: 4, name: 'Robert Williams', email: 'r.williams@company.com', role: 'Attendee' },
  { id: 5, name: 'Michael Brown', email: 'm.brown@company.com', role: 'Attendee' },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function getRoleColor(role: string) {
  switch (role) {
    case 'Host':
      return 'bg-purple-100 text-purple-700';
    case 'Presenter':
      return 'bg-blue-100 text-blue-700';
    case 'Attendee':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export default function Participants() {
  const [search, setSearch] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [savedParticipants, setSavedParticipants] = useState<Array<typeof participants[0]>[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  const filteredParticipants = participants.filter((p) =>
    [p.name, p.email, p.role].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleToggleParticipant = (id: number) => {
    setSelectedParticipants((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : [...prev, id]
    );
  };

  const confirmedParticipants = participants.filter((p) =>
    selectedParticipants.includes(p.id)
  );

  const handleSaveParticipants = () => {
    if (confirmedParticipants.length > 0) {
      setSavedParticipants([...savedParticipants, confirmedParticipants]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2500);
      setSelectedParticipants([]); // Optionally clear selection after save
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 font-sans relative" style={{ height: '80vh' }}>
      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300 animate-fade-in">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Participants saved successfully!</span>
          </div>
        </div>
      )}

      <div className="bg-background rounded-xl shadow p-6 border border-border h-full overflow-y-auto">
        {/* Search and Add Button */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search participants..."
            className="w-full max-w-sm border border-border rounded px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-background text-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Participants List */}
        <div>
          <p className="text-foreground font-semibold mb-2">
            Confirmed ({confirmedParticipants.length})
          </p>

          {filteredParticipants.map((participant) => {
            const isSelected = selectedParticipants.includes(participant.id);
            return (
              <div
                key={participant.id}
                className={`flex items-center justify-between py-3 border-b border-border last:border-0 transition-colors transition-transform duration-200 cursor-pointer rounded-md
                  ${isSelected ? 'bg-accent' : 'bg-background'}
                  hover:bg-accent/50 active:scale-95 focus-visible:outline-none`}
                onClick={() => handleToggleParticipant(participant.id)}
                tabIndex={0}
                aria-pressed={isSelected}
                style={{ fontFamily: 'inherit' }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold text-foreground">
                    {getInitials(participant.name)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{participant.name}</span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRoleColor(
                          participant.role
                        )}`}
                      >
                        {participant.role}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 12a4 4 0 01-8 0m8 0V8a4 4 0 10-8 0v4m8 0a4 4 0 01-8 0"
                        ></path>
                      </svg>
                      {participant.email}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <span className="text-primary font-bold text-lg select-none">✓</span>
                )}
              </div>
            );
          })}

          {filteredParticipants.length === 0 && (
            <div className="text-muted-foreground text-center py-6">
              No participants found.
            </div>
          )}
        </div>

        {/* Confirmed Participants List */}
        {confirmedParticipants.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-foreground">Confirmed Participants</h4>
            <ul className="space-y-2">
              {confirmedParticipants.map((p) => (
                <li key={p.id} className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="text-xs text-muted-foreground">{p.email}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRoleColor(p.role)}`}>
                    {p.role}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 inline-flex items-center justify-center px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150"
              onClick={handleSaveParticipants}
              type="button"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Save Confirmed Participants
            </button>
          </div>
        )}

        {/* Saved Participants Display */}
        {savedParticipants.length > 0 && (
          <div className="mt-8">
            <h4 className="font-semibold mb-2 text-foreground">Saved Participants Groups</h4>
            <ul className="space-y-4">
              {savedParticipants.map((group, idx) => (
                <li key={idx} className="border rounded p-3 bg-muted/50">
                  <div className="font-medium mb-1">Group {idx + 1}</div>
                  <ul className="space-y-1">
                    {group.map((p) => (
                      <li key={p.id} className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{p.name}</span>
                        <span className="text-xs text-muted-foreground">{p.email}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRoleColor(p.role)}`}>
                          {p.role}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
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
