import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

/**
 * Returns the Supabase client, creating it lazily on first call.
 *
 * Returns null in two safe situations:
 *   1. Server-side / static prerender (typeof window === 'undefined')
 *      — Next.js prerenders 'use client' components in Node.js, so
 *        createClient must never be called at module load time.
 *   2. Missing environment variables (build without secrets configured).
 *
 * In both cases callers should treat null as "skip the operation".
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (typeof window === 'undefined') return null;

  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error(
      '[Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.',
    );
    return null;
  }

  // Guard against a common misconfiguration: URL set to the REST endpoint
  // (e.g. "https://…supabase.co/rest/v1/") instead of the project base URL.
  // The Supabase JS client always appends /rest/v1 itself, so the path must
  // be stripped here or every request lands on /rest/v1/rest/v1/… (404).
  const baseUrl = url.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

  _client = createClient(baseUrl, key);
  return _client;
}
