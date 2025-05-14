import React, { useState } from "react";
import { addDays, startOfWeek, format, isToday } from "date-fns";

const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM to 7PM

function getWeekDays(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

type EventType = "meeting" | "task" | "reminder";

interface CalendarEvent {
  id: number;
  title: string;
  date: string; // Format: YYYY-MM-DD
  hour: number; // 24-hour format
  type: EventType;
}

export default function TeamsLikeCalendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, title: "Team Meeting", type: "meeting", date: "2025-05-12", hour: 10 },
    { id: 2, title: "Design Review", type: "task", date: "2025-05-13", hour: 14 },
    { id: 3, title: "Standup", type: "reminder", date: "2025-05-14", hour: 9 },
  ]);

  const weekDays = getWeekDays(currentWeek);
  const goToPrevWeek = () => setCurrentWeek(addDays(currentWeek, -7));
  const goToNextWeek = () => setCurrentWeek(addDays(currentWeek, 7));

  return (
    <div style={{ fontFamily: "Segoe UI, Arial, sans-serif", background: "#f3f2f1", minHeight: "100vh", padding: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <button onClick={goToPrevWeek} style={{ marginRight: 8 }}>{"<"}</button>
        <span style={{ fontWeight: 600, fontSize: 20 }}>
          {format(weekDays[0], "MMM d")} - {format(weekDays[6], "MMM d, yyyy")}
        </span>
        <button onClick={goToNextWeek} style={{ marginLeft: 8 }}>{">"}</button>
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "60px repeat(7, 1fr)",
        border: "1px solid #e1dfdd",
        borderRadius: 6,
        background: "#fff"
      }}>
        {/* Weekdays Header */}
        <div style={{ background: "#f3f2f1" }}></div>
        {weekDays.map((day) => (
          <div key={day.toISOString()} style={{
            padding: 8, textAlign: "center", background: isToday(day) ? "#e5f1fb" : "#f3f2f1",
            color: isToday(day) ? "#0078d4" : "#323130", fontWeight: isToday(day) ? 700 : 500,
            borderBottom: "1px solid #e1dfdd",
          }}>
            <div>{format(day, "EEE")}</div>
            <div>{format(day, "d")}</div>
          </div>
        ))}

        {/* Time Slots */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div style={{ padding: 8, borderRight: "1px solid #e1dfdd", color: "#605e5c", fontSize: 12 }}>
              {format(new Date(0, 0, 0, hour), "h a")}
            </div>
            {weekDays.map((day) => {
              const dayStr = format(day, "yyyy-MM-dd");
              const matchingEvent = events.find((event) => event.date === dayStr && event.hour === hour);

              return (
                <div key={`${dayStr}-${hour}`} style={{
                  minHeight: 40, borderRight: "1px solid #e1dfdd", borderBottom: "1px solid #e1dfdd",
                  background: isToday(day) ? "#f3fafd" : "#fff", position: "relative",
                  cursor: "pointer", padding: 4,
                }} onClick={() => alert(`Clicked ${dayStr} ${hour}:00`)}>
                  {matchingEvent && (
                    <div style={{
                      background: matchingEvent.type === "meeting" ? "#cce4ff" :
                        matchingEvent.type === "task" ? "#fff4ce" : "#dff6dd",
                      color: "#333", padding: "2px 4px", borderRadius: 4, fontSize: 12,
                      fontWeight: 500, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                    }}>
                      {matchingEvent.title}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}