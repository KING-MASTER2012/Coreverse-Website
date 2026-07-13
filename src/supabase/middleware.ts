import type { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const updateSession = async (request: NextRequest, response: NextResponse) => {
  const rememberMe = request.cookies.get("coreverse-remember-me")?.value !== "false";

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, rememberMe ? options : { ...options, maxAge: undefined, expires: undefined });
        });
      },
    },
  });

  await supabase.auth.getUser();

  return response;
};
