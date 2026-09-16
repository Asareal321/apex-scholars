import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseKey, getSupabaseUrl } from "@/lib/env";

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  cached = url && key ? createClient(url, key) : null;
  return cached;
}
