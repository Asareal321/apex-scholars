export function getSiteUrl(requestUrl?: string) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (requestUrl) {
    return new URL(requestUrl).origin;
  }
  return "http://127.0.0.1:4327";
}

export function getStripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY?.trim() || null;
}

export function getCalendlyUrl() {
  return process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || null;
}

export function isStripeConfigured() {
  return Boolean(getStripeSecretKey());
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
    stripe: isStripeConfigured(),
    calendly: Boolean(getCalendlyUrl()),
    supabase: isSupabaseConfigured(),
  };
}
