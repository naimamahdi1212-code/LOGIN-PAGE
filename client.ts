import { createBrowserClient } from "@supabase/ssr";

// Used inside Client Components (things marked "use client"),
// e.g. the login form and the logout button.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
