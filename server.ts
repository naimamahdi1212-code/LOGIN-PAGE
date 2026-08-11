import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Used inside Server Components / Route Handlers (the homepage, about page,
// and the auth callback) to read the logged-in user from cookies.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: Record<string, unknown>;
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll can be called from a Server Component where cookies
            // can't be written. Safe to ignore — middleware refreshes
            // the session on every request anyway.
          }
        },
      },
    }
  );
}
