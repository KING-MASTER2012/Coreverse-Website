import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/supabase/server";

const deriveUsername = (metadata: Record<string, unknown>, email: string): string => {
  const candidates = [metadata.username, metadata.user_name, metadata.preferred_username, metadata.full_name, metadata.name];
  const found = candidates.find((value): value is string => typeof value === "string" && value.length > 0);
  return found ?? email.split("@")[0] ?? "user";
};

export const GET = async (request: NextRequest) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data } = await supabase.auth.getUser();

      if (data.user && !data.user.user_metadata.username) {
        const username = deriveUsername(data.user.user_metadata, data.user.email ?? "");
        await supabase.auth.updateUser({ data: { username } });
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=oauth`);
};
