import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isSupabaseConfigured } from "@/lib/env";

export function FallbackBanner({ supabase }: { supabase?: boolean }) {
  if (!supabase || isSupabaseConfigured()) return null;

  return (
    <Alert className="mb-8">
      <AlertTitle>Local preview</AlertTitle>
      <AlertDescription>
        Supabase is unset, so bookings stay in server memory until the app restarts. Interac
        e-Transfer is the payment method on the live offer; this preview only records the request.
      </AlertDescription>
    </Alert>
  );
}
