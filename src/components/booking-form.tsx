"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CalendarCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_EMAIL, subjects } from "@/lib/catalog";
import { slotsForDate, upcomingDays } from "@/lib/slots";
import { cn } from "@/lib/utils";

const selectClassName = cn(
  "h-10 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

type BookingFormProps = {
  initialSubjectId?: string;
  initialTutorId?: string;
};

type Confirmation = {
  confirmation: string;
  slotLabel: string;
  tutor: string;
  subject: string;
  email: string;
  storage?: "supabase" | "memory";
};

export function BookingForm({ initialSubjectId, initialTutorId }: BookingFormProps) {
  const days = useMemo(() => upcomingDays(12), []);
  const [subjectId, setSubjectId] = useState(initialSubjectId ?? "");
  const [tutorId, setTutorId] = useState(initialTutorId ?? "asa");
  const [date, setDate] = useState(days[0]?.iso ?? "");
  const [slotId, setSlotId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const slots = date ? slotsForDate(date) : [];
  const openSlots = slots.filter((slot) => slot.available);

  function onSubjectChange(next: string | null) {
    setSubjectId(next ?? "");
    setTutorId("asa");
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subjectId,
          tutorId,
          slotId,
          notes,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "We could not hold that slot.");
      }
      setConfirmation(data as Confirmation);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not hold that slot.");
    } finally {
      setPending(false);
    }
  }

  if (confirmation) {
    return (
      <Alert className="border-primary/30 bg-secondary/40 p-6">
        <CalendarCheck />
        <AlertTitle className="font-heading text-xl">Lesson held — {confirmation.confirmation}</AlertTitle>
        <AlertDescription className="mt-2 space-y-2 text-foreground/80">
          <p>
            {confirmation.subject} with {confirmation.tutor} on {confirmation.slotLabel}.
          </p>
          <p>
            A confirmation will go to {confirmation.email}. Send an Interac e-Transfer to{" "}
            <a className="font-medium text-primary underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            before the session. 24-hour cancellation policy.
          </p>
          <p className="text-sm text-muted-foreground">
            {confirmation.storage === "supabase"
              ? "This hold is saved in Supabase."
              : "This hold is in server memory until you connect Supabase. Restarting the app clears it."}
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error ? (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Could not book</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="student-name">Student name</Label>
          <Input
            id="student-name"
            className="h-10"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jordan Chen"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Your email</Label>
          <Input
            id="email"
            type="email"
            className="h-10"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="jordan@example.com"
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="subject">Course</Label>
          <select
            id="subject"
            name="subject"
            className={selectClassName}
            value={subjectId}
            onChange={(event) => onSubjectChange(event.target.value)}
            required
          >
            <option value="">Choose a course</option>
            {subjects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tutor">Tutor</Label>
          <input type="hidden" id="tutor" name="tutor" value={tutorId} />
          <p className="flex h-10 items-center rounded-lg border border-input px-2.5 text-sm">
            Asa Nichols
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="day">Day</Label>
        {days.length === 0 ? (
          <Alert>
            <AlertTitle>No Google Meet days on this calendar</AlertTitle>
            <AlertDescription>
              This preview calendar skips Friday and Sunday. Try another day.
            </AlertDescription>
          </Alert>
        ) : (
          <select
            id="day"
            name="day"
            className={selectClassName}
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setSlotId("");
            }}
            required
          >
            {days.map((day) => (
              <option key={day.iso} value={day.iso}>
                {day.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="space-y-3">
        <Label>Time</Label>
        {openSlots.length === 0 ? (
          <Alert>
            <AlertTitle>No open slots this day</AlertTitle>
            <AlertDescription>
              {date
                ? "Every remaining hour is already held. Try another afternoon — Saturday mornings often open up."
                : "Pick a day to see studio hours."}
            </AlertDescription>
          </Alert>
        ) : (
          <RadioGroup
            className="grid gap-2 sm:grid-cols-2"
            value={slotId}
            onValueChange={(value) => setSlotId(value ?? "")}
          >
            {slots.map((slot) => (
              <label
                key={slot.id}
                className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 has-disabled:opacity-40"
              >
                <RadioGroupItem value={slot.id} disabled={!slot.available} />
                <span className="text-sm">
                  {slot.time}
                  {!slot.available ? (
                    <span className="ml-2 text-muted-foreground">Held</span>
                  ) : null}
                </span>
              </label>
            ))}
          </RadioGroup>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">What is stuck? (optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Optional: the Western course week or problem set you want to cover."
        />
      </div>

      <Button type="submit" disabled={pending || openSlots.length === 0} className="h-10 px-5">
        {pending ? "Holding the slot…" : "Request this lesson"}
      </Button>
    </form>
  );
}
