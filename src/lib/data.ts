import {
  getPackage,
  packages as catalogPackages,
  type LessonPackage,
} from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/env";
import { getSupabase } from "@/lib/supabase";

export type BookingInput = {
  confirmation: string;
  name: string;
  email: string;
  subjectId: string;
  tutorId: string;
  slotId: string;
  slotLabel: string;
  notes: string;
};

export type PaymentInput = {
  confirmation: string;
  packageId: string;
  packageName: string;
  amountCents: number;
  email: string;
  name: string;
  mode: "stripe" | "mock";
  status: "paid" | "checkout_created";
  stripeSessionId?: string;
};

export type StoredBooking = BookingInput & {
  createdAt: string;
  source: "supabase" | "memory";
};

export type StoredPayment = PaymentInput & {
  createdAt: string;
  source: "supabase" | "memory";
};

const memoryBookings: StoredBooking[] = [];
const memoryPayments: StoredPayment[] = [];

function mapPackageRow(row: Record<string, unknown>): LessonPackage | null {
  const id = String(row.id ?? "");
  const fallback = getPackage(id);
  if (!id) return null;
  return {
    id,
    name: String(row.name ?? fallback?.name ?? "Lesson pack"),
    sessions: Number(row.sessions ?? fallback?.sessions ?? 1),
        minutes: Number(row.minutes ?? fallback?.minutes ?? 60),
    priceCents: Number(row.price_cents ?? fallback?.priceCents ?? 0),
    perSessionCents: Number(row.per_session_cents ?? fallback?.perSessionCents ?? 0),
    headline: String(row.headline ?? fallback?.headline ?? ""),
    description: String(row.description ?? fallback?.description ?? ""),
    includes: Array.isArray(row.includes)
      ? (row.includes as string[])
      : fallback?.includes ?? [],
    bestFor: String(row.best_for ?? fallback?.bestFor ?? ""),
        featured: Boolean(row.featured ?? fallback?.featured),
        groupSize:
          typeof row.group_size === "string"
            ? row.group_size
            : fallback?.groupSize,
  };
}

export async function loadPackages(): Promise<{
  packages: LessonPackage[];
  source: "supabase" | "catalog";
}> {
  const client = getSupabase();
  if (!client) {
    return { packages: catalogPackages, source: "catalog" };
  }

  const { data, error } = await client
    .from("packages")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return { packages: catalogPackages, source: "catalog" };
  }

  return {
    packages: data
      .map((row) => mapPackageRow(row as Record<string, unknown>))
      .filter((item): item is LessonPackage => Boolean(item)),
    source: "supabase",
  };
}

export async function slotIsTaken(slotId: string) {
  if (memoryBookings.some((item) => item.slotId === slotId)) return true;
  const client = getSupabase();
  if (!client) return false;
  const { data, error } = await client
    .from("bookings")
    .select("id")
    .eq("slot_id", slotId)
    .limit(1);
  if (error) {
    throw new Error(`Supabase could not check that slot: ${error.message}`);
  }
  return Boolean(data?.length);
}

export async function saveBooking(input: BookingInput): Promise<StoredBooking> {
  const record: StoredBooking = {
    ...input,
    createdAt: new Date().toISOString(),
    source: isSupabaseConfigured() ? "supabase" : "memory",
  };

  const client = getSupabase();
  if (client) {
    const { error } = await client.from("bookings").insert({
      confirmation: input.confirmation,
      name: input.name,
      email: input.email,
      subject_id: input.subjectId,
      tutor_id: input.tutorId,
      slot_id: input.slotId,
      slot_label: input.slotLabel,
      notes: input.notes,
    });
    if (error) {
      throw new Error(`Supabase could not save the booking: ${error.message}`);
    }
    return record;
  }

  memoryBookings.push(record);
  return { ...record, source: "memory" };
}

export async function savePayment(input: PaymentInput): Promise<StoredPayment> {
  const record: StoredPayment = {
    ...input,
    createdAt: new Date().toISOString(),
    source: isSupabaseConfigured() ? "supabase" : "memory",
  };

  const client = getSupabase();
  if (client) {
    const { error } = await client.from("payments").upsert(
      {
        confirmation: input.confirmation,
        package_id: input.packageId,
        package_name: input.packageName,
        amount_cents: input.amountCents,
        email: input.email,
        name: input.name,
        mode: input.mode,
        status: input.status,
        stripe_session_id: input.stripeSessionId ?? null,
      },
      { onConflict: "confirmation" }
    );
    if (error) {
      throw new Error(`Supabase could not save the payment: ${error.message}`);
    }
    return record;
  }

  const duplicate = memoryPayments.find(
    (item) =>
      item.confirmation === input.confirmation ||
      (input.stripeSessionId && item.stripeSessionId === input.stripeSessionId)
  );
  if (duplicate) {
    duplicate.status = input.status;
    duplicate.email = input.email;
    duplicate.name = input.name;
    return duplicate;
  }
  memoryPayments.push(record);
  return { ...record, source: "memory" };
}

export function memoryStats() {
  return {
    bookings: memoryBookings.length,
    payments: memoryPayments.length,
    supabase: isSupabaseConfigured(),
  };
}
