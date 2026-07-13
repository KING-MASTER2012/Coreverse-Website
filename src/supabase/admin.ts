import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client. Never import this into client components or expose to the browser.
export const createAdminClient = () =>
  createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
