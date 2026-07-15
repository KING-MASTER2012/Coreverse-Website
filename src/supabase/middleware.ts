import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const NEEDS_PASSWORD_COOKIE = "coreverse-needs-password";
const SET_PASSWORD_SEGMENT = "set-password";

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

  const needsPassword = request.cookies.get(NEEDS_PASSWORD_COOKIE)?.value === "1";
  const isOnSetPasswordPage = request.nextUrl.pathname.includes(`/${SET_PASSWORD_SEGMENT}`);

  if (needsPassword && !isOnSetPasswordPage) {
    const redirectUrl = request.nextUrl.clone();
    const locale = redirectUrl.pathname.split("/").filter(Boolean)[0] ?? "en";
    redirectUrl.pathname = `/${locale}/${SET_PASSWORD_SEGMENT}`;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
};
