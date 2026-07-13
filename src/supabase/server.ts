import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

type CreateServerClientOptions = {
  persistSession?: boolean;
};

export const createClient = async (options: CreateServerClientOptions = {}) => {
  const cookieStore = await cookies();
  const persistSession = options.persistSession ?? true;

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options: cookieOptions }) => {
            const finalOptions = persistSession
              ? cookieOptions
              : { ...cookieOptions, maxAge: undefined, expires: undefined };
            cookieStore.set(name, value, finalOptions);
          });
        } catch {
          // Ignored when called from a Server Component; the proxy refreshes the session instead.
        }
      },
    },
  });
};
