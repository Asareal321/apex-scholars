import { getSubject, getTutor } from "@/lib/catalog";
import { memoryStats, saveBooking, slotIsTaken } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/env";
import { slotsForDate } from "@/lib/slots";

export const dynamic = "force-dynamic";

function confirmationCode() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `NL-${stamp}${rand}`;
}

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    subjectId?: string;
    tutorId?: string;
    slotId?: string;
    notes?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON booking request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const notes = body.notes?.trim() ?? "";

  if (name.length < 2) {
    return Response.json({ error: "Add the student’s name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Use a real email so we can confirm the slot." }, { status: 400 });
  }

  const subject = getSubject(body.subjectId);
  if (!subject) {
    return Response.json({ error: "Pick a subject from the list." }, { status: 400 });
  }

  const tutor = getTutor(body.tutorId);
  if (!tutor || !subject.tutorIds.includes(tutor.id)) {
    return Response.json({ error: "That tutor does not take this subject." }, { status: 400 });
  }

  const slotId = body.slotId ?? "";
  const date = slotId.slice(0, 10);
  const slot = slotsForDate(date).find((item) => item.id === slotId);
  if (!slot) {
    return Response.json({ error: "That time is not on the calendar." }, { status: 400 });
  }
  if (!slot.available) {
    return Response.json({ error: "That slot was just taken. Pick another time." }, { status: 409 });
  }

  try {
    if (await slotIsTaken(slot.id)) {
      return Response.json({ error: "That slot was just taken. Pick another time." }, { status: 409 });
    }

    const confirmation = confirmationCode();
    const saved = await saveBooking({
      confirmation,
      name,
      email,
      subjectId: subject.id,
      tutorId: tutor.id,
      slotId: slot.id,
      slotLabel: slot.label,
      notes,
    });

    return Response.json({
      confirmation,
      slotLabel: slot.label,
      tutor: tutor.name,
      subject: subject.name,
      email,
      storage: saved.source,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save the booking.";
    return Response.json({ error: message }, { status: 502 });
  }
}

export async function GET() {
  return Response.json({
    ...memoryStats(),
    supabase: isSupabaseConfigured(),
  });
}
