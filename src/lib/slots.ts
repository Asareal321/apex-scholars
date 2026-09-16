export type TimeSlot = {
  id: string;
  date: string;
  weekday: string;
  label: string;
  time: string;
  available: boolean;
};

const weekdayTimes: Record<number, string[]> = {
  0: [],
  1: ["15:30", "16:30", "17:30", "18:30", "19:30"],
  2: ["15:30", "16:30", "17:30", "18:30", "19:30"],
  3: ["15:30", "16:30", "17:30", "18:30", "19:30"],
  4: ["15:30", "16:30", "17:30", "18:30", "19:30"],
  5: [],
  6: ["10:00", "11:00", "13:00"],
};

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function formatTime(hhmm: string) {
  const [hours, minutes] = hhmm.split(":").map(Number);
  const date = new Date(Date.UTC(2026, 0, 1, hours, minutes));
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

export function upcomingDays(count = 14) {
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  const days: { iso: string; label: string; weekday: string }[] = [];
  for (let offset = 1; days.length < count && offset < 40; offset += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    const weekdayIndex = date.getDay();
    if (!weekdayTimes[weekdayIndex]?.length) continue;
    days.push({
      iso: date.toISOString().slice(0, 10),
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    });
  }
  return days;
}

export function slotsForDate(iso: string): TimeSlot[] {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return [];
  const times = weekdayTimes[date.getDay()] ?? [];
  return times.map((time) => {
    const id = `${iso}T${time}`;
    const taken = hashString(id) % 5 === 0;
    return {
      id,
      date: iso,
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
      label: `${date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })} · ${formatTime(time)} PT`,
      time: formatTime(time),
      available: !taken,
    };
  });
}
