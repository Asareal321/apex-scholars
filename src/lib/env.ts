export function getSiteUrl(request?: Request | string) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (request && typeof request !== "string") {
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
    const proto = request.headers.get("x-forwarded-proto") || "http";
    if (host) return `${proto}://${host}`.replace(/\/$/, "");
  }

  if (typeof request === "string") {
    try {
      return new URL(request).origin;
    } catch {
      // fall through
    }
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
