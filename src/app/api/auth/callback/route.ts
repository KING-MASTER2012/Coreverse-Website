import { NextResponse, type NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/supabase/server";
import { createAdminClient } from "@/supabase/admin";
import { generateRandomPassword } from "@/lib/generate-password";

const NEW_USER_WINDOW_MS = 5000;
const NEEDS_PASSWORD_COOKIE = "coreverse-needs-password";

const deriveUsername = (metadata: Record<string, unknown>, email: string): string => {
  const candidates = [metadata.username, metadata.user_name, metadata.preferred_username, metadata.full_name, metadata.name];
  const found = candidates.find((value): value is string => typeof value === "string" && value.length > 0);
  return found ?? email.split("@")[0] ?? "user";
};

const isBrandNewUser = (user: User): boolean => {
  if (!user.last_sign_in_at) return true;
  const createdAt = new Date(user.created_at).getTime();
  const lastSignInAt = new Date(user.last_sign_in_at).getTime();
  return Math.abs(lastSignInAt - createdAt) < NEW_USER_WINDOW_MS;
};

const extractLocale = (next: string): string => next.split("/").filter(Boolean)[0] ?? "en";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const baseUrl = process.env.NEXT_APP_URL;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (user) {
        if (!user.user_metadata.username) {
          const username = deriveUsername(user.user_metadata, user.email ?? "");
          await supabase.auth.updateUser({ data: { username } });
        }

        if (isBrandNewUser(user)) {
          const admin = createAdminClient();
          const randomPassword = generateRandomPassword();

          // Safety net: account always has a password credential, even if the
          // user never completes the set-password step below.
          await admin.auth.admin.updateUserById(user.id, { password: randomPassword });

          const locale = extractLocale(next);
          const setPasswordUrl = new URL(`${baseUrl}/${locale}/set-password`);
          setPasswordUrl.searchParams.set("next", next);

          const response = NextResponse.redirect(setPasswordUrl);
          response.cookies.set(NEEDS_PASSWORD_COOKIE, "1", {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 30,
          });

          return response;
        }
      }

      return NextResponse.redirect(`${baseUrl}${next}`);
    }
  }

  return NextResponse.redirect(`${baseUrl}/login?error=oauth`);
};
