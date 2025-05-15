import React, { useState } from "react";
import { addDays, startOfWeek, format, isToday } from "date-fns";
import "./TeamsLikeCalendar.css";

const hours = Array.from({ length: 24 }, (_, i) => i); // 00:00 - 23:00

type EventType = "meeting" | "task" | "reminder";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  hour: number;
  type: EventType;
}

function getWeekDays(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

const AddEventForm: React.FC<{
  weekDays: Date[];
  onAddEvent: (event: CalendarEvent) => void;
}> = ({ weekDays, onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<EventType>("meeting");
  const [date, setDate] = useState(format(weekDays[0], "yyyy-MM-dd"));
  const [hour, setHour] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onAddEvent({ id: Date.now(), title, type, date, hour });
    setTitle("");
    setType("meeting");
    setDate(format(weekDays[0], "yyyy-MM-dd"));
    setHour(0);
  };

  return (
    <form className="add-event-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value as EventType)}>
        <option value="meeting">Meeting</option>
        <option value="task">Task</option>
        <option value="reminder">Reminder</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={hour} onChange={(e) => setHour(Number(e.target.value))}>
        {hours.map((h) => (
          <option key={h} value={h}>
            {format(new Date(0, 0, 0, h), "HH:mm")}
          </option>
        ))}
      </select>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default function TeamsLikeCalendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, title: "Team Meeting", type: "meeting", date: "2025-05-12", hour: 10 },
    { id: 2, title: "Design Review", type: "task", date: "2025-05-20", hour: 14 },
    { id: 3, title: "Standup", type: "reminder", date: "2025-06-01", hour: 9 },
    { id: 4, title: "Strategy Meeting", type: "meeting", date: "2025-07-10", hour: 15 },
    { id: 5, title: "Follow-up Task", type: "task", date: "2025-08-18", hour: 11 },
    { id: 6, title: "Reminder Call", type: "reminder", date: "2025-09-30", hour: 8 },
    { id: 1, title: "Team Meeting", type: "meeting", date: "2025-05-12", hour: 10 },
  { id: 2, title: "Design Review", type: "task", date: "2025-05-20", hour: 14 },
  { id: 3, title: "Standup", type: "reminder", date: "2025-05-01", hour: 8 },
  { id: 4, title: "Strategy Meeting", type: "meeting", date: "2025-05-07", hour: 15 },
  { id: 5, title: "Follow-up Task", type: "task", date: "2025-05-11", hour: 11 },
  { id: 6, title: "Reminder Call", type: "reminder", date: "2025-05-13", hour: 8 },
  { id: 7, title: "Client Presentation", type: "meeting", date: "2025-05-15", hour: 16 },
  { id: 8, title: "Code Review", type: "task", date: "2025-05-18", hour: 13 },
  { id: 9, title: "Standup", type: "reminder", date: "2025-05-02", hour: 8 },
  { id: 10, title: "Team Lunch", type: "meeting", date: "2025-05-21", hour: 12 },
  { id: 11, title: "Bug Fixing", type: "task", date: "2025-05-23", hour: 9 },
  { id: 12, title: "Standup", type: "reminder", date: "2025-05-05", hour: 8 },
  { id: 13, title: "Product Demo", type: "meeting", date: "2025-05-25", hour: 14 },
  { id: 14, title: "Documentation", type: "task", date: "2025-05-28", hour: 10 },
  { id: 15, title: "Standup", type: "reminder", date: "2025-05-06", hour: 8 },
  // Add recurring standup events for weekdays (Mon-Fri) in May at 8:45
  ...generateStandupEvents("2025-05-01", "2025-05-31"),
  ]);

  const weekDays = getWeekDays(currentWeek);
  const goToPrevWeek = () => setCurrentWeek(addDays(currentWeek, -7));
  const goToNextWeek = () => setCurrentWeek(addDays(currentWeek, 7));

  return (
    <div className="calendar-wrapper">
      <div className="calendar-main">
        <div className="calendar-header">
          <button onClick={goToPrevWeek}>←</button>
          <h2>
            {format(weekDays[0], "MMM d")} - {format(weekDays[6], "MMM d, yyyy")}
          </h2>
          <button onClick={goToNextWeek}>→</button>
        </div>

        <AddEventForm
          weekDays={weekDays}
          onAddEvent={(event) => setEvents([...events, event])}
        />

        <div className="calendar-grid">
          <div className="grid-corner"></div>
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className={`grid-header ${isToday(day) ? "today" : ""}`}
            >
              <div>{format(day, "EEE")}</div>
              <div>{format(day, "d")}</div>
            </div>
          ))}

          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="hour-label">{format(new Date(0, 0, 0, hour), "HH:mm")}</div>
              {weekDays.map((day) => {
                const dayStr = format(day, "yyyy-MM-dd");
                const event = events.find((e) => e.date === dayStr && e.hour === hour);
                return (
                  <div
                    key={`${dayStr}-${hour}`}
                    className={`calendar-cell ${isToday(day) ? "today" : ""}`}
                    onClick={() => {
                      alert(
                        event
                          ? `Event: ${event.title}\nType: ${event.type}\nTime: ${hour}:00`
                          : `No event at ${dayStr} ${hour}:00`
                      );
                    }}
                  >
                    {event && (
                      <div className={`event-box ${event.type}`}>
                        {event.title}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEvents(events.filter((ev) => ev.id !== event.id));
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
function generateStandupEvents(startDateStr: string, endDateStr: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  let id = 1000; // Start from a high id to avoid collision
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    // Monday to Friday (1-5)
    if (day >= 1 && day <= 5) {
      events.push({
        id: id++,
        title: "Standup",
        type: "reminder",
        date: d.toISOString().slice(0, 10),
        hour: 8,
        // minute: 45, // If you want to support minute, add it to CalendarEvent type
      });
    }
  }
  return events;
}

