import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCalendlyUrl, isStripeConfigured, isSupabaseConfigured } from "@/lib/env";

export function FallbackBanner({
  calendly,
  stripe,
  supabase,
}: {
  calendly?: boolean;
  stripe?: boolean;
  supabase?: boolean;
}) {
  const notes: string[] = [];
  if (calendly && !getCalendlyUrl()) {
    notes.push("Calendly is unset, so the studio request form is live.");
  }
  if (stripe && !isStripeConfigured()) {
    notes.push("Stripe is unset, so checkout uses the local payment sandbox.");
  }
  if (supabase && !isSupabaseConfigured()) {
    notes.push("Supabase is unset, so bookings and payments stay in server memory.");
  }
  if (notes.length === 0) return null;

  return (
    <Alert className="mb-8">
      <AlertTitle>Local fallbacks are on</AlertTitle>
      <AlertDescription>{notes.join(" ")}</AlertDescription>
    </Alert>
  );
}
