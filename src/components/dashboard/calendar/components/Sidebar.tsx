import React from "react";
import { format, isWithinInterval, startOfWeek, endOfWeek } from "date-fns";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  hour: number;
  type: "meeting" | "task" | "reminder";
}
interface SidebarProps {
  currentWeek: Date;
  weekDays: Date[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
  // ...other props if any
}

interface SidebarProps {
  currentWeek: Date;
  events: CalendarEvent[];
  onDeleteEvent: (id: number) => void;
}

export default function Sidebar({ currentWeek, events, onDeleteEvent }: SidebarProps) {
  // Get start and end of the current week (Monday to Sunday)
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });

  // Filter events that fall within current week
  const weeklyEvents = events.filter((event) =>
    isWithinInterval(new Date(event.date), { start: weekStart, end: weekEnd })
  );

  // Sort by date then hour
  weeklyEvents.sort((a, b) => {
    if (a.date === b.date) return a.hour - b.hour;
    return a.date.localeCompare(b.date);
  });

  return (
    <aside style={{ width: 300, borderLeft: "1px solid #ccc", padding: 16, overflowY: "auto", height: "100vh" }}>
      <h3>Upcoming Events This Week</h3>
      {weeklyEvents.length === 0 && <p>No upcoming events this week.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {weeklyEvents.map((event) => (
          <li
            key={event.id}
            style={{
              marginBottom: 12,
              padding: 8,
              border: "1px solid #ddd",
              borderRadius: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{event.title}</strong> <br />
              <small>
                {format(new Date(event.date), "EEE, MMM d")} at {event.hour.toString().padStart(2, "0")}:00
              </small>
            </div>
            <button
              onClick={() => onDeleteEvent(event.id)}
              style={{
                backgroundColor: "red",
                border: "none",
                color: "white",
                borderRadius: 4,
                cursor: "pointer",
                padding: "4px 8px",
              }}
              aria-label={`Delete event ${event.title}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
