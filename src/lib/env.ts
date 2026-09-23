export function getCalendlyUrl() {
  return process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || null;
}

export function getSupabaseUrl() {
  return (
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    null
  );
}

export function getSupabaseKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    null
  );
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseKey());
}

export function getIntegrations() {
  return {
    calendly: Boolean(getCalendlyUrl()),
    supabase: isSupabaseConfigured(),
  };
}
